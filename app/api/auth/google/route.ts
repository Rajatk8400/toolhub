import { NextRequest, NextResponse } from "next/server";
import { buildGoogleAuthUrl } from "@/lib/auth/google";

export async function GET(req: NextRequest) {
  // A random state value, checked on callback, protects against CSRF on the OAuth flow.
  const state = crypto.randomUUID();

  let authUrl: string;
  try {
    authUrl = buildGoogleAuthUrl(state);
  } catch (e) {
    // Google isn't configured — send the person back to login with a clear message
    // instead of a raw 500.
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("error", "google_not_configured");
    return NextResponse.redirect(loginUrl);
  }

  const res = NextResponse.redirect(authUrl);
  res.cookies.set("toolhub_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10, // 10 minutes is plenty for a consent-screen round trip
  });
  return res;
}
