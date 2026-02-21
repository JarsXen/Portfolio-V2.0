import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';

export default function Hero() {
  const { t } = useApp();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white perspective-1000 transition-colors duration-300">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-200/50 via-zinc-50 to-zinc-50 dark:from-zinc-800/20 dark:via-zinc-950 dark:to-zinc-950" />
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 inline-block"
        >
          <span className="px-3 py-1 rounded-full border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-sm text-zinc-600 dark:text-zinc-400 backdrop-blur-sm shadow-sm font-mono">
            {time.toLocaleString('en-US', { 
              weekday: 'short', 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit', 
              second: '2-digit' 
            })}
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-500 dark:from-white dark:via-white dark:to-white/50"
        >
          FAJAR IRWANSAH
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-light"
        >
          {t.hero.role} <span className="text-zinc-900 dark:text-white font-medium">{t.hero.university}</span>.
        </motion.p>
      </motion.div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingShape 
          className="absolute top-1/4 left-10 w-24 h-24 border border-zinc-200 dark:border-white/10 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-sm" 
          delay={0} 
          duration={7}
        />
        <FloatingShape 
          className="absolute bottom-1/4 right-10 w-32 h-32 border border-zinc-200 dark:border-white/10 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-sm" 
          delay={1} 
          duration={9}
        />
        <FloatingShape 
          className="absolute top-1/3 right-1/4 w-16 h-16 border border-zinc-200 dark:border-white/5 rotate-45 bg-white/10 dark:bg-white/5 backdrop-blur-sm" 
          delay={2} 
          duration={6}
        />
        <FloatingShape 
          className="absolute bottom-1/3 left-1/4 w-20 h-20 border border-zinc-200 dark:border-white/5 rounded-lg bg-white/10 dark:bg-white/5 backdrop-blur-sm" 
          delay={1.5} 
          duration={8}
        />
      </div>
    </section>
  );
}

function FloatingShape({ className, delay, duration }: { className?: string, delay: number, duration: number }) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -40, 0],
        rotateX: [0, 20, 0],
        rotateY: [0, 20, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
      style={{ transformStyle: "preserve-3d" }}
    />
  );
}
