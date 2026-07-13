'use client';

import { useEffect, useRef } from 'react';

/* Both cursor elements are fixed-size and move/grow purely via transform,
   so the browser never has to re-layout or re-paint them — every frame is
   compositor-only work. */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const dotScale = useRef(1);
  const ringScale = useRef(1);
  const rafRef = useRef<number>(0);
  const hovering = useRef(false);

  useEffect(() => {
    // touch devices keep the native cursor; the elements are hidden via CSS
    if (window.matchMedia('(hover: none)').matches) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) {
        hovering.current = true;
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) {
        hovering.current = false;
      }
    };

    let lastHover = false;
    const animate = () => {
      // dot chases the pointer, ring drifts behind it like a comet tail
      current.current.x += (pos.current.x - current.current.x) * 0.28;
      current.current.y += (pos.current.y - current.current.y) * 0.28;
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.1;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.1;

      const targetDot = hovering.current ? 1.75 : 1;
      const targetRing = hovering.current ? 1.45 : 1;
      dotScale.current += (targetDot - dotScale.current) * 0.2;
      ringScale.current += (targetRing - ringScale.current) * 0.2;

      cursor.style.transform = `translate3d(${current.current.x - 4}px, ${current.current.y - 4}px, 0) scale(${dotScale.current})`;
      ring.style.transform = `translate3d(${ringPos.current.x - 15}px, ${ringPos.current.y - 15}px, 0) scale(${ringScale.current})`;

      if (hovering.current !== lastHover) {
        lastHover = hovering.current;
        cursor.style.opacity = lastHover ? '0.9' : '0.55';
        ring.style.borderColor = lastHover
          ? 'rgba(232,100,122,0.75)'
          : 'rgba(232,100,122,0.3)';
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor-fx"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--p-accent)',
          opacity: 0.55,
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        className="cursor-fx"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 30,
          height: 30,
          borderRadius: '50%',
          border: '1px solid rgba(232,100,122,0.3)',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
        }}
      />
    </>
  );
}
