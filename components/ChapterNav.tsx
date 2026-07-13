'use client';

import { useEffect, useRef, useState } from 'react';

const chapters = [
  { id: 'chapter-1', label: 'The Eye' },
  { id: 'chapter-2', label: 'The Strategist' },
  { id: 'chapter-3', label: 'The Rooms' },
  { id: 'chapter-4', label: 'The Disciplines' },
  { id: 'chapter-5', label: '___' },
];

/* The nav is a small constellation: each chapter is a star on a faint
   line of light that fills as the reader travels down the story. */
export default function ChapterNav() {
  const [active, setActive] = useState<string>('');
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    chapters.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    // fill the rail via transform only — no re-render, no layout during scroll
    let raf = 0;
    const update = () => {
      raf = 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0;
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav
      className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col items-end gap-6"
      aria-label="Chapter navigation"
      style={{ position: 'fixed' }}
    >
      {/* rail of light behind the stars */}
      <span
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          right: 2.5,
          top: -14,
          bottom: -14,
          width: 1,
          background: 'rgba(245,240,235,0.08)',
        }}
      />
      <span
        ref={fillRef}
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          right: 2.5,
          top: -14,
          bottom: -14,
          width: 1,
          transform: 'scaleY(0)',
          transformOrigin: 'top',
          background: 'linear-gradient(to bottom, var(--p-gold), var(--p-accent))',
          boxShadow: '0 0 8px rgba(232,100,122,0.5)',
          willChange: 'transform',
        }}
      />

      {chapters.map(({ id, label }, i) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            className="group flex items-center gap-3"
          >
            {/* Label — fades in on hover */}
            <span
              className="opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-300 text-right"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--p-accent)' : 'rgba(255,255,255,0.4)',
              }}
            >
              {label}
            </span>

            {/* Number */}
            <span
              className="transition-all duration-300"
              style={{
                fontFamily: 'var(--font-inter)',
                letterSpacing: '0.15em',
                color: isActive ? 'var(--p-accent)' : 'rgba(255,255,255,0.35)',
                textShadow: isActive ? '0 0 12px rgba(232,100,122,0.7)' : 'none',
                fontWeight: isActive ? 500 : 300,
                fontSize: '11px',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Star */}
            <span
              className="transition-all duration-300"
              style={{
                width: isActive ? 6 : 4,
                height: isActive ? 6 : 4,
                marginRight: isActive ? -1.5 : -0.5,
                borderRadius: '50%',
                background: isActive ? 'var(--p-accent)' : 'rgba(245,240,235,0.35)',
                boxShadow: isActive ? '0 0 10px rgba(232,100,122,0.8)' : 'none',
              }}
            />
          </a>
        );
      })}
    </nav>
  );
}
