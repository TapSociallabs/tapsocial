'use client';

export default function Waitlist() {
  // Replace the Formspree endpoint with yours later
  const action = "https://formspree.io/f/your-id";
  return (
    <section className="max-w-xl mx-auto mt-20 px-6 text-center">
      <h2 className="text-3xl font-bold mb-2">Get early access</h2>
      <p className="opacity-70 mb-6">Be first to claim your handle and try Pro themes.</p>
      <form action={action} method="POST" className="flex gap-2 justify-center">
        <input
          type="email"
          name="email"
          required
          placeholder="your@email.com"
          className="w-full max-w-sm px-4 py-3 rounded-xl border"
        />
        <button className="px-5 py-3 rounded-xl font-semibold text-white bg-gradient-to-tr from-[#4D00FF] to-[#A832FF]">
          Join
        </button>
      </form>
      <p className="text-xs opacity-60 mt-3">No spam. Unsubscribe anytime.</p>
    </section>
  );
}

