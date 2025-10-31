'use client';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import SocialLinks from './SocialLinks';
import ConnectModal from './ConnectModal';
import FeaturedContent from './FeaturedContent';

type Socials = { tiktok?: string; instagram?: string; youtube?: string; website?: string };

const profiles: Record<string, {
  full_name: string;
  title: string;
  avatar: string;
  stats: { connections: string; views: string };
  socials: Socials;
}> = {
  auroracodes: {
    full_name: 'Aurora Kim',
    title: 'AI Creator & Product Designer',
    avatar: '/avatar-demo.png',
    stats: { connections: '112K', views: '1.2M' },
    socials: { tiktok: 'auroracodes', instagram: 'auroracodes', youtube: '@auroracodes', website: 'https://aurora.design' },
  },
  zay: {
    full_name: 'Zay Nova',
    title: 'Music Producer',
    avatar: '/avatar-demo.png',
    stats: { connections: '58K', views: '640K' },
    socials: { tiktok: 'zaynovabeats', instagram: 'zay.nova', youtube: '@zaynova', website: 'https://zaynova.io' },
  },
  mia: {
    full_name: 'Mia Brooks',
    title: 'Digital Entrepreneur',
    avatar: '/avatar-demo.png',
    stats: { connections: '89K', views: '940K' },
    socials: { tiktok: 'miabrookshq', instagram: 'miabrooks.co', youtube: '@miabrooks', website: 'https://miabrooks.co' },
  },
};

export default function ProfilePage({ username }: { username: string }) {
  // Normalize the param safely
  const key = useMemo(
    () => decodeURIComponent((username ?? '').toString()).trim().toLowerCase(),
    [username]
  );

  const data = profiles[key] ?? profiles['auroracodes']; // fallback if unknown
  const [showModal, setShowModal] = useState(false);

  // DEBUG helper (shows what the router param actually is)
  // Remove this <pre> once you confirm it’s correct.
  const Debug = () => (
    <pre className="text-xs opacity-50 mt-2">username param: “{key}”</pre>
  );

  return (
    <div className="min-h-screen px-6 py-10 bg-white text-black dark:bg-dark dark:text-white">
      <div className="max-w-3xl mx-auto text-center px-4">
        <motion.img
          src={data.avatar}
          alt=""
          className="w-40 h-40 rounded-profile mx-auto mb-4 border-2 border-[#A832FF] shadow-xl"
          initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.8 }}
        />

        <h1 className="text-3xl font-bold">{data.full_name}</h1>
        <p className="opacity-80">{data.title}</p>
        <Debug />

        <div className="flex justify-center gap-6 mt-4 opacity-80">
          <span>{data.stats.connections} Connections</span>
          <span>{data.stats.views} Views</span>
        </div>

        <motion.button
          onClick={() => setShowModal(true)}
          className="mt-6 px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-tr from-[#4D00FF] to-[#A832FF]"
          whileTap={{ scale: 0.96 }}
        >
          Let’s Connect
        </motion.button>

        <FeaturedContent />
        <SocialLinks socials={data.socials} />
      </div>

      {showModal && (
        <ConnectModal onClose={() => setShowModal(false)} socials={data.socials} fullName={data.full_name} />
      )}
    </div>
  );
}
