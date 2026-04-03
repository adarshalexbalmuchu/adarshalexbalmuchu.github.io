import Link from 'next/link';

const posts = [
  { title: 'On noticing things',                   tag: 'Observations'     },
  { title: 'Why I build before I plan',            tag: 'Entrepreneurship' },
  { title: 'What a raga taught me about patience', tag: 'Music'            },
];

export default function NotebookPage() {
  return (
    <main
      className="min-h-screen px-4 md:px-20 py-12 md:py-24"
      style={{ background: 'var(--p-bg)', color: 'var(--p-text)' }}
    >
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-12 transition-colors duration-300"
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(245,240,235,0.4)',
        }}
        onMouseEnter={undefined}
      >
        ← Back
      </Link>

      {/* Chapter label */}
      <p className="chapter-label mb-3">Chapter 6</p>

      {/* Headline */}
      <h1
        className="font-cormorant text-3xl md:text-6xl font-light leading-tight mb-8 md:mb-10 max-w-3xl"
        style={{ letterSpacing: '0.02em' }}
      >
        These aren't articles.
        <br />
        <span style={{ color: '#e85d75' }}>They're thoughts that got too long for my head.</span>
      </h1>

      {/* Body copy */}
      <div className="max-w-xl mb-12 md:mb-16">
        <p
          className="text-sm md:text-base font-light leading-7"
          style={{ color: 'var(--p-muted)', fontFamily: 'var(--font-inter)' }}
        >
          No structure. No SEO. No carefully crafted takes.
        </p>
        <p
          className="text-sm md:text-base font-light leading-7 mt-3"
          style={{ color: 'var(--p-muted)', fontFamily: 'var(--font-inter)' }}
        >
          Just things I noticed, questions I couldn't stop asking, and ideas I needed to write down to understand.
        </p>
        <p
          className="text-sm md:text-base font-light leading-7 mt-3"
          style={{ color: 'var(--p-muted)', fontFamily: 'var(--font-inter)' }}
        >
          You're welcome here.
        </p>
      </div>

      {/* Post grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map(({ title, tag }) => (
          <div
            key={title}
            className="flex flex-col justify-between"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
              padding: 24,
              cursor: 'default',
            }}
          >
            <div>
              <p
                className="mb-4 tracking-widest uppercase"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.6rem',
                  color: '#e85d75',
                }}
              >
                {tag}
              </p>
              <h2
                className="font-cormorant text-2xl font-light leading-snug"
                style={{ color: 'var(--p-text)', letterSpacing: '0.02em' }}
              >
                {title}
              </h2>
            </div>
            <div className="mt-8">
              <span
                style={{
                  display: 'inline-block',
                  background: 'rgba(232,93,117,0.1)',
                  border: '1px solid rgba(232,93,117,0.3)',
                  color: '#e85d75',
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  padding: '4px 10px',
                  borderRadius: 20,
                  fontFamily: 'var(--font-inter)',
                }}
              >
                Brewing...
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
