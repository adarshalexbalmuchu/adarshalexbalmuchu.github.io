'use client';

import { useRef, useState, type MouseEvent } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealLine, ScrambleText, FadeUp } from '@/components/ui/animations';

/* ──────────────────────────────────────────────────────────────────
   THE CORRIDOR — v2
   Each competition is a Room. Each Room has a door.
   The door opens when you walk in. The room remembers what happened.

   Palette:
     --p-accent (#e8647a)  → reserved for the verdict (the result)
     brass     (#c9a36b)   → architecture: door frames, plaques, ornaments
   ────────────────────────────────────────────────────────────────── */

type Room = {
  num: string;
  competition: string;
  institution: string;
  result: string;
};

const rooms: Room[] = [
  { num: '01', competition: 'India Innovates Hackathon',           institution: 'Delhi Municipal Corporation', result: 'Top 1000 of 25,000+' },
  { num: '02', competition: 'Snap and Solve',                      institution: 'IIM Bangalore',               result: 'National Winner'      },
  { num: '03', competition: 'National Marketing Case Competition', institution: 'IIM Ahmedabad',               result: 'Finalist'             },
  { num: '04', competition: 'Stock Stoicism Finance Case',         institution: 'BIT Mesra',                   result: 'National Runner-Up'   },
  { num: '05', competition: 'Unbounded Possibilities Photography', institution: 'IIM Bangalore',               result: 'National Finalist'    },
  { num: '06', competition: 'Pixel Perfect Photography',           institution: 'IIM Ahmedabad',               result: 'Second Runner-Up'     },
];

const BRASS = '#c9a36b';
const BRASS_DIM = 'rgba(201,163,107,0.35)';
const BRASS_LINE = 'rgba(201,163,107,0.18)';

const doorEase = [0.83, 0, 0.17, 1] as const;
const softEase = [0.22, 1, 0.36, 1] as const;

/* ── decorative ornament between rooms ── */
function FloorOrnament() {
  return (
    <div
      aria-hidden
      className="relative flex items-center justify-center py-3"
    >
      <span className="h-px flex-1" style={{ background: BRASS_LINE }} />
      <span
        className="px-4 text-[10px] tracking-[0.5em]"
        style={{ color: BRASS_DIM, fontFamily: 'var(--font-cormorant)' }}
      >
        ◆
      </span>
      <span className="h-px flex-1" style={{ background: BRASS_LINE }} />
    </div>
  );
}

