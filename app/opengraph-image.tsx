import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OG() {
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
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', maxWidth: 900, padding: '0 40px' }}>
          <div style={{ fontSize: 84, fontWeight: 900, lineHeight: 1.05 }}>Your identity. One tap away.</div>
          <div style={{ fontSize: 36, opacity: 0.9, marginTop: 18 }}>Turn followers into real connections.</div>
          <div style={{ fontSize: 28, marginTop: 26, opacity: 0.9 }}>www.tapsocial.me</div>
        </div>
      </div>
    ),
    size
  );
}
