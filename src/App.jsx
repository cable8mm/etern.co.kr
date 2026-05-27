import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Database,
  Download,
  FileSearch,
  Globe,
  Mail,
  Menu,
  Moon,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Sun,
  X,
} from 'lucide-react';
import { pageMeta } from './siteMeta';

const baseTitle = 'ETERNOps';
const contactEmail = 'contact@etern.co.kr';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Assessment', href: '/assessment' },
  { label: 'Contact', href: '/contact' },
];

const problemItems = [
  {
    title: '핵심 개발자가 사라졌습니다',
    body: '서비스는 계속 운영되고 있지만 시스템 구조를 이해하는 사람이 조직에 남아있지 않습니다.',
  },
  {
    title: '작은 수정도 두렵습니다',
    body: '코드를 수정하면 무엇이 깨질지 알 수 없고, 배포 절차도 명확하지 않습니다.',
  },
  {
    title: '오래된 기술이 비즈니스를 막기 시작했습니다',
    body: '구형 PHP 런타임, 지원 종료 라이브러리, 낡은 모바일 SDK가 외부 연동에도 영향을 줍니다.',
  },
  {
    title: '데이터 때문에 이전을 못 합니다',
    body: '회원 정보, 주문 이력, 포인트, 콘텐츠 데이터가 손상될까 걱정됩니다.',
  },
  {
    title: '장애 대응 체계가 없습니다',
    body: '장애가 발생하면 누가, 어떻게, 무엇부터 해야 하는지 알 수 없습니다.',
  },
];

const methodology = [
  ['Consultation', '현재 문제와 목표를 정의합니다.'],
  [
    'Assessment',
    '시스템 구조, 데이터 상태, 운영 리스크, 기술 부채를 분석합니다.',
  ],
  [
    'Planning',
    '실행 계획보다 복구 계획을 먼저 설계하고 롤백 전략을 수립합니다.',
  ],
  [
    'Execution',
    '검증된 계획에 따라 데이터 이전, 환경 현대화, 인프라 개선을 수행합니다.',
  ],
  [
    'Stabilization',
    '성능과 안정성을 검증하고 운영 문서와 복구 가이드를 인계합니다.',
  ],
];

const services = [
  {
    slug: 'commerce-migration',
    title: 'Commerce Migration',
    subtitle: '쇼핑몰 및 플랫폼 데이터 이전',
    icon: Database,
    body: 'Cafe24, 고도몰, 영카트, WooCommerce, 자체 구축 커머스의 회원, 주문, 포인트, 상품, 콘텐츠 데이터를 검증 가능한 절차로 이전합니다.',
    work: [
      '회원 데이터 매핑',
      '주문 데이터 이전',
      '포인트 및 쿠폰 데이터 매핑',
      '콘텐츠 및 파일 자산 이전',
      '데이터 무결성 검증',
    ],
    outcome: ['데이터 손실 최소화', '다운타임 최소화', '운영 연속성 확보'],
    keyword: '쇼핑몰 데이터 이전',
  },
  {
    slug: 'php-modernization',
    title: 'PHP Modernization',
    subtitle: '레거시 PHP 현대화',
    icon: FileSearch,
    body: 'PHP 5.x, PHP 7.x, CakePHP, CodeIgniter, 자체 구축 프레임워크를 현재 운영 환경에 맞게 개선합니다.',
    work: [
      'PHP 버전 업그레이드',
      'Deprecated 기능 제거',
      '단종 라이브러리 교체',
      'Docker 기반 개발 환경 구축',
      '운영 절차 문서화',
    ],
    outcome: [
      '보안 리스크 감소',
      '유지보수 비용 감소',
      '장기 운영 가능 상태 확보',
    ],
    keyword: 'PHP 현대화',
  },
  {
    slug: 'wordpress-modernization',
    title: 'WordPress Modernization',
    subtitle: '워드프레스 성능 및 운영 환경 개선',
    icon: ServerCog,
    body: '느리고 관리하기 어려운 WordPress 서비스를 안정적이고 예측 가능한 운영 환경으로 개선합니다.',
    work: [
      '성능 병목 분석',
      '캐싱 전략 수립',
      '플러그인 검토',
      'Staging 환경 구축',
      '코어와 테마, 플러그인 업그레이드',
    ],
    outcome: ['응답 속도 개선', '운영 안정성 향상', '유지보수 효율 증가'],
    keyword: '워드프레스 최적화',
  },
  {
    slug: 'mobile-modernization',
    title: 'Mobile Modernization',
    subtitle: '모바일 앱 환경 개선',
    icon: Smartphone,
    body: '운영 중인 Android, iOS, Flutter, Hybrid, WebView 앱이 최신 OS와 스토어 정책에 대응할 수 있도록 개선합니다.',
    work: [
      'Android SDK 업그레이드',
      'iOS SDK 업그레이드',
      '빌드 환경 개선',
      '스토어 정책 대응',
      '레거시 코드 정리',
    ],
    outcome: ['최신 OS 대응', '안정적인 배포 환경', '스토어 정책 대응'],
    keyword: '모바일 현대화',
  },
  {
    slug: 'infrastructure-modernization',
    title: 'Infrastructure Modernization',
    subtitle: '인프라 현대화 및 운영 자동화',
    icon: ShieldCheck,
    body: '수작업 중심의 운영 환경을 안정적이고 반복 가능한 구조로 전환합니다.',
    work: [
      'Docker 도입',
      'CI/CD 구축',
      'AWS 구조 개선',
      'Terraform 기반 IaC 전환',
      '모니터링과 백업 자동화',
    ],
    outcome: ['배포 리스크 감소', '운영 효율 향상', '장애 대응 능력 향상'],
    keyword: '인프라 현대화',
  },
  {
    slug: 'recovery-stabilization',
    title: 'Recovery & Stabilization',
    subtitle: '서비스 복구 및 안정화',
    icon: ClipboardCheck,
    body: '장애, 배포 실패, 데이터 손상, 운영 중단 상황에서 서비스를 정상 상태로 복구하고 재발 가능성을 낮춥니다.',
    work: [
      '로그 및 원인 분석',
      '서비스 복구',
      '데이터 복구',
      '재발 방지 대책 수립',
      'Runbook 및 Recovery Guide 작성',
    ],
    outcome: ['서비스 정상화', '장애 대응 절차 확보', '운영 안정성 향상'],
    keyword: '서비스 안정화',
  },
];

