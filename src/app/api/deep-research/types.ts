import { z } from "zod";


export interface ResearchFindings {
    summary: string,
    source: string
}

export interface ResearchState {
    topic: string,
    completedSteps: number,
    tokenUsed: number,
    findings: ResearchFindings[],
    processedUrl: Set<string>,
    clarificationsText: string;
}
