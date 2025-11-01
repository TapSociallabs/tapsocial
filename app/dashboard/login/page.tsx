"use client";
import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function send() {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });
    if (!error) setSent(true);
    else alert(error.message);
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white dark:bg-dark shadow rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-2">Sign in to TapSocial</h1>
        <p className="opacity-70 mb-6">We'll email you a magic link.</p>
        {sent ? (
          <p className="text-green-600">Check your email for the login link.</p>
        ) : (
          <>
            <input
              className="w-full border rounded-xl px-4 py-3 mb-3"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={send}
              className="w-full rounded-xl px-4 py-3 font-semibold text-white bg-gradient-to-tr from-[#4D00FF] to-[#A832FF]"
            >
              Send magic link
            </button>
          </>
        )}
      </div>
    </main>
  );
}
