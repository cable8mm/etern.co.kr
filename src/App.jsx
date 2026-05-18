import { useEffect, useState } from 'react';
import {
  Archive,
  ArrowRight,
  BookMarked,
  CheckCircle2,
  Database,
  FileClock,
  GitBranch,
  Mail,
  Menu,
  ServerCog,
  ShieldCheck,
  Terminal,
  X,
} from 'lucide-react';

const navLinks = [
  { name: 'Philosophy', id: 'philosophy' },
  { name: 'Workflow', id: 'workflow' },
  { name: 'Services', id: 'services' },
  { name: 'Contact', id: 'contact' },
];

const principles = [
  {
    title: 'Software disappears too easily',
    body: 'Code rots, hosting ends, dependencies break, and valuable systems become unreachable long before their usefulness is gone.',
    icon: FileClock,
  },
  {
    title: 'Data outlives products',
    body: 'A service may vanish, but its records, workflows, and historical decisions can remain meaningful for decades.',
    icon: Database,
  },
  {
    title: 'Original behavior matters',
    body: 'Revival starts by understanding how the old system actually worked before deciding what should change.',
    icon: ShieldCheck,
  },
];

const workflow = [
  'Collect original artifacts',
  'Make the system run locally',
  'Document current behavior',
  'Apply minimal compatibility fixes',
  'Modernize only where needed',
];

const services = [
  {
    title: 'Legacy Recovery',
    body: 'Restore outdated PHP applications, abandoned admin panels, broken dependencies, and old database-backed services.',
    icon: Archive,
  },
  {
    title: 'Local Resurrection',
    body: 'Create reproducible local environments with Docker, one-command startup, and clear recovery notes.',
    icon: Terminal,
  },
  {
    title: 'Selective Modernization',
    body: 'Upgrade runtimes, replace unsafe dependencies, and patch security issues without erasing the original structure.',
    icon: ServerCog,
  },
  {
    title: 'Historical Preservation',
    body: 'Keep source snapshots, database dumps, configuration, and file structure intact before any modernization begins.',
    icon: BookMarked,
  },
];

const tools = [
  'Git',
  'Docker',
  'Docker Compose',
  'Linux containers',
  'PHP',
  'Node.js',
  'Python',
  'MySQL',
  'PostgreSQL',
  'SQLite',
  'Static analysis',
  'Migration scripts',
];

