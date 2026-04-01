'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const IMAGES = [
  { src: '/DSC_1192.jpg',  alt: 'Elephant eye close-up',              cls: 'col-span-1 row-span-2', offset: 40 },
  { src: '/DSC_1219.jpg',  alt: 'Blackbuck in golden forest light',   cls: 'col-span-2 row-span-1', offset: 20 },
  { src: '/DSC_1388.jpg',  alt: 'Langur monkey close-up',             cls: 'col-span-1 row-span-1', offset: 60 },
  { src: '/DSC00902.JPG',  alt: 'Concert performer with spotlight',   cls: 'col-span-1 row-span-1', offset: 30 },
  { src: '/IMG_6881.JPG',  alt: 'Street portrait',                    cls: 'col-span-2 row-span-1', offset: 50, position: 'center 40%' },
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
        const speed = IMAGES[i].offset * 0.003;
        el.style.transform = `translateY(${sectionTop * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="chapter-1"
      ref={sectionRef}
      className="min-h-screen px-8 md:px-20 py-24"
      style={{ background: 'var(--p-bg)' }}
    >
      {/* Label + contradiction */}
      <div className="mb-14">
        <p className="chapter-label mb-3">Chapter 1</p>
        <h2
          className="font-cormorant text-5xl md:text-6xl font-light leading-tight"
          style={{ color: 'var(--p-text)', letterSpacing: '0.02em' }}
        >
          I learned to see
          <br />
          before I learned to sell.
        </h2>
      </div>

      {/* Caption line */}
      <p
        className="text-center mb-8"
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '0.7rem',
          fontStyle: 'italic',
          letterSpacing: '0.18em',
          color: 'rgba(255,255,255,0.45)',
        }}
      >
        Seven years. One camera. Everything I know about attention.
      </p>

      {/* Asymmetric masonry grid */}
      <div
        className="grid gap-3 mb-16"
        style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '220px' }}
      >
        {IMAGES.map((img, i) => (
          <div
            key={i}
            className={`${img.cls} overflow-hidden relative group`}
            ref={(el) => { imgRefs.current[i] = el; }}
            style={{ willChange: 'transform' }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover grayscale opacity-75 group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-700"
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectPosition: img.position ?? 'center' }}
            />
            {/* Dark overlay on hover */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Body copy */}
      <div className="max-w-xl ml-auto">
        <p
          className="font-cormorant text-xl font-light leading-relaxed"
          style={{ color: 'var(--p-muted)' }}
        >
          I grew up noticing things others walked past. A composition in a crowded street.
          The silence between two arguments. The way a brand lies in its logo but tells the truth in its copy.
        </p>
        <p
          className="font-cormorant text-xl font-light leading-relaxed mt-4"
          style={{ color: 'var(--p-muted)' }}
        >
          That eye, trained long before any marketing deck, is what I bring into every room I enter.
        </p>
        <p
          className="font-cormorant text-xl font-light leading-relaxed mt-4"
          style={{ color: 'var(--p-muted)' }}
        >
          Seeing is the first strategy. Everything else follows.
        </p>
      </div>
    </section>
  );
}
