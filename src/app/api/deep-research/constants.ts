// Research constants
export const MAX_ITERATIONS = 5; // Maximum number of iterations
export const MAX_SEARCH_RESULTS = 3; // Maximum number of search results
export const MAX_CONTENT_CHARS = 20000; // Maximum number of characters in the content
export const MAX_RETRY_ATTEMPTS = 3; // It is the number of times the model will try to call LLMs if it fails
export const RETRY_DELAY_MS = 1000; // It is the delay in milliseconds between retries for the model to call LLMs

// Model names
export const MODELS = {
  PLANNING: "google/gemini-2.5-flash-preview",   //openai/gpt-4.1-mini 
  EXTRACTION: "anthropic/claude-3-haiku",
  ANALYSIS: "anthropic/claude-3-haiku",
  REPORT: "google/gemini-2.5-flash-preview:thinking"
  // REPORT: "anthropic/claude-3.7-sonnet:thinking",
}; 