import { NextRequest, NextResponse } from "next/server";
import { getAiCompletion, AiNotConfiguredError } from "@/lib/ai/client";
import { checkRateLimit } from "@/lib/rate-limit";

const AI_LIMIT = 15; // requests
const AI_WINDOW_MS = 60 * 60 * 1000; // per hour — AI calls cost money per request, unlike the other rate limits here

const SYSTEM_PROMPTS: Record<string, string> = {
  summarizer: "You summarize text concisely and accurately. Return only the summary, no preamble.",
  "email-generator":
    "You write clear, professional emails based on a brief description of what the sender wants to say. Return only the email body, no preamble or explanation.",
  rewriter:
    "You rewrite text to improve clarity and flow while preserving the original meaning. Return only the rewritten text, no preamble.",
  "bullet-point-generator":
    "You convert text or a topic into a concise, well-organized bulleted list. Return only the bullet list, no preamble.",
};

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { allowed, retryAfterSeconds } = checkRateLimit(`ai:${ip}`, AI_LIMIT, AI_WINDOW_MS);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many AI requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
    );
  }

  const { tool, input } = await req.json();
  const system = SYSTEM_PROMPTS[tool];
  if (!system) {
    return NextResponse.json({ error: "Unknown AI tool" }, { status: 400 });
  }
  if (!input?.trim()) {
    return NextResponse.json({ error: "Input text is required" }, { status: 400 });
  }
  if (input.length > 8000) {
    return NextResponse.json({ error: "Input is too long (max 8000 characters)" }, { status: 400 });
  }

  try {
    const output = await getAiCompletion({ system, prompt: input });
    return NextResponse.json({ output });
  } catch (e) {
    if (e instanceof AiNotConfiguredError) {
      return NextResponse.json({ error: e.message, notConfigured: true }, { status: 503 });
    }
    console.error("AI generation failed:", e);
    return NextResponse.json({ error: "AI generation failed — please try again" }, { status: 502 });
  }
}
