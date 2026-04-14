'use client';

import { ReactNode } from 'react';

interface BrowserMockupProps {
  url: string;
  isLive?: boolean;
  children: ReactNode;
}

export default function BrowserMockup({ url, isLive = false, children }: BrowserMockupProps) {
  return (
    <div style={{ borderRadius: 8, overflow: 'hidden', background: '#0c0f18' }}>
      {/* Title bar */}
      <div
        style={{
          background: '#13151f',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {/* Traffic-light dots */}
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#e8647a',
            }}
          />
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: 'rgba(255,255,255,.2)',
            }}
          />
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: 'rgba(255,255,255,.2)',
            }}
          />
        </div>

        {/* URL bar */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              background: 'rgba(255,255,255,.06)',
              borderRadius: 20,
              padding: '4px 16px',
              fontFamily: 'ui-monospace, monospace',
              fontSize: '9px',
              color: 'rgba(255,255,255,.35)',
              letterSpacing: '0.02em',
            }}
          >
            {url}
          </span>
        </div>

        {/* Live badge */}
        {isLive && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#5DCAA5',
              }}
            />
            <span
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '8px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: '#5DCAA5',
              }}
            >
              LIVE
            </span>
          </div>
        )}
      </div>

      {/* Viewport area */}
      <div>{children}</div>
    </div>
  );
}
