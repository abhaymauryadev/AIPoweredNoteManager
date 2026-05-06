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