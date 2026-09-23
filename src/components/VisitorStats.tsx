import { useState, useEffect, memo } from 'react';
import { Eye } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const VisitorFooterStats = memo(function VisitorFooterStats() {
  const { t } = useApp();
  const [visits, setVisits] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('portfolio_real_visits');
      if (stored) {
        const val = parseInt(stored, 10);
        if (!isNaN(val) && val > 0) return val;
      }
    }
    return 1;
  });

  useEffect(() => {
    let isMounted = true;
    const SESSION_KEY = 'portfolio_session_counted';

    const trackVisit = async () => {
      const sessionCounted = sessionStorage.getItem(SESSION_KEY);
      const endpoint = sessionCounted
        ? 'https://counterapi.com/api/fajar-irwansah.vercel.app/view/home?readOnly=true'
        : 'https://counterapi.com/api/fajar-irwansah.vercel.app/view/home';

      try {
        const res = await fetch(endpoint, { cache: 'no-cache' });
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.value === 'number' && data.value > 0) {
            if (isMounted) {
              setVisits(data.value);
              localStorage.setItem('portfolio_real_visits', data.value.toString());
              if (!sessionCounted) {
                sessionStorage.setItem(SESSION_KEY, 'true');
              }
            }
            return;
          }
        }
      } catch {
        // Network fallback
      }

      // Local fallback if offline: increment only once per session
      if (!sessionCounted) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        const current = parseInt(localStorage.getItem('portfolio_real_visits') || '0', 10) + 1;
        if (isMounted) {
          setVisits(current);
          localStorage.setItem('portfolio_real_visits', current.toString());
        }
      }
    };

    trackVisit();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="mt-8 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-200/80 dark:border-white/10 bg-zinc-100/70 dark:bg-zinc-800/40 text-xs text-zinc-500 dark:text-zinc-400">
      <Eye size={12} className="text-zinc-400 dark:text-zinc-500" />
      <span>
        <strong className="font-mono font-medium text-zinc-800 dark:text-zinc-200">
          {visits.toLocaleString()}
        </strong>{' '}
        {visits === 1 ? t.visitorStats.visit : t.visitorStats.visits}
      </span>
    </div>
  );
});
