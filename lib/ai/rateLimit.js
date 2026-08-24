// Per-user in-memory rate limiting (10 requests per 60 seconds)
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 10;

// Survive Next.js hot-reload by attaching to global
if (!global._aiRateLimitStore) {
  global._aiRateLimitStore = new Map();
}

const store = global._aiRateLimitStore;

export function checkRateLimit(userId) {
  const key = String(userId);
  const now = Date.now();

  const timestamps = (store.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    const resetIn = WINDOW_MS - (now - timestamps[0]);
    return { allowed: false, remaining: 0, resetIn };
  }

  timestamps.push(now);
  store.set(key, timestamps);

  return { allowed: true, remaining: MAX_REQUESTS - timestamps.length };
}
