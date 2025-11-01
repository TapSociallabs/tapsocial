"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function CodeLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function verify() {
    setMsg(null);
    if (!email || !code) {
      setMsg("Enter your email and the 6-digit code.");
      return;
    }
    setBusy(true);
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: "email",
      });
      if (error) {
        setMsg(error.message);
        return;
      }
      router.replace("/dashboard");
    } catch (e: any) {
      setMsg(e?.message || "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-2">Enter your code</h1>
        <p className="opacity-70 mb-4">
          We sent a 6-digit code to your email.
        </p>
        <input
          className="w-full border rounded-xl px-4 py-3 mb-3"
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border rounded-xl px-4 py-3 mb-3 tracking-widest text-center"
          placeholder="123456"
          inputMode="numeric"
          maxLength={6}
          value={code}
          onChange={(e) =>
            setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
          }
        />
        <button
          onClick={verify}
          disabled={busy}
          className="w-full rounded-xl px-4 py-3 font-semibold text-white bg-gradient-to-tr from-[#4D00FF] to-[#A832FF] disabled:opacity-60"
        >
          {busy ? "Verifying..." : "Verify & continue"}
        </button>
        {msg && <p className="mt-3 text-sm text-red-600">{msg}</p>}
      </div>
    </main>
  );
}
