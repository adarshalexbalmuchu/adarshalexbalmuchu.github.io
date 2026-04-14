'use client';

import { ReactNode, useRef, useCallback, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/* ═══════════════════════════════════════════
   3D tilt hook — capped per spec (5–8°)
   ═══════════════════════════════════════════ */
function useTilt(intensity = 6) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 180, damping: 22 });

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [x, y],
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, rotateX, rotateY, onMove, onLeave };
}

/* ═══════════════════════════════════════════
   Glass reflection sweep — diagonal light
   that sweeps across screen on hover
   ═══════════════════════════════════════════ */
function GlassSweep({ active }: { active: boolean }) {
  return (
    <motion.div
      initial={{ x: '-120%' }}
      animate={active ? { x: '120%' } : { x: '-120%' }}
      transition={active ? { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } : { duration: 0 }}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        pointerEvents: 'none',
        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)',
      }}
    />
  );
}

/* ═══════════════════════════════════════════
   DESKTOP — MacBook 16" (16:10)
   Hero frame — max-width 700px
   ═══════════════════════════════════════════ */
export function DesktopFrame({
  url,
  isLive,
  children,
  glowColor,
}: {
  url: string;
  isLive?: boolean;
  children: ReactNode;
  glowColor?: string;
}) {
  const { ref, rotateX, rotateY, onMove, onLeave } = useTilt(5);
  const [swept, setSwept] = useState(false);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { onLeave(); setSwept(false); }}
      onMouseEnter={() => setSwept(true)}
      style={{ perspective: 1200, width: '100%', maxWidth: 780, margin: '0 auto', position: 'relative' }}
    >
      {/* Ambient glow */}
      {glowColor && (
        <div
          style={{
            position: 'absolute',
            inset: '-20%',
            background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 70%)`,
            opacity: 0.15,
            zIndex: -1,
            pointerEvents: 'none',
            filter: 'blur(40px)',
          }}
        />
      )}

      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        <div
          style={{
            borderRadius: '10px 10px 0 0',
            background: '#2a1520',
            boxShadow:
              '0 50px 100px rgba(140,40,60,0.10), 0 20px 40px rgba(140,40,60,0.07), 0 8px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(232,100,122,0.08)',
            border: '1px solid rgba(232,100,122,0.10)',
            overflow: 'hidden',
          }}
        >
          {/* Chrome bar */}
          <div style={{ background: '#221018', padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ display: 'flex', gap: 4 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff5f57' }} />
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#febc2e' }} />
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#28c840' }} />
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <div style={{ background: 'rgba(232,100,122,.06)', borderRadius: 4, padding: '2px 14px', display: 'flex', alignItems: 'center', gap: 4 }}>
                <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="rgba(232,100,122,.255)" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '8px', color: 'rgba(255,220,225,.35)' }}>{url}</span>
              </div>
            </div>
            {isLive && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: '#28c840',
                    boxShadow: '0 0 6px #28c840, 0 0 12px rgba(40,200,64,0.3)',
                    animation: 'livePulse 2s ease-in-out infinite',
                  }}
                />
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '6px', fontWeight: 600, color: '#28c840', letterSpacing: '0.06em' }}>LIVE</span>
              </div>
            )}
          </div>

          {/* Screen 16:10 */}
          <div style={{ position: 'relative', aspectRatio: '16 / 10', overflow: 'hidden' }}>
            {children}
            <GlassSweep active={swept} />
          </div>
        </div>

        {/* Hinge */}
        <div style={{ height: 6, background: 'linear-gradient(180deg, #3a1e2e, #2a1520)', borderRadius: '0 0 2px 2px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: 32, height: 2, borderRadius: 1, background: 'rgba(232,100,122,0.08)' }} />
        </div>
        <div style={{ width: '48%', height: 2, margin: '0 auto', background: 'rgba(232,100,122,0.06)', borderRadius: '0 0 4px 4px' }} />
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   TABLET — iPad landscape (4:3)
   max-width 340px
   ═══════════════════════════════════════════ */
export function TabletFrame({
  url,
  children,
  glowColor,
}: {
  url: string;
  children: ReactNode;
  glowColor?: string;
}) {
  const { ref, rotateX, rotateY, onMove, onLeave } = useTilt(7);
  const [swept, setSwept] = useState(false);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { onLeave(); setSwept(false); }}
      onMouseEnter={() => setSwept(true)}
      style={{ perspective: 1000, width: '100%', maxWidth: 380, margin: '0 auto', position: 'relative' }}
    >
      {glowColor && (
        <div
          style={{
            position: 'absolute',
            inset: '-25%',
            background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 70%)`,
            opacity: 0.12,
            zIndex: -1,
            pointerEvents: 'none',
            filter: 'blur(30px)',
          }}
        />
      )}

      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        <div
          style={{
            borderRadius: 12,
            background: '#2a1520',
            padding: 4,
            boxShadow: '0 40px 80px rgba(140,40,60,0.10), 0 15px 30px rgba(140,40,60,0.07), 0 5px 12px rgba(0,0,0,0.05), 0 0 0 1px rgba(232,100,122,0.08)',
            border: '1px solid rgba(232,100,122,0.10)',
            overflow: 'hidden',
          }}
        >
          {/* Top bezel */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3px 0', gap: 4 }}>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(232,100,122,0.12)' }} />
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '6px', color: 'rgba(255,220,225,.2' }}>{url}</span>
          </div>

          {/* Screen 4:3 */}
          <div style={{ borderRadius: 5, overflow: 'hidden', background: '#180c14', position: 'relative', aspectRatio: '4 / 3' }}>
            {children}
            <GlassSweep active={swept} />
          </div>

          <div style={{ height: 3 }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MOBILE — iPhone 15 Pro (9:19.5)
   max-width 140px
   ═══════════════════════════════════════════ */
export function MobileFrame({
  url,
  children,
  glowColor,
}: {
  url: string;
  children: ReactNode;
  glowColor?: string;
}) {
  const { ref, rotateX, rotateY, onMove, onLeave } = useTilt(8);
  const [swept, setSwept] = useState(false);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { onLeave(); setSwept(false); }}
      onMouseEnter={() => setSwept(true)}
      style={{ perspective: 800, width: '100%', maxWidth: 160, margin: '0 auto', position: 'relative' }}
    >
      {glowColor && (
        <div
          style={{
            position: 'absolute',
            inset: '-30%',
            background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 70%)`,
            opacity: 0.12,
            zIndex: -1,
            pointerEvents: 'none',
            filter: 'blur(25px)',
          }}
        />
      )}

      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        <div
          style={{
            borderRadius: 20,
            background: '#2a1520',
            padding: 3,
            boxShadow: '0 40px 80px rgba(140,40,60,0.10), 0 15px 30px rgba(140,40,60,0.07), 0 5px 12px rgba(0,0,0,0.05), 0 0 0 1px rgba(232,100,122,0.08)',
            border: '1px solid rgba(232,100,122,0.10)',
            overflow: 'hidden',
          }}
        >
          {/* Dynamic Island */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0 2px' }}>
            <div style={{ width: 44, height: 11, borderRadius: 7, background: '#180c14', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(232,100,122,0.12)' }} />
            </div>
          </div>

          {/* Screen 9:19.5 */}
          <div style={{ borderRadius: 15, overflow: 'hidden', background: '#180c14', position: 'relative', aspectRatio: '9 / 19.5' }}>
            {children}
            <GlassSweep active={swept} />
          </div>

          {/* Home indicator */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0 2px' }}>
            <div style={{ width: 44, height: 2.5, borderRadius: 2, background: 'rgba(232,100,122,0.15)' }} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