function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
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

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <div className="min-h-screen bg-[#f5f7f4] text-zinc-900 selection:bg-zinc-900 selection:text-zinc-50">
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          isScrolled
            ? 'border-zinc-200 bg-[#f5f7f4]/92 backdrop-blur'
            : 'border-transparent bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
          </button>

          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className="text-sm text-zinc-600 transition-colors hover:text-zinc-950"
              >
                {link.name}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border border-zinc-300 bg-[#f5f7f4] text-zinc-900 md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="border-t border-zinc-200 bg-[#f5f7f4] px-5 py-4 md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className="py-3 text-left text-base text-zinc-700"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-5 pb-20 pt-28 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:pt-36">
          <div>
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Archive-first software recovery
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-normal text-zinc-950 md:text-7xl">
              Old software can live again.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-600 md:text-xl">
              Legacy Revival Studio restores aging web services, internal tools,
              and forgotten systems so their code, data, and behavior can run
              again on modern infrastructure.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToSection('workflow')}
                className="inline-flex items-center justify-center gap-2 bg-zinc-950 px-5 py-3 text-sm font-semibold text-zinc-50 transition-colors hover:bg-zinc-800"
              >
                See the recovery workflow <ArrowRight size={16} />
              </button>
              <a
                href="mailto:cable8mm@gmail.com"
                className="inline-flex items-center justify-center gap-2 border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:border-zinc-950 hover:text-zinc-950"
              >
                Start with an old system <Mail size={16} />
              </a>
            </div>
          </div>

          <aside
            className="border border-zinc-300 bg-[#e9efe8] p-6 md:p-8"
            aria-label="Core principle"
          >
            <div className="mb-8 flex items-center gap-3 border-b border-zinc-300 pb-5">
              <GitBranch size={22} className="text-zinc-700" />
              <div>
                <p className="text-sm font-semibold text-zinc-950">
                  Core principle
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  v0.1 recovery doctrine
                </p>
              </div>
            </div>
            <blockquote className="text-3xl font-semibold leading-tight text-zinc-950 md:text-4xl">
              Revive first. Rewrite only when necessary.
            </blockquote>
            <dl className="mt-9 grid gap-5 text-sm">
              <div className="border-t border-zinc-300 pt-5">
                <dt className="font-semibold text-zinc-950">
                  Preserve originals
                </dt>
                <dd className="mt-2 leading-6 text-zinc-600">
                  Source snapshots, database dumps, configuration, and file
                  structure remain intact.
                </dd>
              </div>
              <div className="border-t border-zinc-300 pt-5">
                <dt className="font-semibold text-zinc-950">
                  Make it runnable
                </dt>
                <dd className="mt-2 leading-6 text-zinc-600">
                  A revived system starts, performs core functions, and has its
                  behavior documented.
                </dd>
              </div>
            </dl>
          </aside>
        </section>

        <section
          id="philosophy"
          className="border-y border-zinc-200 bg-[#ffffff] px-5 py-24 md:px-8 md:py-32"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Philosophy"
              title="Preservation is an engineering practice."
            >
              Legacy Revival Studio treats old systems as working artifacts:
              imperfect, specific, historically useful, and worth understanding
              before they are changed.
            </SectionHeading>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {principles.map((item) => (
                <article
                  key={item.title}
                  className="border border-zinc-200 bg-[#f5f7f4] p-6"
                >
                  <item.icon className="mb-8 text-zinc-700" size={24} />
                  <h3 className="text-xl font-semibold text-zinc-950">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-zinc-600">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
            <SectionHeading
              eyebrow="Recovery workflow"
              title="Start by making the old system run."
            >
              The first milestone is not a redesign. It is a reproducible
              runtime, documented behavior, and a clear map of what must be
              preserved.
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
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="services"
          className="border-y border-zinc-200 bg-[#ffffff] px-5 py-24 md:px-8 md:py-32"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Services"
              title="Careful recovery for systems people are afraid to touch."
            >
              The work can begin with a dead website, an old database dump, a
              forgotten internal tool, or a source archive with no working
              environment.
            </SectionHeading>

            <div className="mt-14 grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200 md:grid-cols-2">
              {services.map((service) => (
                <article key={service.title} className="bg-[#ffffff] p-7">
                  <service.icon className="mb-8 text-zinc-700" size={24} />
                  <h3 className="text-2xl font-semibold text-zinc-950">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-zinc-600">
                    {service.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[1fr_1fr] md:gap-20">
            <div>
              <SectionHeading
                eyebrow="Preservation rules"
                title="Originals are never overwritten."
              />
              <ul className="mt-10 space-y-5">
                {[
                  'Preserve source code, database dumps, configuration, and file structure.',
                  'Separate raw artifacts from runtime, analysis, migration, and documentation work.',
                  'Document behavior before compatibility fixes or modernization patches.',
                  'Prefer small, reversible changes that reduce migration risk.',
                ].map((rule) => (
                  <li key={rule} className="flex gap-3 text-zinc-700">
                    <CheckCircle2
                      className="mt-1 shrink-0 text-zinc-800"
                      size={18}
                    />
                    <span className="leading-7">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionHeading
                eyebrow="Technical ground"
                title="Durable tools over novelty."
              />
              <div className="mt-10 flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="border border-zinc-300 bg-[#ffffff] px-3 py-2 text-sm text-zinc-700"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="border-t border-zinc-300 bg-zinc-950 px-5 py-20 text-zinc-50 md:px-8 md:py-28"
        >
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
                Contact
              </p>
              <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-normal md:text-6xl">
                Have a system everyone is afraid to touch?
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
                Start by making it run again. Then decide, with evidence, what
                should be preserved, repaired, or modernized.
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
      </main>

      <footer className="bg-zinc-950 px-5 py-8 text-zinc-500 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-zinc-800 pt-8 text-sm md:flex-row md:items-center md:justify-between">
          <p>© 2026 Legacy Revival Studio.</p>
          <p>Bring old software back to life.</p>
        </div>
      </footer>
    </div>
  );
}
