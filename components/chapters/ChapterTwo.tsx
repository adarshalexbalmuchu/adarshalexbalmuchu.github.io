'use client';

import { RevealLine, ScrambleText, FadeUp } from '@/components/ui/animations';

const projects = [
  {
    name: 'Unitech India',
    url: 'https://unitechshop.com',
    context: 'Premium audio and electronics brand. Helping people expand their lives since 1994.',
    description: 'Built the entire digital commerce infrastructure from zero. Full-stack, fully responsive, fully real. Not a prototype. A product people actually use.',
    tags: ['React', 'TypeScript', 'Supabase', 'Full-Stack'],
  },
  {
    name: 'Echoing Healthy Ageing',
    url: 'https://echoinghealthyageing.com',
    context: 'Mumbai-based social enterprise founded in 2012. Dementia care, caregiver training and support for elderly patients and their families. Sister organisation to Shatam Care Foundation.',
    description: 'Built two websites, designed campaign assets, developed customer personas and architected a complete GTM strategy for their Pune expansion. Walked in as an intern. Left having built a brand.',
    tags: ['GTM Strategy', 'Brand Building', 'Digital Marketing'],
  },
  {
    name: 'Shatam Care Foundation',
    url: 'https://shatamcare.org',
    context: 'An Indian foundation dedicated to elderly care and caregiver training. Because every elder deserves dignity.',
    description: 'Built their website from scratch, creating a digital presence that reflects the warmth and purpose of the organisation. Design led, human first.',
    tags: ['Web Design', 'Non-Profit', 'Brand Identity'],
  },
  {
    name: 'Young Comet',
    url: 'https://youngcomet.co',
    context: 'A pre-incubator for ambitious high schoolers, built by IIM students. Three-month programs turning teenagers into thinkers, builders and explorers.',
    description: 'Multiple landing pages and a full website built with clean UI and SVG-heavy design. Fast, responsive and obsessively detailed.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Web Design'],
  },
];

export default function ChapterTwo() {
  return (
    <section
      id="chapter-2"
      className="min-h-screen px-4 md:px-20 py-12 md:py-24 flex flex-col justify-center"
      style={{ background: 'var(--p-bg)' }}
    >
      <p className="chapter-label mb-3">
        <ScrambleText>Chapter 2</ScrambleText>
      </p>

      <div className="grid md:grid-cols-[2fr_3fr] gap-10 md:gap-24 items-start mt-6">
        {/* Left column */}
        <div>
          <h2
            className="font-cormorant text-3xl md:text-6xl font-light leading-tight"
            style={{ color: 'var(--p-text)', letterSpacing: '0.02em' }}
          >
            <RevealLine delay={0.1}>Most strategists talk.</RevealLine>
            <RevealLine delay={0.22}><span style={{ color: 'var(--p-accent)' }}>I ship.</span></RevealLine>
          </h2>
          <FadeUp delay={0.35}>
            <p className="mt-6 md:mt-8 text-sm md:text-base font-light leading-7" style={{ color: 'var(--p-muted)', fontFamily: 'var(--font-inter)' }}>
              Strategy without execution is just vocabulary. I spent years closing the gap between the deck and the doing. Writing copy at midnight. Running experiments on weekends. Building things that didn't exist yet.
            </p>
            <p className="mt-4 text-sm md:text-base font-light leading-7" style={{ color: 'var(--p-muted)', fontFamily: 'var(--font-inter)' }}>
              Every project below started as a question no one was asking loudly enough.
            </p>
          </FadeUp>
        </div>

        {/* Right column — project cards */}
        <div className="flex flex-col gap-8 md:gap-10">
          {projects.map((p, i) => (
            <FadeUp key={p.name} delay={0.1 + i * 0.12}>
              <div>
                <div className="w-full mb-4 md:mb-5" style={{ borderTop: '1px solid rgba(245,240,235,0.15)' }} />
                <h3 className="font-cormorant text-2xl md:text-3xl font-light mb-2" style={{ color: 'var(--p-text)', letterSpacing: '0.02em' }}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-baseline gap-1.5"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    {p.name}
                    <span
                      className="transition-colors duration-200 group-hover:text-[#e85d75]"
                      style={{ color: 'rgba(232,93,117,0.6)', fontSize: '0.75rem' }}
                    >↗</span>
                  </a>
                </h3>
                <p className="mb-3" style={{ fontFamily: 'var(--font-inter)', fontSize: '0.7rem', fontStyle: 'italic', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.45)' }}>
                  {p.context}
                </p>
                <p className="text-sm font-light leading-6 mb-4" style={{ color: 'var(--p-muted)', fontFamily: 'var(--font-inter)' }}>
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span key={tag} className="text-xs tracking-widest uppercase px-3 py-1" style={{ fontFamily: 'var(--font-inter)', color: 'var(--p-muted)', border: '1px solid rgba(245,240,235,0.12)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
