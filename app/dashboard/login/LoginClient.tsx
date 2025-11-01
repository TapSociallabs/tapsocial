"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LoginClient() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(
    null
  );

  const [code, setCode] = useState("");
  const codeRef = useRef<HTMLInputElement>(null);

  async function sendCode() {
    setMsg(null);
    if (!email || !email.includes("@")) {
      setMsg({ type: "err", text: "Enter a valid email." });
      return;
    }
    setSending(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true },
      });
      if (error) {
        setMsg({ type: "err", text: error.message });
      } else {
        setSent(true);
        setMsg({
          type: "ok",
          text: "We sent you a 6-digit code. Enter it below.",
        });
        setTimeout(() => codeRef.current?.focus(), 50);
      }
    } catch (e: any) {
      setMsg({ type: "err", text: e?.message || "Something went wrong." });
    } finally {
      setSending(false);
    }
  }

  async function verifyCode() {
    setMsg(null);
    if (!email || code.length !== 6) {
      setMsg({ type: "err", text: "Enter your email and the 6-digit code." });
      return;
    }
    setSending(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: "email",
      });
      if (error) {
        setMsg({ type: "err", text: error.message });
        return;
      }
      router.replace("/dashboard");
    } catch (e: any) {
      setMsg({ type: "err", text: e?.message || "Something went wrong." });
    } finally {
      setSending(false);
    }
  }

  useEffect(() => {
    const url = new URL(window.location.href);
    const err = url.searchParams.get("error");
    if (err) setMsg({ type: "err", text: decodeURIComponent(err) });
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white dark:bg-dark shadow rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-2">
          {sent ? "Check your email" : "Sign in to TapSocial"}
        </h1>
        <p className="opacity-70 mb-6">
          {sent
            ? "Enter the 6-digit code we just emailed you."
            : "We’ll email you a 6-digit login code."}
        </p>

        <input
          className="w-full border rounded-xl px-4 py-3 mb-3"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />

        {!sent ? (
          <button
            onClick={sendCode}
            disabled={sending}
            className="w-full rounded-xl px-4 py-3 font-semibold text-white bg-gradient-to-tr from-[#4D00FF] to-[#A832FF] disabled:opacity-60"
          >
            {sending ? "Sending..." : "Send 6-digit code"}
          </button>
        ) : (
          <>
            <input
              ref={codeRef}
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
              onClick={verifyCode}
              disabled={sending}
              className="w-full rounded-xl px-4 py-3 font-semibold text-white bg-gradient-to-tr from-[#4D00FF] to-[#A832FF] disabled:opacity-60"
            >
              {sending ? "Verifying..." : "Verify & continue"}
            </button>

            <button
              onClick={sendCode}
              disabled={sending}
              className="w-full mt-3 rounded-xl px-4 py-3 font-semibold border"
            >
              Resend code
            </button>
          </>
        )}

        {msg && (
          <p
            className={`mt-4 text-sm ${
              msg.type === "ok" ? "text-green-600" : "text-red-600"
            }`}
          >
            {msg.text}
          </p>
        )}
      </div>
    </main>
  );
}
