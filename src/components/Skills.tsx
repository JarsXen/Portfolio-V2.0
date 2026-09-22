import { motion } from 'motion/react';
import {
  Brain,
  Code2,
  Cloud,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  GitBranch,
  Database,
  Bot,
  Binary,
  ArrowUpRight,
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface TechItem {
  name: string;
  focus: string;
  icon: typeof Terminal;
  highlight?: boolean;
}

interface SkillGroup {
  id: string;
  titleKey: 'aiTitle' | 'webTitle' | 'toolsTitle';
  descKey: 'aiDesc' | 'webDesc' | 'toolsDesc';
  icon: typeof Brain;
  accent: string;
  tagColor: string;
  items: TechItem[];
}

export default function Skills() {
  const { t } = useApp();

  const skillGroups: SkillGroup[] = [
    {
      id: 'ai',
      titleKey: 'aiTitle',
      descKey: 'aiDesc',
      icon: Brain,
      accent: 'border-indigo-500/20 hover:border-indigo-500/50',
      tagColor: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10',
      items: [
        { name: 'Python', focus: 'AI & Data Core', icon: Terminal, highlight: true },
        { name: 'Generative AI & LLMs', focus: 'Prompts & APIs', icon: Brain, highlight: true },
        { name: 'Agentic Workflows', focus: 'Autonomous Systems', icon: Bot, highlight: true },
        { name: 'PyTorch', focus: 'Model Training', icon: Cpu },
        { name: 'Vertex AI & GCP AI', focus: 'Cloud Inference', icon: Cloud },
        { name: 'Data Science & Fabric', focus: 'Analytics', icon: Binary },
      ],
    },
    {
      id: 'web',
      titleKey: 'webTitle',
      descKey: 'webDesc',
      icon: Code2,
      accent: 'border-sky-500/20 hover:border-sky-500/50',
      tagColor: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10',
      items: [
        { name: 'TypeScript', focus: 'Type-Safe Architecture', icon: Code2, highlight: true },
        { name: 'React 18+', focus: 'Component Systems', icon: Layers, highlight: true },
        { name: 'Tailwind CSS', focus: 'Modern UI & Design', icon: Sparkles },
        { name: 'Vite & Next.js', focus: 'Build Tooling', icon: Terminal },
        { name: 'REST & Web APIs', focus: 'Client Integration', icon: ArrowUpRight },
      ],
    },
    {
      id: 'cloud',
      titleKey: 'toolsTitle',
      descKey: 'toolsDesc',
      icon: Cloud,
      accent: 'border-emerald-500/20 hover:border-emerald-500/50',
      tagColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10',
      items: [
        { name: 'Google Cloud Platform', focus: 'Cloud Compute', icon: Cloud, highlight: true },
        { name: 'Cloud Run & Containers', focus: 'Deployment', icon: Layers },
        { name: 'Git & GitHub', focus: 'Version Control', icon: GitBranch },
        { name: 'Cloud SQL / PostgreSQL', focus: 'Relational DB', icon: Database },
        { name: 'CI/CD Pipelines', focus: 'Automation', icon: Terminal },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="py-24 relative bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Clean, Non-Gimmicky Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            {t.skills.title}
          </h2>
          <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {t.skills.subtitle}
          </p>
        </motion.div>

        {/* 3 Balanced Domain Columns */}
        <div className="grid gap-6 lg:grid-cols-3">
          {skillGroups.map((group, groupIdx) => {
            const GroupIcon = group.icon;
            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
                className={`flex flex-col p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border ${group.accent} backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md`}
              >
                {/* Group Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-zinc-100 dark:bg-white/5 text-zinc-800 dark:text-zinc-200">
                    <GroupIcon size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                      {t.skills[group.titleKey]}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
                  {t.skills[group.descKey]}
                </p>

                {/* Tech Items List */}
                <div className="space-y-2 flex-1">
                  {group.items.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <div
                        key={item.name}
                        className="group flex items-center justify-between p-2.5 rounded-xl border border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-800/30 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 hover:border-zinc-300 dark:hover:border-white/10 transition-all duration-200"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <ItemIcon
                            size={15}
                            className="text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors shrink-0"
                          />
                          <span className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate">
                            {item.name}
                          </span>
                        </div>

                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-md shrink-0 ml-2 ${
                            item.highlight
                              ? group.tagColor
                              : 'text-zinc-500 dark:text-zinc-400 bg-zinc-200/50 dark:bg-white/5'
                          }`}
                        >
                          {item.focus}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
