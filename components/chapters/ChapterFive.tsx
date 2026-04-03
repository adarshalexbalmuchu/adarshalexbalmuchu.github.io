'use client';

import { TypewriterText } from '@/components/ui/animations';

export default function ChapterFive() {
  return (
    <section
      id="chapter-5"
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: 'var(--p-bg)' }}
    >
      <p
        className="tracking-[0.35em] uppercase"
        style={{ fontFamily: 'var(--font-inter)', fontSize: '0.7rem', color: 'var(--p-muted)' }}
      >
        <TypewriterText speed={90}>Still being written.</TypewriterText>
      </p>
    </section>
  );
}
