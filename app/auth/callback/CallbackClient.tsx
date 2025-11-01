"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function CallbackClient() {
  const router = useRouter();
  const sp = useSearchParams();

  useEffect(() => {
    (async () => {
      const err = sp.get("error");
      if (err) {
        router.replace(
          `/dashboard/login?error=${encodeURIComponent(err)}`
        );
        return;
      }
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      );
      if (error) {
        router.replace(
          `/dashboard/login?error=${encodeURIComponent(error.message)}`
        );
        return;
      }
      router.replace("/dashboard");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Nothing to render; this page just exchanges the session and redirects
  return null;
}
