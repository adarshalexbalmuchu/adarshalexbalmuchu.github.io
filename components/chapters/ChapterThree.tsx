export default function ChapterThree() {
  const entries = [
    { competition: 'India Innovates Hackathon', institution: 'Delhi Municipal Corporation', result: 'TOP 1000 OF 25,000+' },
    { competition: 'Snap and Solve', institution: 'IIM Bangalore', result: 'NATIONAL WINNER' },
    { competition: 'National Marketing Case Competition', institution: 'IIM Ahmedabad', result: 'FINALIST' },
    { competition: 'Stock Stoicism Finance Case', institution: 'BIT Mesra', result: 'NATIONAL RUNNER-UP' },
    { competition: 'Unbounded Possibilities Photography', institution: 'IIM Bangalore', result: 'NATIONAL FINALIST' },
    { competition: 'Pixel Perfect Photography', institution: 'IIM Ahmedabad', result: 'SECOND RUNNER-UP' },
  ];

  return (
    <section
      id="chapter-3"
      className="min-h-screen px-8 md:px-20 py-24 flex flex-col justify-center"
      style={{ background: 'var(--p-bg)' }}
    >
      <p className="chapter-label mb-3">Chapter 3</p>
      <h2
        className="font-cormorant text-5xl md:text-6xl font-light leading-tight mb-10 max-w-2xl"
        style={{ color: 'var(--p-text)', letterSpacing: '0.02em' }}
      >
        I walked into rooms
        <br />
        I wasn't expected to win.
        <br />
        <span style={{ color: 'var(--p-accent)' }}>I won anyway.</span>
      </h2>

      {/* Intro line */}
      <p
        className="font-cormorant text-xl font-light italic mb-14 max-w-xl"
        style={{ color: 'var(--p-muted)', letterSpacing: '0.01em' }}
      >
        Twenty years old. Room after room. One question I keep asking myself. Why not me?
      </p>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px"
          style={{ background: 'rgba(245,240,235,0.12)' }}
        />

        <div className="flex flex-col gap-0">
          {entries.map((e, i) => (
            <div
              key={i}
              className="pl-10 py-6 grid md:grid-cols-[2fr_2fr_1fr] gap-4 items-center group"
              style={{ borderBottom: '1px solid rgba(245,240,235,0.07)' }}
            >
              {/* Dot */}
              <div
                className="absolute left-0 w-2 h-2 rounded-full mt-1 -translate-x-[3px]"
                style={{ background: 'var(--p-accent)', marginTop: `${i * 0 + 30}px`, position: 'absolute' }}
              />

              <span
                className="font-cormorant text-2xl font-light group-hover:text-[#e8647a] transition-colors duration-300"
                style={{ color: 'var(--p-text)', letterSpacing: '0.02em' }}
              >
                {e.competition}
              </span>

              <span
                className="text-sm tracking-wider"
                style={{ color: 'var(--p-muted)', fontFamily: 'var(--font-inter)' }}
              >
                {e.institution}
              </span>

              <span
                className="text-xs tracking-widest uppercase font-light text-right md:text-right"
                style={{ color: 'var(--p-accent)', fontFamily: 'var(--font-inter)' }}
              >
                {e.result}
              </span>
            </div>
          ))}
        </div>

        {/* Closing line */}
        <p
          className="mt-8 text-right"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.75rem',
            fontStyle: 'italic',
            color: '#e85d75',
          }}
        >
          Still counting.
        </p>
      </div>
    </section>
  );
}
