'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
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

    const animate = () => {
      // dot chases the pointer, ring drifts behind it like a comet tail
      current.current.x += (pos.current.x - current.current.x) * 0.28;
      current.current.y += (pos.current.y - current.current.y) * 0.28;
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.1;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.1;

      const size = hovering.current ? 14 : 8;
      const opacity = hovering.current ? 0.9 : 0.55;
      cursor.style.transform = `translate(${current.current.x - size / 2}px, ${current.current.y - size / 2}px)`;
      cursor.style.width = `${size}px`;
      cursor.style.height = `${size}px`;
      cursor.style.opacity = `${opacity}`;

      const ringSize = hovering.current ? 44 : 30;
      ring.style.transform = `translate(${ringPos.current.x - ringSize / 2}px, ${ringPos.current.y - ringSize / 2}px)`;
      ring.style.width = `${ringSize}px`;
      ring.style.height = `${ringSize}px`;
      ring.style.borderColor = hovering.current
        ? 'rgba(232,100,122,0.75)'
        : 'rgba(232,100,122,0.3)';
      ring.style.boxShadow = hovering.current
        ? '0 0 16px rgba(232,100,122,0.35)'
        : 'none';

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
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
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
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
}
