import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  const supabase = createClient();

  if (error) {
    const to = new URL("/dashboard/login", req.url);
    to.searchParams.set("error", error);
    return NextResponse.redirect(to);
  }

  if (code) {
    const { error: exchangeError } =
      await supabase.auth.exchangeCodeForSession(code);
    if (exchangeError) {
      const to = new URL("/dashboard/login", req.url);
      to.searchParams.set("error", exchangeError.message);
      return NextResponse.redirect(to);
    }
  }

  return NextResponse.redirect(new URL("/dashboard", req.url));
}
