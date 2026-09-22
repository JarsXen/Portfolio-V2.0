import { motion } from 'motion/react';
import { GraduationCap, School, BookOpen, Sparkles } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function Timeline() {
  const { language, t } = useApp();

  const timelineData = [
    {
      period: language === 'id' ? '2026 — Sekarang' : '2026 — Present',
      current: true,
      institution: 'Universitas Bina Sarana Informatika (UBSI)',
      degree: language === 'id' ? 'S1 Informatika (Pindah Kampus)' : 'B.S. in Informatics (Transfer)',
      description:
        language === 'id'
          ? 'Melanjutkan studi S1 Informatika dengan fokus mendalam pada AI Engineering, arsitektur Generative AI, Agentic Workflows, serta implementasi Cloud.'
          : 'Continuing Informatics degree focusing on AI Engineering, Generative AI architectures, Agentic Workflows, and Cloud systems.',
      icon: Sparkles,
      tag: language === 'id' ? 'Kampus Terkini' : 'Current Focus',
      color: 'from-indigo-500 to-violet-500',
    },
    {
      period: '2025 — 2026',
      current: false,
      institution: 'Universitas Ahmad Dahlan (UAD)',
      degree: language === 'id' ? 'S1 Informatika' : 'B.S. in Informatics',
      description:
        language === 'id'
          ? 'Membangun fondasi akademik di bidang ilmu komputer, algoritma dasar, struktur data, dan rekayasa perangkat lunak.'
          : 'Built core academic foundations in computer science, introductory algorithms, data structures, and software engineering.',
      icon: GraduationCap,
      tag: language === 'id' ? 'Perguruan Tinggi' : 'Higher Ed',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      period: '2022 — 2025',
      current: false,
      institution: 'SMAN 95 Jakarta',
      degree: language === 'id' ? 'Sekolah Menengah Atas (SMA)' : 'Senior High School',
      description:
        language === 'id'
          ? 'Menyelesaikan jenjang SMA dengan minat aktif di bidang sains, logika analitis, dan eksplorasi awal pemrograman web modern.'
          : 'Graduated senior high school with active curiosity in sciences, analytical logic, and modern web programming experiments.',
      icon: BookOpen,
      tag: 'SMA',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      period: '2019 — 2022',
      current: false,
      institution: 'SMPN 186 Jakarta',
      degree: language === 'id' ? 'Sekolah Menengah Pertama (SMP)' : 'Junior High School',
      description:
        language === 'id'
          ? 'Masa awal eksplorasi dunia komputasi, perangkat lunak, dan literasi teknologi digital secara mandiri.'
          : 'Early stages of exploring computing, software tools, and digital technology literacy.',
      icon: School,
      tag: 'SMP',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      period: language === 'id' ? 'Sebelum 2019' : 'Prior to 2019',
      current: false,
      institution: 'SDN 04 Pagi',
      degree: language === 'id' ? 'Sekolah Dasar (SD)' : 'Elementary School',
      description:
        language === 'id'
          ? 'Fondasi pendidikan dasar formal awal dalam belajar dan berkomunikasi.'
          : 'Primary educational foundation in communication and initial learning.',
      icon: School,
      tag: 'SD',
      color: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <div className="mt-16 pt-12 border-t border-zinc-200 dark:border-white/10">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h3 className="text-2xl md:text-3xl font-bold mb-3 text-zinc-900 dark:text-white">
          {t.about.timelineTitle}
        </h3>
        <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400">
          {t.about.timelineSubtitle}
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Central timeline line */}
        <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-indigo-500 via-purple-500/40 to-zinc-300 dark:to-zinc-800" />

        <div className="space-y-8">
          {timelineData.map((item, index) => {
            const Icon = item.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-start gap-6 sm:gap-0 ${
                  isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Timeline node icon */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-900 shadow-md ${
                      item.current
                        ? 'bg-gradient-to-tr from-indigo-500 to-pink-500 text-white shadow-indigo-500/30 ring-4 ring-indigo-500/20'
                        : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                </div>

                {/* Content card */}
                <div
                  className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${
                    isEven ? 'sm:pr-10 sm:text-right' : 'sm:pl-10 sm:text-left'
                  }`}
                >
                  <div className="p-5 rounded-2xl bg-white/70 dark:bg-zinc-800/60 border border-zinc-200 dark:border-white/5 backdrop-blur-sm shadow-sm hover:border-indigo-500/30 transition-all group">
                    <div
                      className={`flex items-center gap-2 mb-1.5 flex-wrap ${
                        isEven ? 'sm:justify-end' : 'sm:justify-start'
                      }`}
                    >
                      <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2.5 py-0.5 rounded-full">
                        {item.period}
                      </span>
                      <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-white/5 px-2 py-0.5 rounded-md">
                        {item.tag}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {item.institution}
                    </h4>

                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      {item.degree}
                    </p>

                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
