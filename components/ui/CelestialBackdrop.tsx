'use client';

/* ── The night sky behind every chapter ──
   A fixed, pure-CSS starfield + drifting nebulae in the hero shader's
   palette, so the whole site reads as one continuous world instead of
   stacked slides. Star positions are seeded (not Math.random) so the
   server render and client hydration always agree. */

function seeded(i: number) {
  const s = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}
const r2 = (n: number) => Math.round(n * 100) / 100;

type Star = {
  left: string;
  top: string;
  size: number;
  min: number;
  max: number;
  duration: number;
  delay: number;
  gold: boolean;
};

const STARS: Star[] = Array.from({ length: 80 }, (_, i) => ({
  left: `${r2(seeded(i) * 100)}%`,
  top: `${r2(seeded(i + 500) * 100)}%`,
  size: seeded(i + 1000) > 0.85 ? 2 : 1,
  min: r2(0.05 + seeded(i + 1500) * 0.15),
  max: r2(0.35 + seeded(i + 2000) * 0.45),
  duration: r2(2.5 + seeded(i + 2500) * 5),
  delay: r2(seeded(i + 3000) * 6),
  gold: seeded(i + 3500) > 0.86,
}));

export default function CelestialBackdrop() {
  return (
    <div
      aria-hidden
      className="celestial-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background:
          'linear-gradient(180deg, var(--p-bg) 0%, #0b0818 45%, var(--p-bg-deep) 100%)',
      }}
    >
      {/* Rose nebula — upper left, slow drift */}
      <div
        style={{
          position: 'absolute',
          width: '55vw',
          height: '55vw',
          left: '-12vw',
          top: '4%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(232,100,122,0.07) 0%, rgba(120,40,90,0.05) 40%, transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform',
          animation: 'nebulaDriftA 70s ease-in-out infinite',
        }}
      />
      {/* Indigo-violet nebula — lower right, counter drift */}
      <div
        style={{
          position: 'absolute',
          width: '60vw',
          height: '60vw',
          right: '-15vw',
          bottom: '-10%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(90,70,180,0.06) 0%, rgba(40,20,80,0.05) 45%, transparent 72%)',
          filter: 'blur(70px)',
          willChange: 'transform',
          animation: 'nebulaDriftB 90s ease-in-out infinite',
        }}
      />
      {/* Faint gold breath — center */}
      <div
        style={{
          position: 'absolute',
          width: '40vw',
          height: '40vw',
          left: '32vw',
          top: '38%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(201,163,107,0.035) 0%, transparent 65%)',
          filter: 'blur(80px)',
          willChange: 'transform',
          animation: 'nebulaDriftA 110s ease-in-out infinite reverse',
        }}
      />

      {/* Starfield */}
      {STARS.map((star, i) => (
        <span
          key={i}
          style={
            {
              position: 'absolute',
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              borderRadius: '50%',
              background: star.gold ? 'var(--p-gold)' : 'var(--p-text)',
              boxShadow: star.gold
                ? '0 0 4px rgba(201,163,107,0.6)'
                : star.size > 1
                  ? '0 0 3px rgba(245,240,235,0.5)'
                  : 'none',
              '--star-min': star.min,
              '--star-max': star.max,
              animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* A rare shooting star — one quiet streak, long pause between */}
      <span
        style={{
          position: 'absolute',
          top: '12%',
          right: '8%',
          width: 90,
          height: 1,
          background:
            'linear-gradient(90deg, transparent, rgba(245,240,235,0.8), transparent)',
          animation: 'shootingStar 17s linear 4s infinite',
          opacity: 0,
        }}
      />

      {/* Film grain, matching Chapter 2's texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.25,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
    </div>
  );
}
