'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState, ReactNode } from 'react';

// Curtain reveal — line slides up from behind a hidden overflow
export function RevealLine({
  children,
  delay = 0,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span style={{ display: 'block', overflow: 'hidden' }} className={className}>
      <motion.span
        style={{ display: 'block', ...style }}
        initial={{ y: '110%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// Scramble — random chars that resolve into the real text
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ·—·∙';

export function ScrambleText({
  children,
  className,
  style,
}: {
  children: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const [display, setDisplay] = useState(children);

  useEffect(() => {
    if (!isInView) return;
    let frame = 0;
    const target = children.toUpperCase();
    const totalFrames = target.length * 4;
    const interval = setInterval(() => {
      setDisplay(
        target.split('').map((char, i) => {
          if (char === ' ') return ' ';
          if (frame / 4 >= i) return target[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('')
      );
      frame++;
      if (frame > totalFrames) {
        setDisplay(target);
        clearInterval(interval);
      }
    }, 35);
    return () => clearInterval(interval);
  }, [isInView, children]);

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  );
}

// Fade up — for body text, cards, supporting elements
export function FadeUp({
  children,
  delay = 0,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// Typewriter — for Chapter 5
export function TypewriterText({
  children,
  className,
  style,
  speed = 75,
}: {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplay(children.slice(0, i));
      if (i >= children.length) {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [isInView, children, speed]);

  return (
    <span ref={ref} className={className} style={style}>
      {display}
      {!done && (
        <span style={{ animation: 'blink 1s step-start infinite', opacity: 1 }}>|</span>
      )}
    </span>
  );
}
