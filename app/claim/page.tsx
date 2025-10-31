export const metadata = {
  title: "Claim your TapSocial — TapSocial.me",
  description: "Reserve your TapSocial handle and get early access.",
};

export default function ClaimPage() {
  const action = "https://formspree.io/f/mqagywbe"; // <-- replace with your Formspree endpoint

  return (
    <main className="min-h-screen max-w-xl mx-auto px-6 py-14">
      <h1 className="text-3xl font-bold mb-2">Claim your TapSocial</h1>
      <p className="opacity-70 mb-8">Tell us a bit about you. We’ll confirm availability and onboard you.</p>

      <form action={action} method="POST" className="space-y-4 bg-white p-6 rounded-2xl shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Desired username</label>
          <div className="flex items-center gap-2">
            <span className="px-3 py-2 rounded-lg bg-gray-100 text-sm">tapsocial.me/</span>
            <input
              name="username"
              required
              minLength={2}
              pattern="[a-zA-Z0-9_\\. -]{2,}"
              placeholder="yourname"
              className="w-full px-3 py-2 rounded-lg border"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Your name</label>
          <input name="full_name" required placeholder="Full name" className="w-full px-3 py-2 rounded-lg border" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@email.com"
            className="w-full px-3 py-2 rounded-lg border"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">TikTok</label>
            <input name="tiktok" placeholder="@handle" className="w-full px-3 py-2 rounded-lg border" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Instagram</label>
            <input name="instagram" placeholder="@handle" className="w-full px-3 py-2 rounded-lg border" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">YouTube</label>
            <input name="youtube" placeholder="@handle" className="w-full px-3 py-2 rounded-lg border" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Website</label>
            <input name="website" placeholder="https://your.site" className="w-full px-3 py-2 rounded-lg border" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">About you</label>
          <textarea
            name="about"
            rows={4}
            placeholder="What do you create? What should your profile do?"
            className="w-full px-3 py-2 rounded-lg border"
          />
        </div>

        {/* Redirect to /claim/success on submit */}
        <input type="hidden" name="_next" value="https://www.tapsocial.me/claim/success" />

        <button className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-tr from-[#4D00FF] to-[#A832FF]">
          Request Invite
        </button>
        <p className="text-xs opacity-60 text-center">We’ll email you within 24–48 hours.</p>
      </form>
    </main>
  );
}

