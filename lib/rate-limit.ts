import { LRUCache } from "lru-cache";

type RateLimitKey = string;

const cache = new LRUCache<RateLimitKey, number[]>({
  max: 10_000,
  ttl: 60_000, // 1 minute window
});

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requests per window per key

/**
 * In-memory rate limiter for contact form (and similar).
 * Key = IP + optional user-agent hash. On Vercel you can use @vercel/kv for distributed limiting.
 */
export function rateLimit(key: RateLimitKey): { success: boolean; remaining: number } {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = cache.get(key) ?? [];
  const recent = timestamps.filter((t) => t > windowStart);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    return { success: false, remaining: 0 };
  }

  recent.push(now);
  cache.set(key, recent);
  return { success: true, remaining: RATE_LIMIT_MAX_REQUESTS - recent.length };
}

export function rateLimitKey(ip: string, userAgent: string): string {
  const ua = userAgent.slice(0, 64);
  return `${ip}:${ua}`;
}
