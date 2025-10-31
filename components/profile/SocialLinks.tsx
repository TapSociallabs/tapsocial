'use client';

type Props = {
  socials: {
    tiktok?: string;
    instagram?: string;
    youtube?: string;
    website?: string;
  };
};

export default function SocialLinks({ socials }: Props) {
  const items = [
    socials.tiktok && {
      label: 'TikTok',
      href: `https://www.tiktok.com/@${socials.tiktok}`,
    },
    socials.instagram && {
      label: 'Instagram',
      href: `https://instagram.com/${socials.instagram}`,
    },
    socials.youtube && {
      label: 'YouTube',
      href: `https://youtube.com/${socials.youtube.startsWith('@') ? socials.youtube : '@'+socials.youtube}`,
    },
    socials.website && {
      label: 'Website',
      href: socials.website,
    },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <div className="mt-8 flex justify-center gap-3 flex-wrap pb-10">
      {items.map((i) => (
        <a
          key={i.href}
          href={i.href}
          target="_blank"
          className="px-4 py-2 rounded-full text-sm font-semibold bg-white text-black dark:bg-dark dark:text-white border hover:opacity-85"
        >
          {i.label}
        </a>
      ))}
    </div>
  );
}
