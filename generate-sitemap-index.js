import fs from "fs";
import path from "path";
import { generateSitemaps } from "./generate-sitemap.js";

const domain = "https://elitecomputing.co.in";

async function updateSitemapIndex() {
  const publicDir = path.join(process.cwd(), "public");

  // ❗ Exclude sitemap-index.xml from being included in itself
  const sitemapFiles = fs.readdirSync(publicDir)
    .filter(file => file.endsWith(".xml") && file !== "sitemap-index.xml");

  if (sitemapFiles.length === 0) {
    console.log("❌ No sitemap files found. Index not created.");
    return;
  }

  const sitemapIndexPath = path.join(publicDir, "sitemap-index.xml");

  const sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapFiles.map(file => {
    const stats = fs.statSync(path.join(publicDir, file));
    const lastmod = stats.mtime.toISOString();
    return `  <sitemap>
    <loc>${domain}/${file}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`;
  }).join("\n")}
</sitemapindex>`;

  fs.writeFileSync(sitemapIndexPath, sitemapIndexContent);
  console.log("🎉 sitemap-index.xml generated successfully!");
}

async function runSitemapGeneration() {
  await generateSitemaps();
  await updateSitemapIndex();
}

runSitemapGeneration();
