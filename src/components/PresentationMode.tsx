import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  X,
  ExternalLink,
  Github,
  Award,
  Cpu,
  GraduationCap,
  Sparkles,
  Mail,
  CheckCircle2,
  QrCode,
  Clock,
  User,
  Code,
  Brain,
  Layers,
  ArrowUpRight,
  FileText,
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { ALL_CERTIFICATES, CertificateItem } from '../data/certificatesData';

const AUTO_PLAY_INTERVAL = 9000; // 9 seconds per slide

interface ProjectData {
  title: string;
  role: string;
  desc: string;
  image: string;
  tags: string[];
  link: string;
  github: string;
}

const REAL_PROJECTS: ProjectData[] = [
  {
    title: 'SORA - Sobat Rantau',
    role: 'Frontend & UI/UX Developer',
    desc: 'Aplikasi web modern pendukung kesehatan mental, pelacak kebiasaan, dan produktivitas harian mahasiswa rantau dengan antarmuka yang empatik dan intuitif.',
    image: '/img/SORA.png',
    tags: ['React', 'Tailwind', 'Vite'],
    link: 'https://sora-sobat-rantau.vercel.app/',
    github: 'https://github.com/JarsXen/SORA---SOBAT-RANTAU.git',
  },
  {
    title: 'EcoDigital Nusantara',
    role: 'Proyek Kompetisi FAR TEAM',
    desc: 'Platform edukasi lingkungan dan keberlanjutan digital untuk kompetisi nasional Technoversary 25 melalui modul interaktif dan desain modern.',
    image: '/img/EcoDigital.png',
    tags: ['React', 'Tailwind', 'Vite'],
    link: 'https://ecodigitalnusantara.vercel.app/',
    github: 'https://github.com/JarsXen/webdesign_FAR-TEAM_technoversary25.git',
  },
  {
    title: 'JumpaUMKM',
    role: 'Fullstack / Frontend Engineer',
    desc: 'Direktori digital UMKM untuk memajukan, mempromosikan, dan menghubungkan pelaku usaha mikro lokal dengan pencarian cepat dan kategori terstruktur.',
    image: '/img/UMKM.png',
    tags: ['React', 'Tailwind', 'Vite'],
    link: 'https://farteam-umkm-app.vercel.app/',
    github: 'https://github.com/JarsXen/FAR-TEAM---UMKM-APP.git',
  },
];

