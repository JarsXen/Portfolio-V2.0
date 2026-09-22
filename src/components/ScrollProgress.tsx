import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <div
      id="scroll-progress-container"
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none"
    >
      {/* Background track (optional subtle transparency) */}
      <div className="absolute inset-0 bg-transparent" />

      {/* Animated progress indicator */}
      <motion.div
        id="scroll-progress-bar"
        style={{ scaleX }}
        className="h-full w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 origin-left shadow-[0_0_8px_rgba(99,102,241,0.4)]"
      />
    </div>
  );
}
