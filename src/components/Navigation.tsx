import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { Home, User, Briefcase, Mail, X, Award } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';

export default function Navigation() {
  const { t } = useApp();
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.nav.home, icon: Home },
    { id: 'about', label: t.nav.about, icon: User },
    { id: 'projects', label: t.nav.projects, icon: Briefcase },
    { id: 'certificates', label: t.nav.certificates, icon: Award },
    { id: 'contact', label: t.nav.contact, icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-end gap-4 px-4 py-3 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-white/10 shadow-2xl shadow-black/10 dark:shadow-black/50 transition-colors duration-300">
        {navItems.map((item) => (
          <DockItem
            key={item.id}
            item={item}
            isActive={activeSection === item.id}
            onClick={() => scrollToSection(item.id)}
          />
        ))}
      </div>

      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute bottom-16 right-0 mb-2 flex flex-col gap-2 min-w-[160px]"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-md border transition-colors shadow-lg ${
                    activeSection === item.id
                      ? 'bg-zinc-900 dark:bg-white/10 border-zinc-900 dark:border-white/20 text-white'
                      : 'bg-white/90 dark:bg-zinc-900/90 border-zinc-200 dark:border-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black shadow-lg shadow-indigo-500/20 hover:scale-110 transition-transform active:scale-95"
        >
          {isMobileMenuOpen ? <X size={24} /> : <div className="grid grid-cols-2 gap-1 w-6 h-6">
            <div className="bg-current rounded-sm"></div>
            <div className="bg-current rounded-sm"></div>
            <div className="bg-current rounded-sm"></div>
            <div className="bg-current rounded-sm"></div>
          </div>}
        </button>
      </div>
    </>
  );
}

function DockItem({ item, isActive, onClick }: { item: any, isActive: boolean, onClick: () => void }) {
  const mouseX = useMotionValue(Infinity);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => {
        mouseX.set(Infinity);
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onClick={onClick}
      className="relative flex flex-col items-center justify-center"
    >
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
            animate={{ opacity: 1, y: -50, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 top-0 px-2 py-1 rounded-md bg-zinc-800/90 dark:bg-zinc-800/90 backdrop-blur-sm text-[10px] font-medium text-white border border-white/10 shadow-lg pointer-events-none whitespace-nowrap z-50"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>

      <DockIcon mouseX={mouseX} icon={item.icon} isActive={isActive} />
      
      {isActive && (
        <motion.div
          layoutId="activeDock"
          className="absolute -bottom-2 w-1 h-1 rounded-full bg-zinc-900 dark:bg-white"
        />
      )}
    </motion.button>
  );
}

function DockIcon({ mouseX, icon: Icon, isActive }: { mouseX: any, icon: any, isActive: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      className={`aspect-square rounded-full flex items-center justify-center transition-colors ${
        isActive ? 'bg-zinc-900 dark:bg-white/10 text-white' : 'bg-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
      }`}
    >
      <Icon size={20} className="w-1/2 h-1/2" />
    </motion.div>
  );
}
