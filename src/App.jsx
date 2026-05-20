import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  CheckCircle2,
  Database,
  FileClock,
  GitBranch,
  Mail,
  ServerCog,
  ShieldCheck,
  X,
  Globe,
  FileSearch,
  ClipboardCheck,
  ArchiveRestore,
  Menu,
  Sun,
  Moon,
  Monitor,
} from 'lucide-react';
import { projects } from './data/projects';

const navLinks = [
  { key: 'projects', href: '/projects' },
  { key: 'philosophy', href: '/#philosophy' },
  { key: 'workflow', href: '/#workflow' },
  { key: 'services', href: '/#services' },
  { key: 'about', href: '/#about' },
  { key: 'contact', href: '/#contact' },
];

const principles = [
  {
    key: 'disappears',
    icon: FileClock,
  },
  {
    key: 'data',
    icon: Database,
  },
  {
    key: 'behavior',
    icon: ShieldCheck,
  },
];

const workflow = [
  { key: 'recover', hash: 'a1b2c3d' },
  { key: 'analyze', hash: '4f5g6h7' },
  { key: 'restore', hash: '8i9j0k1' },
  { key: 'archive', hash: 'l2m3n4o' },
  { key: 'relaunch', hash: 'p5q6r7s' },
];

const services = [
  { key: 'review', icon: FileSearch },
  { key: 'assessment', icon: ClipboardCheck },
  { key: 'modernization', icon: ServerCog },
  { key: 'full_revival', icon: ArchiveRestore },
];

const preservationRules = ['0', '1', '2', '3'];

const tools = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

function normalizePath(pathname) {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed || '/';
}

function parseLanguageFromPath(path) {
  if (path.startsWith('/en/') || path === '/en') {
    return 'en';
  }
  return 'ko';
}

function stripLanguagePrefix(path) {
  if (path.startsWith('/en/')) {
    return path.slice(3) || '/';
  }
  if (path === '/en') {
    return '/';
  }
  return path;
}

function parseHref(href) {
  const url = new URL(href, window.location.origin);
  return {
    path: normalizePath(url.pathname),
    hash: url.hash,
  };
}