const slideTransition = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.99,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.99,
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export const PresentationMode = memo(function PresentationMode() {
  const { isPresentationOpen, closePresentation, language, t } = useApp();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [timerProgress, setTimerProgress] = useState<number>(0);

  const totalSlides = 6;

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setTimerProgress(0);
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setTimerProgress(0);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimerProgress(0);
  }, [totalSlides]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Reset slide state on open
  useEffect(() => {
    if (isPresentationOpen) {
      setCurrentSlide(0);
      setDirection(1);
      setIsPlaying(true);
      setTimerProgress(0);
    }
  }, [isPresentationOpen]);

  // Slideshow progress timer
  useEffect(() => {
    if (!isPresentationOpen || !isPlaying) return;

    const intervalMs = 50;
    const step = (intervalMs / AUTO_PLAY_INTERVAL) * 100;

    const timer = setInterval(() => {
      setTimerProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPresentationOpen, isPlaying, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    if (!isPresentationOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case ' ': // Spacebar
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          prevSlide();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'Escape':
          e.preventDefault();
          if (document.fullscreenElement) {
            document.exitFullscreen?.().catch(() => {});
          }
          closePresentation();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPresentationOpen, nextSlide, prevSlide, togglePlay, toggleFullscreen, closePresentation]);

  if (!isPresentationOpen) return null;

  const slideTitles = [
    t.presentation.slides.intro,
    t.presentation.slides.about,
    t.presentation.slides.skills,
    t.presentation.slides.projects,
    t.presentation.slides.certificates,
    t.presentation.slides.contact,
  ];

  return (
    <div
      id="presentation-container"
      className="fixed inset-0 z-[100] bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white flex flex-col justify-between overflow-hidden select-none font-sans transition-colors duration-300"
    >
      {/* Top Header Bar & Real-time Progress Line */}
      <header className="relative z-20 w-full">
        {/* Progress Line matching portfolio accent */}
        <div className="w-full h-1 bg-zinc-200 dark:bg-zinc-800">
          <div
            className="h-full origin-left transition-all duration-75"
            style={{
              width: `${isPlaying ? timerProgress : 0}%`,
              backgroundColor: 'var(--accent-color, #6366f1)',
              boxShadow: '0 0 10px var(--accent-glow, rgba(99,102,241,0.5))',
            }}
          />
        </div>

        {/* Header Controls */}
        <div className="flex items-center justify-between px-6 sm:px-10 py-3 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border-b border-zinc-200/80 dark:border-white/10">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isPlaying ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isPlaying ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              />
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-700 dark:text-zinc-200">
              {t.presentation.button}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">|</span>
            <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 hidden sm:inline">
              {slideTitles[currentSlide]}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Slide Index Badge */}
            <div className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-xs font-mono text-zinc-700 dark:text-zinc-300">
              {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
              title={isFullscreen ? t.presentation.exitFullscreen : t.presentation.fullscreen}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                if (document.fullscreenElement) {
                  document.exitFullscreen?.().catch(() => {});
                }
                closePresentation();
              }}
              className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-600 dark:text-red-400 transition-colors cursor-pointer"
              title={t.presentation.exit}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Slide Stage (Consistent with Portfolio Theme) */}
      <main className="relative flex-1 w-full max-w-6xl mx-auto px-6 sm:px-12 py-6 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideTransition}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full flex items-center justify-center"
          >
            {currentSlide === 0 && <SlideHero language={language} t={t} />}
            {currentSlide === 1 && <SlideAbout language={language} t={t} />}
            {currentSlide === 2 && <SlideSkills language={language} t={t} />}
            {currentSlide === 3 && <SlideProjects language={language} t={t} />}
            {currentSlide === 4 && <SlideCertificates language={language} t={t} />}
            {currentSlide === 5 && <SlideContact language={language} t={t} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Floating Navigation Dock (Identical to Portfolio Dock Style) */}
      <footer className="relative z-20 w-full px-6 sm:px-10 py-3.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-t border-zinc-200/80 dark:border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Controls: Prev, Play/Pause, Next */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-200 transition-all cursor-pointer active:scale-95"
              title={t.presentation.prev}
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={togglePlay}
              className="px-4 py-2 rounded-xl flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-medium text-xs transition-all cursor-pointer active:scale-95 shadow-md"
              title={isPlaying ? t.presentation.pause : t.presentation.play}
            >
              {isPlaying ? <Pause size={14} className="fill-current" /> : <Play size={14} className="fill-current" />}
              <span>{isPlaying ? t.presentation.pause : t.presentation.play}</span>
            </button>

            <button
              onClick={nextSlide}
              className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-200 transition-all cursor-pointer active:scale-95"
              title={t.presentation.next}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Section Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
            {slideTitles.map((title, idx) => {
              const active = currentSlide === idx;
              return (
                <button
                  key={title}
                  onClick={() => goToSlide(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 shadow-sm font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                  style={{
                    backgroundColor: active ? 'var(--accent-color, #6366f1)' : undefined,
                    color: active ? '#ffffff' : undefined,
                  }}
                >
                  <span className="font-mono text-[10px] opacity-75">{idx + 1}</span>
                  <span className="hidden md:inline">{title}</span>
                </button>
              );
            })}
          </div>

          {/* Keyboard hint */}
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
            <span className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10">Space</span>
            <span>Jeda</span>
            <span className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 ml-1">← →</span>
            <span>Navigasi</span>
            <span className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 ml-1">Esc</span>
            <span>Keluar</span>
          </div>
        </div>
      </footer>
    </div>
  );
});

/* =========================================================================
   AUTHENTIC PORTFOLIO SLIDES (Matching Exact Portfolio Code & Content)
   ========================================================================= */

/** Slide 1: Hero (Fajar Irwansah, UBSI, Live Clock) */
function SlideHero({ language, t }: { language: string; t: any }) {
  const isId = language === 'id';
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-10 md:gap-14">
      {/* Real Portrait Frame with Portfolio Glow & Rocket Badge */}
      <div className="relative shrink-0">
        <div className="relative w-56 h-72 sm:w-64 sm:h-80 group">
          <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] blur-lg opacity-75 transition duration-500" />
          <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden border-2 border-white/20 dark:border-white/10 bg-zinc-200 dark:bg-zinc-800 shadow-2xl">
            <img
              src="/img/fajar.png"
              alt="Fajar Irwansah"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-0 left-0 w-full p-4 text-white">
              <p className="font-bold text-base">Fajar Irwansah</p>
              <p className="text-xs text-white/80 font-mono">Informatics Student & AI Engineer</p>
            </div>
          </div>
          <div className="absolute -top-3 -right-3 w-11 h-11 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-white/10 flex items-center justify-center shadow-lg z-20 rotate-12">
            <span className="text-xl">🚀</span>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="flex-1 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-white/10 bg-white/60 dark:bg-zinc-800/60 text-xs font-mono text-zinc-600 dark:text-zinc-300 mb-4 backdrop-blur-sm shadow-xs">
          <Clock size={13} style={{ color: 'var(--accent-color, #6366f1)' }} />
          <span>
            {time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} WIB
          </span>
          <span className="text-zinc-400">·</span>
          <span className="text-emerald-500 dark:text-emerald-400 font-medium">
            {t.hero.badge}
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-2">
          FAJAR IRWANSAH
        </h1>

        <p
          className="text-lg sm:text-xl font-bold mb-3"
          style={{ color: 'var(--accent-color, #6366f1)' }}
        >
          {t.hero.role} {t.hero.university}
        </p>

        <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
          {t.hero.description}
        </p>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
          {['Python', 'Generative AI', 'Agentic Workflows', 'React', 'TypeScript', 'Tailwind CSS'].map(
            (tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/70 border border-zinc-200 dark:border-white/10 text-xs font-mono text-zinc-700 dark:text-zinc-300"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}

/** Slide 2: About Me (Exact Match with About.tsx & translations.ts) */
function SlideAbout({ language, t }: { language: string; t: any }) {
  return (
    <div className="w-full max-w-5xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">{t.about.title}</h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-mono">
          {t.about.timelineSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Who Am I / Siapa Saya */}
        <div className="p-6 rounded-2xl bg-white/70 dark:bg-zinc-800/60 border border-zinc-200 dark:border-white/10 backdrop-blur-sm shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3.5 mb-4">
              <div className="p-3 rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                <User size={22} />
              </div>
              <h3 className="text-lg font-bold">{t.about.whoAmI}</h3>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              {t.about.whoAmIDesc}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-200/60 dark:border-white/5 flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
            <Sparkles size={14} />
            <span>AI Systems & Web Engineering</span>
          </div>
        </div>

        {/* Card 2: Education / Pendidikan (UBSI S1 Informatika) */}
        <div className="p-6 rounded-2xl bg-white/70 dark:bg-zinc-800/60 border border-zinc-200 dark:border-white/10 backdrop-blur-sm shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3.5 mb-4">
              <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400">
                <GraduationCap size={22} />
              </div>
              <h3 className="text-lg font-bold">{t.about.education}</h3>
            </div>
            <div className="space-y-1.5 text-zinc-600 dark:text-zinc-400 text-sm">
              <span className="block text-zinc-900 dark:text-white font-bold text-base">
                Universitas Bina Sarana Informatika
              </span>
              <span className="block text-sm font-medium text-emerald-600 dark:text-emerald-400">
                S1 Informatika
              </span>
              <span className="block text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                {t.about.semester}
              </span>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-200/60 dark:border-white/5 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <CheckCircle2 size={14} />
            <span>Active Student</span>
          </div>
        </div>

        {/* Card 3: Journey / Perjalanan Saya */}
        <div className="p-6 rounded-2xl bg-white/70 dark:bg-zinc-800/60 border border-zinc-200 dark:border-white/10 backdrop-blur-sm shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3.5 mb-4">
              <div className="p-3 rounded-full bg-rose-500/10 text-rose-500 dark:text-rose-400">
                <Code size={22} />
              </div>
              <h3 className="text-lg font-bold">{t.about.journey}</h3>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-3">
              {t.about.journeyDesc1}
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed opacity-90">
              {t.about.journeyDesc2}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-200/60 dark:border-white/5 flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 font-medium">
            <CheckCircle2 size={14} />
            <span>Open-Source Contributor</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Slide 3: Skills & Tech Stack (Exact Match with Skills.tsx) */
function SlideSkills({ language, t }: { language: string; t: any }) {
  const groups = [
    {
      title: t.skills.aiTitle,
      desc: t.skills.aiDesc,
      icon: Brain,
      tagColor: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10',
      items: ['Python', 'Generative AI & LLMs', 'Agentic Workflows', 'PyTorch', 'TensorFlow', 'LangChain'],
    },
    {
      title: t.skills.webTitle,
      desc: t.skills.webDesc,
      icon: Layers,
      tagColor: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10',
      items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vite', 'Node.js', 'REST APIs'],
    },
    {
      title: t.skills.toolsTitle,
      desc: t.skills.toolsDesc,
      icon: Cpu,
      tagColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10',
      items: ['Git & GitHub', 'Docker', 'Google Cloud Platform', 'Supabase', 'PostgreSQL', 'Linux / Bash'],
    },
  ];

  return (
    <div className="w-full max-w-5xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">{t.skills.title}</h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-mono">
          {t.skills.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {groups.map((grp) => (
          <div
            key={grp.title}
            className="p-6 rounded-2xl bg-white/70 dark:bg-zinc-800/60 border border-zinc-200 dark:border-white/10 backdrop-blur-sm shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2.5 rounded-xl ${grp.tagColor}`}>
                  <grp.icon size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold">{grp.title}</h3>
                </div>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">{grp.desc}</p>

              <div className="flex flex-wrap gap-2">
                {grp.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/5 text-xs font-mono text-zinc-700 dark:text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-200/60 dark:border-white/5 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-mono">
              <span>{grp.items.length} Technologies</span>
              <CheckCircle2 size={14} className="text-emerald-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Slide 4: Real Projects (Exact Match with Projects.tsx) */
function SlideProjects({ language, t }: { language: string; t: any }) {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const activeProj = REAL_PROJECTS[selectedIdx];

  return (
    <div className="w-full max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-1">{t.projects.title}</h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-mono">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Project Selector Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10">
          {REAL_PROJECTS.map((p, idx) => (
            <button
              key={p.title}
              onClick={() => setSelectedIdx(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedIdx === idx
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              {p.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Project Card */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-zinc-800/70 border border-zinc-200 dark:border-white/10 backdrop-blur-md grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-lg">
        {/* Project Screenshot */}
        <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 aspect-video bg-zinc-100 dark:bg-zinc-900 shadow-md group">
          <img
            src={activeProj.image}
            alt={activeProj.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Project Details */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <div
              className="text-xs font-mono font-semibold mb-2"
              style={{ color: 'var(--accent-color, #6366f1)' }}
            >
              {activeProj.role}
            </div>
            <h3 className="text-2xl font-bold mb-3">{activeProj.title}</h3>
            <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-6">
              {activeProj.desc}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {activeProj.tags.map((tg) => (
                <span
                  key={tg}
                  className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/5 text-xs font-mono text-zinc-700 dark:text-zinc-300"
                >
                  {tg}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-zinc-200/60 dark:border-white/10">
            <a
              href={activeProj.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 hover:opacity-90 transition-opacity inline-flex items-center gap-1.5 shadow-sm"
            >
              <span>{t.projects.viewLive}</span>
              <ExternalLink size={13} />
            </a>
            <a
              href={activeProj.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-white/10 transition-colors inline-flex items-center gap-1.5"
            >
              <Github size={14} />
              <span>{t.projects.viewCode}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Slide 5: Certificates (Displays ALL 15 Certificates with filter & scroll) */
function SlideCertificates({ language, t }: { language: string; t: any }) {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Google' | 'Dicoding'>('All');

  const filteredCerts = ALL_CERTIFICATES.filter((cert) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Google') return cert.issuer.toLowerCase().includes('google');
    if (activeFilter === 'Dicoding') return cert.issuer.toLowerCase().includes('dicoding');
    return true;
  });

  const googleCount = ALL_CERTIFICATES.filter((c) => c.issuer.toLowerCase().includes('google')).length;
  const dicodingCount = ALL_CERTIFICATES.filter((c) => c.issuer.toLowerCase().includes('dicoding')).length;

  return (
    <div className="w-full max-w-6xl flex flex-col h-full max-h-[75vh]">
      {/* Slide Header with Total Counter & Issuer Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 shrink-0">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl sm:text-3xl font-bold">{t.certificates.title}</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              {ALL_CERTIFICATES.length} {language === 'id' ? 'Sertifikat Terverifikasi' : 'Verified'}
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
            {t.certificates.subtitle}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setActiveFilter('All')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeFilter === 'All'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold shadow-xs'
                : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            {language === 'id' ? 'Semua' : 'All'} ({ALL_CERTIFICATES.length})
          </button>
          <button
            onClick={() => setActiveFilter('Google')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeFilter === 'Google'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold shadow-xs'
                : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            Google Cloud ({googleCount})
          </button>
          <button
            onClick={() => setActiveFilter('Dicoding')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeFilter === 'Dicoding'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold shadow-xs'
                : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            Dicoding ({dicodingCount})
          </button>
        </div>
      </div>

      {/* Responsive Scrollable Grid Showing All Certificates */}
      <div className="overflow-y-auto pr-2 pb-2 flex-1 max-h-[58vh] sm:max-h-[60vh] scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {filteredCerts.map((cert, idx) => (
            <div
              key={cert.title + idx}
              className="p-3.5 rounded-2xl bg-white/70 dark:bg-zinc-800/60 border border-zinc-200 dark:border-white/10 backdrop-blur-sm shadow-xs hover:border-zinc-300 dark:hover:border-white/20 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail Image */}
                <div className="relative rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 aspect-[16/10] bg-zinc-100 dark:bg-zinc-900 mb-3 shadow-xs">
                  {cert.thumbnail ? (
                    <img
                      src={cert.thumbnail}
                      alt={cert.title}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500">
                      <FileText size={32} className="mb-1 opacity-50" />
                      <span className="text-[10px] uppercase font-mono">PDF Doc</span>
                    </div>
                  )}
                  <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-md bg-white/90 dark:bg-zinc-950/80 backdrop-blur-md text-[10px] font-mono text-emerald-600 dark:text-emerald-400 border border-zinc-200 dark:border-white/10 font-bold">
                    {cert.issuer}
                  </div>
                  <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-zinc-900/80 text-white text-[9px] font-mono">
                    {cert.category}
                  </div>
                </div>

                {/* Title & Metadata */}
                <h3 className="text-xs sm:text-sm font-bold mb-1 line-clamp-2 text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono mb-2">
                  {cert.issuer} · {cert.date}
                </p>
              </div>

              {/* Action Link to PDF */}
              <div className="pt-2 border-t border-zinc-200/60 dark:border-white/5 flex items-center justify-between text-xs mt-auto">
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium text-[11px]">
                  <CheckCircle2 size={12} />
                  <span>Verified</span>
                </span>
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white inline-flex items-center gap-1 text-[11px] font-medium transition-colors"
                >
                  <span>PDF</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Slide 6: Contact & Live QR (Matching Contact.tsx) */
function SlideContact({ language, t }: { language: string; t: any }) {
  const isId = language === 'id';
  const shareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://fajar-irwansah.vercel.app';
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=480x480&margin=12&format=png&data=${encodeURIComponent(
    shareUrl
  )}`;

  return (
    <div className="w-full max-w-4xl p-8 rounded-3xl bg-white/80 dark:bg-zinc-800/70 border border-zinc-200 dark:border-white/10 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-center gap-8 md:gap-12">
      {/* High-Resolution QR Code */}
      <div className="shrink-0 flex flex-col items-center">
        <div className="p-3 bg-white rounded-2xl shadow-lg border border-zinc-200">
          <img src={qrUrl} alt="Portfolio QR Code" className="w-44 h-44 sm:w-52 sm:h-52 object-contain" />
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
          <QrCode size={14} style={{ color: 'var(--accent-color, #6366f1)' }} />
          <span>{isId ? 'Pindai untuk membuka portofolio' : 'Scan to open portfolio'}</span>
        </div>
      </div>

      {/* Contact Content */}
      <div className="flex-1 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-xs text-zinc-600 dark:text-zinc-300 font-mono mb-4">
          <Sparkles size={13} style={{ color: 'var(--accent-color, #6366f1)' }} />
          <span>{t.contact.title}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
          {isId ? 'Terima Kasih!' : 'Thank You!'}
        </h2>

        <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
          {t.contact.subtitle}
        </p>

        <div className="flex flex-col gap-2.5">
          <a
            href="mailto:fajarirwansah15@gmail.com"
            className="px-4 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold text-sm hover:opacity-90 transition-opacity inline-flex items-center justify-center md:justify-start gap-2.5 shadow-sm"
          >
            <Mail size={16} />
            <span>fajarirwansah15@gmail.com</span>
          </a>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            <a
              href="https://github.com/JarsXen"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-200 font-medium text-xs transition-colors inline-flex items-center gap-2"
            >
              <Github size={15} />
              <span>GitHub: @JarsXen</span>
            </a>

            <a
              href="https://www.linkedin.com/in/fajar-irwansah"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-200 font-medium text-xs transition-colors inline-flex items-center gap-2"
            >
              <span>LinkedIn: Fajar Irwansah</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
