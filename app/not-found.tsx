export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-10">
      <h2 className="text-3xl font-bold mb-4">Username not claimed</h2>
      <p className="opacity-70 mb-6">
        This TapSocial profile isn't set up yet. Reserve your handle now!
      </p>
      <a
        href="https://www.tapsocial.me"
        className="px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-[#4D00FF] to-[#A832FF] text-white shadow-lg"
      >
        Claim Your Profile
      </a>
    </div>
  );
}
