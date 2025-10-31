export default function HowItWorks() {
  const steps = [
    { title: "Claim your @handle", desc: "Pick a clean link like tapsocial.me/yourname." },
    { title: "Add links & media", desc: "Drop your socials and featured videos in seconds." },
    { title: "Share & convert", desc: "One tap from bio to real connection or contact." },
  ];
  return (
    <section className="max-w-5xl mx-auto mt-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">How TapSocial Works</h2>
      <div className="grid gap-6 sm:grid-cols-3">
        {steps.map((s, i) => (
          <div key={i} className="rounded-2xl p-6 bg-white shadow">
            <div className="text-4xl mb-3">{"①②③".charAt(i)}</div>
            <h3 className="font-semibold mb-1">{s.title}</h3>
            <p className="opacity-70">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

