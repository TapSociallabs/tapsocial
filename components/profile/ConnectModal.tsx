'use client';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

type Socials = { tiktok?: string; instagram?: string; youtube?: string; website?: string };

export default function ConnectModal({
  onClose,
  socials,
  fullName,
  username,
}: {
  onClose: () => void;
  socials: Socials;
  fullName: string;
  username: string;
}) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const back = () => onClose();
    window.addEventListener('keydown', esc);
    window.addEventListener('popstate', back);
    return () => {
      window.removeEventListener('keydown', esc);
      window.removeEventListener('popstate', back);
    };
  }, [onClose]);

  const downloadVCF = () => {
    const vcf = `BEGIN:VCARD
VERSION:3.0
FN:${fullName}
END:VCARD`;
    const blob = new Blob([vcf], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fullName.replace(/\s+/g, '-')}.vcf`;
    a.click();
  };

  const redirect = (platform: string) => {
    window.location.href = `/go/${username}/${platform}`;
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-80 rounded-2xl p-8 border border-[#A832FF40] shadow-2xl bg-white text-black dark:bg-dark dark:text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Let's Connect</h2>
        <div className="grid gap-3">
          {socials.tiktok && (
            <button
              onClick={() => redirect('tiktok')}
              className="py-3 rounded-lg font-semibold bg-white text-black border hover:opacity-80"
            >
              Follow on TikTok
            </button>
          )}
          {socials.instagram && (
            <button
              onClick={() => redirect('instagram')}
              className="py-3 rounded-lg font-semibold text-white"
              style={{ background: '#E1306C' }}
            >
              Connect on Instagram
            </button>
          )}
          {socials.youtube && (
            <button
              onClick={() => redirect('youtube')}
              className="py-3 rounded-lg font-semibold text-white bg-red-600 hover:opacity-90"
            >
              Subscribe on YouTube
            </button>
          )}
          {socials.website && (
            <button
              onClick={() => redirect('website')}
              className="py-3 rounded-lg font-semibold text-white bg-gradient-to-tr from-[#4D00FF] to-[#A832FF]"
            >
              Visit Website
            </button>
          )}
          <button
            onClick={downloadVCF}
            className="py-3 rounded-lg font-semibold border border-[#A832FF] text-[#A832FF] hover:bg-[#A832FF] hover:text-white"
          >
            Add Contact
          </button>
        </div>
        <button onClick={onClose} className="mt-6 block mx-auto text-sm opacity-70 hover:opacity-100">
          Cancel
        </button>
      </motion.div>
    </div>
  );
}