const caseStudies = [
  {
    title: '쇼핑몰 플랫폼 정밀 데이터 이전',
    context: '5년 이상 운영된 중견 커머스 서비스.',
    problem:
      '회원 계정, 주문 및 결제 이력, 포인트 자산, 상품 및 콘텐츠 데이터가 서로 다른 구조에 묶여 있었습니다.',
    analysis:
      '플랫폼 간 Gap Analysis를 수행하고 데이터를 정적 데이터, 실시간 변경 데이터, 인증 의존 데이터로 분류했습니다.',
    solution:
      '사전 마이그레이션, 전환 시점 동기화, 비밀번호 전환 미들웨어, 포인트 검증 프로세스를 적용했습니다.',
    outcome:
      '회원, 주문, 포인트 데이터 유실 없이 전환 당일 서비스 중단을 최소화했습니다.',
    lesson:
      '플랫폼 이전은 화면 이전이 아니라 데이터 무결성과 운영 연속성을 보장하는 프로젝트입니다.',
  },
  {
    title: '물리 서버 장애 및 긴급 서비스 복구',
    context: '장기간 운영되던 레거시 웹 서비스.',
    problem:
      '물리 서버 디스크 장애로 서비스가 중단되었고, 정상 백업과 소스코드 원본 일부가 유실되었습니다.',
    analysis:
      '남아 있는 데이터 조각과 외부 공개 자산을 기준으로 복구 가능성을 판단했습니다.',
    solution:
      '데이터베이스 일부 복구, 공개 아카이브 분석, 정적 리소스 복원, 신규 운영 환경 구축을 수행했습니다.',
    outcome:
      '핵심 기능과 주요 콘텐츠 자산을 복구하고 서비스 운영을 재개했습니다.',
    lesson:
      '복구 역량은 시스템 구조를 얼마나 깊게 이해하고 있는가에서 결정됩니다.',
  },
  {
    title: '레거시 프론트엔드 구조 점진적 현대화',
    context: '수년간 운영된 모바일 웹 기반 서비스.',
    problem:
      '구형 CSS Framework와 대량의 오버라이드 코드로 신규 기능 개발과 UI 수정 리스크가 커졌습니다.',
    analysis:
      '전체 재구축을 배제하고 핵심 사용자 흐름부터 전환하는 Incremental Migration 전략을 선택했습니다.',
    solution:
      '기존 CSS 구조 분석, 컴포넌트 분리, 현대적 스타일 시스템 도입, 레거시 코드 제거를 진행했습니다.',
    outcome: '프론트엔드 코드 복잡도 감소와 UI 유지보수성 향상을 확보했습니다.',
    lesson:
      '프론트엔드 현대화의 목적은 새로운 디자인이 아니라 유지보수 비용 감소입니다.',
  },
  {
    title: '글로벌 서비스 배포 체계 현대화',
    context: '수만 명 이상의 동시 접속자를 처리하는 글로벌 서비스.',
    problem:
      '수동 배포, 휴먼 에러, 롤백 불가, 장애 대응 지연이 운영 리스크로 누적되었습니다.',
    analysis:
      '운영 프로세스 전체를 코드 기반으로 전환하는 방향으로 구조를 재설계했습니다.',
    solution:
      'Terraform 기반 IaC, Jenkins 및 GitHub Actions 연계, 자동 검증과 무중단 롤링 배포를 구축했습니다.',
    outcome: '배포 시간과 휴먼 에러를 줄이고 롤백 체계를 확보했습니다.',
    lesson: '안정적인 서비스는 반복 가능한 표준 프로세스가 만듭니다.',
  },
  {
    title: 'WordPress 서비스 성능 최적화',
    context: '대규모 콘텐츠 아카이브를 운영하는 WordPress 기반 미디어 서비스.',
    problem:
      '페이지 로딩 지연, SEO 성과 하락, 서버 비용 증가, 업데이트 리스크가 동시에 발생했습니다.',
    analysis:
      '애플리케이션, 데이터베이스, 캐싱, 인프라 계층을 분리해 병목을 정량적으로 분석했습니다.',
    solution:
      'Docker 개발 환경, 스테이징, DB 튜닝, 캐싱 계층 재설계, 이미지 최적화, 플러그인 정리를 수행했습니다.',
    outcome: '응답 속도, 서버 자원 사용량, 운영 안정성을 개선했습니다.',
    lesson:
      'WordPress가 느린 것이 아니라 관리되지 않은 WordPress가 느린 것입니다.',
  },
];

