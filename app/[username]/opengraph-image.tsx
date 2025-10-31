import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const profiles: Record<string, { name: string; title: string }> = {
  auroracodes: { name: 'Aurora Kim', title: 'AI Creator & Product Designer' },
  zay: { name: 'Zay Nova', title: 'Music Producer' },
  mia: { name: 'Mia Brooks', title: 'Digital Entrepreneur' },
};

export default async function Image({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const key = (username || '').toLowerCase();
  const data = profiles[key] ?? { name: '@' + key, title: 'TapSocial Profile' };

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial', backgroundImage: 'radial-gradient(600px 300px at 20% 20%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 60%),radial-gradient(500px 250px at 80% 70%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 60%),linear-gradient(135deg,#4D00FF,#A832FF)', backgroundPosition: '20% 20%, 80% 70%, center', backgroundSize: '600px 300px, 500px 250px, cover', backgroundRepeat: 'no-repeat' }}>
        <div style={{ textAlign: 'center', maxWidth: 900, padding: '0 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 72, fontWeight: 900, lineHeight: 1.06 }}>{data.name}</div>
          <div style={{ fontSize: 34, opacity: 0.92, marginTop: 10 }}>{data.title}</div>
          <div style={{ fontSize: 28, marginTop: 26, opacity: 0.9 }}>tapsocial.me/{key}</div>
        </div>
      </div>
    ),
    size
  );
}
