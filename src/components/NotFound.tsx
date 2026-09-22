import { motion } from 'motion/react';
import { ArrowLeft, Compass, Home, Briefcase, Award, Mail, Terminal } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface NotFoundProps {
  currentPath?: string;
  onNavigateHome: (sectionId?: string) => void;
}

export default function NotFound({ currentPath = window.location.pathname, onNavigateHome }: NotFoundProps) {
  const { t } = useApp();

  const quickLinks = [
    { label: t.nav.home, icon: Home, id: 'home' },
    { label: t.nav.projects, icon: Briefcase, id: 'projects' },
    { label: t.nav.certificates, icon: Award, id: 'certificates' },
    { label: t.nav.contact, icon: Mail, id: 'contact' },
  ];

  return (
    <div
      id="not-found-page"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300"
    >
      {/* Background Matrix & Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-zinc-50/50 to-zinc-50 dark:from-indigo-500/15 dark:via-zinc-950/80 dark:to-zinc-950" />
        <div className="absolute top-0 left-0 w-full h-full opacity-25 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* Main Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-xl w-full text-center flex flex-col items-center"
      >
        {/* Status Badge */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span className="text-xs font-mono tracking-wider uppercase text-zinc-600 dark:text-zinc-400">
            {t.notFound.badge}
          </span>
        </motion.div>

        {/* Big Creative 404 Display */}
        <div className="relative mb-6 select-none">
          {/* Subtle glowing halo behind numbers */}
          <div className="absolute inset-0 -inset-x-8 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full opacity-60 dark:opacity-40" />
          
          <div className="relative flex items-center justify-center">
            <span className="text-8xl sm:text-9xl font-black tracking-tighter text-zinc-900 dark:text-white font-mono">
              4
            </span>
            
            {/* Animated Centerpiece Compass / Radar */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="mx-2 sm:mx-4 w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-dashed border-indigo-500/40 dark:border-indigo-400/40 flex items-center justify-center bg-indigo-500/5 dark:bg-indigo-500/10 backdrop-blur-sm"
            >
              <Compass className="w-10 h-10 sm:w-14 sm:h-14 text-indigo-600 dark:text-indigo-400" strokeWidth={1.5} />
            </motion.div>

            <span className="text-8xl sm:text-9xl font-black tracking-tighter text-zinc-900 dark:text-white font-mono">
              4
            </span>
          </div>
        </div>

        {/* Title and Subtitle */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          {t.notFound.title}
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-md mx-auto mb-6 leading-relaxed">
          {t.notFound.subtitle}
        </p>

        {/* Terminal Debug Info */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full max-w-md mb-8 rounded-xl border border-zinc-200 dark:border-white/10 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md p-3.5 text-left font-mono text-xs shadow-sm"
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-200 dark:border-white/10 text-zinc-400">
            <span className="flex items-center gap-1.5 text-[11px]">
              <Terminal size={12} className="text-indigo-500" />
              navigation_exception.log
            </span>
            <span className="text-[10px] uppercase text-zinc-400">HTTP 404</span>
          </div>
          <div className="space-y-1 text-zinc-600 dark:text-zinc-300">
            <p>
              <span className="text-zinc-400">&gt;</span> path:{' '}
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold break-all">
                "{currentPath}"
              </span>
            </p>
            <p>
              <span className="text-zinc-400">&gt;</span> resolution:{' '}
              <span className="text-rose-500 dark:text-rose-400">unresolved route</span>
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md justify-center mb-10">
          <button
            id="back-home-button"
            onClick={() => onNavigateHome()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium text-sm hover:opacity-90 active:scale-95 transition-all shadow-md shadow-indigo-500/10 cursor-pointer"
          >
            <ArrowLeft size={16} />
            {t.notFound.backHome}
          </button>
        </div>

        {/* Quick Links */}
        <div className="w-full max-w-md pt-6 border-t border-zinc-200 dark:border-white/10">
          <p className="text-xs uppercase tracking-wider font-mono text-zinc-400 dark:text-zinc-500 mb-3">
            {t.notFound.quickLinksTitle}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {quickLinks.map((link) => (
              <button
                key={link.id}
                id={`quick-link-${link.id}`}
                onClick={() => onNavigateHome(link.id)}
                className="flex items-center justify-center gap-2 p-2.5 rounded-lg border border-zinc-200 dark:border-white/5 bg-white/40 dark:bg-white/[0.02] hover:bg-zinc-100 dark:hover:bg-white/10 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
              >
                <link.icon size={14} className="text-indigo-500" />
                <span>{link.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Creative Philosophy Quote */}
        <p className="mt-8 text-xs italic text-zinc-400 dark:text-zinc-600 max-w-sm">
          {t.notFound.quote}
        </p>
      </motion.div>
    </div>
  );
}
