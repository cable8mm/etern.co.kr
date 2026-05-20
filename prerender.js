import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { projects } from './src/data/projects.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_PATH = path.resolve(__dirname, 'dist');
const CLIENT_DIST_PATH = path.resolve(DIST_PATH, 'client');
const SERVER_DIST_PATH = path.resolve(DIST_PATH, 'server');

const BASE_URL = 'https://etern.co.kr';

// Project details mappings for precise SEO
const projectMeta = {
  aipro: {
    ko: {
      title: 'AI Pro 스마트 물류 플랫폼 복원 기록',
      description:
        '상품 12,000개와 쇼핑몰 17개를 연동하는 스마트 물류 시스템(WMS)을 CakePHP 2 및 PHP 7.3 환경으로 성공적으로 복원했습니다.',
    },
    en: {
      title: 'AI Pro Smart Logistics System Restoration',
      description:
        'Successfully restored a legacy Smart Logistics System (WMS) managing 12,000+ items and 17 store integrations using CakePHP 2 and PHP 7.3.',
    },
    thumbnail: '/images/aipro-thumb.png',
  },
  holapet: {
    ko: {
      title: '올라펫 유기동물 입양 플랫폼 복원 기록',
      description:
        '유기동물 매칭 플랫폼 올라펫을 PHP 8.3 및 Laravel 12 클라우드 배포 환경으로 완전 현대화하여 복원했습니다.',
    },
    en: {
      title: 'Hola Pet Abandoned Animals Platform Restoration',
      description:
        'Reconstructed the abandoned pet adoption platform Hola Pet with Laravel 12 and PHP 8.3 in an automated CI/CD pipeline.',
    },
    thumbnail: '/images/holapet-thumb.png',
  },
  'aki-in': {
    ko: {
      title: '악기인 제로보드 4 악기장터 복원 기록',
      description:
        '구형 제로보드 4 악기장터를 CakePHP 2 관계형 데이터베이스 구조로 전면 재구축 및 복원했습니다.',
    },
    en: {
      title: 'Aki-in Instrument Platform Restoration',
      description:
        'Migrated and restored a legacy Zeroboard 4-based instrument marketplace into a relational CakePHP 2 platform.',
    },
    thumbnail: '/images/aki-in-thumb.png',
  },
  'tanz-station': {
    ko: {
      title: '서울탄츠스테이션 그누보드 5 복원 기록',
      description:
        '그누보드 5 웹사이트에 CakePHP 2 기반 관리 어드민과 DB 시간표 스케줄러 시스템을 통합 복원했습니다.',
    },
    en: {
      title: 'Seoul Tanz Station Web System Restoration',
      description:
        'Integrated a relational CakePHP 2 admin panel and dynamic timetable scheduler alongside legacy Gnuboard 5.',
    },
    thumbnail: '/images/tanz-station-thumb.png',
  },
  palgle: {
    ko: {
      title: 'WordPress 데이터 Markdown 복원 기록',
      description:
        'WordPress(PHP + MySQL) 블로그 데이터를 정밀 가공하여 Markdown으로 안전하게 마이그레이션하고, Jekyll과 GitHub Pages 연동을 통해 무비용 정적 사이트로 성공적으로 되살렸습니다.',
    },
    en: {
      title: 'WordPress to Markdown Blog Restoration',
      description:
        'Successfully migrated 1,000+ WordPress posts to standardized Markdown format with YAML Front Matter, relaunching the blog on a zero-maintenance Jekyll static architecture.',
    },
    thumbnail: '/images/palgle-thumb.png',
  },
  gsc2017: {
    ko: {
      title: 'GSC 2017 바닐라 정적 웹사이트 변환 기록',
      description:
        '유지보수 및 서버 비용 문제 해결을 위해 기존 워드프레스(WordPress) 사이트를 크롤링하고 검증하여 완전한 바닐라 HTML/CSS/JS 및 GitHub Pages 무비용 환경으로 변환 복원했습니다.',
    },
    en: {
      title: 'GSC 2017 WordPress to Vanilla Static Conversion',
      description:
        'Successfully migrated and converted a legacy WordPress website to highly robust, zero-cost Vanilla HTML/CSS/JS hosted on GitHub Pages.',
    },
    thumbnail: '/images/gsc2017-thumb.png',
  },
  template: {
    ko: {
      title: '아카이브 복원 스키마 템플릿',
      description:
        '향후 복구 프로젝트 진행 시 가이드라인으로 사용하는 레거시 리바이벌 스튜디오의 아카이브 레코드 규격입니다.',
    },
    en: {
      title: 'Archive Record Schema Blueprint',
      description:
        'Reference template documenting how future digital revival archives maintain legacy preservation boundaries.',
    },
    thumbnail: '/images/template-thumb.png',
  },
};

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
const routes = [
  // Korean Routes (default)
  {
    path: '/',
    lang: 'ko',
    title: '레거시 리바이벌 스튜디오',
    description: '오래된 웹사이트를 복원하고 다시 살아 움직이게 합니다.',
  },
  {
    path: '/projects',
    lang: 'ko',
    title: '프로젝트 아카이브 | 레거시 리바이벌 스튜디오',
    description:
      '부활한 소프트웨어의 작동 상태, 복원 과정, 레거시 시스템 현대화 패치 내역을 문서화한 아카이브 아티팩트 목록입니다.',
  },
  {
    path: '/services',
    lang: 'ko',
    title: '복원 서비스 안내 | 레거시 리바이벌 스튜디오',
    description:
      '구형 코드 분석(레거시 리뷰), 시스템 복구 가능성 평가, 의존성 현대화 및 낡은 웹 서비스를 작동 가능한 상태로 되살리는 전문 엔지니어링 서비스를 제공합니다.',
  },
  {
    path: '/philosophy',
    lang: 'ko',
    title: '엔지니어링 철학 | 레거시 리바이벌 스튜디오',
    description:
      '역사를 재디자인하지 않고 원본의 의도를 보존하는 기술적 태도, 소프트웨어의 부패를 방지하고 영속성을 보장하는 아카이브 우선주의 철학을 소개합니다.',
  },
  {
    path: '/about',
    lang: 'ko',
    title: '스튜디오 소개 | 레거시 리바이벌 스튜디오',
    description:
      '오래되었지만 가치 있는 사내 시스템, 낡은 웹 앱, 문서화되지 않은 DB를 연구하고 조용히 소멸하지 않도록 런타임을 재현하는 기술 보존 스튜디오입니다.',
  },
  {
    path: '/contact',
    lang: 'ko',
    title: '복원 의뢰 및 문의 | 레거시 리바이벌 스튜디오',
    description:
      '구형 시스템 백업본, 데이터베이스 덤프, 낡은 소스코드만으로도 상담이 가능합니다. 레거시 소프트웨어 복구 및 작동 가능성 문의를 보내주세요.',
  },

  // English Routes
  {
    path: '/en',
    lang: 'en',
    title: 'Legacy Revival Studio',
    description:
      'A project dedicated to reviving old software, preserving digital artifacts, and modernizing legacy systems while respecting their original intent.',
  },
  {
    path: '/en/projects',
    lang: 'en',
    title: 'Restoration Projects | Legacy Revival Studio',
    description:
      'A catalog of revived software systems, technical recovery notes, and legacy modernization blueprints.',
  },
  {
    path: '/en/services',
    lang: 'en',
    title: 'Preservation Services | Legacy Revival Studio',
    description:
      'Technical legacy review, feasibility assessments, runtime environment modernization, and end-to-end restoration of aging software.',
  },
  {
    path: '/en/philosophy',
    lang: 'en',
    title: 'Preservation Philosophy | Legacy Revival Studio',
    description:
      'Our engineering principles for digital software preservation. We avoid rewriting history, focusing instead on making legacy systems runnable and resilient.',
  },
  {
    path: '/en/about',
    lang: 'en',
    title: 'About the Studio | Legacy Revival Studio',
    description:
      'A dedicated technical preservation studio breathing new life into aging web services, undocumented databases, and systems organizations depend on but hesitate to touch.',
  },
  {
    path: '/en/contact',
    lang: 'en',
    title: 'Consultation & Contact | Legacy Revival Studio',
    description:
      'Initiate a software recovery consultation. Whether you have partial source code, database dumps, or legacy backups, we can help restore original behavior.',
  },
];

