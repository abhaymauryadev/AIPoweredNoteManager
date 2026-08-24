import { generateCompletion } from "@/lib/ai/client.js";
import { SUMMARIZE_PROMPT, TAGS_PROMPT, SUGGEST_TOPICS_PROMPT } from "@/lib/ai/prompts.js";
import { parseTags, parseTopics } from "@/lib/ai/schemas.js";

export async function summarizeText(content) {
  return generateCompletion(SUMMARIZE_PROMPT(content));
}

export async function generateTags(content) {
  const raw = await generateCompletion(TAGS_PROMPT(content));
  return parseTags(raw);
}

export async function suggestTopics(content) {
  const raw = await generateCompletion(SUGGEST_TOPICS_PROMPT(content));
  return parseTopics(raw);
}
