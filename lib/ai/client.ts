export interface AiCompletionRequest {
  system: string;
  prompt: string;
  maxTokens?: number;
}

export class AiNotConfiguredError extends Error {
  constructor() {
    super("AI tools aren't configured on this deployment yet.");
    this.name = "AiNotConfiguredError";
  }
}

const GEMINI_FALLBACK_MODELS = [
  "gemini-3.6-flash",
  "gemini-flash-lite-latest",
  "gemini-3.1-flash-lite",
  "gemini-3.5-flash-lite",
  "gemini-flash-latest",
  "gemini-3.7-flash",
  "gemini-3.5-flash",
];

function getConfig() {
  const apiKey = process.env.AI_API_KEY;
  let provider = (process.env.AI_PROVIDER || "").toLowerCase().trim();
  if (!apiKey) throw new AiNotConfiguredError();
  
  if (!provider) {
    if (apiKey.startsWith("AQ.") || apiKey.startsWith("AIza") || process.env.AI_API_BASE_URL?.includes("googleapis.com")) {
      provider = "gemini";
    } else {
      provider = "openai";
    }
  }
  return { apiKey, provider };
}

async function callGeminiNative(apiKey: string, req: AiCompletionRequest): Promise<string> {
  const requestedModel = process.env.AI_MODEL || "gemini-3.6-flash";
  const modelsToTry = [requestedModel, ...GEMINI_FALLBACK_MODELS.filter((m) => m !== requestedModel)];
  
  let lastError = "Gemini request failed";

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: req.system }],
          },
          contents: [
            {
              parts: [{ text: req.prompt }],
            },
          ],
          generationConfig: {
            maxOutputTokens: req.maxTokens ?? 1500,
          },
        }),
      });

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        lastError = `Gemini (${model}) status ${res.status}: ${body.slice(0, 250)}`;
        // Try next fallback model on any error (400, 404, 429, 500, 503)
        continue;
      }

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (typeof text === "string" && text.trim().length > 0) {
        return text;
      }
      lastError = `Gemini (${model}) returned empty candidates`;
    } catch (err: unknown) {
      if (err instanceof Error) {
        lastError = `Gemini (${model}) network error: ${err.message}`;
      }
    }
  }

  throw new Error(`All Gemini models failed. Last error: ${lastError}`);
}

async function callOpenAiCompatible(apiKey: string, req: AiCompletionRequest): Promise<string> {
  // Covers OpenAI itself and the many providers (Groq, Together, OpenRouter, Fireworks, etc.)
  // that mirror OpenAI's /v1/chat/completions request/response shape. Override the endpoint
  // via AI_API_BASE_URL for a non-OpenAI provider using this same format.
  const baseUrl = process.env.AI_API_BASE_URL || "https://api.openai.com/v1";
  const model = process.env.AI_MODEL || "gpt-4o-mini";

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: req.system },
        { role: "user", content: req.prompt },
      ],
      max_tokens: req.maxTokens ?? 500,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    // If OpenAI-compatible endpoint fails because of a Gemini model error and base URL is googleapis, try fallback to native Gemini
    if (baseUrl.includes("googleapis.com")) {
      return callGeminiNative(apiKey, req);
    }
    throw new Error(`AI provider request failed (${res.status}): ${body.slice(0, 300)}`);
  }
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (typeof text !== "string") throw new Error("AI provider returned an unexpected response shape");
  return text;
}

async function callAnthropic(apiKey: string, req: AiCompletionRequest): Promise<string> {
  const baseUrl = process.env.AI_API_BASE_URL || "https://api.anthropic.com/v1";
  const model = process.env.AI_MODEL || "claude-haiku-4-5-20251001";

  const res = await fetch(`${baseUrl}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      system: req.system,
      messages: [{ role: "user", content: req.prompt }],
      max_tokens: req.maxTokens ?? 500,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`AI provider request failed (${res.status}): ${body.slice(0, 300)}`);
  }
  const data = await res.json();
  const text = data?.content?.[0]?.text;
  if (typeof text !== "string") throw new Error("AI provider returned an unexpected response shape");
  return text;
}

/**
 * Calls whichever AI provider is configured via AI_PROVIDER ("gemini", "google", "openai", or "anthropic",
 * defaulting based on key/base URL or "openai") using the key in AI_API_KEY. Throws AiNotConfiguredError if no key
 * is set — callers should catch this specifically to show a clean "not configured" message
 * rather than a generic error, the same pattern this project uses for AdSense and Google
 * OAuth when their env vars are absent.
 */
export async function getAiCompletion(req: AiCompletionRequest): Promise<string> {
  const { apiKey, provider } = getConfig();
  if (provider === "gemini" || provider === "google") return callGeminiNative(apiKey, req);
  if (provider === "anthropic") return callAnthropic(apiKey, req);
  return callOpenAiCompatible(apiKey, req);
}
