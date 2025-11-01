'use client';

export default function SocialLinks({
  socials,
  username,
}: {
  socials: Record<string, string>;
  username: string;
}) {
  const entries = Object.entries(socials || {});
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
