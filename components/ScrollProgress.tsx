'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 2,
        width: `${progress * 100}%`,
        background: 'linear-gradient(90deg, var(--p-accent), var(--p-gold))',
        zIndex: 9998,
        pointerEvents: 'none',
        transition: 'width 0.05s linear',
      }}
    />
  );
}
