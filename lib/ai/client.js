import Groq from "groq-sdk";

let client = null;

function getClient() {
  if (!client) {
    if (!process.env.GROQ_API_KEY) throw new Error("GROQ_API_KEY is not set");
    client = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return client;
}

export const MODELS = {
  fast: "openai/gpt-oss-120b",
  smart: "openai/gpt-oss-120b",
};

export async function generateCompletion(messagesOrPrompt, { model = MODELS.fast, temperature = 0.5 } = {}) {
  const groq = getClient();
  const messages =
    typeof messagesOrPrompt === "string"
      ? [{ role: "user", content: messagesOrPrompt }]
      : messagesOrPrompt;

  const response = await groq.chat.completions.create({ model, messages, temperature });
  return response.choices[0].message.content;
}
