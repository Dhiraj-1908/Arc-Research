
import {  generateSearchQueries, search } from "./research-functions";
import { ResearchState } from "./types";


export async function deepResearch(researchState: ResearchState, dataStream: any){
          const initialQueries = await generateSearchQueries(researchState)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let currentQueries = (initialQueries as any ).searchQueries

          while(currentQueries && currentQueries.length > 0){

            const searchResults = currentQueries.map((query: string) => search(query, researchState))
            
    // using this promise becouse i want to execute this search function parallely for each query. 
            const searchResultsResponses = await Promise.allSettled(searchResults)

            const allSearchResults = searchResultsResponses.filter(result => result.status === 'fulfilled' && result.value.length > 0).map(result => result.value).flat()
 
            console.log(allSearchResults)

            currentQueries = []
          }

          return initialQueries;
}