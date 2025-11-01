"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CodeCatcher() {
  const router = useRouter();
  const sp = useSearchParams();

  useEffect(() => {
    const code = sp.get("code");
    const err = sp.get("error");
    if (code || err) {
      const qs = new URLSearchParams(Array.from(sp.entries())).toString();
      router.replace(`/auth/callback?${qs}`);
    }
  }, [router, sp]);

  return null;
}
