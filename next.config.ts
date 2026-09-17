import type { NextConfig } from "next";

const securityHeaders = [
  // Prevents the site from being embedded in an iframe elsewhere (clickjacking protection).
  { key: "X-Frame-Options", value: "DENY" },
  // Stops the browser from MIME-sniffing a response away from its declared content-type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Limits how much referrer information is sent to other origins.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restricts powerful browser features this site has no reason to use.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Only takes effect over HTTPS; harmless in local HTTP dev.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
