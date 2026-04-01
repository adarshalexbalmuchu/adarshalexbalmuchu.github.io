'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const hovering = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

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
      const ease = 0.12;
      current.current.x += (pos.current.x - current.current.x) * ease;
      current.current.y += (pos.current.y - current.current.y) * ease;

      const size = hovering.current ? 20 : 10;
      const opacity = hovering.current ? 0.8 : 0.4;

      cursor.style.transform = `translate(${current.current.x - size / 2}px, ${current.current.y - size / 2}px)`;
      cursor.style.width = `${size}px`;
      cursor.style.height = `${size}px`;
      cursor.style.opacity = `${opacity}`;

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
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: '#e85d75',
        opacity: 0.4,
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
        willChange: 'transform',
      }}
    />
  );
}
