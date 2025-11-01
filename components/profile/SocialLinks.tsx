'use client';

const isValidSocial = (platform: string, value: string): boolean => {
  if (!value || !value.trim()) return false;

  // Basic handle format check
  const clean = value.trim().replace(/^@/, '');

  switch (platform) {
    case 'instagram':
    case 'tiktok':
      return /^[a-zA-Z0-9._]{2,32}$/.test(clean);
    case 'youtube':
      return clean.length > 0; // handles @ or channel ID
    case 'website':
      // Accepts domain name or full URL
      return /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(value.trim());
    default:
      return false;
  }
};

export default function SocialLinks({
  socials,
  username
}: {
  socials: Record<string, string>;
  username: string;
}) {
  const entries = Object.entries(socials || {}).filter(([platform, value]) =>
    isValidSocial(platform.toLowerCase(), value)
  );

  if (!entries.length) return null;

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-8">
      {entries.map(([platform]) => (
        <button
          key={platform}
          onClick={() => window.open(`/go/${username}/${platform}`, "_blank")}
          className="px-5 py-2 border font-medium rounded-full hover:bg-black hover:text-white transition"
        >
          {platform.charAt(0).toUpperCase() + platform.slice(1)}
        </button>
      ))}
    </div>
  );
}
