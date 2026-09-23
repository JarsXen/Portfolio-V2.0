import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Share2, Palette, Check, Presentation } from 'lucide-react';
import { useApp, AccentColor } from '../contexts/AppContext';

interface AccentOption {
  id: AccentColor;
  labelKey: keyof typeof import('../data/translations').translations['en']['customizer']['colors'];
  color: string;
  glow: string;
}

const ACCENT_OPTIONS: AccentOption[] = [
  { id: 'indigo', labelKey: 'indigo', color: '#6366f1', glow: 'rgba(99, 102, 241, 0.4)' },
  { id: 'emerald', labelKey: 'emerald', color: '#10b981', glow: 'rgba(16, 185, 129, 0.4)' },
  { id: 'cyan', labelKey: 'cyan', color: '#06b6d4', glow: 'rgba(6, 182, 212, 0.4)' },
  { id: 'rose', labelKey: 'rose', color: '#f43f5e', glow: 'rgba(244, 63, 94, 0.4)' },
  { id: 'amber', labelKey: 'amber', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)' },
];

export default function SettingsToggle() {
  const { theme, setTheme, language, setLanguage, openShare, accentColor, setAccentColor, openPresentation, t } = useApp();
  const [isColorPickerOpen, setIsColorPickerOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or escape
  useEffect(() => {
    if (!isColorPickerOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsColorPickerOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsColorPickerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isColorPickerOpen]);

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-2 sm:gap-2.5">
      {/* Accent Color Customizer Button & Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsColorPickerOpen((prev) => !prev)}
          className="p-3 rounded-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 shadow-lg hover:scale-105 active:scale-95 transition-all text-zinc-800 dark:text-white group cursor-pointer relative"
          title={t.customizer.tooltip}
          aria-label={t.customizer.tooltip}
          aria-expanded={isColorPickerOpen}
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <Palette size={18} className="group-hover:rotate-45 transition-transform duration-300" />
            {/* Active accent color pip */}
            <span
              className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ring-2 ring-white dark:ring-zinc-900 transition-colors"
              style={{ backgroundColor: 'var(--accent-color, #6366f1)' }}
            />
          </div>
        </button>

        {/* Color Palette Popover */}
        <AnimatePresence>
          {isColorPickerOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: 'spring', damping: 22, stiffness: 350 }}
              className="absolute right-0 mt-3 p-3.5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200 dark:border-white/10 shadow-2xl z-50 min-w-[190px]"
            >
              <div className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2.5 px-1 flex items-center justify-between">
                <span>{t.customizer.title}</span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {ACCENT_OPTIONS.map((opt) => {
                  const isSelected = accentColor === opt.id;
                  const label = t.customizer.colors[opt.labelKey];

                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setAccentColor(opt.id);
                        setIsColorPickerOpen(false);
                      }}
                      className="group/btn relative w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer focus:outline-hidden"
                      title={label}
                      aria-label={label}
                    >
                      {/* Selection Ring */}
                      {isSelected && (
                        <motion.span
                          layoutId="accent-ring"
                          className="absolute -inset-1 rounded-full border-2 transition-colors"
                          style={{ borderColor: opt.color }}
                          transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                        />
                      )}

                      {/* Color Circle */}
                      <span
                        className="w-7 h-7 rounded-full shadow-sm flex items-center justify-center transition-transform group-hover/btn:scale-110"
                        style={{
                          backgroundColor: opt.color,
                          boxShadow: isSelected ? `0 0 10px ${opt.glow}` : undefined,
                        }}
                      >
                        {isSelected && <Check size={13} className="text-white drop-shadow-sm" strokeWidth={3} />}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Color Name */}
              <div className="mt-2.5 pt-2 border-t border-zinc-100 dark:border-white/5 text-[11px] text-center font-medium text-zinc-600 dark:text-zinc-400">
                {t.customizer.colors[accentColor as keyof typeof t.customizer.colors]}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Presentation / Slideshow Mode Button - Only shown on PC / Desktop (md: 768px+) */}
      <button
        onClick={openPresentation}
        className="hidden md:flex p-3 rounded-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 shadow-lg hover:scale-105 active:scale-95 transition-all text-zinc-800 dark:text-white group cursor-pointer items-center justify-center"
        title={t.presentation.button}
        aria-label={t.presentation.button}
      >
        <div className="relative w-6 h-6 flex items-center justify-center">
          <Presentation size={18} className="group-hover:scale-110 transition-transform text-zinc-700 dark:text-zinc-200" />
        </div>
      </button>

      {/* Share & QR Code Button */}
      <button
        onClick={openShare}
        className="p-3 rounded-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 shadow-lg hover:scale-105 active:scale-95 transition-all text-zinc-800 dark:text-white group cursor-pointer"
        title={t.share.buttonTitle}
        aria-label={t.share.buttonTitle}
      >
        <div className="relative w-6 h-6 flex items-center justify-center">
          <Share2 size={18} className="group-hover:rotate-12 transition-transform" />
        </div>
      </button>

      {/* Language Switcher */}
      <button
        onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
        className="p-3 rounded-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 shadow-lg hover:scale-105 active:scale-95 transition-all text-zinc-800 dark:text-white cursor-pointer"
        title="Switch Language"
        aria-label="Switch Language"
      >
        <div className="relative w-6 h-6 flex items-center justify-center font-bold text-xs tracking-wider">
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

      {/* Theme Switcher (Dark/Light) */}
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="p-3 rounded-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 shadow-lg hover:scale-105 active:scale-95 transition-all text-zinc-800 dark:text-white cursor-pointer"
        title="Switch Theme"
        aria-label="Switch Theme"
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
                className="absolute inset-0 flex items-center justify-center"
              >
                <Sun size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Moon size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>
    </div>
  );
}
