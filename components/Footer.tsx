'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const EMAIL = 'adarshalex.balmuchui23@iimranchi.ac.in';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — the mailto link still works
    }
  };

  return (
    <footer
      id="footer"
      className="flex flex-col relative"
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
          style={{ background: 'linear-gradient(to bottom, rgba(13,10,26,0.85) 0%, transparent 35%, transparent 45%, var(--p-bg-deep) 100%)' }}
        />
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center px-4 md:px-8 relative" style={{ paddingTop: 40, paddingBottom: 80, background: 'var(--p-bg-deep)' }}>
        <div className="text-center w-full">

          <h2
            className="font-cormorant text-3xl md:text-7xl font-light"
            style={{ color: 'var(--p-text)', letterSpacing: '0.02em', lineHeight: 1.15, marginBottom: 28 }}
          >
            Let&rsquo;s build something.
          </h2>

          {/* The email is the centerpiece — serif, with an underline that draws itself */}
          <a
            href={`mailto:${EMAIL}`}
            className="group inline-block break-all"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(1.05rem, 2.6vw, 1.7rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              letterSpacing: '0.02em',
              color: 'rgba(245,240,235,0.8)',
              transition: 'color 0.3s ease, text-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--p-accent)';
              e.currentTarget.style.textShadow = '0 0 24px rgba(232,100,122,0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(245,240,235,0.8)';
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            {EMAIL}
            <span
              aria-hidden
              className="block h-px mt-1 w-0 group-hover:w-full transition-all duration-500 mx-auto"
              style={{ background: 'linear-gradient(90deg, var(--p-gold), var(--p-accent))' }}
            />
          </a>

          {/* copy to clipboard */}
          <div style={{ marginTop: 14, marginBottom: 28 }}>
            <button
              onClick={copyEmail}
              className="uppercase transition-all duration-300"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.6rem',
                letterSpacing: '0.3em',
                padding: '6px 16px',
                borderRadius: 20,
                border: `1px solid ${copied ? 'rgba(201,163,107,0.5)' : 'rgba(232,100,122,0.25)'}`,
                background: copied ? 'rgba(201,163,107,0.08)' : 'rgba(232,100,122,0.06)',
                color: copied ? 'var(--p-gold)' : 'rgba(245,240,235,0.5)',
              }}
            >
              {copied ? 'Copied ✦' : 'Copy email'}
            </button>
          </div>

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
              { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/adarshalexbalmuchu/', external: true },
              { label: 'GitHub',    href: 'https://github.com/adarshalexbalmuchu',   external: true },
              { label: 'Portfolio', href: '#hero',                                   external: false },
            ].map(({ label, href, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="transition-all duration-300"
                style={{ color: 'rgba(245,240,235,0.35)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--p-text)';
                  e.currentTarget.style.letterSpacing = '0.35em';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(245,240,235,0.35)';
                  e.currentTarget.style.letterSpacing = '0.25em';
                }}
              >
                {label}
              </a>
            ))}
            <Link
              href="/notebook"
              className="transition-all duration-300"
              style={{ color: 'rgba(245,240,235,0.35)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--p-text)';
                e.currentTarget.style.letterSpacing = '0.35em';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(245,240,235,0.35)';
                e.currentTarget.style.letterSpacing = '0.25em';
              }}
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
