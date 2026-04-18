'use client';

import { useEffect, useState } from 'react';

const chapters = [
  { id: 'chapter-1', label: 'The Eye' },
  { id: 'chapter-2', label: 'The Strategist' },
  { id: 'chapter-3', label: 'The Rooms' },
  // { id: 'chapter-4', label: 'The Disciplines' }, // temporarily disabled
  { id: 'chapter-5', label: '___' },
];

export default function ChapterNav() {
  const [active, setActive] = useState<string>('');

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

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col items-end gap-6"
      aria-label="Chapter navigation"
    >
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
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-right"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: isActive ? '#e85d75' : 'rgba(255,255,255,0.4)',
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
                color: isActive ? '#e85d75' : 'rgba(255,255,255,0.35)',
                textShadow: isActive ? '0 0 12px rgba(232,93,117,0.7)' : 'none',
                fontWeight: isActive ? 500 : 300,
                fontSize: '11px',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
