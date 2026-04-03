'use client';

import { motion } from 'framer-motion';
import CelestialInkShader from '@/components/ui/celestial-ink-shader';

const NAME = 'Adarsh Alex Balmuchu';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <CelestialInkShader />
      <div className="relative z-10 text-center px-6 -mt-12 w-full">
        {/* Name — letter by letter */}
        <h1
          className="font-cormorant text-4xl md:text-7xl font-light text-white drop-shadow-lg"
          style={{ letterSpacing: '0.04em' }}
          aria-label={NAME}
        >
          {NAME.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: i * 0.04,
                ease: 'easeOut',
              }}
              style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            >
              {char}
            </motion.span>
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
          <a
            href="#chapter-1"
            className="w-full max-w-xs mx-auto md:w-auto block md:inline-block px-8 py-3 rounded-full text-base font-medium tracking-widest uppercase backdrop-blur-sm hover:shadow-[0_0_20px_4px_rgba(236,72,153,0.35)] transition-all duration-300 text-center"
            style={{
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.08)',
              color: '#f5f0eb',
              fontFamily: 'var(--font-inter)',
            }}
          >
            Enter my world
          </a>
        </motion.div>
      </div>
    </section>
  );
}
