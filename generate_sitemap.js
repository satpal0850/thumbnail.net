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

const domain = 'https://yourwebsite.com'; 

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

const pages = [
  '',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms',
  '/blog',
];

for (const b of blogs) {
  pages.push(`/blog/${b.id}`);
}

const today = new Date().toISOString().split('T')[0];

for (const lang of validLangs) {
  const prefix = lang === 'en' ? '' : `/${lang}`;
  for (const page of pages) {
    const loc = `${domain}${prefix}${page}`;
    xml += `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;
    
    for (const altLang of validLangs) {
      const altPrefix = altLang === 'en' ? '' : `/${altLang}`;
      const altLoc = `${domain}${altPrefix}${page}`;
      xml += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${altLoc}" />\n`;
    }
    
    xml += `  </url>\n`;
  }
}

xml += `</urlset>`;

fs.writeFileSync('./public/sitemap.xml', xml);
console.log('Sitemap generated successfully.');
