'use client';

import { useEffect, useRef, useState } from 'react';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<'visible' | 'fading' | 'gone'>('visible');

  useEffect(() => {
    const audio = new Audio('/musicword-little-waltz-278864.mp3');
    audio.loop = true;
    audio.volume = 0;
    audio.preload = 'auto';
    audioRef.current = audio;
  }, []);

  const enter = () => {
    if (state !== 'visible') return;
    setState('fading');

    const audio = audioRef.current;
    if (audio) {
      audio.play().catch(() => {});
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

  if (state === 'gone') return null;

  return (
    <div
      onClick={enter}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#0d0a1a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
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
        .entry-name {
          animation: fadeUp 1s ease forwards;
        }
        .entry-cta {
          animation: fadeUp 1s ease 0.4s both, pulse 2.5s ease-in-out 1.4s infinite;
        }
        .entry-line {
          animation: fadeUp 1s ease 0.2s both;
        }
      `}</style>

      {/* Name */}
      <p
        className="entry-name"
        style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
          fontWeight: 300,
          color: 'rgba(245,240,235,0.92)',
          letterSpacing: '0.08em',
          marginBottom: 12,
          textAlign: 'center',
        }}
      >
        Adarsh Alex Balmuchu
      </p>

      {/* CTA */}
      <p
        className="entry-cta"
        style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: '0.6rem',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: '#e85d75',
        }}
      >
        Click anywhere to enter
      </p>
    </div>
  );
}
