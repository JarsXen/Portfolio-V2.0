import { motion } from 'motion/react';
import { Instagram, Twitter, Linkedin, Mail, Github } from 'lucide-react';
import { ReactNode } from 'react';
import { useApp } from '../contexts/AppContext';

const TikTok = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function Contact() {
  const { t } = useApp();
  const currentYear = new Date().getFullYear();

  return (
    <section id="contact" className="py-24 pb-40 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 to-zinc-200 dark:from-zinc-950 dark:to-black -z-10" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-100 via-transparent to-transparent dark:from-zinc-900" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">{t.contact.title}</h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-12">
            {t.contact.subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <SocialLink href="https://github.com/JarsXen" icon={<Github size={24} />} label="GitHub" color="hover:text-zinc-900 dark:hover:text-white" />
            <SocialLink href="https://www.instagram.com/jrsxen/" icon={<Instagram size={24} />} label="Instagram" color="hover:text-pink-500" />
            <SocialLink href="https://www.tiktok.com/@star8jar" icon={<TikTok size={24} />} label="TikTok" color="hover:text-cyan-500 dark:hover:text-cyan-400" />
            <SocialLink href="https://x.com/JarsssXN" icon={<Twitter size={24} />} label="X (Twitter)" color="hover:text-blue-500 dark:hover:text-blue-400" />
            <SocialLink href="mailto:fajarirwansah15@gmail.com" icon={<Mail size={24} />} label="Email" color="hover:text-emerald-500 dark:hover:text-emerald-400" />
          </div>

          <footer className="mt-24 pt-8 border-t border-zinc-200 dark:border-white/10 text-zinc-500 text-sm">
            <p>{t.contact.footer.replace('{year}', currentYear.toString())}</p>
          </footer>
        </motion.div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon, label, color }: { href: string, icon: ReactNode, label: string, color: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -5 }}
      className={`flex items-center gap-3 px-6 py-4 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/5 transition-colors shadow-sm ${color} group`}
    >
      <span className="text-zinc-500 dark:text-zinc-400 group-hover:text-inherit transition-colors">{icon}</span>
      <span className="font-medium">{label}</span>
    </motion.a>
  );
}
