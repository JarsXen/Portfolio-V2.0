import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Languages } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function SettingsToggle() {
  const { theme, setTheme, language, setLanguage } = useApp();

  return (
    <div className="fixed top-6 right-6 z-50 flex gap-3">
      <button
        onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
        className="p-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-zinc-200 dark:border-white/10 shadow-lg hover:scale-105 transition-transform text-zinc-800 dark:text-white"
        title="Switch Language"
      >
        <div className="relative w-6 h-6 flex items-center justify-center font-bold text-xs">
          <AnimatePresence mode="wait">
            <motion.span
              key={language}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {language.toUpperCase()}
            </motion.span>
          </AnimatePresence>
        </div>
      </button>

      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="p-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-zinc-200 dark:border-white/10 shadow-lg hover:scale-105 transition-transform text-zinc-800 dark:text-white"
        title="Switch Theme"
      >
        <div className="relative w-6 h-6">
          <AnimatePresence mode="wait">
            {theme === 'light' ? (
              <motion.div
                key="sun"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                <Sun size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                <Moon size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>
    </div>
  );
}