// Add dynamic project routes
projects.forEach((proj) => {
  const meta = projectMeta[proj.key] || {
    ko: {
      title: `${proj.key} 복원 기록`,
      description: `${proj.key} 프로젝트 상세 내역.`,
    },
    en: {
      title: `${proj.key} Restoration`,
      description: `Restoration record for ${proj.key}.`,
    },
    thumbnail: '/images/template-thumb.png',
  };

  routes.push({
    path: `/projects/${proj.slug}`,
    lang: 'ko',
    title: `${meta.ko.title} | 레거시 리바이벌 스튜디오`,
    description: meta.ko.description,
    thumbnail: meta.thumbnail,
  });

  routes.push({
    path: `/en/projects/${proj.slug}`,
    lang: 'en',
    title: `${meta.en.title} | Legacy Revival Studio`,
    description: meta.en.description,
    thumbnail: meta.thumbnail,
  });
});

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
          name: 'Legacy Revival Studio',
          alternateName: '레거시 리바이벌 스튜디오',
          url: BASE_URL,
          logo: `${BASE_URL}/favicon.svg`,
          sameAs: ['https://github.com/legacy-revival-studio'],
        },
        {
          '@type': 'WebSite',
          '@id': `${BASE_URL}/#website`,
          url: BASE_URL,
          name: 'Legacy Revival Studio',
          description: '오래된 웹사이트를 복원하고 다시 살아 움직이게 합니다.',
          publisher: { '@id': `${BASE_URL}/#organization` },
          inLanguage: ['ko', 'en'],
        },
        {
          '@type': 'ProfessionalService',
          '@id': `${BASE_URL}/#service`,
          name: 'Legacy Revival Studio',
          image: `${BASE_URL}/images/aipro-thumb.png`,
          url: BASE_URL,
          address: { '@type': 'PostalAddress', addressCountry: 'KR' },
          priceRange: '$$$',
        },
      ],
    };
    jsonLd = `<script type="application/ld+json">${JSON.stringify(schemaObj)}</script>`;
  } else if (route.path.includes('/projects/')) {
    // Project Specific Schema
    const schemaObj = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: title.split(' | ')[0],
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      description: description,
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
    <meta property="og:site_name" content="Legacy Revival Studio" />

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
