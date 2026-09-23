import { useState, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import ProjectModal, { ProjectData } from './ProjectModal';

const projects: ProjectData[] = [
  {
    title: "SORA - Sobat Rantau",
    description: "SORA (Sobat Rantau) is a modern web application crafted to support mental health, habit tracking, and daily productivity for students living away from home.",
    image: "/img/SORA.png",
    tags: ["React", "Tailwind", "Vite"],
    link: "https://sora-sobat-rantau.vercel.app/",
    github: "https://github.com/JarsXen/SORA---SOBAT-RANTAU.git",
    role: {
      en: "Frontend & UI/UX Developer",
      id: "Frontend & UI/UX Developer",
    },
    highlights: {
      en: [
        "Interactive mood and productivity tracking tailored for university students",
        "Responsive, component-driven layout built with React and Tailwind CSS",
        "Empathetic, user-centered interface design with low cognitive friction",
      ],
      id: [
        "Pelacak mood dan produktivitas harian yang disesuaikan untuk mahasiswa rantau",
        "Tata letak responsif berbasis komponen menggunakan React dan Tailwind CSS",
        "Desain antarmuka yang empatik dan ramah pengguna dengan friksi visual minimal",
      ],
    },
  },
  {
    title: "EcoDigital Nusantara",
    description: "An environmental education and sustainability web platform built for Technoversary 25, raising ecological awareness through interactive storytelling and clean digital design.",
    image: "/img/EcoDigital.png",
    tags: ["React", "Tailwind", "Vite"],
    link: "https://ecodigitalnusantara.vercel.app/",
    github: "https://github.com/JarsXen/webdesign_FAR-TEAM_technoversary25.git",
    role: {
      en: "FAR TEAM Competition Project",
      id: "Proyek Kompetisi FAR TEAM",
    },
    highlights: {
      en: [
        "Developed for the Technoversary 25 national web design competition",
        "Interactive digital sustainability awareness modules with modern typography",
        "Optimized client-side rendering and fluid responsive layout",
      ],
      id: [
        "Dikembangkan untuk kompetisi nasional web design Technoversary 25",
        "Modul edukasi keberlanjutan digital interaktif dengan tipografi modern",
        "Rendering client-side teroptimasi dengan tata letak responsif yang mulus",
      ],
    },
  },
  {
    title: "JumpaUMKM",
    description: "The MSME Directory is a web application developed by FAR TEAM for a technology competition, helping local communities find, explore, and support micro-businesses with ease.",
    image: "/img/UMKM.png",
    tags: ["React", "Tailwind", "Vite"],
    link: "https://farteam-umkm-app.vercel.app/",
    github: "https://github.com/JarsXen/FAR-TEAM---UMKM-APP.git",
    role: {
      en: "Fullstack / Frontend Engineer",
      id: "Fullstack / Frontend Engineer",
    },
    highlights: {
      en: [
        "Local business directory with fast search and category filtering",
        "Mobile-first responsive cards and clean location exploration",
        "Collaborative development as part of the FAR TEAM competition lineup",
      ],
      id: [
        "Direktori bisnis lokal dengan pencarian cepat dan penyaringan kategori",
        "Kartu responsif mobile-first untuk kemudahan eksplorasi lokasi usaha",
        "Pengembangan kolaboratif sebagai bagian dari rangkaian kompetisi FAR TEAM",
      ],
    },
  }
];

export default function Projects() {
  const { t } = useApp();
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

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
            <ProjectCard
              key={index}
              project={project}
              index={index}
              onSelect={() => setSelectedProject(project)}
            />
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

      {/* Project Detail Preview Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  onSelect: () => void;
}

function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
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
      onClick={onSelect}
      className="group relative rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all cursor-pointer shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transform-gpu"
    >
      <div className="rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 h-full flex flex-col">
        <div className="aspect-video overflow-hidden relative">
          <img 
            src={project.image} 
            alt={project.title}
            width={600}
            height={338}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
          />

          {/* Quick Preview Badge overlay */}
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 text-white backdrop-blur-md text-xs font-medium border border-white/20">
              <Eye size={12} />
              {t.projects.quickPreview}
            </span>
          </div>

          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
              className="p-3 bg-white text-zinc-900 rounded-full hover:scale-110 transition-transform shadow-md"
              title={t.projects.quickPreview}
            >
              <Eye size={18} />
            </button>
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-zinc-900 text-white rounded-full hover:scale-110 transition-transform shadow-md border border-white/20"
              title={t.projects.viewLive}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={18} />
            </a>
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-zinc-800 text-white rounded-full hover:scale-110 transition-transform shadow-md border border-white/20"
              title={t.projects.viewCode}
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={18} />
            </a>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-100 dark:border-white/5">
            {project.tags.map((tag: string) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-white/5 font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
