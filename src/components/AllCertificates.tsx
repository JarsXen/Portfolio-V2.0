import { motion } from 'motion/react';
import { FileText, ExternalLink, Award, ArrowLeft, Search } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useState } from 'react';

const allCertificates = [
  {
    title: "Build and Deploy to Google Cloud with Antigravity",
    issuer: "Google",
    date: "2026",
    type: "pdf",
    url: "/documents/LabTracer.pdf",
    thumbnail: "/img/LabTracer_page-0001.jpg",
    category: "Cloud"
  },
  {
    title: "Authoring Google Antigravity Skills",
    issuer: "Google",
    date: "2026",
    type: "pdf",
    url: "/documents/LabTracer 1.pdf",
    thumbnail: "/img/LabTracer 1_page-0001.jpg",
    category: "Cloud"
  },
  {
    title: "Building with Antigravity",
    issuer: "Google",
    date: "2026",
    type: "pdf",
    url: "/documents/LabTracer 2.pdf",
    thumbnail: "/img/LabTracer 2_page-0001.jpg",
    category: "Cloud"
  },
  {
    title: "Getting Started with Antigravity",
    issuer: "Google",
    date: "2026",
    type: "pdf",
    url: "/documents/LabTracer 3.pdf",
    thumbnail: "/img/LabTracer 3_page-0001.jpg",
    category: "Cloud"
  },
  {
    title: "Penerapan Data Science dengan Microsoft Fabric",
    issuer: "Dicoding",
    date: "2025 - 2028 ",
    type: "pdf",
    url: "/documents/sertifikat_course_902_3711543_051225075640.pdf",
    thumbnail: "/img/sertifikat_course_902_3711543_051225075640_pages-to-jpg-0001.jpg",
    category: "Data Science"
  },
  {
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding",
    date: "2024 - 2027",
    type: "pdf",
    url: "/documents/sertifikat_course_123_2816340_280324075556.pdf",
    thumbnail: "/img/dicoding2.jpg",
    category: "Web Development"
  },
  {
    title: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding",
    date: "2024 - 2027",
    type: "pdf",
    url: "/documents/sertifikat_course_256_2816340_131024084802.pdf",
    thumbnail: "/img/dicoding3.jpg",
    category: "Web Development"
  },
  {
    title: "Belajar Penggunaan Generative AI",
    issuer: "Dicoding",
    date: "2025 - 2028",
    type: "pdf",
    url: "/documents/sertifikat_course_867_2816340_250525135957.pdf",
    thumbnail: "/img/dicoding4.jpg",
    category: "AI"
  }
];

export default function AllCertificates({ onBack }: { onBack: () => void }) {
  const { t } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(allCertificates.map(c => c.category)))];

  const filteredCertificates = allCertificates.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          cert.issuer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || cert.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-24 pb-12 px-4 transition-colors duration-300"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white mb-4 transition-colors group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </button>
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">{t.certificates.title} Catalog</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">Browse all my certifications and achievements.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Search certificates..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCertificates.map((cert, index) => (
            <CertificateCard key={index} cert={cert} index={index} />
          ))}
        </div>

        {filteredCertificates.length === 0 && (
          <div className="text-center py-20 text-zinc-500 dark:text-zinc-400">
            <p>No certificates found matching your criteria.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function CertificateCard({ cert, index }: { cert: any, index: number }) {
  const { t } = useApp();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 rounded-2xl overflow-hidden hover:border-zinc-300 dark:hover:border-white/20 transition-all hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col h-full"
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
          <div className="px-4 py-2 bg-white text-black rounded-full font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-lg text-sm">
            <ExternalLink size={16} />
            {t.certificates.viewCert}
          </div>
        </a>
      </div>

      <div className="p-5 relative flex-1 flex flex-col">
        <div className="absolute -top-4 right-4 px-2 py-1 bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-white/10 shadow-lg text-xs font-medium text-indigo-500 dark:text-indigo-400">
          {cert.category}
        </div>
        
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
          {cert.title}
        </h3>
        <div className="mt-auto pt-4 flex justify-between items-center text-sm text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-white/5">
          <span>{cert.issuer}</span>
          <span>{cert.date}</span>
        </div>
      </div>
    </motion.div>
  );
}
