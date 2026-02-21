import { motion } from 'motion/react';
import { FileText, ExternalLink, Award } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const certificates = [
  {
    title: "Build and Deploy to Google Cloud with Antigravity",
    issuer: "Google",
    date: "2026",
    type: "pdf",
    url: "/documents/LabTracer.pdf",
    thumbnail: "/img/LabTracer_page-0001.jpg"
  },
  {
    title: "Authoring Google Antigravity Skills",
    issuer: "Google",
    date: "2026",
    type: "pdf",
    url: "/documents/LabTracer 1.pdf",
    thumbnail: "/img/LabTracer 1_page-0001.jpg"
  },
  {
    title: "Building with Antigravity",
    issuer: "Google",
    date: "2026",
    type: "pdf",
    url: "/documents/LabTracer 2.pdf",
    thumbnail: "/img/LabTracer 2_page-0001.jpg"
  }
];

export default function Certificates({ onViewAll }: { onViewAll?: () => void }) {
  const { t } = useApp();

  const previewCertificates = certificates.slice(0, 3);

  return (
    <section id="certificates" className="py-24 relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 via-zinc-100 to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 -z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-white">{t.certificates.title}</h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {t.certificates.subtitle}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {previewCertificates.map((cert, index) => (
            <CertificateCard key={index} cert={cert} index={index} />
          ))}
        </div>

        {onViewAll && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <button
              onClick={onViewAll}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-medium hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
            >
              <Award size={20} />
              {t.certificates.viewAll}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function CertificateCard({ cert, index }: { cert: any, index: number }) {
  const { t } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 rounded-2xl overflow-hidden hover:border-zinc-300 dark:hover:border-white/20 transition-all hover:shadow-2xl hover:shadow-indigo-500/10"
    >
      <div className="aspect-[4/3] bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
        {cert.thumbnail ? (
          <img 
            src={cert.thumbnail} 
            alt={cert.title} 
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800/50">
            <FileText size={48} className="mb-2 opacity-50" />
            <span className="text-xs uppercase tracking-wider font-medium">{t.certificates.pdfDoc}</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <a 
          href={cert.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]"
        >
          <div className="px-4 py-2 bg-white text-black rounded-full font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-lg">
            <ExternalLink size={16} />
            {t.certificates.viewCert}
          </div>
        </a>
      </div>

      <div className="p-5 relative">
        <div className="absolute -top-6 right-4 p-2 bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-white/10 shadow-lg">
          <Award size={20} className="text-indigo-500 dark:text-indigo-400" />
        </div>
        
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
          {cert.title}
        </h3>
        <div className="flex justify-between items-center text-sm text-zinc-500 dark:text-zinc-400">
          <span>{cert.issuer}</span>
          <span>{cert.date}</span>
        </div>
      </div>
    </motion.div>
  );
}
