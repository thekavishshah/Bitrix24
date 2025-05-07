// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getToken } from "next-auth/jwt";
import {
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
  PROTECTED_BASE_ROUTES,
  PROTECTED_ROUTES,
} from "./routes";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(
    Number(process.env.RATE_LIMIT_MAX) || 100,
    `${Number(process.env.RATE_LIMIT_WINDOW) || 60} s`
  ),
});

export async function middleware(req: NextRequest) {
  // — RATE LIMIT —
  const forwarded = req.headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0] || "unknown";

  // destructure the Upstash response
  const { success, limit, remaining } = await ratelimit.limit(ip);

  // On throttle, include headers
  if (!success) {
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: {
        "Retry-After": process.env.RATE_LIMIT_WINDOW || "60",
        "X-RateLimit-Limit": String(limit),
        "X-RateLimit-Remaining": String(remaining),
      },
    });
  }

  // On success, forward with headers
  const response = NextResponse.next();
  response.headers.set("X-RateLimit-Limit", String(limit));
  response.headers.set("X-RateLimit-Remaining", String(remaining));

  // — AUTH / PROTECTED ROUTES (unchanged) —
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isLoggedIn = !!token;
  const pathname = req.nextUrl.pathname;

  if (
    PROTECTED_BASE_ROUTES.some((r) => pathname.startsWith(r)) &&
    !isLoggedIn
  ) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  if (AUTH_ROUTES.includes(pathname) && isLoggedIn) {
    return NextResponse.redirect(
      new URL(DEFAULT_LOGIN_REDIRECT, req.url)
    );
  }
  if (PROTECTED_ROUTES.includes(pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
