/** @type {import('next').NextConfig} */

/** Launch redirect map — the old MVP-agency site's indexed URLs land on their
 *  nearest new equivalent (permanent 308s), so search equity follows the swap
 *  instead of 404ing. Same-path pages (/, /services, /about, /book, /fit-check,
 *  /deployment-diagnostic, /data-residency, /work/*) swap content in place and
 *  need no entry. Admin/report/test routes intentionally fall through to 404. */
const legacyRedirects = [
  // funnels → their new equivalents
  { source: "/ai-assessment", destination: "/fit-check", permanent: true },
  { source: "/ai-assessment/:path*", destination: "/fit-check", permanent: true },
  { source: "/mvp-planner", destination: "/deployment-diagnostic", permanent: true },
  { source: "/mvp-planner/:path*", destination: "/deployment-diagnostic", permanent: true },
  // capability / offer pages → services
  { source: "/ai", destination: "/services", permanent: true },
  { source: "/automation", destination: "/services", permanent: true },
  { source: "/saas-mvp", destination: "/services", permanent: true },
  { source: "/saas-replacement", destination: "/services", permanent: true },
  { source: "/chatbot-mockup", destination: "/services", permanent: true },
  // JB mockup pages → the JB case study
  { source: "/jb-booking-system", destination: "/work/jb-luxe-detailing", permanent: true },
  { source: "/jb-crm-dashboard", destination: "/work/jb-luxe-detailing", permanent: true },
  // content with no new equivalent → home (preserves inbound equity)
  { source: "/blog", destination: "/", permanent: true },
  { source: "/blog/:path*", destination: "/", permanent: true },
  { source: "/templates/:path*", destination: "/", permanent: true },
  // legacy Dubai geo landers → home (geo framing retired site-wide)
  { source: "/custom-software-development-dubai", destination: "/", permanent: true },
  { source: "/dubai-web-development-companies", destination: "/", permanent: true },
];

const nextConfig = {
  reactStrictMode: true,
  // Overridable so audit/CI builds don't clobber the dev server's .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  async redirects() {
    return legacyRedirects;
  },
  // Baseline hardening; HSTS/TLS come from Vercel. No CSP: GTM/Pixel inject inline scripts.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
