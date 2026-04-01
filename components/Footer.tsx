'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer
      id="footer"
      className="flex flex-col relative"
      style={{ background: '#080b14' }}
    >
      {/* Full-width image panel */}
      <div className="relative w-full" style={{ height: '50vh' }}>
        <Image
          src="/footer.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: 'center 70%' }}
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 40%, #080b14 100%)' }}
        />
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center px-8 relative" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <div className="text-center">

          <h2
            className="font-cormorant text-6xl md:text-7xl font-light"
            style={{ color: 'var(--p-text)', letterSpacing: '0.02em', lineHeight: 1.15, marginBottom: 24 }}
          >
            Let's build something.
          </h2>

          <a
            href="mailto:adarshalex.balmuchui23@iimranchi.ac.in"
            className="inline-block transition-colors duration-300"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.875rem',
              fontWeight: 300,
              letterSpacing: '0.05em',
              color: 'var(--p-muted)',
              marginBottom: 24,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#e85d75')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--p-muted)')}
          >
            adarshalex.balmuchui23@iimranchi.ac.in
          </a>

          {/* Social links */}
          <div
            className="flex items-center justify-center gap-12"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              marginBottom: 24,
            }}
          >
            {[
              { label: 'LinkedIn',  href: 'https://linkedin.com' },
              { label: 'GitHub',    href: 'https://github.com/adarshalexbalmuchu' },
              { label: 'Portfolio', href: '#hero' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="transition-colors duration-300"
                style={{ color: 'rgba(245,240,235,0.35)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--p-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,240,235,0.35)')}
              >
                {label}
              </a>
            ))}
          </div>

        </div>

        {/* Bottom signature */}
        <p
          className="tracking-widest uppercase text-center"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.6rem',
            color: 'rgba(245,240,235,0.2)',
            marginTop: 40,
          }}
        >
          Adarsh Alex Balmuchu &copy; 2026. Still becoming.
        </p>
      </div>
    </footer>
  );
}
