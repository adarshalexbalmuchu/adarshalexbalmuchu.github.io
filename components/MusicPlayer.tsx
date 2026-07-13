'use client';

import { useEffect, useRef, useState } from 'react';

/* Seeded star positions so SSR and hydration agree */
function seeded(i: number) {
  const s = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}
const r2 = (n: number) => Math.round(n * 100) / 100;

const ENTRY_STARS = Array.from({ length: 46 }, (_, i) => ({
  left: `${r2(seeded(i + 40) * 100)}%`,
  top: `${r2(seeded(i + 640) * 100)}%`,
  size: seeded(i + 1240) > 0.85 ? 2 : 1,
  min: r2(0.08 + seeded(i + 1840) * 0.15),
  max: r2(0.4 + seeded(i + 2440) * 0.45),
  duration: r2(2.5 + seeded(i + 3040) * 4),
  delay: r2(seeded(i + 3640) * 4),
  gold: seeded(i + 4240) > 0.86,
}));

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<'visible' | 'fading' | 'gone'>('visible');
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio('/musicword-little-waltz-278864.mp3');
    audio.loop = true;
    audio.volume = 0;
    audio.preload = 'auto';
    audioRef.current = audio;

    // the threshold is only crossed once per visit — navigating between
    // pages shouldn't ask the visitor to enter again
    let raf = 0;
    if (sessionStorage.getItem('entered') === '1') {
      raf = requestAnimationFrame(() => setState('gone'));
    }

    return () => {
      audio.pause();
      cancelAnimationFrame(raf);
    };
  }, []);

  const enter = () => {
    if (state !== 'visible') return;
    setState('fading');
    try {
      sessionStorage.setItem('entered', '1');
    } catch {}

    const audio = audioRef.current;
    if (audio) {
      audio.play().catch(() => {});
      setPlaying(true);
      // Fade volume in smoothly
      let vol = 0;
      const fadeIn = setInterval(() => {
        vol = Math.min(vol + 0.02, 0.3);
        audio.volume = vol;
        if (vol >= 0.3) clearInterval(fadeIn);
      }, 60);
    }

    setTimeout(() => setState('gone'), 1200);
  };

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.volume = 0.3;
      audio.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <>
      {state !== 'gone' && (
        <div
          onClick={enter}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background:
              'radial-gradient(ellipse at 30% 20%, rgba(120,40,90,0.25) 0%, transparent 55%), radial-gradient(ellipse at 75% 75%, rgba(60,40,140,0.18) 0%, transparent 55%), #0d0a1a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            overflow: 'hidden',
            transition: 'opacity 1.2s ease',
            opacity: state === 'fading' ? 0 : 1,
          }}
        >
          <style>{`
            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(16px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes pulse {
              0%, 100% { opacity: 0.4; }
              50%       { opacity: 1; }
            }
            .entry-name { animation: fadeUp 1s ease forwards; }
            .entry-cta  { animation: fadeUp 1s ease 0.4s both, pulse 2.5s ease-in-out 1.4s infinite; }
            .entry-rule { animation: fadeUp 1s ease 0.2s both; }
          `}</style>

          {/* The sky is already waiting behind the door */}
          {ENTRY_STARS.map((star, i) => (
            <span
              key={i}
              aria-hidden
              style={
                {
                  position: 'absolute',
                  left: star.left,
                  top: star.top,
                  width: star.size,
                  height: star.size,
                  borderRadius: '50%',
                  background: star.gold ? '#c9a36b' : '#f5f0eb',
                  boxShadow: star.gold ? '0 0 4px rgba(201,163,107,0.6)' : 'none',
                  '--star-min': star.min,
                  '--star-max': star.max,
                  animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
                  pointerEvents: 'none',
                } as React.CSSProperties
              }
            />
          ))}

          {/* Name */}
          <p
            className="entry-name"
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
              fontWeight: 300,
              color: 'rgba(245,240,235,0.92)',
              letterSpacing: '0.08em',
              marginBottom: 16,
              textAlign: 'center',
              position: 'relative',
            }}
          >
            Adarsh Alex Balmuchu
          </p>

          {/* brass rule */}
          <span
            className="entry-rule"
            aria-hidden
            style={{
              display: 'block',
              width: 56,
              height: 1,
              background: 'linear-gradient(90deg, transparent, #c9a36b, transparent)',
              marginBottom: 18,
            }}
          />

          {/* CTA */}
          <p
            className="entry-cta"
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.6rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'var(--p-accent)',
              position: 'relative',
            }}
          >
            Click anywhere to enter
          </p>
        </div>
      )}

      {/* Ambient sound toggle — appears once inside */}
      {state !== 'visible' && (
        <button
          onClick={toggleSound}
          aria-label={playing ? 'Mute ambient music' : 'Play ambient music'}
          title={playing ? 'Mute' : 'Sound on'}
          style={{
            position: 'fixed',
            left: 18,
            bottom: 18,
            zIndex: 9990,
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '1px solid rgba(232,100,122,0.3)',
            background: 'rgba(13,10,26,0.65)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            boxShadow: playing ? '0 0 12px rgba(232,100,122,0.25)' : 'none',
          }}
        >
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              aria-hidden
              style={{
                display: 'block',
                width: 2,
                height: 12,
                borderRadius: 1,
                background: playing ? 'var(--p-accent)' : 'rgba(245,240,235,0.35)',
                transformOrigin: 'bottom',
                transform: playing ? undefined : 'scaleY(0.3)',
                animation: playing
                  ? `eqBar ${0.9 + i * 0.22}s ease-in-out ${i * 0.12}s infinite`
                  : 'none',
              }}
            />
          ))}
        </button>
      )}
    </>
  );
}
