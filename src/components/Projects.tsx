import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { MouseEvent } from 'react';
import { useApp } from '../contexts/AppContext';

const projects = [
  {
    title: "SORA - Sobat Rantau",
    description: "SORA (Sobat Rantau) is a React-based web application specifically designed to help the mental health and productivity of students living away from home.",
    image: "/img/SORA.png",
    tags: ["React", "Tailwind", "Vite"],
    link: "https://sora-sobat-rantau.vercel.app/",
    github: "https://github.com/JarsXen/SORA---SOBAT-RANTAU.git"
  },
  {
    title: "EcoDigital Nusantara",
    description: "Mobile-first responsive design for a local business.",
    image: "/img/EcoDigital.png",
    tags: ["React", "Tailwind", "Vite"],
    link: "https://ecodigitalnusantara.vercel.app/",
    github: "https://github.com/JarsXen/webdesign_FAR-TEAM_technoversary25.git"
  },
  {
    title: "JumpaUMKM",
    description: "The MSME Directory is a web application developed by FAR TEAM as part of a technology competition project. Its goal is to help users find various MSMEs near them with a modern, lightweight, and easy-to-use interface.",
    image: "/img/UMKM.png",
    tags: ["React", "Tailwind", "Vite"],
    link: "https://farteam-umkm-app.vercel.app/",
    github: "https://github.com/JarsXen/FAR-TEAM---UMKM-APP.git"
  }
];

export default function Projects() {
  const { t } = useApp();

  return (
    <section id="projects" className="py-24 pb-32 relative bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 via-zinc-100 to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 -z-10" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.projects.title}</h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {t.projects.subtitle}
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">{t.projects.moreProjects}</p>
          <a
            href="https://github.com/JarsXen"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 dark:bg-zinc-800 text-white hover:bg-zinc-700 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-white/10 group shadow-lg"
          >
            <Github size={20} className="group-hover:scale-110 transition-transform" />
            <span>{t.projects.viewGithub}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    image: string;
    tags: string[];
    link: string;
    github: string;
  };
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const { t } = useApp();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10 transition-colors cursor-pointer shadow-sm"
    >
      <div className="rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 h-full">
        <div className="aspect-video overflow-hidden relative">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
            <a 
              href={project.link}
              className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
              title={t.projects.viewLive}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={20} />
            </a>
            <a 
              href={project.github}
              className="p-3 bg-zinc-800 text-white rounded-full hover:scale-110 transition-transform"
              title={t.projects.viewCode}
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={20} />
            </a>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">{project.title}</h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string) => (
              <span key={tag} className="text-xs px-2 py-1 rounded-md bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-white/5">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
