import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import User from "@/lib/models/User";
import { exchangeCodeForProfile } from "@/lib/auth/google";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth/session";

export async function GET(req: NextRequest) {
  const loginUrl = new URL("/admin/login", req.url);

  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const expectedState = req.cookies.get("toolarena_oauth_state")?.value;

  if (!code || !state || !expectedState || state !== expectedState) {
    loginUrl.searchParams.set("error", "google_auth_failed");
    return NextResponse.redirect(loginUrl);
  }

  try {
    const profile = await exchangeCodeForProfile(code);
    if (!profile.email_verified) {
      loginUrl.searchParams.set("error", "google_email_unverified");
      return NextResponse.redirect(loginUrl);
    }

    await connectDB();

    // Match on googleId first (returning user), then on email (a credentials user linking
    // Google for the first time), otherwise create a new account. New Google sign-ups default
    // to the "user" role — an existing admin has to promote them to "editor"/"admin" manually,
    // the same way the first admin is created via scripts/create-admin.ts.
    let user = await User.findOne({ googleId: profile.sub });
    if (!user) {
      user = await User.findOne({ email: profile.email.toLowerCase() });
      if (user) {
        user.googleId = profile.sub;
        if (profile.picture) user.avatarUrl = profile.picture;
        await user.save();
      } else {
        user = await User.create({
          name: profile.name,
          email: profile.email.toLowerCase(),
          googleId: profile.sub,
          avatarUrl: profile.picture,
          role: "user",
        });
      }
    }

    const token = await createSessionToken({
      userId: String(user._id),
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const destination = user.role === "admin" || user.role === "editor" ? "/admin/tools" : "/";
    const res = NextResponse.redirect(new URL(destination, req.url));
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    res.cookies.set("toolarena_oauth_state", "", { path: "/", maxAge: 0 });
    return res;
  } catch {
    loginUrl.searchParams.set("error", "google_auth_failed");
    return NextResponse.redirect(loginUrl);
  }
}
