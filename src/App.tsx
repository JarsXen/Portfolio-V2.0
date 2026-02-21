import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import SettingsToggle from './components/SettingsToggle';
import AllCertificates from './components/AllCertificates';
import { AppProvider } from './contexts/AppContext';
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';

function MainContent({ onViewAllCertificates }: { onViewAllCertificates: () => void }) {
  return (
    <>
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Certificates onViewAll={onViewAllCertificates} />
      <Contact />
    </>
  );
}

export default function App() {
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  return (
    <AppProvider>
      <main className="bg-zinc-50 dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-white selection:bg-indigo-500/30 transition-colors duration-300 overflow-x-hidden">
        <SettingsToggle />
        <AnimatePresence mode="wait">
          {showAllCertificates ? (
            <AllCertificates key="all-certs" onBack={() => setShowAllCertificates(false)} />
          ) : (
            <MainContent key="main" onViewAllCertificates={() => setShowAllCertificates(true)} />
          )}
        </AnimatePresence>
      </main>
    </AppProvider>
  );
}