const faqItems = [
  {
    question:
      '시스템 관련 문서나 인수인계 자료가 전혀 없는데도 작업이 가능한가요?',
    answer:
      '네, 가능합니다. 이터놉스는 소스코드, 인프라 구성, 데이터베이스 구조를 역추적하여 현재 시스템을 분석하는 Assessment 프로세스를 보유하고 있습니다. 문서가 없더라도 현재 상태를 파악할 수 있으며, 프로젝트 종료 시에는 향후 운영에 필요한 Runbook과 Recovery Guide를 작성하여 자산으로 인계합니다.',
  },
  {
    question:
      '핵심 개발자가 갑자기 퇴사해서 시스템을 아는 사람이 회사에 없는데 가능한가요?',
    answer:
      "가능합니다. 이터놉스는 특정 개인에게 종속된 시스템을 조직의 자산으로 전환하는 작업을 수행합니다. 권한 상태를 점검하고, 형상관리(Git)를 정상화하며, 운영 절차와 복구 절차를 문서화합니다. 목표는 '누군가 떠나도 운영 가능한 시스템'을 만드는 것입니다.",
  },
  {
    question: '공식 지원이 종료된 PHP 5.x 기반 서비스도 현대화가 가능한가요?',
    answer:
      '가능합니다. PHP 5.x, 7.x 기반 서비스 현대화는 대표적인 수행 영역 중 하나입니다. 다만 기존 서비스를 즉시 교체하지는 않습니다. 현재 상태를 분석한 뒤 격리된 환경에서 충분히 검증하고, 필요한 코드 수정과 버전 호환 작업을 수행한 후 단계적으로 전환합니다.',
  },
  {
    question: '쇼핑몰 데이터 이전은 보통 얼마나 걸리나요?',
    answer:
      '프로젝트 범위에 따라 다르지만 일반적으로 4~6주 정도가 소요됩니다. 회원 수, 주문 데이터 규모, 포인트 및 쿠폰 체계, 기존 플랫폼 구조, 목표 플랫폼 구조, 외부 시스템 연동 수가 기간에 영향을 줍니다. 정확한 일정은 Assessment 이후 산정됩니다.',
  },
  {
    question: '관리자 계정이나 서버 권한을 분실한 상태인데도 진행할 수 있나요?',
    answer:
      '초기 진단은 가능합니다. 다만 실제 데이터 이전이나 시스템 변경을 수행하려면 적절한 접근 권한이 필요합니다. 권한을 분실한 경우에는 현재 이용 중인 클라우드 또는 호스팅 사업자를 통해 권한 회수 절차를 진행해야 하며, 필요한 확인 항목을 안내해 드립니다.',
  },
  {
    question: '운영 중인 서비스인데 작업 중 장애가 발생하면 어떻게 하나요?',
    answer:
      '이터놉스는 변경 작업보다 복구 가능성을 먼저 확보합니다. 작업 전에는 반드시 백업과 롤백 전략을 준비하고, 운영 환경과 분리된 검증 환경에서 충분한 테스트를 수행합니다. 프로덕션 전환은 검증된 결과를 기반으로 진행하며, 예상치 못한 문제가 발생할 경우 즉시 이전 상태로 복구할 수 있는 절차를 마련합니다.',
  },
  {
    question: '새로 개발하는 것이 더 빠른 것 아닌가요?',
    answer:
      '항상 그렇지는 않습니다. 기존 시스템에는 이미 축적된 데이터, 운영 경험, 업무 프로세스가 존재합니다. 문제의 원인이 특정 영역에 국한되어 있다면 전체 재개발보다 부분 현대화와 구조 개선이 더 빠르고 비용 효율적일 수 있습니다. 이터놉스는 먼저 현재 자산의 가치를 평가한 후, 필요한 범위만 개선하는 접근을 선호합니다.',
  },
  {
    question: '프로젝트 비용은 어느 정도인가요?',
    answer:
      '프로젝트마다 범위가 다르기 때문에 정해진 단일 금액은 없습니다. WordPress 구조 개선, PHP 버전 업그레이드, 쇼핑몰 데이터 이전, 모바일 앱 현대화, 인프라 재구성은 각각 난이도와 범위가 다릅니다. 초기 상담과 Assessment 이후 범위(SOW)를 정의하고 견적을 제공합니다.',
  },
  {
    question: '소규모 기업이나 1인 기업도 의뢰할 수 있나요?',
    answer:
      '가능합니다. 기업 규모보다 중요한 것은 현재 시스템이 가진 비즈니스 가치와 해결해야 할 기술적 문제입니다. 이터놉스는 대규모 플랫폼뿐 아니라 운영 중인 중소 규모 서비스의 현대화와 안정화 프로젝트도 수행합니다.',
  },
  {
    question: '프로젝트 종료 후 유지보수도 가능한가요?',
    answer:
      '프로젝트 성격에 따라 가능합니다. 다만 이터놉스의 기본 목표는 특정 외부 업체에 지속적으로 의존하는 구조를 만드는 것이 아닙니다. 프로젝트 종료 시 운영 문서와 복구 가이드를 제공하여 내부에서도 시스템을 이해하고 운영할 수 있도록 하는 것을 우선합니다. 필요한 경우 별도 계약을 통해 제한적인 운영 지원 또는 기술 자문을 제공할 수 있습니다.',
  },
  {
    question: '첫 상담 전에 무엇을 준비하면 좋을까요?',
    answer:
      '완벽한 자료는 필요하지 않습니다. 서비스 URL, 현재 가장 큰 문제, 원하는 목표, 운영 중인 플랫폼 정보, 현재 접근 가능한 계정 또는 권한 상태 정도만 준비해 주시면 충분합니다. 기술적인 세부 사항은 상담과 Assessment 과정에서 함께 확인합니다.',
  },
];

