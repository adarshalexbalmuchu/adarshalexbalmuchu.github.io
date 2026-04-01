'use client';

import { useEffect, useState } from 'react';

const SEQUENCE = 'whyyou';

export default function EasterEgg() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const buffer = { current: '' };

  const dismiss = () => {
    setFading(true);
    setTimeout(() => {
      setVisible(false);
      setFading(false);
    }, 600);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (visible) {
        dismiss();
        return;
      }
      buffer.current = (buffer.current + e.key.toLowerCase()).slice(-SEQUENCE.length);
      if (buffer.current === SEQUENCE) {
        buffer.current = '';
        setVisible(true);
      }
    };

    const onClick = () => { if (visible) dismiss(); };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('click', onClick);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      onClick={dismiss}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.7)',
        animation: fading
          ? 'fadeOut 0.6s ease forwards'
          : 'fadeIn 0.8s ease forwards',
        pointerEvents: 'all',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: '2rem',
          fontWeight: 300,
          fontStyle: 'italic',
          color: '#f5f0eb',
          letterSpacing: '0.02em',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        Because I noticed you were looking.
      </p>
      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes fadeOut { from { opacity: 1 } to { opacity: 0 } }
      `}</style>
    </div>
  );
}
