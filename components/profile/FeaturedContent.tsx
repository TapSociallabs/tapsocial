'use client';
import { motion } from 'framer-motion';

const featured = [
  { id: 1, src: '/featured/ai-editing.mp4', poster: '/featured/ai-editing.jpg', title: 'Build AI apps fast', link: 'https://youtube.com/@auroracodes' },
  { id: 2, src: '/featured/prompt-hack.mp4', poster: '/featured/prompt-hack.jpg', title: 'Prompt hacks', link: 'https://tiktok.com/@auroracodes' },
  { id: 3, src: '/featured/ui-design.mp4', poster: '/featured/ui-design.jpg', title: 'Design smarter', link: 'https://instagram.com/auroracodes' },
];

export default function FeaturedContent() {
  return (
    <div className="mt-10 text-left">
      <h3 className="text-xl font-semibold mb-3">Featured</h3>
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4">
        {featured.map(item => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.03 }}
            onClick={() => window.open(item.link, '_blank')}
            className="snap-center w-56 bg-white dark:bg-dark rounded-xl overflow-hidden shadow-lg flex-shrink-0 cursor-pointer"
          >
            <img
              src={item.poster}
              alt={item.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <p className="font-medium text-sm">{item.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
