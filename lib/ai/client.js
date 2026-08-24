import OpenAI from "openai";

let client = null;

function getClient() {
  if (!client) {
    if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not set");
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return client;
}

export const MODELS = {
  fast: "gpt-4o-mini",
  smart: "gpt-4o",
  embed: "text-embedding-3-small",
};

export async function generateCompletion(messagesOrPrompt, { model = MODELS.fast, temperature = 0.5 } = {}) {
  const openai = getClient();
  const messages =
    typeof messagesOrPrompt === "string"
      ? [{ role: "user", content: messagesOrPrompt }]
      : messagesOrPrompt;

  const response = await openai.chat.completions.create({ model, messages, temperature });
  return response.choices[0].message.content;
}
