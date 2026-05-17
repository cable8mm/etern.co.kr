import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Menu,
  X,
  ArrowRight,
  Lock,
  Mail,
  Code,
  BookOpen,
  Briefcase,
  Globe,
  ChevronRight,
  Server,
} from 'lucide-react';

export default function FastCodeHomepage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Projects', id: 'projects' },
    { name: 'Footprint', id: 'footprint' },
    { name: 'Infrastructure', id: 'infrastructure' },
  ];

  return (
    <div
      className="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-500 selection:text-white"
      style={{
        fontFamily:
          "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif",
      }}
    >
      {/* Section 1: Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md shadow-sm py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-2xl font-extrabold text-[#1a365d] tracking-tight flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a365d] to-[#2a4365] flex items-center justify-center text-white shadow-md">
              <span className="text-xl leading-none">F</span>
            </div>
            FastCode
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.id)}
                  className="text-sm font-semibold text-slate-600 hover:text-[#f97316] transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>
            <a
              href="mailto:cable8mm@gmail.com"
              className="px-6 py-2.5 bg-[#1a365d] hover:bg-[#2a4365] text-white text-sm font-semibold rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-slate-900 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-xl py-6 px-6 flex flex-col space-y-4 border-t border-slate-100"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className="text-left text-lg font-bold text-slate-800 py-2"
              >
                {link.name}
              </button>
            ))}
            <a
              href="mailto:cable8mm@gmail.com"
              className="w-full py-3.5 mt-4 bg-[#1a365d] text-white text-center rounded-xl font-bold flex items-center justify-center gap-2"
            >
              Contact Us <Mail size={18} />
            </a>
          </motion.div>
        )}
      </nav>

      <main>
        {/* Section 2: Hero */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 px-6 md:px-12 overflow-hidden flex items-center min-h-[90vh]">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-gradient-to-br from-blue-100/40 to-orange-100/40 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-[#1a365d]/5 rounded-full blur-3xl -z-10" />

          <div className="max-w-4xl mx-auto text-center z-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] font-extrabold tracking-tight text-slate-900 leading-[1.2] mb-8 break-keep">
                기술로 비즈니스의 문제를 해결하는{' '}
                <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a365d] via-[#1a365d] to-[#f97316]">
                  실용적인 프로덕트
                </span>
                를 만듭니다.
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed break-keep font-medium"
            >
              25년 이상의 시니어 엔지니어링 전문성을 바탕으로, 탄탄한 클라우드
              인프라 위에서 구동되는 스케일러블(Scalable)한 프로덕트를
              구축합니다.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={() => scrollTo('projects')}
                className="w-full sm:w-auto px-8 py-4 bg-[#1a365d] hover:bg-[#2a4365] text-white rounded-full font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2 text-lg"
              >
                프로덕트 보기
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => scrollTo('footprint')}
                className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-200 hover:border-[#1a365d]/20 hover:bg-slate-50 text-slate-800 rounded-full font-bold transition-all hover:-translate-y-1 flex items-center justify-center text-lg"
              >
                기술 DNA 확인
              </button>
            </motion.div>
          </div>
        </section>

        {/* Section 3: Our Products */}
        <section
          id="projects"
          className="py-24 md:py-32 bg-white px-6 md:px-12"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="mb-16 md:mb-24 text-center md:text-left"
            >
              <h2 className="text-sm font-black text-[#f97316] uppercase tracking-[0.2em] mb-4">
                Our Products
              </h2>
              <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                핵심 서비스 포트폴리오
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
              {/* Product Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7 }}
                className="group relative bg-slate-50/50 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 hover:border-[#1a365d]/10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-8">
                  <Globe className="text-[#1a365d]" size={32} />
                </div>
                <h4 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5 break-keep">
                  QR코드 접속 와이파이 노트
                </h4>
                <p className="text-slate-600 mb-10 text-lg leading-relaxed flex-grow break-keep">
                  복잡한 비밀번호 입력 없이 QR로 간편하게 접속을 공유하는 웹 및
                  모바일 앱 서비스
                </p>
                <div className="flex flex-wrap gap-2.5 mb-10">
                  {[
                    'Laravel',
                    'TailwindCSS',
                    'OpenAI API',
                    'Gemini Image',
                    'Swift',
                    'Kotlin',
                    'Flutter',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-1.5 bg-white text-slate-700 text-sm font-bold rounded-full border border-slate-200 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href="https://github.com/cable8mm/wifi-note"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#1a365d] font-bold text-lg hover:text-[#f97316] transition-colors mt-auto group-hover:gap-3 gap-2 w-max"
                >
                  GitHub Repository
                  <ArrowRight size={20} />
                </a>
              </motion.div>

              {/* Product Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative bg-slate-50/50 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 flex flex-col h-full overflow-hidden group"
              >
                {/* Lock Overlay */}
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-slate-700 transition-all duration-300 group-hover:bg-white/50">
                  <div className="w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center mb-4">
                    <Lock size={32} className="text-[#1a365d]" />
                  </div>
                  <span className="font-extrabold text-xl tracking-tight">
                    서비스 준비중
                  </span>
                </div>

                <div className="opacity-40 blur-[1px]">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-8">
                    <Server className="text-[#1a365d]" size={32} />
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5 break-keep">
                    스마트 물류 시스템
                  </h4>
                  <p className="text-slate-600 mb-10 text-lg leading-relaxed break-keep">
                    클라우드 기반의 효율적인 재고 및 배송 트래킹 시스템 MVP
                  </p>
                  <div className="flex flex-wrap gap-2.5 mb-10">
                    {['Laravel', 'Redis', 'MySQL'].map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-1.5 bg-white text-slate-700 text-sm font-bold rounded-full border border-slate-200 shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="inline-flex items-center text-slate-400 font-bold text-lg gap-2 cursor-not-allowed">
                    서비스 보러가기
                    <ArrowRight size={20} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 4: Engineering DNA */}
        <section
          id="footprint"
          className="py-24 md:py-32 bg-slate-50 px-6 md:px-12 border-t border-slate-100"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="mb-16 md:mb-24 text-center"
            >
              <h2 className="text-sm font-black text-[#f97316] uppercase tracking-[0.2em] mb-4">
                Engineering DNA
              </h2>
              <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                기술 풋프린트
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  title: 'Open Source',
                  desc: '다양한 퍼블릭 오픈소스 프로젝트 생태계 기여',
                  icon: Code,
                  link: 'https://github.com/cable8mm',
                },
                {
                  title: 'Tech Insights',
                  desc: '개발 트러블슈팅 및 기술 인사이트를 기록하는 블로그',
                  icon: BookOpen,
                  link: 'https://palgle.com',
                },
                {
                  title: 'Technical Leadership',
                  desc: '글로벌 실무 프로젝트 리딩 및 아키텍처 설계 전문성',
                  icon: Briefcase,
                  link: 'https://www.linkedin.com/in/cable8mm/',
                },
              ].map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="group block p-10 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-[#1a365d]/10 transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-[#1a365d] group-hover:scale-110 transition-all duration-300">
                    <item.icon
                      className="text-[#1a365d] group-hover:text-white transition-colors"
                      size={28}
                    />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 mb-8 leading-relaxed break-keep">
                    {item.desc}
                  </p>
                  <div className="flex items-center text-[#f97316] font-bold text-base gap-2 group-hover:gap-3 transition-all">
                    자세히 보기 <ChevronRight size={18} />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Cloud Infrastructure & Partnership */}
        <section
          id="infrastructure"
          className="py-24 md:py-40 bg-[#1a365d] text-white px-6 md:px-12 relative overflow-hidden"
        >
          {/* Abstract geometric background */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] border-[60px] border-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#f97316] rounded-full blur-[150px] opacity-20 -translate-x-1/2 translate-y-1/2" />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7"
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight tracking-tight break-keep">
                  안정적인 인프라 기반의 <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-[#f97316]">
                    비즈니스 파트너십
                  </span>
                </h2>
                <p className="text-blue-100/90 text-xl leading-relaxed mb-10 break-keep font-medium">
                  글로벌 트래픽 대응을 위해 AWS의 EC2, RDS 등 강력한 클라우드
                  인프라 위에서 스케일업을 준비하고 있습니다. 함께 성장할
                  파트너십을 환영합니다.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-white">
                  <div className="px-5 py-2.5 bg-white/10 hover:bg-white/20 transition-colors rounded-full backdrop-blur-sm border border-white/10">
                    AWS EC2
                  </div>
                  <div className="px-5 py-2.5 bg-white/10 hover:bg-white/20 transition-colors rounded-full backdrop-blur-sm border border-white/10">
                    Amazon RDS
                  </div>
                  <div className="px-5 py-2.5 bg-white/10 hover:bg-white/20 transition-colors rounded-full backdrop-blur-sm border border-white/10">
                    Cloud Scale
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-5"
              >
                <div className="bg-white rounded-[2.5rem] p-10 md:p-12 shadow-2xl shadow-black/20 text-slate-900 border border-white/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-150" />

                  <h3 className="text-3xl font-extrabold mb-4 tracking-tight">
                    프로젝트 문의하기
                  </h3>
                  <p className="text-slate-600 mb-10 text-lg break-keep font-medium">
                    새로운 비즈니스 기회나 기술적 협업이 필요하신가요?
                  </p>

                  <a
                    href="mailto:cable8mm@gmail.com"
                    className="flex flex-col sm:flex-row items-center gap-6 w-full p-6 sm:p-4 bg-slate-50 hover:bg-[#1a365d] border border-slate-200 rounded-2xl transition-all duration-300 group/btn"
                  >
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover/btn:bg-white/10 transition-colors shrink-0">
                      <Mail className="text-[#f97316]" size={32} />
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="text-sm font-bold text-slate-500 group-hover/btn:text-blue-200 mb-1 transition-colors uppercase tracking-wider">
                        Email Us
                      </div>
                      <div className="text-xl md:text-2xl font-black text-slate-900 group-hover/btn:text-white transition-colors">
                        cable8mm@gmail.com
                      </div>
                    </div>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 md:px-12 border-t border-white/10 text-center">
        <p className="font-medium text-sm tracking-wide">
          © 2026 FastCode Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
