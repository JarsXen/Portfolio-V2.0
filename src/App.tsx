import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import SettingsToggle from './components/SettingsToggle';
import ScrollProgress from './components/ScrollProgress';
import { AppProvider } from './contexts/AppContext';
import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'motion/react';

// Code-splitting for non-critical views
const AllCertificates = lazy(() => import('./components/AllCertificates'));
const NotFound = lazy(() => import('./components/NotFound'));

function LazyLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="w-8 h-8 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
    </div>
  );
}

function MainContent({ onViewAllCertificates }: { onViewAllCertificates: () => void }) {
  return (
    <>
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates onViewAll={onViewAllCertificates} />
      <Contact />
    </>
  );
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);
  const [showAllCertificates, setShowAllCertificates] = useState(
    () => window.location.pathname === '/certificates' || window.location.pathname === '/all-certificates'
  );

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      setCurrentPath(path);
      if (path === '/certificates' || path === '/all-certificates') {
        setShowAllCertificates(true);
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } else if (path === '/' || path === '' || path === '/index.html') {
        setShowAllCertificates(false);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const isHomePath = currentPath === '/' || currentPath === '' || currentPath === '/index.html';
  const isCertsPath = currentPath === '/certificates' || currentPath === '/all-certificates';
  const isInvalidPath = !isHomePath && !isCertsPath;

  const handleNavigateHome = (sectionId?: string) => {
    const targetUrl = sectionId && sectionId !== 'home' ? `/#${sectionId}` : '/';
    window.history.pushState({}, '', targetUrl);
    setCurrentPath('/');
    setShowAllCertificates(false);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleOpenCertificates = () => {
    window.history.pushState({}, '', '/certificates');
    setCurrentPath('/certificates');
    setShowAllCertificates(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleBackFromCertificates = () => {
    window.history.pushState({}, '', '/#certificates');
    setCurrentPath('/');
    setShowAllCertificates(false);
    setTimeout(() => {
      const el = document.getElementById('certificates');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <AppProvider>
      <main className="bg-zinc-50 dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-white selection:bg-indigo-500/30 transition-colors duration-300 overflow-x-hidden">
        <ScrollProgress />
        <SettingsToggle />
        <AnimatePresence mode="wait">
          {isInvalidPath ? (
            <Suspense fallback={<LazyLoader />}>
              <NotFound
                key="not-found"
                currentPath={currentPath}
                onNavigateHome={handleNavigateHome}
              />
            </Suspense>
          ) : showAllCertificates ? (
            <Suspense fallback={<LazyLoader />}>
              <AllCertificates
                key="all-certs"
                onBack={handleBackFromCertificates}
              />
            </Suspense>
          ) : (
            <MainContent
              key="main"
              onViewAllCertificates={handleOpenCertificates}
            />
          )}
        </AnimatePresence>
      </main>
    </AppProvider>
  );
}
