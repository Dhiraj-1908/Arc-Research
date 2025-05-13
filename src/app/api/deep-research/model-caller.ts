import { generateObject, generateText } from "ai";
import { openrouter } from "./services";
import {  ModelCallOptions, ResearchState } from "./types";



export async function callModel<T>({
    model, prompt, system, schema 
}: ModelCallOptions<T>,
researchState: ResearchState ): Promise<T | string>{
       if(schema){
        const { object, usage } = await generateObject({
            model: openrouter(model),
            prompt,
            system,
            schema: schema
          });
         // console.log('Model Response:', object); 

          researchState.tokenUsed += usage.totalTokens;
          researchState.completedSteps++
    
          return object;
        }
        else{
            const {text, usage} = await generateText({
                model: openrouter('gpt-4-turbo'),
                prompt,
                system
            });

            researchState.tokenUsed += usage.totalTokens;
            researchState.completedSteps++

            return text
        }
    }
 