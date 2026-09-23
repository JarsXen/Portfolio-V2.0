import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Theme, translations } from '../data/translations';

export type AccentColor = 'indigo' | 'emerald' | 'cyan' | 'rose' | 'amber';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
  isShareOpen: boolean;
  setIsShareOpen: (open: boolean) => void;
  openShare: () => void;
  closeShare: () => void;
  isPresentationOpen: boolean;
  setIsPresentationOpen: (open: boolean) => void;
  openPresentation: () => void;
  closePresentation: () => void;
  t: typeof translations['en'];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');
  const [accentColor, setAccentColor] = useState<AccentColor>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_accent_color');
      if (saved && ['indigo', 'emerald', 'cyan', 'rose', 'amber'].includes(saved)) {
        return saved as AccentColor;
      }
    }
    return 'indigo';
  });
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState<boolean>(false);

  const openShare = () => setIsShareOpen(true);
  const closeShare = () => setIsShareOpen(false);
  const openPresentation = () => setIsPresentationOpen(true);
  const closePresentation = () => setIsPresentationOpen(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('data-accent', accentColor);
    try {
      localStorage.setItem('portfolio_accent_color', accentColor);
    } catch {
      // quota or private mode
    }
  }, [accentColor]);

  const value = {
    language,
    setLanguage,
    theme,
    setTheme,
    accentColor,
    setAccentColor,
    isShareOpen,
    setIsShareOpen,
    openShare,
    closeShare,
    isPresentationOpen,
    setIsPresentationOpen,
    openPresentation,
    closePresentation,
    t: translations[language],
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
