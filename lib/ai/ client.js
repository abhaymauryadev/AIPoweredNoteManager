//  Single OpenAI client instance

import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const MODELS = {
  fast: "gpt-4o-mini",       // summarize, tags, title
  smart: "gpt-4o",           // chat, complex rewrites
  embed: "text-embedding-3-small",
};

