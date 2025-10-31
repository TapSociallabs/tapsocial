'use client';
import { motion } from 'framer-motion';

type FeaturedItem = { title: string; poster: string; link: string };

const fallback: FeaturedItem[] = [
  { title: 'Build AI apps fast', poster: '/featured/ai-editing.jpg', link: 'https://youtube.com' },
  { title: 'Prompt hacks', poster: '/featured/prompt-hack.jpg', link: 'https://tiktok.com' },
  { title: 'Design smarter', poster: '/featured/ui-design.jpg', link: 'https://instagram.com' },
];

export default function FeaturedContent({ items }: { items?: FeaturedItem[] }) {
  const list = (items && items.length > 0 ? items : fallback).slice(0, 6);

  return (
    <div className="mt-10 text-left">
      <h3 className="text-xl font-semibold mb-3">Featured</h3>
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4">
        {list.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            onClick={() => window.open(item.link, '_blank')}
            className="snap-center w-56 bg-white dark:bg-dark rounded-xl overflow-hidden shadow-lg flex-shrink-0 cursor-pointer"
          >
            <img src={item.poster} alt={item.title} className="w-full h-40 object-cover" />
            <div className="p-3">
              <p className="font-medium text-sm">{item.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

