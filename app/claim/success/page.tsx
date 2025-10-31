import Link from "next/link";

export default function ClaimSuccess() {
  return (
    <main className="min-h-screen max-w-xl mx-auto px-6 py-20 text-center">
      <h1 className="text-3xl font-bold mb-3">Request received 🎉</h1>
      <p className="opacity-70 mb-8">We’ll check your handle and follow up by email soon.</p>
      <Link
        href="/"
        className="inline-block px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-tr from-[#4D00FF] to-[#A832FF]"
      >
        Back to TapSocial
      </Link>
    </main>
  );
}

