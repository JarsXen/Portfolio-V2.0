import { motion } from 'motion/react';
import { GraduationCap, Code, User } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function About() {
  const { t } = useApp();

  return (
    <section id="about" className="py-24 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 via-zinc-100 to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 -z-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{t.about.title}</h2>
          
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-1/3 flex justify-center"
            >
              <div className="relative w-64 h-80 group">
                <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] blur-lg opacity-75 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
                
                <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden border-2 border-white/20 dark:border-white/10 bg-zinc-200 dark:bg-zinc-800 shadow-2xl">
                  <img 
                    src="/img/fajar.png" 
                    alt="Fajar Irwansah" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-bold text-lg">Fajar Irwansah</p>
                    <p className="text-xs text-white/80 font-mono">Informatics Student</p>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-white/10 flex items-center justify-center shadow-lg z-20 rotate-12 group-hover:rotate-0 transition-transform duration-300">
                  <span className="text-2xl">🚀</span>
                </div>
              </div>
            </motion.div>

            <div className="w-full lg:w-2/3 grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-white/5 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-zinc-800/80 transition-colors shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                    <User size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">{t.about.whoAmI}</h3>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t.about.whoAmIDesc}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-white/5 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-zinc-800/80 transition-colors shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400">
                    <GraduationCap size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">{t.about.education}</h3>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400">
                  <span className="block text-zinc-900 dark:text-white font-medium">Universitas Ahmad Dahlan</span>
                  <span className="block text-sm mt-1">S1 Informatika</span>
                  <span className="block text-sm mt-1 text-zinc-500">{t.about.semester}</span>
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-white/5 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-zinc-800/80 transition-colors h-full shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-rose-500/10 text-rose-500 dark:text-rose-400">
                  <Code size={24} />
                </div>
                <h3 className="text-xl font-semibold">{t.about.journey}</h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                {t.about.journeyDesc1}
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t.about.journeyDesc2}
              </p>
            </div>
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
