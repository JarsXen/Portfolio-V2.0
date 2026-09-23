import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  QrCode, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const { t } = useApp();
  const [copied, setCopied] = useState<boolean>(false);
  const [isQrLoaded, setIsQrLoaded] = useState<boolean>(false);
  const [shareUrl, setShareUrl] = useState<string>('https://fajar-irwansah.vercel.app');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const current = window.location.origin && window.location.origin !== 'null'
        ? window.location.origin
        : 'https://fajar-irwansah.vercel.app';
      setShareUrl(current);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    // Handle ESC key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // High-resolution QR code URL using CORS-enabled QR generator
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=480x480&margin=12&format=png&data=${encodeURIComponent(shareUrl)}`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleDownloadQR = async () => {
    try {
      // Fetch image as blob for direct download
      const response = await fetch(qrImageUrl);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = 'fajar-irwansah-portfolio-qr.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
    } catch (err) {
      // Fallback: open image in new tab if direct download blocked
      window.open(qrImageUrl, '_blank');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Fajar Irwansah - Portfolio',
          text: t.share.shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User dismissed share dialog
      }
    } else {
      handleCopy();
    }
  };

  const shareTextEncoded = encodeURIComponent(`${t.share.shareText} ${shareUrl}`);
  const shareUrlEncoded = encodeURIComponent(shareUrl);

  const socialChannels = [
    {
      name: t.share.whatsapp,
      url: `https://api.whatsapp.com/send?text=${shareTextEncoded}`,
      color: 'hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-500 dark:hover:text-emerald-400',
    },
    {
      name: t.share.linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrlEncoded}`,
      color: 'hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-500 dark:hover:text-blue-400',
    },
    {
      name: t.share.twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(t.share.shareText)}&url=${shareUrlEncoded}`,
      color: 'hover:bg-zinc-500/10 hover:border-zinc-500/30 hover:text-zinc-900 dark:hover:text-white',
    },
    {
      name: t.share.telegram,
      url: `https://t.me/share/url?url=${shareUrlEncoded}&text=${encodeURIComponent(t.share.shareText)}`,
      color: 'hover:bg-sky-500/10 hover:border-sky-500/30 hover:text-sky-500 dark:hover:text-sky-400',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          id="share-modal-overlay"
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-2">
                  <QrCode size={14} />
                  <span>QR & Share</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {t.share.modalTitle}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  {t.share.modalSubtitle}
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2 -mr-2 -mt-2 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* QR Code Card */}
            <div className="flex flex-col items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950/60 rounded-2xl border border-zinc-100 dark:border-white/5 mb-6">
              <div className="relative p-3 bg-white rounded-2xl shadow-md border border-zinc-200/80">
                {!isQrLoaded && (
                  <div className="w-44 h-44 flex items-center justify-center text-zinc-400">
                    <QrCode size={36} className="animate-pulse text-indigo-500" />
                  </div>
                )}
                <img
                  src={qrImageUrl}
                  alt="Portfolio QR Code"
                  width={176}
                  height={176}
                  onLoad={() => setIsQrLoaded(true)}
                  className={`w-44 h-44 rounded-lg block object-contain transition-opacity duration-300 ${
                    isQrLoaded ? 'opacity-100' : 'opacity-0 absolute inset-3'
                  }`}
                  crossOrigin="anonymous"
                />
                {/* Center visual accent */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 rounded-full bg-white shadow-md border border-zinc-200 flex items-center justify-center font-bold text-[11px] text-zinc-900">
                    FI
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 text-xs text-zinc-500 dark:text-zinc-400">
                <Smartphone size={14} className="text-indigo-500" />
                <span>{t.share.qrLabel}</span>
              </div>

              <button
                onClick={handleDownloadQR}
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-xl shadow-xs hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                <Download size={13} />
                <span>{t.share.downloadQr}</span>
              </button>
            </div>

            {/* Copy Link Input */}
            <div className="mb-6">
              <div className="flex items-center gap-2 p-1.5 pl-3.5 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl border border-zinc-200/80 dark:border-white/5">
                <span className="text-xs font-mono text-zinc-600 dark:text-zinc-300 truncate flex-1">
                  {shareUrl}
                </span>
                <button
                  onClick={handleCopy}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    copied
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={14} />
                      <span>{t.share.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>{t.share.copyLink}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Share Buttons */}
            <div>
              <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2.5">
                {t.share.directShare}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {socialChannels.map((channel) => (
                  <a
                    key={channel.name}
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-800/40 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-colors ${channel.color}`}
                  >
                    <span>{channel.name}</span>
                    <ExternalLink size={12} className="opacity-60" />
                  </a>
                ))}
              </div>
            </div>

            {/* Native Share fallback if available */}
            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                onClick={handleNativeShare}
                className="w-full mt-3 py-2.5 px-4 rounded-xl border border-dashed border-zinc-300 dark:border-white/15 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-white/30 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Share2 size={13} />
                <span>{t.share.nativeShare}</span>
              </button>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
