import { callModel } from "./model-caller";
import { getPlanningPrompt, PLANNING_SYSTEM_PROMPT } from "./promts";
import { exa } from "./services";
import { ResearchState, SearchResult } from "./types";

import { z } from "zod";

export async function generateSearchQueries(researchState: ResearchState) {

    const result  = await callModel({
        model: "google/gemini-2.0-flash-exp:free",
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
              numResults: 4,
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
