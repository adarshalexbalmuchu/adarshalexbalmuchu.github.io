'use client';

import { RevealLine, ScrambleText, FadeUp } from '@/components/ui/animations';

const posts = [
  { title: 'On noticing things',                   tag: 'Observations'     },
  { title: 'Why I build before I plan',            tag: 'Entrepreneurship' },
  { title: 'What a raga taught me about patience', tag: 'Music'            },
];

export default function ChapterSix() {
  return (
    <section
      id="chapter-6"
      className="min-h-screen px-4 md:px-20 py-12 md:py-24 flex flex-col justify-center"
      style={{ background: 'var(--p-bg)' }}
    >
      <p className="chapter-label mb-3">
        <ScrambleText>Chapter 6</ScrambleText>
      </p>
      <h2
        className="font-cormorant text-3xl md:text-6xl font-light leading-tight mb-8 md:mb-10 max-w-3xl"
        style={{ color: 'var(--p-text)', letterSpacing: '0.02em' }}
      >
        <RevealLine delay={0.1}>These aren't articles.</RevealLine>
        <RevealLine delay={0.22}><span style={{ color: '#e85d75' }}>They're thoughts that got too long for my head.</span></RevealLine>
      </h2>

      <FadeUp delay={0.35}>
        <div className="max-w-xl mb-10 md:mb-16">
          <p className="text-sm md:text-base font-light leading-7" style={{ color: 'var(--p-muted)', fontFamily: 'var(--font-inter)' }}>No structure. No SEO. No carefully crafted takes.</p>
          <p className="text-sm md:text-base font-light leading-7 mt-3" style={{ color: 'var(--p-muted)', fontFamily: 'var(--font-inter)' }}>Just things I noticed, questions I couldn't stop asking, and ideas I needed to write down to understand.</p>
          <p className="text-sm md:text-base font-light leading-7 mt-3" style={{ color: 'var(--p-muted)', fontFamily: 'var(--font-inter)' }}>You're welcome here.</p>
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map(({ title, tag }, i) => (
          <FadeUp key={title} delay={0.1 + i * 0.12}>
            <div className="flex flex-col justify-between h-full" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: 24, cursor: 'default' }}>
              <div>
                <p className="mb-4 tracking-widest uppercase" style={{ fontFamily: 'var(--font-inter)', fontSize: '0.6rem', color: '#e85d75' }}>{tag}</p>
                <h3 className="font-cormorant text-2xl font-light leading-snug" style={{ color: 'var(--p-text)', letterSpacing: '0.02em' }}>{title}</h3>
              </div>
              <div className="mt-8">
                <span style={{ display: 'inline-block', background: 'rgba(232,93,117,0.1)', border: '1px solid rgba(232,93,117,0.3)', color: '#e85d75', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', padding: '4px 10px', borderRadius: 20, fontFamily: 'var(--font-inter)' }}>
                  Brewing...
                </span>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
