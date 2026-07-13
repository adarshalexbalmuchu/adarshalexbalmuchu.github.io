'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { TypewriterText, FadeUp } from '@/components/ui/animations';

/* ── Epilogue — a small constellation, then the line that isn't finished ── */

const softEase = [0.22, 1, 0.36, 1] as const;

/* a little constellation that draws itself in */
function Constellation() {
  const points = [
    { x: 20, y: 46 },
    { x: 70, y: 18 },
    { x: 128, y: 38 },
    { x: 180, y: 10 },
    { x: 228, y: 30 },
  ];
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <svg width="248" height="56" viewBox="0 0 248 56" fill="none" aria-hidden>
      <motion.path
        d={path}
        stroke="var(--p-gold-line)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 2.2, ease: softEase }}
      />
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={i === points.length - 1 ? 2.5 : 1.5}
          fill={i === points.length - 1 ? 'var(--p-accent)' : 'var(--p-gold)'}
          style={
            i === points.length - 1
              ? { filter: 'drop-shadow(0 0 6px var(--p-accent))' }
              : undefined
          }
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.4 * i, ease: softEase }}
        />
      ))}
    </svg>
  );
}

export default function ChapterFive() {
  return (
    <section
      id="chapter-5"
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      {/* the chapters so far, plotted as stars — the last one still burning */}
      <Constellation />

      <p
        className="tracking-[0.35em] uppercase mt-10"
        style={{ fontFamily: 'var(--font-inter)', fontSize: '0.7rem', color: 'var(--p-muted)' }}
      >
        <TypewriterText speed={90}>Still being written.</TypewriterText>
      </p>

      <FadeUp delay={1.8}>
        <p
          className="font-cormorant italic font-light text-lg md:text-2xl mt-8 max-w-md"
          style={{ color: 'rgba(245,240,235,0.55)', letterSpacing: '0.01em' }}
        >
          The next chapter needs collaborators, not spectators.
        </p>
      </FadeUp>

      <FadeUp delay={2.1}>
        <div className="mt-10 flex flex-col md:flex-row items-center gap-5 md:gap-10">
          <a
            href="#footer"
            className="uppercase transition-colors duration-300 hover:text-[var(--p-accent)]"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              color: 'rgba(245,240,235,0.5)',
              borderBottom: '1px solid var(--p-gold-line)',
              paddingBottom: 6,
            }}
          >
            Write it with me
          </a>
          <Link
            href="/notebook"
            className="uppercase transition-colors duration-300 hover:text-[var(--p-accent)]"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              color: 'rgba(245,240,235,0.5)',
              borderBottom: '1px solid var(--p-gold-line)',
              paddingBottom: 6,
            }}
          >
            Read the notebook
          </Link>
        </div>
      </FadeUp>
    </section>
  );
}
