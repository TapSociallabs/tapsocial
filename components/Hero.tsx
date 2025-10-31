'use client';
import CTAButton from './buttons/CTAButton';

export default function Hero() {
  return (
    <section className="w-full min-h-[90vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-4">
        Your identity. One tap away.
      </h1>
      <p className="text-lg sm:text-2xl opacity-75 max-w-xl mb-6">
        Turn followers into real connections with a profile made to convert.
      </p>

      <CTAButton text="Claim Your Profile" />

      <p className="text-sm opacity-60 mt-6">
        Already have a TapSocial? Try your name: <span className="font-semibold">/zay</span> or <span className="font-semibold">/mia</span>
      </p>
    </section>
  );
}
