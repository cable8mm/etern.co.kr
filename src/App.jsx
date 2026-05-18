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
} from 'lucide-react';
import { projects } from './data/projects';

const navLinks = [
  { key: 'projects', href: '/projects' },
  { key: 'philosophy', href: '/philosophy' },
  { key: 'workflow', href: '/#workflow' },
  { key: 'services', href: '/#services' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
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

const workflow = ['0', '1', '2', '3', '4'];

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
    normalizePath(window.location.pathname),
  );

  useEffect(() => {
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
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-normal text-zinc-950 md:text-5xl">
        {title}
      </h2>
      {children && (
        <p className="mt-6 text-base leading-8 text-zinc-600 md:text-lg">
          {children}
        </p>
      )}
    </div>
  );
}

function PageShell({ children }) {
  return <main className="pt-24 md:pt-28">{children}</main>;
}

function Header({ isScrolled, mobileMenuOpen, setMobileMenuOpen }) {
  const { t, i18n } = useTranslation();

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
          ? 'border-zinc-200 bg-[#f5f7f4]/92 backdrop-blur'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <Link
          href="/"
          onNavigate={() => setMobileMenuOpen(false)}
          className="flex items-center gap-3 text-left"
          aria-label="Legacy Revival Studio home"
        >
          <span className="flex h-9 w-9 items-center justify-center border border-zinc-300 bg-zinc-950 text-sm font-semibold text-zinc-50">
            LR
          </span>
          <span>
            <span className="block text-sm font-semibold tracking-normal text-zinc-950">
              Legacy Revival Studio
            </span>
            <span className="block text-xs text-zinc-500">
              Software restoration
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-600 transition-colors hover:text-zinc-950"
            >
              {t(`nav.${link.key}`)}
            </Link>
          ))}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-950"
          >
            <Globe size={14} />
            {(i18n.language || 'ko').startsWith('ko') ? 'EN' : 'KO'}
          </button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500"
          >
            <Globe size={14} />
            {(i18n.language || 'ko').startsWith('ko') ? 'EN' : 'KO'}
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border border-zinc-300 bg-[#f5f7f4] text-zinc-900"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-zinc-200 bg-[#f5f7f4] px-5 py-4 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onNavigate={() => setMobileMenuOpen(false)}
                className="py-3 text-left text-base text-zinc-700"
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
      className="border border-zinc-300 bg-[#e9efe8] p-6 md:p-8"
      aria-label={t('core_principle.title')}
    >
      <div className="mb-8 flex items-center gap-3 border-b border-zinc-300 pb-5">
        <GitBranch size={22} className="text-zinc-700" />
        <div>
          <p className="text-sm font-semibold text-zinc-950">
            {t('core_principle.title')}
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            {t('core_principle.version')}
          </p>
        </div>
      </div>
      <blockquote className="text-3xl font-semibold leading-tight text-zinc-950 md:text-4xl">
        {t('core_principle.quote')}
      </blockquote>
      <dl className="mt-9 grid gap-5 text-sm">
        <div className="border-t border-zinc-300 pt-5">
          <dt className="font-semibold text-zinc-950">
            {t('core_principle.preserve_title')}
          </dt>
          <dd className="mt-2 leading-6 text-zinc-600">
            {t('core_principle.preserve_desc')}
          </dd>
        </div>
        <div className="border-t border-zinc-300 pt-5">
          <dt className="font-semibold text-zinc-950">
            {t('core_principle.runnable_title')}
          </dt>
          <dd className="mt-2 leading-6 text-zinc-600">
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
      id="philosophy-preview"
      className="border-y border-zinc-200 bg-white px-5 py-24 md:px-8 md:py-32"
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
              className="border border-zinc-200 bg-[#f5f7f4] p-6"
            >
              <item.icon className="mb-8 text-zinc-700" size={24} />
              <h3 className="text-xl font-semibold text-zinc-950">
                {t(`philosophy.items.${item.key}.title`)}
              </h3>
              <p className="mt-4 text-sm leading-7 text-zinc-600">
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
    <section id="workflow" className="scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
        <SectionHeading
          eyebrow={t('workflow.eyebrow')}
          title={t('workflow.title')}
        >
          {t('workflow.description')}
        </SectionHeading>

        <ol className="border-y border-zinc-300">
          {workflow.map((step, index) => (
            <li
              key={step}
              className="grid grid-cols-[3.5rem_1fr] border-b border-zinc-300 py-6 last:border-b-0"
            >
              <span className="font-mono text-sm text-zinc-500">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-xl font-medium text-zinc-950">
                {t(`workflow.steps.${step}`)}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ServicesSection() {
  const { t } = useTranslation();
  return (
    <section
      id="services"
      className="scroll-mt-24 border-y border-zinc-200 bg-white px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={t('services.eyebrow')}
          title={t('services.title')}
        >
          {t('services.description')}
        </SectionHeading>

        <div className="mt-14 grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.key}
              className="bg-white p-7 flex flex-col h-full"
            >
              <div className="flex-1">
                <service.icon className="mb-8 text-zinc-700" size={24} />
                <h3 className="text-2xl font-semibold text-zinc-950">
                  {t(`services.items.${service.key}.title`)}
                </h3>
                <p className="mt-4 text-sm leading-7 text-zinc-600">
                  {t(`services.items.${service.key}.body`)}
                </p>
              </div>
              <div className="mt-10 pt-6 border-t border-zinc-100">
                <span className="text-xs font-medium uppercase tracking-[0.1em] text-zinc-500">
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
    <section className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[1fr_1fr] md:gap-20">
        <div>
          <SectionHeading
            eyebrow={t('technical.preservation_rules_eyebrow')}
            title={t('technical.preservation_rules_title')}
          />
          <ul className="mt-10 space-y-5">
            {preservationRules.map((rule) => (
              <li key={rule} className="flex gap-3 text-zinc-700">
                <CheckCircle2
                  className="mt-1 shrink-0 text-zinc-800"
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
                className="border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700"
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
      className="border-t border-zinc-300 bg-zinc-950 px-5 py-20 text-zinc-50 md:px-8 md:py-28"
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
    <footer className="bg-zinc-950 px-5 py-8 text-zinc-500 md:px-8">
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
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500">
            {t('home.subtitle')}
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-normal text-zinc-950 md:text-7xl">
            {t('home.title')}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-600 md:text-xl">
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
              className="inline-flex items-center justify-center gap-2 border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:border-zinc-950 hover:text-zinc-950"
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
    <section className="border-y border-zinc-200 bg-[#e9efe8] px-5 py-8 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between font-mono text-sm uppercase tracking-wider text-zinc-600">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-zinc-950 rounded-full"></span>
          {t('studio_metrics.metric_1')}
        </div>
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-zinc-950 rounded-full"></span>
          {t('studio_metrics.metric_2')}
        </div>
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-zinc-950 rounded-full"></span>
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
            <div className="text-zinc-500 mb-6 uppercase tracking-widest text-xs flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              {t('before_after.legacy_state')}
            </div>
            <pre className="text-zinc-400 overflow-x-auto text-xs leading-relaxed whitespace-pre-wrap">
              {`Fatal error: Uncaught Error: Call to undefined function mysql_connect() in /var/www/html/db.php:12
Stack trace:
#0 /var/www/html/index.php(4): require_once()
#1 {main}
  thrown in /var/www/html/db.php on line 12`}
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
    <section className="border-y border-zinc-200 bg-white px-5 py-24 md:px-8 md:py-32">
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-950"
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
      <div className="mt-14 border border-dashed border-zinc-300 bg-[#f5f7f4] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          {t('project_grid.pending')}
        </p>
        <h3 className="mt-4 text-2xl font-semibold text-zinc-950">
          {t('project_grid.no_public')}
        </h3>
        <p className="mt-4 max-w-2xl leading-7 text-zinc-600">
          {t('project_grid.ready')}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`mt-14 grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200 ${
        projectList.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1'
      }`}
    >
      {projectList.slice(0, emptyLimit).map((project) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          className="group bg-white p-7 transition-colors hover:bg-[#f5f7f4] flex flex-col h-full"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {project.stack}
            </p>
            <span className="text-xs font-mono border border-zinc-200 bg-[#f5f7f4] text-zinc-600 px-2 py-1">
              {t(`project_data.${project.key}.status`)}
            </span>
          </div>

          <h3 className="mt-6 text-2xl font-semibold text-zinc-950">
            {t(`project_data.${project.key}.title`)}
          </h3>

          <div className="mt-4 flex items-center gap-3 font-mono text-sm text-zinc-500">
            <span>{project.originalYear}</span>
            <ArrowRight size={14} className="text-zinc-300" />
            <span className="text-zinc-950 font-semibold">
              {project.revivalYear}
            </span>
          </div>

          <p className="mt-6 flex-1 text-sm leading-7 text-zinc-600">
            {t(`project_data.${project.key}.summary`)}
          </p>
          <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-zinc-950 pt-6 border-t border-zinc-100">
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
            className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-zinc-950"
          >
            {t('project_detail.back')}
          </Link>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
            {t(`project_data.${project.key}.status`)}
          </p>
          <h1 className="text-4xl font-semibold tracking-normal text-zinc-950 md:text-6xl">
            {t(`project_data.${project.key}.title`)}
          </h1>
          <p className="mt-8 text-lg leading-8 text-zinc-600">
            {t(`project_data.${project.key}.summary`)}
          </p>

          <div className="mt-12 grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200 md:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-white p-6">
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  {fact.label}
                </dt>
                <dd className="mt-3 text-zinc-950">{fact.value}</dd>
              </div>
            ))}
          </div>

          <section className="mt-14 border-t border-zinc-300 pt-10">
            <h2 className="text-2xl font-semibold text-zinc-950">
              {t('project_detail.recovery_notes')}
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-zinc-600">
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
          <div className="space-y-6 text-base leading-8 text-zinc-600">
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

          <div className="mt-12 border border-zinc-300 bg-white p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {t('contact.email_label')}
            </p>
            <a
              href="mailto:cable8mm@gmail.com"
              className="mt-4 inline-flex items-center gap-2 text-2xl font-semibold text-zinc-950"
            >
              cable8mm@gmail.com <Mail size={20} />
            </a>
            <p className="mt-6 leading-7 text-zinc-600">
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
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
            {t('not_found.eyebrow')}
          </p>
          <h1 className="text-4xl font-semibold tracking-normal text-zinc-950 md:text-6xl">
            {t('not_found.title')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600">
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

  if (path === '/about') {
    return <AboutPage />;
  }

  if (path === '/contact') {
    return <ContactPage />;
  }

  return <NotFoundPage />;
}

export default function App() {
  const rawPath = usePathname();
  const path = stripLanguagePrefix(rawPath);
  const lang = parseLanguageFromPath(rawPath);
  const page = useMemo(() => resolvePage(path), [path]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    document.documentElement.lang = lang;
  }, [lang, i18n]);

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
    <div className="min-h-screen bg-[#f5f7f4] text-zinc-900 selection:bg-zinc-900 selection:text-zinc-50">
      <Header
        isScrolled={isScrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      {page}
      <Footer />
    </div>
  );
}
