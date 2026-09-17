/**
 * A minimal in-memory sliding-window rate limiter. Deliberately dependency-free.
 *
 * Limitation: state is per Node.js process. On a single-instance deployment (one Vercel
 * function warm instance, one server) this works correctly. On a multi-instance/serverless
 * deployment with many concurrent cold starts, each instance tracks its own counts, so the
 * effective limit is (per-instance limit × instance count) rather than a hard global cap.
 * For a hard global limit in production, swap the in-memory Map below for Redis (e.g.
 * Upstash) or a similar shared store — the checkRateLimit() call site doesn't need to change.
 */

interface Bucket {
  count: number;
  windowStart: number;
}

const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function checkRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now - existing.windowStart >= windowMs) {
    buckets.set(key, { count: 1, windowStart: now });
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  if (existing.count >= limit) {
    const retryAfterSeconds = Math.ceil((existing.windowStart + windowMs - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  existing.count += 1;
  return { allowed: true, remaining: limit - existing.count, retryAfterSeconds: 0 };
}

// Periodically clear stale buckets so this Map doesn't grow unbounded on a long-running process.
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (now - bucket.windowStart > 60 * 60 * 1000) buckets.delete(key);
    }
  }, 10 * 60 * 1000).unref?.();
}
