import { ImageResponse } from 'next/og';
import profiles from '@/data/profiles.json';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const key = (username || '').toLowerCase();
  const record = (profiles as Record<string, any>)[key] ?? null;

  const name = record?.full_name ?? '@' + key;
  const title = record?.title ?? 'TapSocial Profile';

  // Optional avatar fallback; og doesn't support external fetch by default.
  const avatar = record?.avatar && record.avatar.startsWith('/')
    ? record.avatar
    : undefined; // only use local /public images

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
          background: 'linear-gradient(135deg,#4D00FF,#A832FF)',
          color: 'white', fontFamily: 'ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial',
        }}
      >
        <div
          style={{
            position: 'absolute', inset: 0, display: 'flex',
            background:
              'radial-gradient(600px 300px at 20% 20%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 60%),' +
              'radial-gradient(500px 250px at 80% 70%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 60%)',
          }}
        />
        <div style={{ display:'flex', gap: 36, alignItems:'center', padding: 60, maxWidth: 1000 }}>
          {/* Avatar (local only) */}
          {avatar ? (
            // Next/OG supports <img> with data URLs or local /public paths
            <img
              src={avatar}
              width={160} height={160}
              style={{ borderRadius: 24, boxShadow:'0 12px 40px rgba(0,0,0,0.35)', border: '4px solid rgba(255,255,255,0.35)', background: 'rgba(0,0,0,0.2)' }}
            />
          ) : (
            <div
              style={{
                width: 160, height: 160, borderRadius: 24,
                background: 'rgba(255,255,255,0.15)', display:'flex',
                alignItems:'center', justifyContent:'center',
                boxShadow:'0 12px 40px rgba(0,0,0,0.35)', border: '4px solid rgba(255,255,255,0.35)',
                fontSize: 72, fontWeight: 800,
              }}
            >
              {name.replace(/[^A-Z]/gi,'').slice(0,2).toUpperCase() || 'TS'}
            </div>
          )}

          <div style={{ display:'flex', flexDirection:'column', justifyContent:'center' }}>
            <div style={{ fontSize: 72, fontWeight: 900, lineHeight: 1.06 }}>{name}</div>
            <div style={{ fontSize: 34, opacity: 0.92, marginTop: 6 }}>{title}</div>
            <div style={{ fontSize: 28, marginTop: 20, opacity: 0.9 }}>tapsocial.me/{key}</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
