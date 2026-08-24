// Parse and validate structured AI output without external dependencies.
// AI responses are inconsistent — these helpers normalize them defensively.

function tryParseJSON(raw) {
  try {
    // Strip markdown code fences the model sometimes adds
    const cleaned = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

export function parseTags(raw) {
  const parsed = tryParseJSON(raw);
  if (parsed) {
    const arr = Array.isArray(parsed) ? parsed : parsed?.tags;
    if (Array.isArray(arr)) return arr.map(String).slice(0, 7);
  }
  return raw.split(/[\n,]/).map((t) => t.trim()).filter(Boolean).slice(0, 7);
}

export function parseTopics(raw) {
  const parsed = tryParseJSON(raw);
  if (parsed) {
    const arr = Array.isArray(parsed) ? parsed : parsed?.topics;
    if (Array.isArray(arr)) return arr.map(String).slice(0, 5);
  }
  return raw.split(/[\n,]/).map((t) => t.trim()).filter(Boolean).slice(0, 5);
}
