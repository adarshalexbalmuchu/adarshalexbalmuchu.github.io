'use client';

import { useRef, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import CelestialInkShader from '@/components/ui/celestial-ink-shader';

const NAME = 'Adarsh Alex Balmuchu';

/* Letters lift and catch the light when the cursor passes over them */
function InkLetter({ char, index }: { char: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -10,
        scale: 1.12,
        textShadow: '0 0 28px rgba(232,100,122,0.9), 0 0 60px rgba(255,214,150,0.4)',
        transition: { type: 'spring', stiffness: 400, damping: 12 },
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.04,
        ease: 'easeOut',
      }}
      style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
    >
      {char}
    </motion.span>
  );
}

/* CTA that leans toward the cursor and snaps back on leave */
function MagneticCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.45);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ padding: 18, margin: -18 }}>
      <motion.a
        href="#chapter-1"
        style={{
          x: sx,
          y: sy,
          border: '1px solid rgba(255,255,255,0.2)',
          background: 'rgba(255,255,255,0.08)',
          color: '#f5f0eb',
          fontFamily: 'var(--font-inter)',
        }}
        className="w-full max-w-xs mx-auto md:w-auto block md:inline-block px-8 py-3 rounded-full text-base font-medium tracking-widest uppercase backdrop-blur-sm hover:shadow-[0_0_24px_6px_rgba(232,100,122,0.35)] hover:border-[rgba(232,100,122,0.45)] transition-[box-shadow,border-color] duration-300 text-center"
      >
        Enter my world
      </motion.a>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <CelestialInkShader />

      {/* Veil — the shader dissolves into the night sky behind the chapters */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[5] pointer-events-none"
        style={{
          height: '38vh',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(13,10,26,0.55) 55%, var(--p-bg) 100%)',
        }}
      />

      <div className="relative z-10 text-center px-6 -mt-12 w-full">
        {/* Name — letter by letter, alive under the cursor */}
        <h1
          className="font-cormorant text-4xl md:text-7xl font-light text-white drop-shadow-lg"
          style={{ letterSpacing: '0.04em' }}
          aria-label={NAME}
        >
          {NAME.split('').map((char, i) => (
            <InkLetter key={i} char={char} index={i} />
          ))}
        </h1>

        {/* Tagline */}
        <motion.p
          className="mt-4 text-sm md:text-xl drop-shadow text-center"
          style={{ color: 'rgba(245,240,235,0.75)', fontFamily: 'var(--font-inter)', fontWeight: 300 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: NAME.length * 0.04 + 0.1 }}
        >
          Marketer by craft. Entrepreneur by instinct. Always building something worth noticing.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-6 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: NAME.length * 0.04 + 0.6 }}
        >
          <MagneticCTA />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: NAME.length * 0.04 + 1.4 }}
      >
        <span
          className="uppercase"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.55rem',
            letterSpacing: '0.35em',
            color: 'rgba(245,240,235,0.4)',
          }}
        >
          Scroll
        </span>
        <span
          className="block w-px h-10"
          style={{
            background: 'linear-gradient(to bottom, var(--p-accent), transparent)',
            animation: 'scrollCue 2.2s ease-in-out infinite',
          }}
        />
      </motion.div>
    </section>
  );
}
