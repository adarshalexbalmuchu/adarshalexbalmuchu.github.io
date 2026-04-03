'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      id="footer"
      className="flex flex-col relative"
      style={{ background: '#080b14' }}
    >
      {/* Full-width image panel — no gap above */}
      <div className="relative w-full" style={{ height: 'clamp(320px, 70vh, 80vh)', marginTop: 0 }}>
        <Image
          src="/footer.webp"
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
      <div className="flex flex-col items-center justify-center px-4 md:px-8 relative" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <div className="text-center w-full">

          <h2
            className="font-cormorant text-3xl md:text-7xl font-light"
            style={{ color: 'var(--p-text)', letterSpacing: '0.02em', lineHeight: 1.15, marginBottom: 24 }}
          >
            Let's build something.
          </h2>

          <a
            href="mailto:adarshalex.balmuchui23@iimranchi.ac.in"
            className="inline-block transition-colors duration-300 break-all"
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

          {/* Social links — vertical on mobile, horizontal on desktop */}
          <div
            className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mt-2"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              marginBottom: 24,
            }}
          >
            {[
              { label: 'LinkedIn',  href: 'https://linkedin.com',                    external: true },
              { label: 'GitHub',    href: 'https://github.com/adarshalexbalmuchu',   external: true },
              { label: 'Portfolio', href: '#hero',                                   external: false },
            ].map(({ label, href, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="transition-colors duration-300"
                style={{ color: 'rgba(245,240,235,0.35)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--p-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,240,235,0.35)')}
              >
                {label}
              </a>
            ))}
            <Link
              href="/notebook"
              className="transition-colors duration-300"
              style={{ color: 'rgba(245,240,235,0.35)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--p-text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,240,235,0.35)')}
            >
              The Notebook
            </Link>
          </div>

        </div>

        {/* Bottom signature */}
        <p
          className="tracking-widest uppercase text-center w-full"
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
