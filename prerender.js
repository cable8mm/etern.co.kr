import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { pageMeta, serviceRoutes } from './src/siteMeta.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_PATH = path.resolve(__dirname, 'dist');
const CLIENT_DIST_PATH = path.resolve(DIST_PATH, 'client');
const SERVER_DIST_PATH = path.resolve(DIST_PATH, 'server');

const BASE_URL = 'https://etern.co.kr';

fs.rmSync(DIST_PATH, { recursive: true, force: true });

// 1. Build Client and Server Bundles
console.log('⚡ Starting client build...');
execSync('npx vite build --outDir dist/client', { stdio: 'inherit' });

console.log('⚡ Starting server SSR build...');
execSync('npx vite build --ssr src/entry-server.jsx --outDir dist/server', {
  stdio: 'inherit',
});

// 2. Import Server Render Function
const { render } = await import('./dist/server/entry-server.js');
const template = fs.readFileSync(
  path.resolve(CLIENT_DIST_PATH, 'index.html'),
  'utf-8',
);

// 3. Define Pages to Prerender
const staticPaths = [
  '/',
  '/services',
  '/case-studies',
  '/about',
  '/faq',
  '/assessment',
  '/contact',
  ...serviceRoutes.map((service) => `/services/${service}`),
];

const routes = staticPaths.map((routePath) => ({
  path: routePath,
  lang: 'ko',
  thumbnail: '/images/aipro-thumb.png',
  ...pageMeta[routePath],
}));

console.log(`📦 Pre-rendering ${routes.length} static pages...`);

// 4. Pre-render Loop
routes.forEach((route) => {
  const { html } = render(route.path, route.lang);

  // Compute canonical and alternates
  const stripPrefix = (p) => (p.startsWith('/en') ? p.replace('/en', '') : p);
  const pathWithoutLang = stripPrefix(route.path) || '/';
  const cleanPath = pathWithoutLang === '/' ? '' : pathWithoutLang;

  const koUrl = `${BASE_URL}${cleanPath}`;
  const enUrl = `${BASE_URL}/en${cleanPath}`;
  const canonicalUrl = route.lang === 'ko' ? koUrl : enUrl;

  const title = route.title;
  const description = route.description;
  const thumbnail = route.thumbnail || '/images/aipro-thumb.png';

  // Hreflang alternates block
  let alternateLinks;
  if (route.lang === 'ko') {
    alternateLinks = `
    <link rel="alternate" hreflang="ko" href="${koUrl}" />
    <link rel="alternate" hreflang="en" href="${enUrl}" />
    <link rel="alternate" hreflang="x-default" href="${koUrl}" />`;
  } else {
    alternateLinks = `
    <link rel="alternate" hreflang="ko" href="${koUrl}" />
    <link rel="alternate" hreflang="en" href="${enUrl}" />`;
  }

  // Schema Markup (JSON-LD)
  let jsonLd = '';
  if (pathWithoutLang === '/') {
    // Homepage Schema
    const schemaObj = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${BASE_URL}/#organization`,
          name: 'ETERNOps',
          alternateName: '이터놉스',
          url: BASE_URL,
          logo: `${BASE_URL}/favicon.svg`,
          sameAs: [],
        },
        {
          '@type': 'WebSite',
          '@id': `${BASE_URL}/#website`,
          url: BASE_URL,
          name: 'ETERNOps',
          description:
            '운영 중인 웹·모바일 서비스의 Migration, Modernization, Stabilization 전문 엔지니어링 파트너.',
          publisher: { '@id': `${BASE_URL}/#organization` },
          inLanguage: ['ko', 'en'],
        },
        {
          '@type': 'ProfessionalService',
          '@id': `${BASE_URL}/#service`,
          name: 'ETERNOps',
          image: `${BASE_URL}/images/aipro-thumb.png`,
          url: BASE_URL,
          address: { '@type': 'PostalAddress', addressCountry: 'KR' },
          priceRange: '$$$',
        },
      ],
    };
    jsonLd = `<script type="application/ld+json">${JSON.stringify(schemaObj)}</script>`;
  }

  // Head Meta Replacements
  let headContent = `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonicalUrl}" />${alternateLinks}

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${BASE_URL}${thumbnail}" />
    <meta property="og:site_name" content="ETERNOps" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${canonicalUrl}" />
    <meta property="twitter:title" content="${title}" />
    <meta property="twitter:description" content="${description}" />
    <meta property="twitter:image" content="${BASE_URL}${thumbnail}" />
    ${jsonLd}
  `;

  // Inject meta into head
  let pageHtml = template;

  // Replace the placeholder tags inside the template's head
  const headStart = pageHtml.indexOf('<head>');
  const headEnd = pageHtml.indexOf('</head>');
  if (headStart !== -1 && headEnd !== -1) {
    const headInner = pageHtml.substring(headStart + 6, headEnd);

    // Clean up default titles, descriptions, and OGs inside original template
    let cleanedHead = headInner
      .replace(/<title>[\s\S]*?<\/title>/gi, '')
      .replace(/<meta name="description"[\s\S]*?\/>/gi, '')
      .replace(/<meta property="og:[\s\S]*?\/>/gi, '')
      .replace(/<meta property="twitter:[\s\S]*?\/>/gi, '');

    pageHtml =
      pageHtml.substring(0, headStart + 6) +
      cleanedHead +
      headContent +
      pageHtml.substring(headEnd);
  }

  // Inject rendered HTML into root container
  pageHtml = pageHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`,
  );
  pageHtml = pageHtml.replace(
    '<html lang="en">',
    `<html lang="${route.lang}">`,
  );

  // Compute file write path
  let fileDir = DIST_PATH;
  let fileName = 'index.html';

  if (route.path !== '/') {
    fileDir = path.join(DIST_PATH, route.path);
  }

  fs.mkdirSync(fileDir, { recursive: true });
  fs.writeFileSync(path.join(fileDir, fileName), pageHtml, 'utf-8');
});

// 5. Cleanup client & server intermediate files
console.log('🧹 Aligning build directories...');

// Copy remaining client static assets to root dist/
const copyRecursiveSync = (src, dest) => {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName),
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

// Copy all build outputs from dist/client to dist/ except index.html which was generated by prerender
fs.readdirSync(CLIENT_DIST_PATH).forEach((file) => {
  if (file !== 'index.html') {
    copyRecursiveSync(
      path.join(CLIENT_DIST_PATH, file),
      path.join(DIST_PATH, file),
    );
  }
});

// Remove temp folders
fs.rmSync(CLIENT_DIST_PATH, { recursive: true, force: true });
fs.rmSync(SERVER_DIST_PATH, { recursive: true, force: true });

// Create dist/404.html from dist/index.html for GitHub Pages fallback
fs.copyFileSync(
  path.resolve(DIST_PATH, 'index.html'),
  path.resolve(DIST_PATH, '404.html'),
);

console.log(
  '🎉 Prerendering complete! Static files successfully created under dist/',
);