function scrollToSection(id) {
  window.requestAnimationFrame(() => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

function usePathname() {
  const [path, setPath] = useState(() =>
    typeof window !== 'undefined'
      ? normalizePath(window.location.pathname)
      : '/',
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleNavigation = () => {
      setPath(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', handleNavigation);
    window.addEventListener('legacyrevival:navigate', handleNavigation);

    return () => {
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('legacyrevival:navigate', handleNavigation);
    };
  }, []);

  return path;
}

function navigateTo(href) {
  const { path, hash } = parseHref(href);
  const nextUrl = `${path === '/' ? '/' : path}${hash}`;
  const currentPath = normalizePath(window.location.pathname);
  const currentUrl = `${currentPath === '/' ? '/' : currentPath}${window.location.hash}`;

  if (nextUrl !== currentUrl) {
    window.history.pushState({}, '', nextUrl);
    window.dispatchEvent(new Event('legacyrevival:navigate'));
  }

  if (hash) {
    scrollToSection(hash.slice(1));
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function Link({ href, className, children, onNavigate, ...props }) {
  const { i18n } = useTranslation();
  const isEn = (i18n.language || 'ko').startsWith('en');

  let actualHref = href;
  if (isEn && href.startsWith('/')) {
    actualHref = `/en${href === '/' ? '' : href}`;
  }

  return (
    <a
      href={actualHref}
      className={className}
      onClick={(event) => {
        if (
          event.defaultPrevented ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        ) {
          return;
        }

        event.preventDefault();
        onNavigate?.();
        navigateTo(actualHref);
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
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50 md:text-5xl">
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

function PageShell({ children }) {
  return <main className="pt-24 md:pt-28">{children}</main>;
}

function ThemeSelector({ theme, setTheme }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = () => setIsOpen(false);
    if (typeof window !== 'undefined') {
      window.addEventListener('click', handleOutsideClick);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('click', handleOutsideClick);
      }
    };
  }, [isOpen]);

  const activeIcon = useMemo(() => {
    if (theme === 'light') return <Sun size={14} />;
    if (theme === 'dark') return <Moon size={14} />;
    return <Monitor size={14} />;
  }, [theme]);

  const handleSelect = (mode, e) => {
    e.stopPropagation();
    setTheme(mode);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex h-8 w-8 items-center justify-center border border-zinc-300 bg-transparent text-zinc-500 hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-200 dark:hover:text-zinc-200 transition-colors"
        aria-label="Select theme"
        aria-expanded={isOpen}
      >
        {activeIcon}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 border border-zinc-300 bg-[#f5f7f4]/95 backdrop-blur shadow-lg dark:border-zinc-800 dark:bg-zinc-900/95 z-50 transition-all">
          <div className="py-1">
            <button
              onClick={(e) => handleSelect('light', e)}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors ${
                theme === 'light'
                  ? 'text-zinc-950 dark:text-zinc-50 bg-zinc-200/50 dark:bg-zinc-800/50'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              <Sun size={12} />
              <span>{t('theme.light')}</span>
            </button>
            <button
              onClick={(e) => handleSelect('dark', e)}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors ${
                theme === 'dark'
                  ? 'text-zinc-950 dark:text-zinc-50 bg-zinc-200/50 dark:bg-zinc-800/50'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              <Moon size={12} />
              <span>{t('theme.dark')}</span>
            </button>
            <button
              onClick={(e) => handleSelect('system', e)}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors ${
                theme === 'system'
                  ? 'text-zinc-950 dark:text-zinc-50 bg-zinc-200/50 dark:bg-zinc-800/50'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              <Monitor size={12} />
              <span>{t('theme.system')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Header({
  isScrolled,
  mobileMenuOpen,
  setMobileMenuOpen,
  theme,
  setTheme,
}) {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || 'ko').startsWith('en') ? 'en' : 'ko';

  const toggleLanguage = () => {
    const isEn = (i18n.language || 'ko').startsWith('en');
    const nextLang = isEn ? 'ko' : 'en';

    const pathWithoutLang = stripLanguagePrefix(window.location.pathname);
    let newPath;
    if (nextLang === 'en') {
      newPath = `/en${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
    } else {
      newPath = pathWithoutLang;
    }

    const newUrl = `${newPath === '' ? '/' : newPath}${window.location.hash}`;
    navigateTo(newUrl);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        isScrolled
          ? 'border-zinc-200 bg-[#f5f7f4]/92 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/92'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <Link
          href="/"
          onNavigate={() => setMobileMenuOpen(false)}
          className="flex items-center gap-3 text-left"
          aria-label={
            lang === 'ko'
              ? '레거시 리바이벌 스튜디오 홈'
              : 'Legacy Revival Studio home'
          }
        >
          <span className="flex h-9 w-9 items-center justify-center border border-zinc-300 bg-zinc-950 text-sm font-semibold text-zinc-50 dark:border-zinc-700 dark:bg-zinc-50 dark:text-zinc-950">
            LR
          </span>
          <span>
            <span className="block text-sm font-semibold tracking-normal text-zinc-950 dark:text-zinc-50 break-keep">
              {t('nav.logo_title', { defaultValue: 'Legacy Revival Studio' })}
            </span>
            <span className="hidden md:block text-xs text-zinc-500 dark:text-zinc-400">
              {t('nav.logo_subtitle', { defaultValue: 'Software restoration' })}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              {t(`nav.${link.key}`)}
            </Link>
          ))}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            <Globe size={14} />
            {(i18n.language || 'ko').startsWith('ko') ? 'EN' : 'KO'}
          </button>
          <ThemeSelector theme={theme} setTheme={setTheme} />
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
          >
            <Globe size={14} />
            {(i18n.language || 'ko').startsWith('ko') ? 'EN' : 'KO'}
          </button>
          <ThemeSelector theme={theme} setTheme={setTheme} />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border border-zinc-300 bg-[#f5f7f4] text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-zinc-200 bg-[#f5f7f4] px-5 py-4 md:hidden dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mx-auto flex max-w-6xl flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onNavigate={() => setMobileMenuOpen(false)}
                className="py-3 text-left text-base text-zinc-700 dark:text-zinc-300"
              >
                {t(`nav.${link.key}`)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function CorePrinciplePanel() {
  const { t } = useTranslation();
  return (
    <aside
      className="border border-zinc-300 dark:border-zinc-700 bg-[#e9efe8] dark:bg-[#1a1e19] p-6 md:p-8"
      aria-label={t('core_principle.title')}
    >
      <div className="mb-8 flex items-center gap-3 border-b border-zinc-300 dark:border-zinc-700 pb-5">
        <GitBranch size={22} className="text-zinc-700 dark:text-zinc-300" />
        <div>
          <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            {t('core_principle.title')}
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            {t('core_principle.version')}
          </p>
        </div>
      </div>
      <blockquote className="text-3xl font-semibold leading-tight text-zinc-950 dark:text-zinc-50 md:text-4xl">
        {t('core_principle.quote')}
      </blockquote>
      <dl className="mt-9 grid gap-5 text-sm">
        <div className="border-t border-zinc-300 dark:border-zinc-700 pt-5">
          <dt className="font-semibold text-zinc-950 dark:text-zinc-50">
            {t('core_principle.preserve_title')}
          </dt>
          <dd className="mt-2 leading-6 text-zinc-600 dark:text-zinc-400">
            {t('core_principle.preserve_desc')}
          </dd>
        </div>
        <div className="border-t border-zinc-300 dark:border-zinc-700 pt-5">
          <dt className="font-semibold text-zinc-950 dark:text-zinc-50">
            {t('core_principle.runnable_title')}
          </dt>
          <dd className="mt-2 leading-6 text-zinc-600 dark:text-zinc-400">
            {t('core_principle.runnable_desc')}
          </dd>
        </div>
      </dl>
    </aside>
  );
}

function PhilosophySummary() {
  const { t } = useTranslation();
  return (
    <section
      id="philosophy"
      className="scroll-mt-24 border-y border-zinc-200 bg-white dark:bg-[#0e110d] dark:border-zinc-800 px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={t('philosophy.eyebrow')}
          title={t('philosophy.title')}
        >
          {t('philosophy.description')}
        </SectionHeading>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {principles.map((item) => (
            <article
              key={item.key}
              className="border border-zinc-200 bg-[#f5f7f4] dark:bg-[#1a1e19] dark:border-zinc-800 p-6"
            >
              <item.icon
                className="mb-8 text-zinc-700 dark:text-zinc-300"
                size={24}
              />
              <h3 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                {t(`philosophy.items.${item.key}.title`)}
              </h3>
              <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                {t(`philosophy.items.${item.key}.body`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  const { t } = useTranslation();
  return (
    <section
      id="workflow"
      className="scroll-mt-24 bg-white dark:bg-[#0e110d] px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
        <div>
          <SectionHeading
            eyebrow={t('workflow.eyebrow')}
            title={t('workflow.title')}
          >
            {t('workflow.description')}
          </SectionHeading>

          <div className="mt-10 border-l-2 border-zinc-200 pl-6 text-sm text-zinc-600 dark:text-zinc-400 font-mono space-y-4">
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></span>
              {t('workflow.git_phil_1')}
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></span>
              {t('workflow.git_phil_2')}
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></span>
              {t('workflow.git_phil_3')}
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-4 bottom-4 w-px bg-zinc-200 dark:bg-zinc-800 hidden md:block"></div>
          <ol className="space-y-12 md:space-y-10">
            {workflow.map((step, index) => (
              <li key={step.key} className="relative pl-0 md:pl-12">
                <div className="hidden md:flex absolute left-[11px] top-1.5 w-2.5 h-2.5 bg-zinc-950 dark:bg-zinc-500 rounded-full ring-4 ring-white"></div>
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="font-mono text-xs text-zinc-400">
                    commit {step.hash}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                    Step {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50 mb-2">
                  {t(`workflow.steps.${step.key}.title`)}
                </h3>
                <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                  {t(`workflow.steps.${step.key}.body`)}
                </p>
                {step.key === 'analyze' && (
                  <div className="mt-4 inline-flex items-center gap-2 border border-zinc-200 bg-[#f5f7f4] dark:bg-[#1a1e19] dark:border-zinc-800 px-2.5 py-1.5 text-xs font-mono text-zinc-600 dark:text-zinc-400 text-xs font-mono text-zinc-600">
                    <span className="w-1.5 h-1.5 bg-[#a8e09f] rounded-full animate-pulse"></span>
                    AI-assisted process
                  </div>
                )}
                {step.key === 'archive' && (
                  <div className="mt-4 inline-flex items-center gap-2 border border-zinc-200 bg-[#f5f7f4] dark:bg-[#1a1e19] dark:border-zinc-800 px-2.5 py-1.5 text-xs font-mono text-zinc-600 dark:text-zinc-400 text-xs font-mono text-zinc-600">
                    <GitBranch
                      size={12}
                      className="text-zinc-500 dark:text-zinc-400"
                    />
                    Git-preserved history
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const { t } = useTranslation();
  return (
    <section
      id="services"
      className="scroll-mt-24 border-y border-zinc-200 bg-white dark:bg-[#0e110d] dark:border-zinc-800 px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={t('services.eyebrow')}
          title={t('services.title')}
        >
          {t('services.description')}
        </SectionHeading>

        <div className="mt-14 grid gap-px overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-800 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.key}
              className="bg-white dark:bg-[#131712] p-7 flex flex-col h-full"
            >
              <div className="flex-1">
                <service.icon
                  className="mb-8 text-zinc-700 dark:text-zinc-300"
                  size={24}
                />
                <h3 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
                  {t(`services.items.${service.key}.title`)}
                </h3>
                <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                  {t(`services.items.${service.key}.body`)}
                </p>
              </div>
              <div className="mt-10 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                <span className="text-xs font-medium uppercase tracking-[0.1em] text-zinc-500 dark:text-zinc-400">
                  {t(`services.items.${service.key}.pricing`)}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechnicalGroundSection() {
  const { t } = useTranslation();
  return (
    <section id="about" className="scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[1fr_1fr] md:gap-20">
        <div>
          <SectionHeading
            eyebrow={t('technical.preservation_rules_eyebrow')}
            title={t('technical.preservation_rules_title')}
          />
          <ul className="mt-10 space-y-5">
            {preservationRules.map((rule) => (
              <li
                key={rule}
                className="flex gap-3 text-zinc-700 dark:text-zinc-300"
              >
                <CheckCircle2
                  className="mt-1 shrink-0 text-zinc-800 dark:text-zinc-300"
                  size={18}
                />
                <span className="leading-7">
                  {t(`technical.rules.${rule}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SectionHeading
            eyebrow={t('technical.ground_eyebrow')}
            title={t('technical.ground_title')}
          />
          <div className="mt-10 flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span
                key={tool}
                className="border border-zinc-300 bg-white dark:bg-[#1a1e19] dark:border-zinc-700 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300"
              >
                {t(`technical.tools.${tool}`)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactBand() {
  const { t } = useTranslation();
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-zinc-300 dark:border-zinc-800 bg-zinc-950 px-5 py-20 text-zinc-50 md:px-8 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
            {t('contact.eyebrow')}
          </p>
          <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-normal md:text-6xl">
            {t('contact.title')}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
            {t('contact.description')}
          </p>
        </div>
        <a
          href="mailto:cable8mm@gmail.com"
          className="inline-flex items-center justify-center gap-2 border border-zinc-500 px-5 py-3 text-sm font-semibold text-zinc-50 transition-colors hover:border-zinc-50"
        >
          cable8mm@gmail.com <Mail size={16} />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-zinc-950 px-5 py-8 text-zinc-500 dark:text-zinc-400 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-zinc-800 pt-8 text-sm md:flex-row md:items-center md:justify-between">
        <p>{t('footer.copyright')}</p>
        <p>{t('footer.slogan')}</p>
      </div>
    </footer>
  );
}

function HomePage() {
  const { t } = useTranslation();
  return (
    <main>
      <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-5 pb-20 pt-28 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:pt-36">
        <div>
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
            {t('home.subtitle')}
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-normal text-zinc-950 dark:text-zinc-50 md:text-7xl">
            {t('home.title')}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400 md:text-xl">
            {t('home.description')}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 bg-zinc-950 px-5 py-3 text-sm font-semibold text-zinc-50 transition-colors hover:bg-zinc-800"
            >
              {t('home.browse_archive')} <ArrowRight size={16} />
            </Link>
            <Link
              href="/#workflow"
              className="inline-flex items-center justify-center gap-2 border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-800 dark:text-zinc-300 transition-colors hover:border-zinc-950 hover:text-zinc-950 dark:text-zinc-50"
            >
              {t('home.see_workflow')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <CorePrinciplePanel />
      </section>

      <StudioMetrics />
      <BeforeAfterShowcase />
      <ProjectPreview />
      <PhilosophySummary />
      <WorkflowSection />
      <ServicesSection />
      <TechnicalGroundSection />
      <ContactBand />
    </main>
  );
}

function StudioMetrics() {
  const { t } = useTranslation();
  return (
    <section className="border-y border-zinc-200 bg-[#e9efe8] dark:bg-[#1a1e19] dark:border-zinc-800 px-5 py-8 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between font-mono text-sm uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-zinc-950 dark:bg-zinc-500 rounded-full"></span>
          {t('studio_metrics.metric_1')}
        </div>
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-zinc-950 dark:bg-zinc-500 rounded-full"></span>
          {t('studio_metrics.metric_2')}
        </div>
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-zinc-950 dark:bg-zinc-500 rounded-full"></span>
          {t('studio_metrics.metric_3')}
        </div>
      </div>
    </section>
  );
}

function BeforeAfterShowcase() {
  const { t } = useTranslation();
  return (
    <section className="bg-zinc-950 px-5 py-24 text-zinc-50 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <h2 className="text-3xl font-semibold md:text-4xl">
            {t('before_after.title')}
          </h2>
        </div>
        <div className="grid gap-px bg-zinc-800 border border-zinc-800 md:grid-cols-2 font-mono text-sm">
          <div className="bg-zinc-900 p-6 md:p-10">
            <div className="text-zinc-500 dark:text-zinc-400 mb-6 uppercase tracking-widest text-xs flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              {t('before_after.legacy_state')}
            </div>
            <pre className="text-zinc-400 overflow-x-auto text-xs leading-relaxed whitespace-pre-wrap">
              {`[LEGACY FAILURE]
Deprecated runtime detected
Database connection unavailable
Application boot aborted`}
            </pre>
          </div>
          <div className="bg-zinc-900 p-6 md:p-10">
            <div className="text-[#a8e09f] mb-6 uppercase tracking-widest text-xs flex items-center gap-2">
              <span className="w-2 h-2 bg-[#a8e09f] rounded-full animate-pulse"></span>
              {t('before_after.revived_state')}
            </div>
            <pre className="text-zinc-300 overflow-x-auto text-xs leading-relaxed whitespace-pre-wrap">
              {`[OK] Connection established via PDO (SQLite proxy)
[OK] Legacy routing patched
[OK] Environment containerized
[OK] Ready on port 8080

> Service is running perfectly in isolation.`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectPreview() {
  const { t } = useTranslation();
  const featuredProjects = projects.slice(0, 2);

  return (
    <section className="border-y border-zinc-200 bg-white dark:bg-[#0e110d] dark:border-zinc-800 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={t('project_preview.eyebrow')}
            title={t('project_preview.title')}
          >
            {t('project_preview.description')}
          </SectionHeading>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50"
          >
            {t('project_preview.view_all')} <ArrowRight size={16} />
          </Link>
        </div>

        <ProjectGrid projects={featuredProjects} emptyLimit={2} />
      </div>
    </section>
  );
}

function ProjectGrid({ projects: projectList, emptyLimit }) {
  const { t } = useTranslation();

  if (projectList.length === 0) {
    return (
      <div className="mt-14 border border-dashed border-zinc-300 dark:border-zinc-700 bg-[#f5f7f4] dark:bg-[#1a1e19] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          {t('project_grid.pending')}
        </p>
        <h3 className="mt-4 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
          {t('project_grid.no_public')}
        </h3>
        <p className="mt-4 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">
          {t('project_grid.ready')}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`mt-14 grid gap-px overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-800 ${
        projectList.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1'
      }`}
    >
      {projectList.slice(0, emptyLimit).map((project) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          className="group bg-white dark:bg-[#131712] p-7 transition-colors hover:bg-[#f5f7f4] dark:hover:bg-[#1a1e19] flex flex-col h-full"
        >
          {project.thumbnail && (
            <div className="mb-6">
              <div className="overflow-hidden border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-[#131712] aspect-[16/10]">
                <img
                  src={project.thumbnail}
                  alt={t(`project_data.${project.key}.title`)}
                  className="h-full w-full object-cover grayscale-0 md:grayscale opacity-100 md:opacity-80 filter transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>
              <p className="mt-2 font-mono text-[10px] tracking-tight text-zinc-500 dark:text-zinc-400 uppercase">
                {t(`project_data.${project.key}.figCaption`)}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              {project.stack}
            </p>
            <span className="text-xs font-mono border border-zinc-200 dark:border-zinc-700 bg-[#f5f7f4] dark:bg-[#1a1e19] text-zinc-600 dark:text-zinc-400 px-2 py-1">
              {t(`project_data.${project.key}.status`)}
            </span>
          </div>

          <h3 className="mt-6 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
            {t(`project_data.${project.key}.title`)}
          </h3>

          <div className="mt-4 flex items-center gap-3 font-mono text-sm text-zinc-500 dark:text-zinc-400">
            <span>{project.originalYear}</span>
            <ArrowRight size={14} className="text-zinc-300" />
            <span className="text-zinc-950 dark:text-zinc-50 font-semibold">
              {project.revivalYear}
            </span>
          </div>

          <p className="mt-6 flex-1 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            {t(`project_data.${project.key}.summary`)}
          </p>
          <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50 pt-6 border-t border-zinc-100 dark:border-zinc-800">
            {t('project_grid.read_record')}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

function ProjectsPage() {
  const { t } = useTranslation();
  return (
    <PageShell>
      <section className="px-5 pb-24 pt-12 md:px-8 md:pb-32 md:pt-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow={t('projects_page.eyebrow')}
            title={t('projects_page.title')}
          >
            {t('projects_page.description')}
          </SectionHeading>

          <ProjectGrid projects={projects} />
        </div>
      </section>
    </PageShell>
  );
}

function ProjectDetailPage({ slug }) {
  const { t } = useTranslation();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <NotFoundPage />;
  }

  // Retrieve localized project facts and notes
  const facts =
    t(`project_data.${project.key}.facts`, { returnObjects: true }) || [];
  const notes =
    t(`project_data.${project.key}.notes`, { returnObjects: true }) || [];

  return (
    <PageShell>
      <article className="px-5 pb-24 pt-12 md:px-8 md:pb-32 md:pt-20">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/projects"
            className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:text-zinc-50"
          >
            {t('project_detail.back')}
          </Link>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
            {t(`project_data.${project.key}.status`)}
          </p>
          <h1 className="text-4xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50 md:text-6xl">
            {t(`project_data.${project.key}.title`)}
          </h1>
          <p className="mt-8 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {t(`project_data.${project.key}.summary`)}
          </p>

          {project.thumbnail && (
            <figure className="mt-12 border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-[#131712] p-3 md:p-4">
              <div className="overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#131712] aspect-[16/10] md:aspect-[16/9]">
                <img
                  src={project.thumbnail}
                  alt={t(`project_data.${project.key}.title`)}
                  className="h-full w-full object-cover grayscale-0 md:grayscale opacity-100 md:opacity-90 transition-all duration-700 hover:grayscale-0 hover:opacity-100"
                  loading="eager"
                />
              </div>
              <figcaption className="mt-3 font-mono text-[10px] tracking-tight text-zinc-500 dark:text-zinc-400 uppercase text-center">
                {t(`project_data.${project.key}.figCaption`)}
              </figcaption>
            </figure>
          )}

          <div className="mt-12 grid gap-px overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-800 md:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-white dark:bg-[#131712] p-6">
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                  {fact.label}
                </dt>
                <dd className="mt-3 text-zinc-950 dark:text-zinc-50">
                  {fact.value}
                </dd>
              </div>
            ))}
          </div>

          <section className="mt-14 border-t border-zinc-300 dark:border-zinc-700 pt-10">
            <h2 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
              {t('project_detail.recovery_notes')}
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-zinc-600 dark:text-zinc-400">
              {notes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          </section>
        </div>
      </article>
    </PageShell>
  );
}

function ServicesPage() {
  return (
    <PageShell>
      <ServicesSection />
    </PageShell>
  );
}

function PhilosophyPage() {
  const { t } = useTranslation();
  return (
    <PageShell>
      <section className="px-5 pb-16 pt-12 md:px-8 md:pb-24 md:pt-20">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[1fr_0.9fr] md:gap-20">
          <SectionHeading
            eyebrow={t('philosophy_page.eyebrow')}
            title={t('philosophy_page.title')}
          >
            {t('philosophy_page.description')}
          </SectionHeading>
          <CorePrinciplePanel />
        </div>
      </section>
      <PhilosophySummary />
      <TechnicalGroundSection />
      <WorkflowSection />
    </PageShell>
  );
}

function AboutPage() {
  const { t } = useTranslation();
  return (
    <PageShell>
      <section className="px-5 pb-24 pt-12 md:px-8 md:pb-32 md:pt-20">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <SectionHeading
            eyebrow={t('about_page.eyebrow')}
            title={t('about_page.title')}
          >
            {t('about_page.description')}
          </SectionHeading>
          <div className="space-y-6 text-base leading-8 text-zinc-600 dark:text-zinc-400">
            <p>{t('about_page.p1')}</p>
            <p>{t('about_page.p2')}</p>
            <p>{t('about_page.p3')}</p>
          </div>
        </div>
      </section>
      <ServicesSection />
    </PageShell>
  );
}

function ContactPage() {
  const { t } = useTranslation();
  return (
    <PageShell>
      <section className="px-5 pb-24 pt-12 md:px-8 md:pb-32 md:pt-20">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow={t('contact.eyebrow')}
            title={t('contact.title_page')}
          >
            {t('contact.description_page')}
          </SectionHeading>

          <div className="mt-12 border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#131712] p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              {t('contact.email_label')}
            </p>
            <a
              href="mailto:cable8mm@gmail.com"
              className="mt-4 inline-flex items-center gap-2 text-2xl font-semibold text-zinc-950 dark:text-zinc-50"
            >
              cable8mm@gmail.com <Mail size={20} />
            </a>
            <p className="mt-6 leading-7 text-zinc-600 dark:text-zinc-400">
              {t('contact.email_note')}
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <PageShell>
      <section className="px-5 pb-24 pt-12 md:px-8 md:pb-32 md:pt-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
            {t('not_found.eyebrow')}
          </p>
          <h1 className="text-4xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50 md:text-6xl">
            {t('not_found.title')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {t('not_found.description')}
          </p>
          <Link
            href="/projects"
            className="mt-10 inline-flex items-center gap-2 bg-zinc-950 px-5 py-3 text-sm font-semibold text-zinc-50"
          >
            {t('not_found.return')} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

function resolvePage(path) {
  if (path === '/') {
    return <HomePage />;
  }

  if (path === '/projects') {
    return <ProjectsPage />;
  }

  if (path.startsWith('/projects/')) {
    return <ProjectDetailPage slug={path.replace('/projects/', '')} />;
  }

  if (path === '/philosophy') {
    return <PhilosophyPage />;
  }

  if (path === '/services') {
    return <ServicesPage />;
  }

  if (path === '/about') {
    return <AboutPage />;
  }

  if (path === '/contact') {
    return <ContactPage />;
  }

  return <NotFoundPage />;
}

export default function App({ ssrPath } = {}) {
  const browserPath = usePathname();
  const rawPath = ssrPath || browserPath;
  const path = stripLanguagePrefix(rawPath);
  const lang = parseLanguageFromPath(rawPath);
  const page = useMemo(() => resolvePage(path), [path]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { i18n } = useTranslation();

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'system';
    }
    return 'system';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;

    const applyTheme = (currentTheme) => {
      const isDark =
        currentTheme === 'dark' ||
        (currentTheme === 'system' &&
          typeof window.matchMedia === 'function' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);

      const metaThemeColor = document.getElementById('theme-color-meta');
      if (isDark) {
        root.classList.add('dark');
        root.classList.add('dark-mode');
        if (metaThemeColor) metaThemeColor.setAttribute('content', '#0e110d');
      } else {
        root.classList.remove('dark');
        root.classList.remove('dark-mode');
        if (metaThemeColor) metaThemeColor.setAttribute('content', '#f5f7f4');
      }
    };

    applyTheme(theme);
    localStorage.setItem('theme', theme);

    if (typeof window.matchMedia === 'function') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemChange = () => {
        if (theme === 'system') {
          applyTheme('system');
        }
      };

      mediaQuery.addEventListener('change', handleSystemChange);
      return () => mediaQuery.removeEventListener('change', handleSystemChange);
    }
  }, [theme]);

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    if (typeof window !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang, i18n]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const baseTitle =
      lang === 'ko' ? '레거시 리바이벌 스튜디오' : 'Legacy Revival Studio';
    let pageTitle;
    let descriptionText =
      '오래된 웹사이트를 복원하고 다시 살아 움직이게 합니다.';

    if (path === '/') {
      if (lang === 'ko') {
        pageTitle = '레거시 리바이벌 스튜디오';
        descriptionText =
          '오래된 웹사이트를 복원하고 다시 살아 움직이게 합니다.';
      } else {
        pageTitle = 'Legacy Revival Studio';
        descriptionText =
          'A project dedicated to reviving old software, preserving digital artifacts, and modernizing legacy systems while respecting their original intent.';
      }
    } else if (path === '/projects') {
      if (lang === 'ko') {
        pageTitle = `프로젝트 아카이브 | ${baseTitle}`;
        descriptionText =
          '부활한 소프트웨어의 작동 상태, 복원 과정, 레거시 시스템 현대화 패치 내역을 문서화한 아카이브 아티팩트 목록입니다.';
      } else {
        pageTitle = `Restoration Projects | ${baseTitle}`;
        descriptionText =
          'A catalog of revived software systems, technical recovery notes, and legacy modernization blueprints.';
      }
    } else if (path.startsWith('/projects/')) {
      const slug = path.replace('/projects/', '');
      const projectTitle = i18n.t(`project_data.${slug}.title`, {
        defaultValue: slug,
      });
      const projectSummary = i18n.t(`project_data.${slug}.summary`, {
        defaultValue: '',
      });
      pageTitle = `${projectTitle} | ${baseTitle}`;
      if (projectSummary) {
        descriptionText = projectSummary;
      }
    } else if (path === '/philosophy') {
      if (lang === 'ko') {
        pageTitle = `엔지니어링 철학 | ${baseTitle}`;
        descriptionText =
          '역사를 재디자인하지 않고 원본의 의도를 보존하는 기술적 태도, 소프트웨어의 부패를 방지하고 영속성을 보장하는 아카이브 우선주의 철학을 소개합니다.';
      } else {
        pageTitle = `Preservation Philosophy | ${baseTitle}`;
        descriptionText =
          'Our engineering principles for digital software preservation. We avoid rewriting history, focusing instead on making legacy systems runnable and resilient.';
      }
    } else if (path === '/services') {
      if (lang === 'ko') {
        pageTitle = `복원 서비스 안내 | ${baseTitle}`;
        descriptionText =
          '구형 코드 분석(레거시 리뷰), 시스템 복구 가능성 평가, 의존성 현대화 및 낡은 웹 서비스를 작동 가능한 상태로 되살리는 전문 엔지니어링 서비스를 제공합니다.';
      } else {
        pageTitle = `Preservation Services | ${baseTitle}`;
        descriptionText =
          'Technical legacy review, feasibility assessments, runtime environment modernization, and end-to-end restoration of aging software.';
      }
    } else if (path === '/about') {
      if (lang === 'ko') {
        pageTitle = `스튜디오 소개 | ${baseTitle}`;
        descriptionText =
          '오래되었지만 가치 있는 사내 시스템, 낡은 웹 앱, 문서화되지 않은 DB를 연구하고 조용히 소멸하지 않도록 런타임을 재현하는 기술 보존 스튜디오입니다.';
      } else {
        pageTitle = `About the Studio | ${baseTitle}`;
        descriptionText =
          'A dedicated technical preservation studio breathing new life into aging web services, undocumented databases, and systems organizations depend on but hesitate to touch.';
      }
    } else if (path === '/contact') {
      if (lang === 'ko') {
        pageTitle = `복원 의뢰 및 문의 | ${baseTitle}`;
        descriptionText =
          '구형 시스템 백업본, 데이터베이스 덤프, 낡은 소스코드만으로도 상담이 가능합니다. 레거시 소프트웨어 복구 및 작동 가능성 문의를 보내주세요.';
      } else {
        pageTitle = `Consultation & Contact | ${baseTitle}`;
        descriptionText =
          'Initiate a software recovery consultation. Whether you have partial source code, database dumps, or legacy backups, we can help restore original behavior.';
      }
    } else {
      pageTitle = `404 Not Found | ${baseTitle}`;
    }

    document.title = pageTitle;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', descriptionText);
  }, [path, lang, i18n]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      scrollToSection(window.location.hash.slice(1));
    }
  }, [rawPath]);

  return (
    <div className="min-h-screen bg-[#f5f7f4] dark:bg-[#0e110d] text-zinc-900 dark:text-zinc-50 selection:bg-zinc-900 selection:text-zinc-50 dark:selection:bg-zinc-50 dark:selection:text-zinc-950 transition-colors duration-300">
      <Header
        isScrolled={isScrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        theme={theme}
        setTheme={setTheme}
      />
      {page}
      <Footer />
    </div>
  );
}
