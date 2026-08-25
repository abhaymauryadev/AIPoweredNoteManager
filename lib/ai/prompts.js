// All prompt templates in one place

export const SUMMARIZE_PROMPT = (content) => [
  {
    role: "system",
    content: "You summarize notes in 2-3 concise sentences. No preamble.",
  },
  { role: "user", content: `Summarize this note:\n\n${content}` },
];

export const TAGS_PROMPT = (content) => [
  {
    role: "system",
    content:
      "Extract 3-5 short, lowercase, single-word tags. Respond with JSON: {\"tags\": [\"tag1\", ...]}.",
  },
  { role: "user", content },
];

export const SUGGEST_TOPICS_PROMPT = (content) => [
  {
    role: "system",
    content:
      "Suggest 5 related topics the user might want to explore next. Respond with JSON: {\"topics\": [\"topic1\", ...]}. No preamble.",
  },
  { role: "user", content },
];

export const GRAMMAR_PROMPT = (content) => [
  {
    role: "system",
    content:
      "Fix all spelling and grammar mistakes in the text. Return only the corrected plain text, preserving the original meaning and structure. No explanations or preamble.",
  },
  { role: "user", content },
];

export const ASK_AI_PROMPT = (prompt, context) => [
  {
    role: "system",
    content:
      "You are a helpful writing assistant. Answer concisely and directly. If note context is provided, use it to inform your response.",
  },
  ...(context
    ? [
        { role: "user", content: `Here is the context from my note:\n\n${context}` },
        { role: "assistant", content: "Got it, I have the context of your note." },
      ]
    : []),
  { role: "user", content: prompt },
];