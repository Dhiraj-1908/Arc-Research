/* eslint-disable @typescript-eslint/no-explicit-any */
import { callModel } from "./model-caller";
import { EXTRACTION_SYSTEM_PROMPT, getExtractionPrompt, getPlanningPrompt, PLANNING_SYSTEM_PROMPT } from "./promts";
import { exa } from "./services";
import { ResearchFindings, ResearchState, SearchResult } from "./types";

import { z } from "zod";

export async function generateSearchQueries(researchState: ResearchState) {

    const result  = await callModel({
        model: "anthropic/claude-3-haiku",
        prompt: getPlanningPrompt(researchState.topic, researchState.clarificationsText),
        system: PLANNING_SYSTEM_PROMPT,
        schema: z.object({
            searchQueries: z.array(z.string().min(1))
              .length(3)
              .describe("Exactly 3 search queries for comprehensive research")
        })
    }, researchState)
    return result;
}

export async function search(
    query: string,
    ResearchState: ResearchState
): Promise<SearchResult[]>{
    try{
        const searchResult = await exa.searchAndContents(
              query,
            {
              type: "keyword",
              numResults: 1,
              startPublishedDate: new Date(Date.now() - 365*24*60*60*1000).toISOString(),
              endPublishedDate: new Date().toISOString(),
              startCrawlDate: new Date(Date.now() - 365*24*60*60*1000).toISOString(),
              endCrawlDate:  new Date().toISOString(),
              excludeDomains: ["https://www.youtube.com"],
              text: {
                maxCharacters: 25000
              }
            }
          )

          const filteredResults = searchResult.results.filter(r => r.title && r.text != undefined).map(r => ({
            title: r.title || "",
            url: r.url,
            content: r.text || "",
          }))

          ResearchState.completedSteps++;

          return filteredResults
          

    }catch(error){
           console.log("error: ", error)
    }
}


export async function extractContent(
    content: string,
    url: string,
    researchState: ResearchState,
  ) {
  
  
          const result = await callModel(
            {
              model: "anthropic/claude-3-haiku",
              prompt: getExtractionPrompt(
                content,
                researchState.topic,
                researchState.clarificationsText
              ),
              system: EXTRACTION_SYSTEM_PROMPT,
              schema: z.object({
                summary: z.string().describe("A comprehensive summary of the content"),
              }),
            },
            researchState
          );
                
          return {
            url,
            summary: (result as any).summary,
          };
  }
  
  export async function processSearchResults(
    searchResults: SearchResult[],
    researchState: ResearchState,
  ): Promise<ResearchFindings[]> {


    const extractionPromises = searchResults.map((result) =>
      extractContent(result.content, result.url, researchState)
    );

    const extractionResults = await Promise.allSettled(extractionPromises);
  
    type ExtractionResult = { url: string; summary: string };
  
    const newFindings = extractionResults.filter(
        (result): result is PromiseFulfilledResult<ExtractionResult> =>
          result.status === "fulfilled" &&
          result.value !== null &&
          result.value !== undefined
      )
      .map((result) => {
        const { summary, url } = result.value;
        return {
          summary,
          source: url,
        };
      });
  
    return newFindings;
  }
  