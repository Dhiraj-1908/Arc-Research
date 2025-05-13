/* eslint-disable @typescript-eslint/no-explicit-any */

import { MAX_ITERATIONS } from "./constants";
import {  analyzeFindings, generateReport, generateSearchQueries, processSearchResults, search } from "./research-functions";
import { ResearchState } from "./types";


export async function deepResearch(researchState: ResearchState, dataStream: any){
       
       let iteration = 0

          const initialQueries = await generateSearchQueries(researchState)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let currentQueries = (initialQueries as any ).searchQueries

   

          while(currentQueries && currentQueries.length > 0 && iteration < MAX_ITERATIONS){
             iteration++;

             console.log("we are running on iteration number: ",iteration);

            const searchResults = currentQueries.map((query: string) => search(query, researchState))
            
    // using this promise becouse i want to execute this search function parallely for each query. 
            const searchResultsResponses = await Promise.allSettled(searchResults)

            const allSearchResults = searchResultsResponses.filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled' && result.value.length > 0).map(result => result.value).flat()
            
            console.log(`we got ${allSearchResults.length} search results!`)
            const newFindings = await processSearchResults(allSearchResults, researchState)

            console.log("Results are processed!")

            researchState.findings = [...researchState.findings, ...newFindings]
            
            const analysis = await analyzeFindings(
                researchState,currentQueries, iteration
            )


            console.log("Analysis: ", analysis)

            if((analysis as any).sufficient){
                break;
            }


            currentQueries = ((analysis as any).queries || []).filter((query:string) => !currentQueries.includes(query));

          }

          console.log("we are outside of the loop with total iteration: ", iteration)

          console.log("Findings: " ,researchState.findings)

          const report = await generateReport(researchState);

          console.log("Report final: ",report)

          return initialQueries;
}