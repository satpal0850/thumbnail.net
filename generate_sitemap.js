import fs from 'fs';

const blogs = [
  { id: "ultimate-guide-youtube-thumbnail-sizes" },
  { id: "why-high-quality-thumbnails-secret-to-growth" },
  { id: "how-to-download-youtube-thumbnail" },
  { id: "5-common-thumbnail-mistakes" },
  { id: "psychology-of-clicking-great-thumbnail" },
  { id: "best-free-tools-design-thumbnails" },
  { id: "ab-testing-thumbnails-skyrocket-views" },
  { id: "youtube-seo-basics" }
];

const validLangs = ['en', 'es', 'hi', 'ko', 'sl', 'pt', 'et', 'zh-TW', 'lt', 'sr', 'nl', 'cs', 'vi', 'uz', 'bg', 'ca', 'id', 'pl', 'it', 'ar'];

const domain = 'https://klickthumb.pinsaver.cloud'; 

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

const today = new Date().toISOString().split('T')[0];

// 1. Add Homepage for all languages
for (const lang of validLangs) {
  const prefix = lang === 'en' ? '' : `/${lang}`;
  const loc = `${domain}${prefix}/`; // ensuring trailing slash or empty for root, but let's use `${domain}${prefix}` so it's clean
  const finalLoc = loc.endsWith('/') && loc !== `${domain}/` ? loc.slice(0, -1) : loc === `${domain}/` ? domain : loc; // Fix trailing slashes
  
  xml += `  <url>\n    <loc>${finalLoc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
}

// 2. Add Blog pages (English only)
xml += `  <url>\n    <loc>${domain}/blog</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;

for (const b of blogs) {
  xml += `  <url>\n    <loc>${domain}/blog/${b.id}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
}

// 3. Add static pages (English only)
const staticPages = ['about', 'contact', 'privacy-policy', 'terms'];
for (const p of staticPages) {
  xml += `  <url>\n    <loc>${domain}/${p}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
}

xml += `</urlset>`;

fs.writeFileSync('./public/sitemap.xml', xml);
console.log('Sitemap generated successfully.');
