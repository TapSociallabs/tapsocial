'use client';
import { motion } from 'framer-motion';
import CTAButton from './buttons/CTAButton';

export default function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-white text-black dark:bg-dark dark:text-white">
      {/* Ripple background */}
      <motion.div
        className="pointer-events-none absolute inset-0 ripple"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <div className="relative z-10 text-center max-w-2xl px-6">
        <h1 className="text-5xl font-bold mb-4">Instantly unforgettable.</h1>
        <p className="text-xl opacity-80 mb-8">Your identity. One tap away.</p>
        <CTAButton text="Let’s Connect" />
      </div>
    </section>
  );
}
