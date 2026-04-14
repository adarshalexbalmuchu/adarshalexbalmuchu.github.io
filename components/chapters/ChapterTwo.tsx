'use client';

import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ScrambleText, FadeUp } from '@/components/ui/animations';
import { DesktopFrame, TabletFrame, MobileFrame } from '@/components/ui/DeviceFrames';

/* ── live iframe embed ── */
function LiveEmbed({ url, scale = 0.5 }: { url: string; scale?: number }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#180c14', overflow: 'hidden' }}>
      <iframe
        src={`https://${url}`}
        title={url}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
        style={{
          width: `${Math.round(100 / scale)}%`,
          height: `${Math.round(100 / scale)}%`,
          border: 'none',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

/* ── project metadata per frame ── */
const frameInfo: Record<string, { name: string; tag: string; desc: string; color: string }> = {
  hero:   { name: 'Unitech India',          tag: 'E-commerce · Full-Stack',    desc: 'End-to-end digital commerce platform — 12k+ products, real payments, real logistics.', color: '#e8647a' },
  mobile: { name: 'Young Comet',            tag: 'Brand · Landing Page',       desc: 'Brand identity and conversion-focused landing for a creative studio.', color: '#64b5f6' },
  tabL:   { name: 'Echoing Healthy Ageing', tag: 'Healthcare · Platform',      desc: 'Digital health platform connecting patients with evidence-based care programs.', color: '#81c784' },
  tabR:   { name: 'Shatam Care',            tag: 'NGO · Web App',              desc: 'Mission-driven web app empowering community health outreach.', color: '#ffb74d' },
};

/* ── entry animation config ── */
const entryEase = [0.22, 1, 0.36, 1] as const;
const entryInitial = { opacity: 0, y: 60, scale: 0.95 };
const entryAnimate = { opacity: 1, y: 0, scale: 1 };

/* ── idle floating keyframes ── */
const floatY = {
  y: [0, -8, 0],
  transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const },
};

/* ── floating tech stack pills ── */
const techPills = [
  { label: 'Next.js',     x: '3%',  y: '8%',  delay: 0, color: '#1a1a2e' },
  { label: 'TypeScript',  x: '88%', y: '5%',  delay: 0.6, color: '#3178c6' },
  { label: 'React',       x: '92%', y: '45%', delay: 1.2, color: '#61dafb' },
  { label: 'Tailwind',    x: '5%',  y: '55%', delay: 0.3, color: '#38bdf8' },
  { label: 'Node.js',     x: '8%',  y: '85%', delay: 0.9, color: '#68a063' },
  { label: 'PostgreSQL',  x: '85%', y: '82%', delay: 1.5, color: '#336791' },
  { label: 'Figma',       x: '48%', y: '65%', delay: 0.45, color: '#a259ff' },
  { label: 'Vercel',      x: '75%', y: '3%',  delay: 1.05, color: '#1a1a2e' },
];

/* ── decorative scattered elements ── */
const decoElements = [
  { type: 'cross', x: '15%', y: '25%', size: 10, delay: 0.2 },
  { type: 'ring',  x: '82%', y: '30%', size: 14, delay: 0.5 },
  { type: 'dot',   x: '25%', y: '70%', size: 4,  delay: 0.8 },
  { type: 'cross', x: '70%', y: '68%', size: 8,  delay: 1.1 },
  { type: 'ring',  x: '40%', y: '15%', size: 10, delay: 0.35 },
  { type: 'dot',   x: '60%', y: '85%', size: 5,  delay: 0.65 },
  { type: 'diamond', x: '92%', y: '60%', size: 8, delay: 0.95 },
  { type: 'diamond', x: '6%',  y: '40%', size: 6, delay: 1.25 },
];

/* ── stat indicators ── */
const stats = [
  { value: '4', label: 'Live Products', x: '2%', y: '2%' },
  { value: '12k+', label: 'Products Listed', x: '78%', y: '92%' },
];

/* ── deploy log lines for mini terminal ── */
const deployLines = [
  { text: '$ git push origin main', color: '#81c784' },
  { text: 'Enumerating objects: 42, done.', color: 'rgba(30,30,50,0.5)' },
  { text: '▸ Building Next.js app...', color: '#64b5f6' },
  { text: '✓ Compiled successfully', color: '#81c784' },
  { text: '▸ Running type checks...', color: '#64b5f6' },
  { text: '✓ No TypeScript errors', color: '#81c784' },
  { text: '▸ Generating static pages (4/4)', color: '#64b5f6' },
  { text: '▸ Deploying to edge network...', color: '#ffb74d' },
  { text: '✓ Production: unitechshop.com', color: '#81c784' },
  { text: '✓ Deployed in 28s', color: '#e8647a' },
];

/* ── Mini deploy terminal ── */
function MiniTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= deployLines.length) {
          // Reset after a pause
          setTimeout(() => setVisibleLines(0), 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      width: 220,
      background: 'rgba(20,12,18,0.92)',
      backdropFilter: 'blur(16px)',
      borderRadius: 8,
      border: '1px solid rgba(232,100,122,0.12)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)',
      overflow: 'hidden',
    }}>
      {/* Title bar */}
      <div style={{ padding: '5px 8px', display: 'flex', alignItems: 'center', gap: 4, borderBottom: '1px solid rgba(232,100,122,0.08)' }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#ff5f57' }} />
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#febc2e' }} />
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#28c840' }} />
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '7px', color: 'rgba(255,220,225,0.3)', marginLeft: 4 }}>deploy.sh</span>
      </div>
      {/* Lines */}
      <div style={{ padding: '6px 8px', height: 110, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {deployLines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={`${i}-${visibleLines}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '7px',
              color: line.color,
              lineHeight: 1.5,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {line.text}
          </motion.div>
        ))}
        {visibleLines < deployLines.length && (
          <span style={{
            display: 'inline-block', width: 4, height: 9,
            background: '#e8647a', animation: 'blink 1.1s step-start infinite',
          }} />
        )}
      </div>
    </div>
  );
}

/* ── Floating code snippet fragments ── */
const codeSnippets = [
  { code: 'const app = createNext()', x: '12%', y: '32%', rotate: -3 },
  { code: 'await db.products.findMany()', x: '76%', y: '25%', rotate: 2 },
  { code: '<motion.div animate={...}>', x: '65%', y: '72%', rotate: -1 },
  { code: 'export async function GET()', x: '18%', y: '78%', rotate: 1.5 },
  { code: 'className="grid grid-cols-3"', x: '55%', y: '8%', rotate: -2 },
];

/* ── Orbit ring component ── */
function OrbitRing() {
  return (
    <div style={{
      position: 'absolute',
      left: '50%', top: '2%',
      width: 780, height: 520,
      transform: 'translateX(-50%)',
      zIndex: 35,
      pointerEvents: 'none',
    }}>
      <svg width="100%" height="100%" viewBox="0 0 780 520" fill="none" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e8647a" stopOpacity="0" />
            <stop offset="30%" stopColor="#e8647a" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#ff8a9e" stopOpacity="0.2" />
            <stop offset="70%" stopColor="#e8647a" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#e8647a" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Elliptical orbit */}
        <ellipse
          cx="390" cy="260" rx="410" ry="80"
          stroke="url(#orbitGrad)"
          strokeWidth="0.8"
          strokeDasharray="4 6"
          style={{ transform: 'rotate(-4deg)', transformOrigin: 'center' }}
        />
        {/* Traveling dot 1 */}
        <motion.circle
          r="3"
          fill="#e8647a"
          style={{ filter: 'drop-shadow(0 0 4px #e8647a)' }}
          animate={{
            cx: [0, 390, 780, 390, 0],
            cy: [260, 180, 260, 340, 260],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
        {/* Traveling dot 2 — opposite phase */}
        <motion.circle
          r="2"
          fill="#64b5f6"
          style={{ filter: 'drop-shadow(0 0 4px #64b5f6)' }}
          animate={{
            cx: [780, 390, 0, 390, 780],
            cy: [260, 340, 260, 180, 260],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
      </svg>
    </div>
  );
}

/* ── Rising particle system ── */
/* Deterministic pseudo-random to avoid SSR hydration mismatch */
function seeded(i: number) { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); }
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: `${5 + seeded(i) * 90}%`,
  size: 1.5 + seeded(i + 100) * 2.5,
  duration: 8 + seeded(i + 200) * 12,
  delay: seeded(i + 300) * 8,
  color: ['#e8647a', '#64b5f6', '#81c784', '#ffb74d', '#a259ff'][Math.floor(seeded(i + 400) * 5)],
}));

/* ── mouse-following spotlight in canvas ── */
function useMouseLight(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, [containerRef]);

  return { pos, onMove };
}

/* ═════════════════════════════════════════════════════════
   CHAPTER TWO — Cinematic floating device showcase
   ═════════════════════════════════════════════════════════ */
export default function ChapterTwo() {
  const [hovered, setHovered] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { pos, onMove: onMouseMove } = useMouseLight(containerRef);

  /* scroll parallax */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const mobileY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const tabletY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  /* hover focus helpers */
  const dimmed = (id: string) =>
    hovered !== null && hovered !== id
      ? { opacity: 0.35, filter: 'blur(3px)' }
      : {};
  const focused = hovered !== null
    ? { scale: 1.04, y: -10 }
    : {};

  const activeInfo = frameInfo[hovered ?? 'hero'];

  return (
    <section
      id="chapter-2"
      className="min-h-screen px-4 md:px-20 py-16 md:py-28 flex flex-col justify-center"
      style={{ background: 'linear-gradient(160deg, #f8f4f0 0%, #f5f2ed 25%, #f0ece6 50%, #eee9e2 75%, #f3efe9 100%)', position: 'relative', overflow: 'hidden' }}
    >
      {/* ── Gradient mesh background ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {/* Warm top-left blob */}
        <div style={{
          position: 'absolute', width: '60%', height: '60%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,100,122,0.12) 0%, transparent 60%)',
          top: '-10%', left: '-5%', filter: 'blur(100px)',
        }} />
        {/* Cool bottom-right blob */}
        <div style={{
          position: 'absolute', width: '50%', height: '50%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(100,140,246,0.10) 0%, transparent 60%)',
          bottom: '-5%', right: '-5%', filter: 'blur(100px)',
        }} />
        {/* Amber center-bottom */}
        <div style={{
          position: 'absolute', width: '40%', height: '40%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,183,77,0.08) 0%, transparent 60%)',
          bottom: '10%', left: '30%', filter: 'blur(100px)',
        }} />
        {/* Soft green left */}
        <div style={{
          position: 'absolute', width: '35%', height: '35%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(129,199,132,0.08) 0%, transparent 60%)',
          top: '50%', left: '5%', filter: 'blur(90px)',
        }} />
        {/* Purple accent — center */}
        <div style={{
          position: 'absolute', width: '45%', height: '45%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(162,100,232,0.06) 0%, transparent 60%)',
          top: '20%', left: '35%', filter: 'blur(120px)',
        }} />
        {/* Warm glow — right edge */}
        <div style={{
          position: 'absolute', width: '30%', height: '50%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,100,122,0.06) 0%, transparent 55%)',
          top: '40%', right: '-3%', filter: 'blur(80px)',
        }} />
      </div>

      {/* ── Noise texture overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }} />

      {/* ── Thin horizontal rule accent ── */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, pointerEvents: 'none',
        background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.06) 20%, rgba(0,0,0,0.06) 80%, transparent)',
      }} />

      {/* ── Side annotation — left ── */}
      <div style={{
        position: 'absolute', left: 20, top: '50%', transform: 'rotate(-90deg) translateX(-50%)',
        transformOrigin: '0 0', zIndex: 2, pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: 'var(--font-inter)', fontSize: '8px', letterSpacing: '0.25em',
          textTransform: 'uppercase', color: 'rgba(30,30,50,0.15)', whiteSpace: 'nowrap',
        }}>
          Design · Develop · Deploy
        </span>
      </div>

      {/* ── Side annotation — right ── */}
      <div style={{
        position: 'absolute', right: 20, top: '50%', transform: 'rotate(90deg) translateX(50%)',
        transformOrigin: '100% 0', zIndex: 2, pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: 'var(--font-inter)', fontSize: '8px', letterSpacing: '0.25em',
          textTransform: 'uppercase', color: 'rgba(30,30,50,0.15)', whiteSpace: 'nowrap',
        }}>
          Portfolio · 2024–25
        </span>
      </div>

      {/* Header */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <p className="chapter-label mb-3" style={{ color: 'rgba(30,30,50,0.4)' }}>
          <ScrambleText>Chapter 2</ScrambleText>
        </p>

        <h2
          className="font-cormorant text-3xl md:text-5xl font-light leading-tight mb-4"
          style={{ color: '#1a1a2e', letterSpacing: '0.01em' }}
        >
          Most strategists talk.{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, var(--p-accent), #ff8a9e, var(--p-accent))',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shimmerText 3s ease-in-out infinite',
            }}
          >
            I ship.
          </span>
        </h2>

        <FadeUp delay={0.1}>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 14,
              lineHeight: 1.75,
              color: 'rgba(30,30,50,0.55)',
              maxWidth: 480,
              marginBottom: 52,
            }}
          >
            Four live products. Real businesses, real users, real stakes.
          </p>
        </FadeUp>
      </div>

      {/* ═══ DESKTOP: Cinematic floating canvas ═══ */}
      <div
        ref={containerRef}
        className="hidden md:block relative w-full max-w-[1400px] mx-auto"
        style={{ height: 920 }}
        onMouseMove={onMouseMove}
      >
        {/* Mouse-following spotlight */}
        <div
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${activeInfo.color}08 0%, transparent 70%)`,
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            transition: 'left 0.3s ease-out, top 0.3s ease-out, background 0.5s ease',
            filter: 'blur(40px)',
            zIndex: 1,
          }}
        />

        {/* ── Constellation connection lines ── */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}
          viewBox="0 0 1400 850"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8647a" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#e8647a" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#64b5f6" stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="lineGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#81c784" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#ffb74d" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#e8647a" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          {/* Hero → Mobile */}
          <motion.path
            d="M 700 180 Q 900 120 1200 160"
            fill="none"
            stroke="url(#lineGrad1)"
            strokeWidth="1"
            strokeDasharray="6 8"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, delay: 0.8, ease: 'easeOut' }}
          />
          {/* Hero → Tablet L */}
          <motion.path
            d="M 500 380 Q 300 500 250 650"
            fill="none"
            stroke="url(#lineGrad2)"
            strokeWidth="1"
            strokeDasharray="6 8"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, delay: 1.0, ease: 'easeOut' }}
          />
          {/* Hero → Tablet R */}
          <motion.path
            d="M 900 380 Q 1050 500 1150 650"
            fill="none"
            stroke="url(#lineGrad1)"
            strokeWidth="1"
            strokeDasharray="6 8"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, delay: 1.2, ease: 'easeOut' }}
          />
          {/* Tablet L → Tablet R (bottom arc) */}
          <motion.path
            d="M 380 780 Q 700 850 1020 780"
            fill="none"
            stroke="url(#lineGrad2)"
            strokeWidth="1"
            strokeDasharray="4 10"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 1.4, ease: 'easeOut' }}
          />
        </svg>

        {/* ── Floating tech stack pills ── */}
        {techPills.map((pill) => (
          <motion.div
            key={pill.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 + pill.delay, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: pill.x,
              top: pill.y,
              zIndex: 3,
              pointerEvents: 'none',
            }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5 + pill.delay * 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '0.04em',
                color: pill.color,
                padding: '3px 10px',
                borderRadius: 20,
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(8px)',
                border: `1px solid ${pill.color}18`,
                boxShadow: `0 2px 8px rgba(0,0,0,0.04), 0 0 0 1px ${pill.color}08`,
                whiteSpace: 'nowrap',
              }}
            >
              {pill.label}
            </motion.div>
          </motion.div>
        ))}

        {/* ── Decorative scattered elements ── */}
        {decoElements.map((el, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 + el.delay, ease: 'backOut' }}
            style={{
              position: 'absolute',
              left: el.x,
              top: el.y,
              zIndex: 2,
              pointerEvents: 'none',
            }}
          >
            <motion.div
              animate={{ rotate: el.type === 'cross' || el.type === 'diamond' ? [0, 90, 0] : 0, opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 8 + i, repeat: Infinity, ease: 'easeInOut' }}
            >
              {el.type === 'cross' && (
                <svg width={el.size} height={el.size} viewBox="0 0 10 10">
                  <line x1="5" y1="0" x2="5" y2="10" stroke="rgba(232,100,122,0.25)" strokeWidth="1" />
                  <line x1="0" y1="5" x2="10" y2="5" stroke="rgba(232,100,122,0.25)" strokeWidth="1" />
                </svg>
              )}
              {el.type === 'ring' && (
                <svg width={el.size} height={el.size} viewBox="0 0 14 14">
                  <circle cx="7" cy="7" r="5.5" fill="none" stroke="rgba(100,181,246,0.2)" strokeWidth="1" />
                </svg>
              )}
              {el.type === 'dot' && (
                <div style={{ width: el.size, height: el.size, borderRadius: '50%', background: 'rgba(232,100,122,0.2)' }} />
              )}
              {el.type === 'diamond' && (
                <svg width={el.size} height={el.size} viewBox="0 0 10 10">
                  <rect x="2" y="2" width="6" height="6" fill="none" stroke="rgba(255,183,77,0.2)" strokeWidth="1" transform="rotate(45 5 5)" />
                </svg>
              )}
            </motion.div>
          </motion.div>
        ))}

        {/* ── Side stat indicators ── */}
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 1 + i * 0.3, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: stat.x,
              top: stat.y,
              zIndex: 3,
              pointerEvents: 'none',
            }}
          >
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: i === 0 ? 'flex-start' : 'flex-end',
              gap: 2,
            }}>
              <span style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '2rem',
                fontWeight: 300,
                color: '#1a1a2e',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}>
                {stat.value}
              </span>
              <span style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '8px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'rgba(30,30,50,0.35)',
              }}>
                {stat.label}
              </span>
            </div>
          </motion.div>
        ))}

        {/* ── Dot grid pattern ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.35,
          backgroundImage: 'radial-gradient(circle, rgba(30,30,50,0.12) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
        }} />

        {/* ── Rising particles ── */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: [0, 0.6, 0.6, 0], y: [920, -20] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              left: p.x,
              bottom: 0,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}40`,
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* ── Floating code snippets ── */}
        {codeSnippets.map((snippet, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 + i * 0.15, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: snippet.x,
              top: snippet.y,
              zIndex: 2,
              pointerEvents: 'none',
              transform: `rotate(${snippet.rotate}deg)`,
            }}
          >
            <motion.div
              animate={{ y: [0, -5, 0], opacity: [0.25, 0.45, 0.25] }}
              transition={{ duration: 7 + i * 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '8px',
                color: 'rgba(30,30,50,0.18)',
                padding: '3px 8px',
                borderRadius: 4,
                background: 'rgba(255,255,255,0.35)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(30,30,50,0.04)',
                whiteSpace: 'nowrap',
              }}
            >
              {snippet.code}
            </motion.div>
          </motion.div>
        ))}

        {/* ── Orbit ring around hero ── */}
        <OrbitRing />

        {/* ── Mini deploy terminal ── */}
        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.5, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            left: '1%',
            top: '15%',
            zIndex: 25,
            pointerEvents: 'none',
            transform: 'rotate(-1deg)',
          }}
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <MiniTerminal />
          </motion.div>
        </motion.div>

        {/* ── Animated gradient border around canvas ── */}
        <div style={{
          position: 'absolute',
          inset: -1,
          borderRadius: 16,
          padding: 1,
          background: 'linear-gradient(var(--border-angle, 0deg), rgba(232,100,122,0.15), transparent 40%, rgba(100,181,246,0.12) 60%, transparent 80%, rgba(129,199,132,0.1))',
          animation: 'rotateBorder 8s linear infinite',
          zIndex: 0,
          pointerEvents: 'none',
          maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          maskComposite: 'exclude',
          WebkitMaskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          WebkitMaskComposite: 'xor',
        }} />

        {/* ── HERO: Desktop — centered, z-40 ── */}
        <motion.div
          className="absolute"
          initial={entryInitial}
          whileInView={entryAnimate}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.2, ease: entryEase }}
          style={{
            left: '50%',
            top: '2%',
            x: '-50%',
            y: heroY,
            zIndex: 40,
            width: 700,
            transition: 'opacity 0.4s ease, filter 0.4s ease',
            ...dimmed('hero'),
          }}
          onMouseEnter={() => setHovered('hero')}
          onMouseLeave={() => setHovered(null)}
        >
          <motion.div animate={hovered === 'hero' ? focused : {}}>
            <a
              href="https://unitechshop.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
            >
              <DesktopFrame url="unitechshop.com" isLive glowColor="#e8647a">
                <LiveEmbed url="unitechshop.com" />
                {/* Hero hover overlay */}
                <motion.div
                  initial={false}
                  animate={{ opacity: hovered === 'hero' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 5,
                    padding: '24px 22px 18px',
                    background: 'linear-gradient(to top, rgba(8,10,18,0.92) 0%, rgba(8,10,18,0.4) 60%, transparent 100%)',
                    pointerEvents: 'none',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.3rem', color: 'var(--p-text)', fontWeight: 500 }}>
                    Unitech India
                  </span>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--p-muted)', lineHeight: 1.55, marginTop: 4, maxWidth: 380 }}>
                    Full-stack digital commerce — designed, built, and shipped from zero.
                  </p>
                </motion.div>
              </DesktopFrame>
            </a>
          </motion.div>
        </motion.div>

        {/* ── MOBILE: top-right, z-30, floating idle ── */}
        <motion.div
          className="absolute"
          initial={entryInitial}
          whileInView={entryAnimate}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.35, ease: entryEase }}
          animate={hovered === 'mobile' ? focused : floatY}
          style={{
            right: '2%',
            top: '12%',
            y: mobileY,
            zIndex: 30,
            width: 150,
            rotate: 2,
            transition: 'opacity 0.4s ease, filter 0.4s ease',
            ...dimmed('mobile'),
          }}
          onMouseEnter={() => setHovered('mobile')}
          onMouseLeave={() => setHovered(null)}
        >
          <a
            href="https://youngcomet.co"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
          >
            <MobileFrame url="youngcomet.co" glowColor="#64b5f6">
              <LiveEmbed url="youngcomet.co" scale={0.28} />
            </MobileFrame>
          </a>
        </motion.div>

        {/* ── TABLET LEFT: bottom-left, z-10, background ── */}
        <motion.div
          className="absolute"
          initial={entryInitial}
          whileInView={entryAnimate}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.5, ease: entryEase }}
          animate={hovered === 'tabL' ? focused : floatY}
          style={{
            left: '0%',
            bottom: '10%',
            y: tabletY,
            zIndex: 10,
            width: 360,
            opacity: hovered === 'tabL' ? 1 : (hovered !== null ? 0.35 : 0.7),
            filter: hovered === 'tabL' ? 'none' : (hovered !== null ? 'blur(3px)' : 'blur(1.5px)'),
            scale: hovered === 'tabL' ? 1.04 : 0.88,
            transition: 'opacity 0.4s ease, filter 0.4s ease, scale 0.4s ease',
          }}
          onMouseEnter={() => setHovered('tabL')}
          onMouseLeave={() => setHovered(null)}
        >
          <a
            href="https://echoinghealthyageing.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
          >
            <TabletFrame url="echoinghealthyageing.com" glowColor="#81c784">
              <LiveEmbed url="echoinghealthyageing.com" />
            </TabletFrame>
          </a>
        </motion.div>

        {/* ── TABLET RIGHT: bottom-right, z-10, background ── */}
        <motion.div
          className="absolute"
          initial={entryInitial}
          whileInView={entryAnimate}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.6, ease: entryEase }}
          style={{
            right: '0%',
            bottom: '10%',
            y: tabletY,
            zIndex: 10,
            width: 360,
            opacity: hovered === 'tabR' ? 1 : (hovered !== null ? 0.35 : 0.68),
            filter: hovered === 'tabR' ? 'none' : (hovered !== null ? 'blur(3px)' : 'blur(1.5px)'),
            scale: hovered === 'tabR' ? 1.04 : 0.88,
            transition: 'opacity 0.4s ease, filter 0.4s ease, scale 0.4s ease',
          }}
          onMouseEnter={() => setHovered('tabR')}
          onMouseLeave={() => setHovered(null)}
        >
          <a
            href="https://shatamcare.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
          >
            <TabletFrame url="shatamcare.org" glowColor="#ffb74d">
              <LiveEmbed url="shatamcare.org" />
            </TabletFrame>
          </a>
        </motion.div>

        {/* ── Dynamic label — morphs per hovered frame ── */}
        <motion.div
          className="absolute"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.8, ease: entryEase }}
          style={{
            left: '50%',
            bottom: '1%',
            x: '-50%',
            zIndex: 40,
            textAlign: 'center',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={hovered ?? 'hero'}
              initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {/* Accent dot */}
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: activeInfo.color, boxShadow: `0 0 8px ${activeInfo.color}40`, flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', color: '#1a1a2e', fontWeight: 500, whiteSpace: 'nowrap' }}>
                  {activeInfo.name}
                </span>
                <span style={{
                  fontFamily: 'var(--font-inter)', fontSize: '8px', textTransform: 'uppercase',
                  letterSpacing: '0.1em', color: activeInfo.color, whiteSpace: 'nowrap',
                  padding: '2px 8px', borderRadius: 4,
                  background: `${activeInfo.color}10`, border: `1px solid ${activeInfo.color}20`,
                }}>
                  {activeInfo.tag}
                </span>
              </div>
              <p style={{
                fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'rgba(30,30,50,0.5)',
                maxWidth: 400, lineHeight: 1.5, textAlign: 'center',
              }}>
                {activeInfo.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ═══ MOBILE: Stacked ═══ */}
      <div className="md:hidden flex flex-col items-center gap-12" style={{ position: 'relative', zIndex: 2 }}>
        <FadeUp delay={0.1}>
          <a href="https://unitechshop.com" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none', color: 'inherit', width: '100%', maxWidth: 440 }}>
            <DesktopFrame url="unitechshop.com" isLive glowColor="#e8647a">
              <LiveEmbed url="unitechshop.com" />
            </DesktopFrame>
            <div style={{ marginTop: 10, textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1rem', color: '#1a1a2e', fontWeight: 500 }}>Unitech India</span>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: '7px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#e8647a', marginLeft: 8 }}>E-commerce</span>
            </div>
          </a>
        </FadeUp>

        <FadeUp delay={0.18}>
          <a href="https://echoinghealthyageing.com" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none', color: 'inherit', width: '100%', maxWidth: 380 }}>
            <TabletFrame url="echoinghealthyageing.com" glowColor="#81c784">
              <LiveEmbed url="echoinghealthyageing.com" />
            </TabletFrame>
            <div style={{ marginTop: 10, textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1rem', color: '#1a1a2e', fontWeight: 500 }}>Echoing Healthy Ageing</span>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: '7px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#81c784', marginLeft: 8 }}>Healthcare</span>
            </div>
          </a>
        </FadeUp>

        <FadeUp delay={0.26}>
          <a href="https://shatamcare.org" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none', color: 'inherit', width: '100%', maxWidth: 380 }}>
            <TabletFrame url="shatamcare.org" glowColor="#ffb74d">
              <LiveEmbed url="shatamcare.org" />
            </TabletFrame>
            <div style={{ marginTop: 10, textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1rem', color: '#1a1a2e', fontWeight: 500 }}>Shatam Care</span>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: '7px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#ffb74d', marginLeft: 8 }}>NGO</span>
            </div>
          </a>
        </FadeUp>

        <FadeUp delay={0.34}>
          <a href="https://youngcomet.co" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none', color: 'inherit', width: 160 }}>
            <MobileFrame url="youngcomet.co" glowColor="#64b5f6">
              <LiveEmbed url="youngcomet.co" scale={0.28} />
            </MobileFrame>
            <div style={{ marginTop: 10, textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1rem', color: '#1a1a2e', fontWeight: 500 }}>Young Comet</span>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: '7px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64b5f6', marginLeft: 8 }}>Brand</span>
            </div>
          </a>
        </FadeUp>
      </div>

      {/* ── Bottom separator ── */}
      <FadeUp delay={0.4}>
        <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, position: 'relative', zIndex: 2 }}>
          <div style={{ flex: 1, maxWidth: 120, height: 1, background: 'linear-gradient(90deg, transparent, rgba(232,100,122,0.15))' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--p-accent)', boxShadow: '0 0 6px var(--p-accent)', animation: 'livePulse 2s ease-in-out infinite' }} />
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(30,30,50,0.3)' }}>
              Still building
            </span>
          </div>
          <div style={{ flex: 1, maxWidth: 120, height: 1, background: 'linear-gradient(90deg, rgba(232,100,122,0.15), transparent)' }} />
        </div>
      </FadeUp>
    </section>
  );
}