/* ── A single room in the corridor ── */
function RoomCard({ room, index }: { room: Room; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [hover, setHover] = useState(false);

  // parallax drift of the giant ghosted numeral
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const numY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const isOdd = index % 2 === 1;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial="closed"
      whileInView="open"
      viewport={{ once: true, amount: 0.35 }}
      className="relative w-full overflow-hidden"
      style={{
        minHeight: 'min(78vh, 640px)',
        background: hover
          ? `radial-gradient(560px circle at ${mouse.x}% ${mouse.y}%, rgba(232,100,122,0.07), transparent 65%)`
          : 'transparent',
        transition: 'background 0.4s ease',
      }}
    >
      {/* inset hairline frame — architectural */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 inset-y-6 md:inset-x-12 md:inset-y-10"
        style={{ border: `1px solid ${BRASS_LINE}` }}
      />

      {/* Giant ghosted room numeral — drifts on scroll */}
      <motion.span
        aria-hidden
        style={{
          y: numY,
          color: 'rgba(201,163,107,0.055)',
          fontFamily: 'var(--font-cormorant)',
          fontStyle: 'italic',
          ...(isOdd ? { left: '-3vw' } : { right: '-3vw' }),
          top: '50%',
          translate: '0 -50%',
        }}
        className="absolute select-none pointer-events-none text-[36vw] md:text-[22vw] leading-none font-light"
      >
        {room.num}
      </motion.span>

      {/* corner room label — properly placed inside the frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          ...(isOdd ? { right: '40px' } : { left: '40px' }),
          top: '32px',
          color: BRASS_DIM,
          fontFamily: 'var(--font-inter)',
          fontSize: '10px',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
        }}
      >
        Room {room.num}
      </div>

      {/* content */}
      <div
        className="relative grid md:grid-cols-2 items-center gap-8 md:gap-16 px-8 md:px-20 py-24 md:py-28"
        style={{ minHeight: 'min(78vh, 640px)' }}
      >
        {/* PLAQUE — competition + institution */}
        <div className={isOdd ? 'md:order-2 md:text-right' : ''}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, delay: 0.2, ease: softEase }}
          >
            <h3
              className="font-cormorant font-light text-2xl sm:text-3xl md:text-[2.75rem] lg:text-[3.25rem] leading-[1.05] mb-5"
              style={{
                color: 'var(--p-text)',
                letterSpacing: '0.005em',
                textWrap: 'balance' as const,
                maxWidth: '22ch',
                marginLeft: isOdd ? 'auto' : undefined,
              }}
            >
              {room.competition}
            </h3>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.5, ease: softEase }}
            className="h-px w-16 mb-4"
            style={{
              background: BRASS,
              transformOrigin: isOdd ? 'right' : 'left',
              marginLeft: isOdd ? 'auto' : undefined,
            }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase"
            style={{ color: 'rgba(245,240,235,0.55)', fontFamily: 'var(--font-inter)' }}
          >
            {room.institution}
          </motion.p>
        </div>

        {/* DOOR — swings open on its hinges to reveal the result */}
        <div
          className={`relative h-[300px] md:h-[400px] flex items-center justify-center ${isOdd ? 'md:order-1' : ''}`}
          style={{ perspective: 1400 }}
        >
          {/* the result, waiting behind the door */}
          <motion.div
            variants={{
              closed: { opacity: 0, scale: 0.88, filter: 'blur(10px)' },
              open:   { opacity: 1, scale: 1, filter: 'blur(0px)' },
            }}
            transition={{ duration: 1.2, delay: 1.15, ease: softEase }}
            className="text-center px-4"
          >
            <p
              className="text-[14px] mb-3"
              style={{ color: BRASS_DIM, fontFamily: 'var(--font-cormorant)', letterSpacing: '0.3em' }}
            >
              ⁂
            </p>
            <p
              className="font-cormorant italic font-light text-3xl md:text-5xl lg:text-[3.5rem] leading-tight"
              style={{
                color: 'var(--p-accent)',
                letterSpacing: '0.005em',
                textShadow: '0 0 40px rgba(232,100,122,0.25)',
              }}
            >
              {room.result}
            </p>
            <motion.div
              variants={{
                closed: { scaleX: 0 },
                open:   { scaleX: 1 },
              }}
              transition={{ duration: 0.85, delay: 1.45, ease: softEase }}
              className="mt-5 mx-auto h-px w-12"
              style={{ background: BRASS }}
            />
          </motion.div>

          {/* golden dust motes drifting up through the doorway */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <motion.span
              key={i}
              aria-hidden
              variants={{
                closed: { opacity: 0 },
                open: {
                  opacity: [0, 0.7, 0],
                  y: [12, -60 - i * 14],
                  x: [0, (i % 2 === 0 ? 1 : -1) * (6 + i * 3)],
                },
              }}
              transition={{
                duration: 5 + i * 0.9,
                delay: 1.6 + i * 0.7,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: 'easeOut',
              }}
              className="absolute pointer-events-none rounded-full"
              style={{
                left: `${18 + i * 10}%`,
                bottom: '18%',
                width: i % 3 === 0 ? 3 : 2,
                height: i % 3 === 0 ? 3 : 2,
                background: i % 2 === 0 ? BRASS : 'var(--p-accent)',
                boxShadow: `0 0 6px ${i % 2 === 0 ? BRASS_DIM : 'rgba(232,100,122,0.4)'}`,
              }}
            />
          ))}

          {/* warm light bleed from behind — ambient glow as doors part */}
          <motion.div
            aria-hidden
            variants={{
              closed: { opacity: 0 },
              open:   { opacity: 1 },
            }}
            transition={{ duration: 1.4, delay: 0.9, ease: 'easeOut' }}
            className="absolute inset-8 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(232,100,122,0.15) 0%, rgba(201,163,107,0.06) 40%, transparent 75%)',
              filter: 'blur(20px)',
            }}
          />

          {/* left door panel — hinged at its left edge, swings toward the viewer */}
          <motion.div
            variants={{
              closed: { rotateY: 0 },
              open:   { rotateY: -88 },
            }}
            transition={{ duration: 1.6, delay: 0.55, ease: doorEase }}
            className="absolute inset-y-0 left-0 w-1/2"
            style={{
              transformOrigin: 'left center',
              background:
                'linear-gradient(105deg, #1c1230 0%, #150c25 50%, #100819 100%)',
              borderRight: `1px solid ${BRASS_DIM}`,
              boxShadow:
                'inset -12px 0 35px -12px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(201,163,107,0.08)',
            }}
          >
            {/* recessed panel detail */}
            <div
              aria-hidden
              className="absolute inset-6 md:inset-10"
              style={{
                border: `1px solid ${BRASS_LINE}`,
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.4)',
              }}
            />
            {/* vertical grain */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, transparent 0 24px, rgba(201,163,107,0.10) 24px 25px)',
              }}
            />
            {/* keyhole / handle */}
            <div
              aria-hidden
              className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
            >
              <span
                className="block w-[3px] h-[3px] rounded-full"
                style={{ background: BRASS, boxShadow: `0 0 6px ${BRASS_DIM}` }}
              />
              <span
                className="block w-px h-10"
                style={{ background: BRASS_DIM }}
              />
            </div>
          </motion.div>

          {/* right door panel — hinged at its right edge */}
          <motion.div
            variants={{
              closed: { rotateY: 0 },
              open:   { rotateY: 88 },
            }}
            transition={{ duration: 1.6, delay: 0.55, ease: doorEase }}
            className="absolute inset-y-0 right-0 w-1/2"
            style={{
              transformOrigin: 'right center',
              background:
                'linear-gradient(255deg, #1c1230 0%, #150c25 50%, #100819 100%)',
              borderLeft: `1px solid ${BRASS_DIM}`,
              boxShadow:
                'inset 12px 0 35px -12px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(201,163,107,0.08)',
            }}
          >
            <div
              aria-hidden
              className="absolute inset-6 md:inset-10"
              style={{
                border: `1px solid ${BRASS_LINE}`,
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.4)',
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, transparent 0 24px, rgba(201,163,107,0.10) 24px 25px)',
              }}
            />
            <div
              aria-hidden
              className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
            >
              <span
                className="block w-[3px] h-[3px] rounded-full"
                style={{ background: BRASS, boxShadow: `0 0 6px ${BRASS_DIM}` }}
              />
              <span
                className="block w-px h-10"
                style={{ background: BRASS_DIM }}
              />
            </div>
          </motion.div>

          {/* threshold seam light — pink hairline flares as doors part */}
          <motion.div
            aria-hidden
            variants={{
              closed: { opacity: 0, scaleY: 0.4 },
              open:   { opacity: [0, 1, 0.6, 0], scaleY: [0.4, 1, 1, 1] },
            }}
            transition={{ duration: 1.6, delay: 0.5, times: [0, 0.3, 0.6, 1] }}
            className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2"
            style={{
              background:
                'linear-gradient(to bottom, transparent, var(--p-accent), transparent)',
              boxShadow: '0 0 28px var(--p-accent)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function ChapterThree() {
  return (
    <section
      id="chapter-3"
      className="relative px-4 md:px-20 py-16 md:py-28"
    >
      {/* Chapter heading */}
      <p className="chapter-label mb-3">
        <ScrambleText>Chapter 3</ScrambleText>
      </p>
      <h2
        className="font-cormorant text-3xl md:text-6xl font-light leading-tight mb-8 md:mb-10 max-w-2xl"
        style={{ color: 'var(--p-text)', letterSpacing: '0.02em' }}
      >
        <RevealLine delay={0.1}>I walked into rooms</RevealLine>
        <RevealLine delay={0.2}>I wasn&apos;t expected to win.</RevealLine>
        <RevealLine delay={0.3}>
          <span className="ink-shimmer">I won anyway.</span>
        </RevealLine>
      </h2>

      <FadeUp delay={0.4}>
        <p
          className="font-cormorant text-base md:text-xl font-light italic mb-12 md:mb-16 max-w-xl"
          style={{ color: 'var(--p-muted)', letterSpacing: '0.01em' }}
        >
          Twenty years old. Room after room. One question I keep asking myself. Why not me?
        </p>
      </FadeUp>

      {/* Index — gives the corridor a header */}
      <FadeUp delay={0.5}>
        <div
          className="flex items-baseline justify-between pb-3"
          style={{ borderBottom: `1px solid ${BRASS_LINE}` }}
        >
          <span
            className="text-[10px] tracking-[0.4em] uppercase"
            style={{ color: BRASS_DIM, fontFamily: 'var(--font-inter)' }}
          >
            ❦ The Index
          </span>
          <span
            className="text-[10px] tracking-[0.4em] uppercase text-right"
            style={{ color: BRASS_DIM, fontFamily: 'var(--font-inter)' }}
          >
            Six rooms · open at will
          </span>
        </div>
      </FadeUp>

      {/* The corridor — full bleed within the section padding */}
      <div className="relative -mx-4 md:-mx-20">
        {rooms.map((room, i) => (
          <div key={room.num}>
            <RoomCard room={room} index={i} />
            {i < rooms.length - 1 && <FloorOrnament />}
          </div>
        ))}
      </div>
    </section>
  );
}
