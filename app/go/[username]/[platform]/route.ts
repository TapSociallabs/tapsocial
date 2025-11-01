import { NextRequest, NextResponse } from "next/server";
import profiles from "@/data/profiles.json";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ username: string; platform: string }> }
) {
  const { username, platform } = await params;

  const key = username.toLowerCase();
  const profile = (profiles as Record<string, any>)[key];

  if (!profile) return NextResponse.redirect("https://www.tapsocial.me/claim");

  const handle = profile.socials?.[platform];
  if (!handle) return NextResponse.redirect(`https://www.tapsocial.me/${key}`);

  const clean = handle.startsWith("@") ? handle.slice(1) : handle;

  const url =
    platform === "instagram" ? `https://instagram.com/${clean}` :
    platform === "tiktok"    ? `https://tiktok.com/@${clean}` :
    platform === "youtube"   ? (handle.startsWith("@") ? `https://youtube.com/${clean}` : `https://youtube.com/@${clean}`) :
    platform === "website"   ? (handle.startsWith("http") ? handle : `https://${handle}`) :
    `https://www.tapsocial.me/${key}`;

  return NextResponse.redirect(url);
}
