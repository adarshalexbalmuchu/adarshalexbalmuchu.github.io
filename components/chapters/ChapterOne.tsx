'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { RevealLine, ScrambleText, FadeUp } from '@/components/ui/animations';

const IMAGES = [
  { src: '/DSC_1192.webp',  alt: 'Elephant eye close-up',              cls: 'col-span-1 row-span-2', offset: 40 },
  { src: '/DSC_1219.webp',  alt: 'Blackbuck in golden forest light',   cls: 'col-span-2 row-span-1', offset: 20 },
  { src: '/DSC_1388.webp',  alt: 'Langur monkey close-up',             cls: 'col-span-1 row-span-1', offset: 60 },
  { src: '/DSC00902.webp',  alt: 'Concert performer with spotlight',   cls: 'col-span-1 row-span-1', offset: 30 },
  { src: '/IMG_6881.webp',  alt: 'Street portrait',                    cls: 'col-span-2 row-span-1', offset: 50, position: 'center 40%' },
];

export default function ChapterOne() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleScroll = () => {
      const sectionTop = section.getBoundingClientRect().top;
      imgRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.transform = `translateY(${sectionTop * IMAGES[i].offset * 0.003}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="chapter-1"
      ref={sectionRef}
      className="min-h-screen px-4 md:px-20 py-12 md:py-24"
    >
      <div className="mb-10 md:mb-14">
        <p className="chapter-label mb-3">
          <ScrambleText>Chapter 1</ScrambleText>
        </p>
        <h2
          className="font-cormorant text-4xl md:text-6xl font-light leading-tight"
          style={{ color: 'var(--p-text)', letterSpacing: '0.02em' }}
        >
          <RevealLine delay={0.1}>I learned to see</RevealLine>
          <RevealLine delay={0.22}>before I learned to sell.</RevealLine>
        </h2>
      </div>

      <FadeUp delay={0.3}>
        <p
          className="text-center mb-8 text-xs md:text-[0.7rem]"
          style={{ fontFamily: 'var(--font-inter)', fontStyle: 'italic', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.45)' }}
        >
          Seven years. One camera. Everything I know about attention.
        </p>
      </FadeUp>

      {/* Mobile: single column */}
      <div className="flex flex-col gap-3 mb-12 md:hidden">
        {IMAGES.map((img, i) => (
          <FadeUp key={i} delay={i * 0.08}>
            <div className="relative w-full overflow-hidden" style={{ height: 250 }}>
              <Image src={img.src} alt={img.alt} fill className="object-cover grayscale opacity-75" sizes="100vw" style={{ objectPosition: img.position ?? 'center' }} />
            </div>
          </FadeUp>
        ))}
      </div>

      {/* Desktop: masonry grid — hover turns each frame into a viewfinder */}
      <div className="hidden md:grid gap-3 mb-16" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '220px' }}>
        {IMAGES.map((img, i) => (
          <div key={i} className={`${img.cls} overflow-hidden relative group`} ref={(el) => { imgRefs.current[i] = el; }} style={{ willChange: 'transform' }}>
            <Image src={img.src} alt={img.alt} fill className="object-cover grayscale opacity-75 group-hover:opacity-95 group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700" sizes="33vw" style={{ objectPosition: img.position ?? 'center' }} />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />

            {/* viewfinder corner brackets */}
            {[
              'top-3 left-3 border-t border-l',
              'top-3 right-3 border-t border-r',
              'bottom-3 left-3 border-b border-l',
              'bottom-3 right-3 border-b border-r',
            ].map((cls) => (
              <span
                key={cls}
                aria-hidden
                className={`absolute ${cls} w-4 h-4 opacity-0 scale-125 group-hover:opacity-100 group-hover:scale-100 transition-all duration-400 pointer-events-none`}
                style={{ borderColor: 'rgba(232,100,122,0.85)' }}
              />
            ))}

            {/* focus caption — reads like camera metadata */}
            <span
              className="absolute bottom-3 left-9 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 pointer-events-none uppercase"
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '8px',
                letterSpacing: '0.2em',
                color: 'rgba(245,240,235,0.85)',
                textShadow: '0 1px 4px rgba(0,0,0,0.8)',
              }}
            >
              ● REC — {img.alt}
            </span>
          </div>
        ))}
      </div>

      <FadeUp delay={0.1}>
        <div className="max-w-xl ml-auto">
          <p className="font-cormorant text-base md:text-xl font-light leading-relaxed" style={{ color: 'var(--p-muted)' }}>
            I grew up noticing things others walked past. A composition in a crowded street.
            The silence between two arguments. The way a brand lies in its logo but tells the truth in its copy.
          </p>
          <p className="font-cormorant text-base md:text-xl font-light leading-relaxed mt-4" style={{ color: 'var(--p-muted)' }}>
            That eye, trained long before any marketing deck, is what I bring into every room I enter.
          </p>
          <p className="font-cormorant text-base md:text-xl font-light leading-relaxed mt-4" style={{ color: 'var(--p-muted)' }}>
            Seeing is the first strategy. Everything else follows.
          </p>
        </div>
      </FadeUp>

      <p style={{ marginTop: 32, fontSize: 12, fontStyle: 'italic', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-inter)' }}>
        All photographs by Adarsh Alex Balmuchu
      </p>
    </section>
  );
}
