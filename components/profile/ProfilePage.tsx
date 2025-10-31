'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import SocialLinks from './SocialLinks';
import FeaturedContent from './FeaturedContent';
import ConnectModal from './ConnectModal';

type Socials = { tiktok?: string; instagram?: string; youtube?: string; website?: string };
type FeaturedItem = { title: string; poster: string; link: string };

export default function ProfilePage({
  username,
  profile
}: {
  username: string;
  profile: {
    full_name: string;
    title: string;
    avatar?: string;
    stats: { connections: string; views: string };
    socials: Socials;
    featured?: FeaturedItem[];
  };
}) {
  const [showModal, setShowModal] = useState(false);

  const data = profile;
  const avatar = data.avatar || '/avatar-demo.png';

  return (
    <div className="min-h-screen px-6 py-10 bg-white text-black dark:bg-dark dark:text-white">
      <div className="max-w-3xl mx-auto text-center px-4">
        <motion.img
          src={avatar}
          alt=""
          className="w-40 h-40 rounded-profile mx-auto mb-4 border-2 border-[#A832FF] shadow-xl object-cover"
          initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.8 }}
        />
        <h1 className="text-3xl font-bold">{data.full_name}</h1>
        <p className="opacity-80">{data.title}</p>

        <div className="flex justify-center gap-6 mt-4 opacity-80">
          <span>{data.stats.connections} Connections</span>
          <span>{data.stats.views} Views</span>
        </div>

        <motion.button
          onClick={() => setShowModal(true)}
          className="mt-6 px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-tr from-[#4D00FF] to-[#A832FF]"
          whileTap={{ scale: 0.96 }}
        >
          Let's Connect
        </motion.button>

        <FeaturedContent items={data.featured} />
        <SocialLinks socials={data.socials} />
      </div>

      {showModal && (
        <ConnectModal onClose={() => setShowModal(false)} socials={data.socials} fullName={data.full_name} />
      )}
    </div>
  );
}