function normalizePath(pathname) {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed || '/';
}

function stripLanguagePrefix(path) {
  if (path.startsWith('/en/')) return path.slice(3) || '/';
  if (path === '/en') return '/';
  return path;
}

function parseLanguageFromPath(path) {
  return path === '/en' || path.startsWith('/en/') ? 'en' : 'ko';
}

function usePathname() {
  const [path, setPath] = useState(() =>
    typeof window !== 'undefined'
      ? normalizePath(window.location.pathname)
      : '/',
  );

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const handleNavigation = () =>
      setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', handleNavigation);
    window.addEventListener('eternops:navigate', handleNavigation);
    return () => {
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('eternops:navigate', handleNavigation);
    };
  }, []);

  return path;
}

function parseHref(href) {
  const url = new URL(href, window.location.origin);
  return { path: normalizePath(url.pathname), hash: url.hash };
}

function navigateTo(href) {
  const { path, hash } = parseHref(href);
  const nextUrl = `${path === '/' ? '/' : path}${hash}`;
  const currentUrl = `${normalizePath(window.location.pathname)}${window.location.hash}`;

  if (nextUrl !== currentUrl) {
    window.history.pushState({}, '', nextUrl);
    window.dispatchEvent(new Event('eternops:navigate'));
  }

  if (hash) {
    document
      .getElementById(hash.slice(1))
      ?.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function Link({ href, className, children, onNavigate, ...props }) {
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        if (
          event.defaultPrevented ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0 ||
          href.startsWith('mailto:') ||
          href.startsWith('http') ||
          href.endsWith('.pdf')
        ) {
          return;
        }
        event.preventDefault();
        onNavigate?.();
        navigateTo(href);
      }}
      {...props}
    >
      {children}
    </a>
  );
}

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold leading-tight text-zinc-950 dark:text-zinc-50 md:text-5xl">
        {title}
      </h2>
      {children && (
        <p className="mt-6 text-base leading-8 text-zinc-600 dark:text-zinc-400 md:text-lg">
          {children}
        </p>
      )}
    </div>
  );
}

function ThemeButton({ theme, setTheme }) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      className="flex h-9 w-9 items-center justify-center border border-zinc-300 bg-white text-zinc-700 transition-colors hover:border-zinc-950 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
      onClick={() => setTheme(nextTheme)}
      aria-label="Toggle color theme"
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

function Header({ mobileMenuOpen, setMobileMenuOpen, theme, setTheme }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200 bg-[#f6f5f2]/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          onNavigate={() => setMobileMenuOpen(false)}
          aria-label="ETERNOps home"
        >
          <span className="flex h-9 w-9 items-center justify-center border border-zinc-950 bg-zinc-950 text-xs font-semibold text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950">
            EO
          </span>
          <span>
            <span className="block text-sm font-semibold text-zinc-950 dark:text-zinc-50">
              ETERNOps
            </span>
            <span className="hidden text-xs text-zinc-500 dark:text-zinc-400 sm:block">
              Migration · Modernization · Stabilization
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              {link.label}
            </Link>
          ))}
          <ThemeButton theme={theme} setTheme={setTheme} />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeButton theme={theme} setTheme={setTheme} />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border border-zinc-300 bg-white text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-zinc-200 bg-[#f6f5f2] px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onNavigate={() => setMobileMenuOpen(false)}
                className="py-3 text-base text-zinc-700 dark:text-zinc-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function PageShell({ children }) {
  return <main className="pt-24 md:pt-28">{children}</main>;
}

