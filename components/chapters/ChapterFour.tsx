import { Guitar, Music, Camera } from 'lucide-react';
import Image from 'next/image';

const disciplines = [
  {
    Icon: Guitar,
    title: 'Classical Guitar',
    body: 'Ten fingers learning patience before they learned persuasion.',
    image: '/guitar.jpeg',
  },
  {
    Icon: Music,
    title: 'Hindustani Music',
    body: 'The raga taught me that silence is not empty. It is the space where meaning lives.',
    image: '/classical.jpeg',
  },
  {
    Icon: Camera,
    title: 'Photography & Sports',
    body: 'A frame chosen. A moment that will not return. The discipline of the decisive instant.',
    image: '/camera.jpeg',
  },
];

export default function ChapterFour() {
  return (
    <section
      id="chapter-4"
      className="min-h-screen px-8 md:px-20 py-24 flex flex-col justify-center"
      style={{ background: 'var(--p-bg)' }}
    >
      <p className="chapter-label mb-3">Chapter 4</p>
      <h2
        className="font-cormorant text-5xl md:text-6xl font-light leading-tight mb-20 max-w-2xl"
        style={{ color: 'var(--p-text)', letterSpacing: '0.02em' }}
      >
        Before the strategy decks
        <br />
        there was Hindustani
        <br />
        <span style={{ color: 'var(--p-accent)' }}>classical music.</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {disciplines.map(({ Icon, title, body, image }, i) => (
          <div
            key={i}
            className="overflow-hidden flex flex-col"
            style={{
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
            }}
          >
            {/* Top — image */}
            <div className="relative flex-shrink-0" style={{ height: 200 }}>
              <Image
                src={image}
                alt=""
                fill
                className="object-cover"
                style={{ objectPosition: 'center' }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Bottom — text */}
            <div style={{ background: '#0d1117', padding: 20 }}>
              <Icon
                size={20}
                strokeWidth={1}
                className="mb-4"
                style={{ color: 'var(--p-accent)' }}
              />
              <h3
                className="font-cormorant text-2xl font-light mb-3"
                style={{ color: 'var(--p-text)', letterSpacing: '0.03em' }}
              >
                {title}
              </h3>
              <p
                className="font-cormorant text-base font-light leading-relaxed italic"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                {body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
