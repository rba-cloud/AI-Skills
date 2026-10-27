import { writeFileSync } from "node:fs";
const origin = process.env.SITE_URL;
if (!origin)
  throw new Error(
    "Set SITE_URL to the verified production origin, e.g. https://academy.example. No domain is assumed.",
  );
const url = new URL(origin);
if (
  url.protocol !== "https:" ||
  url.pathname !== "/" ||
  url.search ||
  url.hash ||
  url.username ||
  url.password
)
  throw new Error(
    "SITE_URL must be an HTTPS origin without path, credentials, query, or fragment.",
  );
writeFileSync(
  "public/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${url.origin}/</loc></url></urlset>\n`,
);
writeFileSync(
  "public/robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${url.origin}/sitemap.xml\n`,
);
console.log(
  "Generated sitemap.xml and robots.txt for the configured production origin.",
);
