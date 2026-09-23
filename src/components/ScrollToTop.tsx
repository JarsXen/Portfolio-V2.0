import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const ScrollToTop = memo(function ScrollToTop() {
  const { t, isPresentationOpen } = useApp();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
          
          setProgress(currentProgress);
          setIsVisible(scrollY > 250);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG circle calculations (radius 18, circumference ~113.097)
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;
  const percentage = Math.round(progress * 100);

  if (isPresentationOpen) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          id="scroll-to-top-btn"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', damping: 20, stiffness: 350 }}
          aria-label={t.scrollToTop}
          title={`${t.scrollToTop} (${percentage}%)`}
          className="fixed bottom-22 right-6 md:bottom-8 md:right-8 z-40 w-12 h-12 rounded-full bg-white/90 dark:bg-zinc-900/90 text-zinc-800 dark:text-zinc-100 shadow-xl border border-zinc-200/80 dark:border-white/10 backdrop-blur-md flex items-center justify-center cursor-pointer group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          {/* Circular SVG Progress Ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1"
            viewBox="0 0 44 44"
          >
            {/* Background track circle */}
            <circle
              cx="22"
              cy="22"
              r={radius}
              className="text-zinc-200/80 dark:text-zinc-800/80"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Progress indicator circle */}
            <circle
              cx="22"
              cy="22"
              r={radius}
              style={{
                stroke: 'var(--accent-color, #6366f1)',
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
                transition: 'stroke-dashoffset 80ms ease-out, stroke 200ms ease',
              }}
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Center Arrow Icon */}
          <ArrowUp
            size={18}
            className="relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5"
            style={{ color: 'var(--accent-color, #6366f1)' }}
          />

          {/* Floating percentage badge on hover */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-[10px] font-mono font-bold opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-md">
            {percentage}%
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
});
