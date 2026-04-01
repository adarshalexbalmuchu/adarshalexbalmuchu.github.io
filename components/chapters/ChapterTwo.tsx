export default function ChapterTwo() {
  const projects = [
    {
      name: 'Unitech India',
      description: 'Built the entire digital commerce infrastructure from zero. Full-stack, fully responsive, fully real. Not a prototype. A product people actually use.',
      tags: ['React', 'TypeScript', 'Supabase', 'Full-Stack'],
    },
    {
      name: 'Echoing Healthy Ageing',
      description: 'Built two websites, designed campaign assets, developed customer personas and architected a complete GTM strategy for their Pune expansion. Walked in as an intern. Left having built a brand.',
      tags: ['GTM Strategy', 'Brand Building', 'Digital Marketing'],
    },
    {
      name: 'Young Comet',
      description: 'Multiple landing pages and a full website built with clean UI and SVG-heavy design. Fast, responsive and obsessively detailed.',
      tags: ['React', 'TypeScript', 'Tailwind', 'Web Design'],
    },
  ];

  return (
    <section
      id="chapter-2"
      className="min-h-screen px-8 md:px-20 py-24 flex flex-col justify-center"
      style={{ background: 'var(--p-bg)' }}
    >
      <p className="chapter-label mb-3">Chapter 2</p>

      <div className="grid md:grid-cols-[2fr_3fr] gap-16 md:gap-24 items-start mt-6">
        {/* Left column */}
        <div>
          <h2
            className="font-cormorant text-5xl md:text-6xl font-light leading-tight"
            style={{ color: 'var(--p-text)', letterSpacing: '0.02em' }}
          >
            Most strategists talk.
            <br />
            <span style={{ color: 'var(--p-accent)' }}>I ship.</span>
          </h2>
          <p
            className="mt-8 text-base font-light leading-7"
            style={{ color: 'var(--p-muted)', fontFamily: 'var(--font-inter)' }}
          >
            Strategy without execution is just vocabulary. I spent years closing the gap between the deck and the doing. Writing copy at midnight. Running experiments on weekends. Building things that didn't exist yet.
          </p>
          <p
            className="mt-4 text-base font-light leading-7"
            style={{ color: 'var(--p-muted)', fontFamily: 'var(--font-inter)' }}
          >
            Every project below started as a question no one was asking loudly enough.
          </p>
        </div>

        {/* Right column — project cards */}
        <div className="flex flex-col gap-10">
          {projects.map((p) => (
            <div key={p.name}>
              <div
                className="w-full mb-5"
                style={{ borderTop: '1px solid rgba(245,240,235,0.15)' }}
              />
              <h3
                className="font-cormorant text-3xl font-light mb-2"
                style={{ color: 'var(--p-text)', letterSpacing: '0.02em' }}
              >
                {p.name}
              </h3>
              <p
                className="text-sm font-light leading-6 mb-4"
                style={{ color: 'var(--p-muted)', fontFamily: 'var(--font-inter)' }}
              >
                {p.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs tracking-widest uppercase px-3 py-1"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      color: 'var(--p-muted)',
                      border: '1px solid rgba(245,240,235,0.12)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