function CTAButton({ children, href = '/contact', variant = 'primary' }) {
  const classes =
    variant === 'primary'
      ? 'bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200'
      : 'border border-zinc-300 text-zinc-900 hover:border-zinc-950 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-100';
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold transition-colors ${classes}`}
    >
      {children}
      <ArrowRight size={16} />
    </Link>
  );
}

function Hero() {
  return (
    <section className="px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
      <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[1.1fr_0.9fr] md:items-end">
        <div>
          <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
            쇼핑몰 데이터 이전 · 레거시 PHP 현대화 · 워드프레스 구조 개선
          </p>
          <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[1.05] text-zinc-950 dark:text-zinc-50 md:text-7xl">
            가동 중인 비즈니스의 영속성을 위한 기술 진화
          </h1>
          <p className="mt-8 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
            ETERNOps
          </p>
          <p className="mt-2 font-mono text-sm uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            Migration · Modernization · Stabilization
          </p>
          <div className="mt-9 max-w-2xl space-y-4 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            <p>우리는 서비스를 새로 만들자고 쉽게 말하지 않습니다.</p>
            <p>
              이미 시장에서 검증되고 운영 중인 비즈니스의 자산과 역사를
              존중합니다.
            </p>
            <p>
              기술 부채와 운영 리스크를 진단하고, 더 안정적이고 유지 가능한
              상태로 진화시키는 것이 우리의 역할입니다.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <CTAButton>30분 무료 디스커버리 콜 신청</CTAButton>
            <CTAButton href="/assessment" variant="secondary">
              Assessment 보기
            </CTAButton>
          </div>
        </div>

        <aside className="border border-zinc-300 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            Trust Statement
          </p>
          <ul className="mt-8 space-y-5">
            {[
              '프로덕션 시스템 아키텍처 실무 경험 20년+',
              '웹 · 모바일 · 데이터베이스 · 인프라 전 영역 대응',
              '운영 중인 서비스의 Migration · Modernization 전문',
              '데이터 무결성과 비즈니스 연속성을 최우선으로 고려',
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-7 text-zinc-700 dark:text-zinc-300"
              >
                <CheckCircle2 className="mt-1 shrink-0" size={18} />
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="border-y border-zinc-200 bg-white px-5 py-24 dark:border-zinc-800 dark:bg-[#111410] md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Problem"
          title="성공적으로 운영 중인 서비스일수록 기술 부채는 더 큰 위험으로 돌아옵니다"
        />
        <div className="mt-14 grid gap-px border border-zinc-200 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 md:grid-cols-2 lg:grid-cols-5">
          {problemItems.map((item, index) => (
            <article key={item.title} className="bg-white p-6 dark:bg-zinc-950">
              <p className="font-mono text-xs text-zinc-500">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-7 text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WaitingSection() {
  return (
    <section className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="Why Waiting Is Expensive"
          title="기술 부채는 시간이 해결하지 않습니다"
        >
          문제를 방치할수록 비용은 더 커집니다.
        </SectionHeading>
        <ul className="grid gap-5 text-base leading-8 text-zinc-700 dark:text-zinc-300">
          {[
            '지원 종료(EOL) 기술은 보안 리스크를 누적시킵니다.',
            '시스템을 이해하는 사람은 시간이 갈수록 조직에서 사라집니다.',
            '데이터 구조를 아는 인력의 기억은 문서화되지 않으면 소실됩니다.',
            '장애는 가장 바쁜 시점에 발생합니다.',
            '오늘의 작은 개선 작업은 내일의 대규모 프로젝트가 됩니다.',
          ].map((item) => (
            <li
              key={item}
              className="border-t border-zinc-200 pt-5 dark:border-zinc-800"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function MethodologySection() {
  return (
    <section className="border-y border-zinc-200 bg-white px-5 py-24 dark:border-zinc-800 dark:bg-[#111410] md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Methodology" title="Migration Blueprint">
          이터놉스는 다음 5단계 표준 공정으로 프로젝트를 수행합니다.
        </SectionHeading>
        <ol className="mt-14 grid gap-px border border-zinc-200 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 md:grid-cols-5">
          {methodology.map(([title, body], index) => (
            <li key={title} className="bg-white p-6 dark:bg-zinc-950">
              <p className="font-mono text-xs text-zinc-500">
                Phase {index + 1}
              </p>
              <h3 className="mt-7 text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                {title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                {body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ServicesGrid({ includeAssessment = false }) {
  const rows = includeAssessment
    ? [
        {
          slug: 'assessment',
          title: 'Technical Assessment',
          subtitle: '현재 시스템의 구조적 위험 진단',
          icon: ClipboardCheck,
          body: '시스템 구조, 데이터 상태, 운영 리스크, 기술 부채를 객관적으로 진단합니다.',
          work: [
            'Technical Assessment Report',
            'System Health Score',
            'Risk Matrix',
            'Modernization Recommendation',
            'Migration Blueprint',
          ],
          outcome: ['현재 상태 파악', '위험 우선순위 정의', '실행 방향 수립'],
          keyword: '레거시 시스템 현대화',
        },
        ...services,
      ]
    : services;

  return (
    <div className="mt-14 grid gap-px border border-zinc-200 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 md:grid-cols-2 lg:grid-cols-3">
      {rows.map((service) => (
        <article
          key={service.slug}
          className="flex flex-col bg-white p-7 dark:bg-zinc-950"
        >
          <service.icon
            className="text-zinc-800 dark:text-zinc-200"
            size={24}
          />
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
            {service.keyword}
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
            {service.title}
          </h3>
          <p className="mt-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            {service.subtitle}
          </p>
          <p className="mt-5 flex-1 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            {service.body}
          </p>
          <Link
            href={
              service.slug === 'assessment'
                ? '/assessment'
                : `/services/${service.slug}`
            }
            className="mt-8 inline-flex items-center gap-2 border-t border-zinc-200 pt-5 text-sm font-semibold text-zinc-950 dark:border-zinc-800 dark:text-zinc-50"
          >
            자세히 보기 <ArrowRight size={16} />
          </Link>
        </article>
      ))}
    </div>
  );
}

function CoreServicesSection() {
  return (
    <section className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Core Services"
          title="가동 중인 비즈니스를 위한 전문 엔지니어링"
        >
          신규 구축보다 운영 중인 서비스의 안전한 이전, 현대화, 안정화에
          집중합니다.
        </SectionHeading>
        <ServicesGrid includeAssessment />
      </div>
    </section>
  );
}

function CaseStudiesPreview() {
  return (
    <section className="border-y border-zinc-200 bg-white px-5 py-24 dark:border-zinc-800 dark:bg-[#111410] md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Case Studies"
            title="운영 중인 시스템을 안전하게 다음 상태로 이동시킨 사례"
          />
          <CTAButton href="/case-studies" variant="secondary">
            사례 전체 보기
          </CTAButton>
        </div>
        <div className="mt-14 grid gap-px border border-zinc-200 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 md:grid-cols-3">
          {caseStudies.slice(0, 3).map((item) => (
            <article key={item.title} className="bg-white p-7 dark:bg-zinc-950">
              <h3 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                {item.title}
              </h3>
              <p className="mt-5 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                {item.outcome}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.85fr_1.15fr]">
        <SectionHeading
          eyebrow="Why ETERNOps"
          title="변화보다 운영 연속성을 먼저 봅니다"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {[
            [
              'Evidence-Based Engineering',
              '추측보다 증거를 우선합니다. 분석 결과와 데이터를 기반으로 판단합니다.',
            ],
            [
              'Full-Stack Perspective',
              '인프라부터 데이터베이스, 애플리케이션까지 전체 구조를 함께 봅니다.',
            ],
            [
              'Business Continuity Focus',
              '기술보다 비즈니스 연속성과 데이터 무결성을 우선합니다.',
            ],
            [
              'Direct Execution',
              '진단만 수행하지 않고 실제 구현과 안정화까지 책임지는 실행 중심 파트너입니다.',
            ],
          ].map(([title, body]) => (
            <article
              key={title}
              className="border-t border-zinc-200 pt-6 dark:border-zinc-800"
            >
              <h3 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                {title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                {body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-zinc-950 px-5 py-20 text-white md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Discovery Call
          </p>
          <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
            문제를 추측하지 않습니다. 현재 상태를 먼저 진단합니다.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300">
            30분 무료 디스커버리 콜에서 현재 상황, 접근 가능한 자산, 가장 큰
            운영 리스크를 함께 확인합니다.
          </p>
        </div>
        <a
          href={`mailto:${contactEmail}?subject=ETERNOps%20Discovery%20Call%20Inquiry`}
          className="inline-flex items-center justify-center gap-2 border border-zinc-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
        >
          무료 상담 신청하기 <Mail size={16} />
        </a>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <WaitingSection />
      <MethodologySection />
      <CoreServicesSection />
      <CaseStudiesPreview />
      <WhySection />
      <FinalCTA />
    </main>
  );
}

function ServicesPage() {
  return (
    <PageShell>
      <section className="px-5 pb-24 pt-12 md:px-8 md:pb-32 md:pt-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Services"
            title="운영 중인 서비스를 위한 Migration · Modernization · Stabilization"
          >
            ETERNOps는 새로운 서비스를 무작정 만드는 회사가 아닙니다. 이미 운영
            중인 서비스를 더 안정적이고 유지보수 가능한 상태로 만듭니다.
          </SectionHeading>
          <ServicesGrid includeAssessment />
        </div>
      </section>
    </PageShell>
  );
}

function ServiceDetailPage({ slug }) {
  const service = services.find((item) => item.slug === slug);
  if (!service) return <NotFoundPage />;

  return (
    <PageShell>
      <article className="px-5 pb-24 pt-12 md:px-8 md:pb-32 md:pt-20">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/services"
            className="text-sm font-semibold text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Services
          </Link>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            {service.keyword}
          </p>
          <h1 className="mt-5 text-4xl font-semibold text-zinc-950 dark:text-zinc-50 md:text-6xl">
            {service.title}
          </h1>
          <p className="mt-5 text-xl font-semibold text-zinc-800 dark:text-zinc-200">
            {service.subtitle}
          </p>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {service.body}
          </p>

          <div className="mt-14 grid gap-px border border-zinc-200 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 md:grid-cols-2">
            <section className="bg-white p-7 dark:bg-zinc-950">
              <h2 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
                주요 작업
              </h2>
              <ul className="mt-6 space-y-4">
                {service.work.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-7 text-zinc-700 dark:text-zinc-300"
                  >
                    <CheckCircle2 className="mt-1 shrink-0" size={17} />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section className="bg-white p-7 dark:bg-zinc-950">
              <h2 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
                기대 결과
              </h2>
              <ul className="mt-6 space-y-4">
                {service.outcome.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-7 text-zinc-700 dark:text-zinc-300"
                  >
                    <CheckCircle2 className="mt-1 shrink-0" size={17} />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </article>
      <FinalCTA />
    </PageShell>
  );
}

function CaseStudiesPage() {
  return (
    <PageShell>
      <section className="px-5 pb-24 pt-12 md:px-8 md:pb-32 md:pt-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Case Studies" title="Proven Track Records">
            일부 수치 및 기술적 세부사항은 고객사의 요청에 따라 비식별화 또는
            축약하여 공개합니다.
          </SectionHeading>
          <div className="mt-14 space-y-6">
            {caseStudies.map((item) => (
              <article
                key={item.title}
                className="border border-zinc-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <h2 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
                  {item.title}
                </h2>
                <dl className="mt-7 grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 md:grid-cols-3">
                  {[
                    ['Context', item.context],
                    ['Problem', item.problem],
                    ['Analysis', item.analysis],
                    ['Solution', item.solution],
                    ['Outcome', item.outcome],
                    ['Lessons Learned', item.lesson],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-white p-5 dark:bg-zinc-950">
                      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                        {label}
                      </dt>
                      <dd className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function AboutPage() {
  return (
    <PageShell>
      <section className="px-5 pb-24 pt-12 md:px-8 md:pb-32 md:pt-20">
        <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="About"
            title="운영 중인 서비스를 안전하게 다음 상태로 이동시키는 엔지니어링 파트너"
          />
          <div className="space-y-6 text-base leading-8 text-zinc-600 dark:text-zinc-400">
            <p>
              ETERNOps는 운영 중인 웹 서비스와 모바일 애플리케이션을 대상으로
              이전, 현대화, 안정화 프로젝트를 수행하는 독립 스튜디오입니다.
            </p>
            <p>
              우리는 신규 구축보다 운영 중인 서비스의 개선과 전환에 집중합니다.
              서비스를 중단하지 않고 데이터를 보호하며 운영 리스크를 줄이는 것이
              목표입니다.
            </p>
            <p>
              변경 전에 이해하고, 변경 계획보다 복구 계획을 먼저 설계하며,
              문서를 시스템의 일부로 다룹니다.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-20 grid max-w-7xl gap-px border border-zinc-200 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 md:grid-cols-3">
          {[
            [
              'Understand Before Change',
              '이해하지 못한 시스템은 수정하지 않습니다.',
            ],
            [
              'Data Integrity First',
              '회원, 주문, 포인트, 콘텐츠는 비즈니스 자산입니다.',
            ],
            [
              'Recovery Before Change',
              '모든 프로젝트는 롤백 전략과 복구 절차를 포함합니다.',
            ],
          ].map(([title, body]) => (
            <article key={title} className="bg-white p-7 dark:bg-zinc-950">
              <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                {title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                {body}
              </p>
            </article>
          ))}
        </div>
      </section>
      <MethodologySection />
    </PageShell>
  );
}

function FAQPage() {
  return (
    <PageShell>
      <section className="px-5 pb-24 pt-12 md:px-8 md:pb-32 md:pt-20">
        <div className="mx-auto max-w-4xl">
          <SectionHeading eyebrow="FAQ" title="자주 받는 질문" />
          <div className="mt-12 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
            {faqItems.map((item) => (
              <section key={item.question} className="py-7">
                <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                  {item.question}
                </h2>
                <p className="mt-4 text-base leading-8 text-zinc-600 dark:text-zinc-400">
                  {item.answer}
                </p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function AssessmentPage() {
  return (
    <PageShell>
      <section className="px-5 pb-24 pt-12 md:px-8 md:pb-32 md:pt-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Technical Assessment"
            title="현재 시스템 상태를 객관적으로 파악하고 가장 위험한 문제부터 정리합니다"
          >
            Technical Assessment는 불확실성을 제거하기 위한 첫 단계입니다. 진단
            없이 바로 변경하지 않습니다.
          </SectionHeading>
          <div className="mt-14 grid gap-px border border-zinc-200 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 md:grid-cols-3">
            {[
              [
                'Assessment Overview',
                '웹, 모바일, 인프라, 배포, 기술 부채, 운영 리스크를 함께 분석합니다.',
              ],
              [
                'System Health Score',
                '자산 및 접근 관리, 코드베이스, 인프라, 데이터 복구, 운영 가시성, 보안을 점수화합니다.',
              ],
              [
                'Assessment Process',
                '구조 분석, 리스크 식별, 우선순위 정리, 권장 실행 계획을 문서화합니다.',
              ],
            ].map(([title, body]) => (
              <article key={title} className="bg-white p-7 dark:bg-zinc-950">
                <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                  {title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                  {body}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-12 border border-zinc-300 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
              Sample Report
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400">
              샘플 보고서를 통해 Technical Health Score, Risk Dashboard, Key
              Findings, Recommended Next Actions의 실제 구성을 확인할 수
              있습니다.
            </p>
            <a
              href="/assessment-sample.pdf"
              className="mt-7 inline-flex items-center gap-2 bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950"
            >
              Assessment Sample PDF 다운로드 <Download size={16} />
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function ContactPage() {
  return (
    <PageShell>
      <section className="px-5 pb-24 pt-12 md:px-8 md:pb-32 md:pt-20">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Contact"
            title="30분 무료 디스커버리 콜 신청"
          >
            GitHub Pages 배포 환경에 맞춰 서버 기반 문의 폼은 사용하지 않습니다.
            아래 항목을 포함해 이메일로 보내주세요.
          </SectionHeading>
          <div className="mt-12 border border-zinc-300 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Email
            </p>
            <a
              href={`mailto:${contactEmail}?subject=ETERNOps%20Discovery%20Call%20Inquiry`}
              className="mt-4 inline-flex items-center gap-2 text-2xl font-semibold text-zinc-950 dark:text-zinc-50"
            >
              {contactEmail} <Mail size={20} />
            </a>
            <ul className="mt-8 grid gap-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:grid-cols-2">
              {[
                '서비스명과 URL',
                '현재 기술 환경',
                '가장 큰 운영 리스크',
                '희망 일정',
                '접근 가능한 자산',
                '최근 장애 또는 이전 요구사항',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-1 shrink-0" size={17} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function NotFoundPage() {
  return (
    <PageShell>
      <section className="px-5 pb-24 pt-12 md:px-8 md:pb-32 md:pt-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold text-zinc-950 dark:text-zinc-50">
            Page not found
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            요청하신 페이지를 찾을 수 없습니다.
          </p>
          <CTAButton href="/">Home</CTAButton>
        </div>
      </section>
    </PageShell>
  );
}

function resolvePage(path) {
  if (path === '/') return <HomePage />;
  if (path === '/services') return <ServicesPage />;
  if (path.startsWith('/services/')) {
    return <ServiceDetailPage slug={path.replace('/services/', '')} />;
  }
  if (path === '/case-studies') return <CaseStudiesPage />;
  if (path === '/about') return <AboutPage />;
  if (path === '/faq') return <FAQPage />;
  if (path === '/assessment') return <AssessmentPage />;
  if (path === '/contact') return <ContactPage />;
  return <NotFoundPage />;
}

export default function App({ ssrPath } = {}) {
  const browserPath = usePathname();
  const rawPath = ssrPath || browserPath;
  const path = stripLanguagePrefix(rawPath);
  const lang = parseLanguageFromPath(rawPath);
  const page = useMemo(() => resolvePage(path), [path]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const root = document.documentElement;
    const isDark = theme === 'dark';
    root.classList.toggle('dark', isDark);
    root.classList.toggle('dark-mode', isDark);
    localStorage.setItem('theme', theme);
    document
      .getElementById('theme-color-meta')
      ?.setAttribute('content', isDark ? '#0e110d' : '#f6f5f2');
    return undefined;
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.documentElement.lang = lang;
    const meta = pageMeta[path] || {
      title: `Page | ${baseTitle}`,
      description: 'ETERNOps website page.',
    };
    document.title = meta.title;
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', meta.description);
  }, [path, lang]);

  return (
    <div className="min-h-screen bg-[#f6f5f2] text-zinc-900 selection:bg-zinc-900 selection:text-white dark:bg-[#0e110d] dark:text-zinc-50 dark:selection:bg-zinc-50 dark:selection:text-zinc-950">
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        theme={theme}
        setTheme={setTheme}
      />
      {page}
      <footer className="border-t border-zinc-200 bg-zinc-950 px-5 py-8 text-sm text-zinc-400 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>© ETERNOps. Migration · Modernization · Stabilization.</p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex items-center gap-1.5 hover:text-white"
            >
              <Mail size={14} />
              {contactEmail}
            </a>
            <span className="inline-flex items-center gap-1.5">
              <Globe size={14} />
              etern.co.kr
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
