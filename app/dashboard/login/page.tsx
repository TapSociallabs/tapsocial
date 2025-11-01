"use client";
import { useState, useMemo } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Login() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(
    null
  );

  const envOk = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    return Boolean(url && key);
  }, []);

  async function send() {
    setMsg(null);
    if (!envOk) {
      setMsg({
        type: "err",
        text: "Missing Supabase env vars in the client. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel.",
      });
      return;
    }
    if (!email || !email.includes("@")) {
      setMsg({ type: "err", text: "Enter a valid email." });
      return;
    }

    setSending(true);
    try {
      const supabase = getSupabaseBrowserClient();
      const redirectTo = `${window.location.origin}/dashboard`;
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo },
      });
      if (error) {
        setMsg({ type: "err", text: error.message });
      } else {
        setMsg({ type: "ok", text: "Check your email for the magic link." });
      }
    } catch (e: any) {
      setMsg({
        type: "err",
        text: e?.message || "Something went wrong.",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white dark:bg-dark shadow rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-2">Sign in to TapSocial</h1>
        <p className="opacity-70 mb-6">We'll email you a magic link.</p>

        <input
          className="w-full border rounded-xl px-4 py-3 mb-3"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />

        <button
          onClick={send}
          disabled={sending}
          className="w-full rounded-xl px-4 py-3 font-semibold text-white bg-gradient-to-tr from-[#4D00FF] to-[#A832FF] disabled:opacity-60"
        >
          {sending ? "Sending..." : "Send magic link"}
        </button>

        {msg && (
          <p
            className={`mt-4 text-sm ${
              msg.type === "ok" ? "text-green-600" : "text-red-600"
            }`}
          >
            {msg.text}
          </p>
        )}

        {!envOk && (
          <p className="mt-3 text-xs text-red-600">
            Client env missing. Set NEXT_PUBLIC_SUPABASE_URL and
            NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel.
          </p>
        )}
      </div>
    </main>
  );
}
