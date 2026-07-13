'use client';

import { Guitar, Music, Camera, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { RevealLine, ScrambleText, FadeUp } from '@/components/ui/animations';

/* ──────────────────────────────────────────────────────────────────
   THE DISCIPLINES — the practice rooms of the corridor.
   Same architectural language as Chapter 3: brass hairline frames,
   plaque typography, light that answers the visitor.
   ────────────────────────────────────────────────────────────────── */

type Discipline = {
  Icon: LucideIcon;
  num: string;
  title: string;
  body: string;
  image: string;
};

const disciplines: Discipline[] = [
  {
    Icon: Guitar,
    num: '01',
    title: 'Classical Guitar',
    body: 'Ten fingers learning patience before they learned persuasion.',
    image: '/guitar.webp',
  },
  {
    Icon: Music,
    num: '02',
    title: 'Hindustani Music',
    body: 'The raga taught me that silence is not empty. It is the space where meaning lives.',
    image: '/classical.webp',
  },
  {
    Icon: Camera,
    num: '03',
    title: 'Photography & Sports',
    body: 'A frame chosen. A moment that will not return. The discipline of the decisive instant.',
    image: '/camera.webp',
  },
];

const softEase = [0.22, 1, 0.36, 1] as const;

function DisciplineCard({ d, index }: { d: Discipline; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, delay: index * 0.15, ease: softEase }}
      className="group relative flex flex-col h-full overflow-hidden"
      style={{ border: '1px solid var(--p-gold-line)' }}
    >
      {/* corner plaque label */}
      <span
        className="absolute z-10 uppercase"
        style={{
          top: 14,
          left: 16,
          fontFamily: 'var(--font-inter)',
          fontSize: '9px',
          letterSpacing: '0.4em',
          color: 'var(--p-gold-dim)',
        }}
      >
        Discipline {d.num}
      </span>

      {/* image — night-toned until visited */}
      <div className="relative flex-shrink-0 overflow-hidden" style={{ height: 220 }}>
        <Image
          src={d.image}
          alt={d.title}
          fill
          className="object-cover grayscale opacity-70 group-hover:opacity-95 group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
          style={{ objectPosition: 'center' }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(13,10,26,0.35) 0%, transparent 40%, rgba(13,10,26,0.85) 100%)',
          }}
        />
      </div>

      {/* plaque */}
      <div
        className="flex flex-col flex-1"
        style={{ background: 'rgba(255,255,255,0.02)', padding: '22px 22px 26px' }}
      >
        <d.Icon size={20} strokeWidth={1} className="mb-4" style={{ color: 'var(--p-gold)' }} />
        <h3
          className="font-cormorant text-2xl font-light mb-3"
          style={{ color: 'var(--p-text)', letterSpacing: '0.03em' }}
        >
          {d.title}
        </h3>
        <p
          className="font-cormorant text-base font-light leading-relaxed italic"
          style={{ color: 'rgba(245,240,235,0.55)' }}
        >
          {d.body}
        </p>
        {/* brass underline draws in on hover */}
        <span
          className="mt-auto pt-5 block"
          aria-hidden
        >
          <span
            className="block h-px w-8 group-hover:w-16 transition-all duration-500"
            style={{ background: 'var(--p-gold)' }}
          />
        </span>
      </div>
    </motion.div>
  );
}

export default function ChapterFour() {
  return (
    <section
      id="chapter-4"
      className="min-h-screen px-4 md:px-20 py-16 md:py-28 flex flex-col justify-center"
    >
      <p className="chapter-label mb-3">
        <ScrambleText>Chapter 4</ScrambleText>
      </p>
      <h2
        className="font-cormorant text-3xl md:text-6xl font-light leading-tight mb-6 max-w-2xl"
        style={{ color: 'var(--p-text)', letterSpacing: '0.02em' }}
      >
        <RevealLine delay={0.1}>Before the strategy decks</RevealLine>
        <RevealLine delay={0.2}>there was Hindustani</RevealLine>
        <RevealLine delay={0.3}>
          <span style={{ color: 'var(--p-accent)' }}>classical music.</span>
        </RevealLine>
      </h2>

      <FadeUp delay={0.4}>
        <p
          className="font-cormorant text-base md:text-xl font-light italic mb-12 md:mb-16 max-w-xl"
          style={{ color: 'var(--p-muted)', letterSpacing: '0.01em' }}
        >
          The practice rooms. Where the instincts were built, long before they had a job title.
        </p>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {disciplines.map((d, i) => (
          <DisciplineCard key={d.num} d={d} index={i} />
        ))}
      </div>
    </section>
  );
}
