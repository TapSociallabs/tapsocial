'use client';
import { motion } from 'framer-motion';

export default function CTAButton({ text }: { text: string }) {
  return (
    <motion.button
  whileHover={{ scale: 1.04 }}
  whileTap={{ scale: 0.96 }}
  className="px-8 py-4 rounded-full font-semibold shadow-lg text-white bg-gradient-to-tr from-[#4D00FF] to-[#A832FF]"
>
  {text}
</motion.button>

  );
}
