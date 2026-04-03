'use client';

import { RevealLine, ScrambleText, FadeUp } from '@/components/ui/animations';
import { motion } from 'framer-motion';

const entries = [
  { competition: 'India Innovates Hackathon',          institution: 'Delhi Municipal Corporation', result: 'TOP 1000 OF 25,000+' },
  { competition: 'Snap and Solve',                     institution: 'IIM Bangalore',               result: 'NATIONAL WINNER'      },
  { competition: 'National Marketing Case Competition',institution: 'IIM Ahmedabad',               result: 'FINALIST'             },
  { competition: 'Stock Stoicism Finance Case',        institution: 'BIT Mesra',                   result: 'NATIONAL RUNNER-UP'   },
  { competition: 'Unbounded Possibilities Photography',institution: 'IIM Bangalore',               result: 'NATIONAL FINALIST'    },
  { competition: 'Pixel Perfect Photography',          institution: 'IIM Ahmedabad',               result: 'SECOND RUNNER-UP'     },
];

export default function ChapterThree() {
  return (
    <section
      id="chapter-3"
      className="min-h-screen px-4 md:px-20 py-12 md:py-24 flex flex-col justify-center"
      style={{ background: 'var(--p-bg)' }}
    >
      <p className="chapter-label mb-3">
        <ScrambleText>Chapter 3</ScrambleText>
      </p>
      <h2
        className="font-cormorant text-3xl md:text-6xl font-light leading-tight mb-8 md:mb-10 max-w-2xl"
        style={{ color: 'var(--p-text)', letterSpacing: '0.02em' }}
      >
        <RevealLine delay={0.1}>I walked into rooms</RevealLine>
        <RevealLine delay={0.2}>I wasn't expected to win.</RevealLine>
        <RevealLine delay={0.3}><span style={{ color: 'var(--p-accent)' }}>I won anyway.</span></RevealLine>
      </h2>

      <FadeUp delay={0.4}>
        <p className="font-cormorant text-base md:text-xl font-light italic mb-10 md:mb-14 max-w-xl" style={{ color: 'var(--p-muted)', letterSpacing: '0.01em' }}>
          Twenty years old. Room after room. One question I keep asking myself. Why not me?
        </p>
      </FadeUp>

      <div className="relative">
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px" style={{ background: 'rgba(245,240,235,0.12)' }} />

        <div className="flex flex-col gap-0">
          {entries.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: 'easeOut' }}
              className="md:pl-10 py-5 md:py-6 group"
              style={{ borderBottom: '1px solid rgba(245,240,235,0.07)' }}
            >
              <div className="hidden md:block absolute left-0 w-2 h-2 rounded-full -translate-x-[3px]" style={{ background: 'var(--p-accent)', marginTop: 30, position: 'absolute' }} />

              {/* Mobile */}
              <div className="flex flex-col gap-1 md:hidden">
                <span className="font-cormorant text-xl font-light" style={{ color: 'var(--p-text)', letterSpacing: '0.02em' }}>{e.competition}</span>
                <span className="text-xs tracking-wider" style={{ color: 'var(--p-muted)', fontFamily: 'var(--font-inter)' }}>{e.institution}</span>
                <span className="text-xs tracking-widest uppercase font-light text-right" style={{ color: 'var(--p-accent)', fontFamily: 'var(--font-inter)' }}>{e.result}</span>
              </div>

              {/* Desktop */}
              <div className="hidden md:grid md:grid-cols-[2fr_2fr_1fr] gap-4 items-center">
                <span className="font-cormorant text-2xl font-light group-hover:text-[#e8647a] transition-colors duration-300" style={{ color: 'var(--p-text)', letterSpacing: '0.02em' }}>{e.competition}</span>
                <span className="text-sm tracking-wider" style={{ color: 'var(--p-muted)', fontFamily: 'var(--font-inter)' }}>{e.institution}</span>
                <span className="text-xs tracking-widest uppercase font-light text-right" style={{ color: 'var(--p-accent)', fontFamily: 'var(--font-inter)' }}>{e.result}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <FadeUp delay={0.2}>
          <p className="mt-8 text-right" style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', fontStyle: 'italic', color: '#e85d75' }}>
            Still counting.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
