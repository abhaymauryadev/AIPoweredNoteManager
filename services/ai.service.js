import { generateCompletion } from "@/lib/ai.js";

export async function suggestTopics(content) {
  const prompt = `Based on the following content, suggest 5 related topics or ideas that the user might want to explore further. Return only a JSON array of topic strings, no additional text.

Content: ${content}`;

  const response = await generateCompletion(prompt);
  
  try {
    // Try to parse as JSON
    const topics = JSON.parse(response);
    return Array.isArray(topics) ? topics : [topics];
  } catch (error) {
    // If not JSON, split by newlines or commas
    return response.split(/\n|,/).map(t => t.trim()).filter(t => t.length > 0).slice(0, 5);
  }
}

export async function summarizeText(content) {
  const prompt = `Summarize the following content in 2-3 concise sentences. Focus on the main points and key information.

Content: ${content}`;

  return await generateCompletion(prompt);
}

export async function generateTags(content) {
  const prompt = `Based on the following content, generate 5-7 relevant tags. Return only a JSON array of tag strings, no additional text. Tags should be single words or short phrases.

Content: ${content}`;

  const response = await generateCompletion(prompt);
  
  try {
    // Try to parse as JSON
    const tags = JSON.parse(response);
    return Array.isArray(tags) ? tags : [tags];
  } catch (error) {
    // If not JSON, split by newlines or commas
    return response.split(/\n|,/).map(t => t.trim()).filter(t => t.length > 0).slice(0, 7);
  }
}

