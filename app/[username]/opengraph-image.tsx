import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const profiles: Record<string, { name: string; title: string }> = {
  auroracodes: { name: 'Aurora Kim', title: 'AI Creator & Product Designer' },
  zay: { name: 'Zay Nova', title: 'Music Producer' },
  mia: { name: 'Mia Brooks', title: 'Digital Entrepreneur' },
};

export default async function Image({ params }: { params: { username: string } }) {
  const { username } = params;
  const key = username?.toLowerCase();
  const data = profiles[key] ?? { name: '@' + key, title: 'TapSocial Profile' };

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg,#4D00FF,#A832FF)',
          color: 'white',
          fontFamily: 'ui-sans-serif,system-ui',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 64, fontWeight: 800 }}>{data.name}</div>
          <div style={{ fontSize: 32, opacity: 0.9 }}>{data.title}</div>
          <div style={{ fontSize: 24, marginTop: 16 }}>tapsocial.me/{key}</div>
        </div>
      </div>
    ),
    size
  );
}
