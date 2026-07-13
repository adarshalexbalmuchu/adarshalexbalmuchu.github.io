import Link from 'next/link';
import CelestialBackdrop from '@/components/ui/CelestialBackdrop';

const posts = [
  { num: '01', title: 'On noticing things',                   tag: 'Observations'     },
  { num: '02', title: 'Why I build before I plan',            tag: 'Entrepreneurship' },
  { num: '03', title: 'What a raga taught me about patience', tag: 'Music'            },
];

export default function NotebookPage() {
  return (
    <main
      className="relative min-h-screen"
      style={{ background: 'var(--p-bg)', color: 'var(--p-text)', fontFamily: 'var(--font-inter), sans-serif' }}
    >
      <CelestialBackdrop />
      <div className="relative z-10 px-4 md:px-20 py-12 md:py-24">
      {/* Back link */}
      <Link
        href="/"
        className="group inline-flex items-center gap-2 mb-12 transition-colors duration-300 hover:text-[var(--p-accent)]"
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(245,240,235,0.4)',
        }}
      >
        <span aria-hidden className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
        Back to the sky
      </Link>

      {/* Label */}
      <p className="chapter-label mb-3">The Notebook</p>

      {/* Headline */}
      <h1
        className="font-cormorant text-3xl md:text-6xl font-light leading-tight mb-8 md:mb-10 max-w-3xl"
        style={{ letterSpacing: '0.02em' }}
      >
        These aren&rsquo;t articles.
        <br />
        <span className="ink-shimmer">They&rsquo;re thoughts that got too long for my head.</span>
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
          Just things I noticed, questions I couldn&rsquo;t stop asking, and ideas I needed to write down to understand.
        </p>
        <p
          className="text-sm md:text-base font-light leading-7 mt-3"
          style={{ color: 'var(--p-muted)', fontFamily: 'var(--font-inter)' }}
        >
          You&rsquo;re welcome here.
        </p>
      </div>

      {/* Post grid — pages of the notebook, in the corridor's brass language */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {posts.map(({ num, title, tag }) => (
          <div
            key={title}
            className="group relative flex flex-col justify-between transition-all duration-500 hover:-translate-y-1"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--p-gold-line)',
              padding: '40px 24px 24px',
              cursor: 'default',
            }}
          >
            {/* corner plaque */}
            <span
              className="absolute uppercase"
              style={{
                top: 14,
                left: 16,
                fontFamily: 'var(--font-inter)',
                fontSize: '9px',
                letterSpacing: '0.4em',
                color: 'var(--p-gold-dim)',
              }}
            >
              Entry {num}
            </span>

            <div>
              <p
                className="mb-4 tracking-widest uppercase"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.6rem',
                  color: 'var(--p-accent)',
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
            <div className="mt-8 flex items-center justify-between">
              <span
                style={{
                  display: 'inline-block',
                  background: 'rgba(232,100,122,0.1)',
                  border: '1px solid rgba(232,100,122,0.3)',
                  color: 'var(--p-accent)',
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
              {/* brass underline draws on hover, like the discipline plaques */}
              <span
                aria-hidden
                className="block h-px w-6 group-hover:w-12 transition-all duration-500"
                style={{ background: 'var(--p-gold)' }}
              />
            </div>
          </div>
        ))}
      </div>
      </div>
    </main>
  );
}
