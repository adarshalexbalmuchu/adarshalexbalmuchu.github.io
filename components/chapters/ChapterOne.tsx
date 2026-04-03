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
      style={{ background: 'var(--p-bg)' }}
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

      {/* Desktop: masonry grid */}
      <div className="hidden md:grid gap-3 mb-16" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '220px' }}>
        {IMAGES.map((img, i) => (
          <div key={i} className={`${img.cls} overflow-hidden relative group`} ref={(el) => { imgRefs.current[i] = el; }} style={{ willChange: 'transform' }}>
            <Image src={img.src} alt={img.alt} fill className="object-cover grayscale opacity-75 group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-700" sizes="33vw" style={{ objectPosition: img.position ?? 'center' }} />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
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
