'use client';

import { useEffect, useRef } from 'react';

/* Full-width bar scaled via transform — no setState, no layout, no paint
   during scroll; the update is rAF-throttled and compositor-only. */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? window.scrollY / docHeight : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 2,
        width: '100%',
        transform: 'scaleX(0)',
        transformOrigin: 'left',
        background: 'linear-gradient(90deg, var(--p-accent), var(--p-gold))',
        zIndex: 9998,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    />
  );
}
