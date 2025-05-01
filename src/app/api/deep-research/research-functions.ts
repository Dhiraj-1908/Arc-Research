import { callModel } from "./model-caller";
import { getPlanningPrompt, PLANNING_SYSTEM_PROMPT } from "./promts";
import { ResearchState } from "./types";

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
    //console.log("Raw model result:", result); // Debug logging


    return result;
}
