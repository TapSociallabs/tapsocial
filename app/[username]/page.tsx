import ProfilePage from "@/components/profile/ProfilePage";
import profilesJson from "@/data/profiles.json";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function UserProfile({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const key = (username || "").toLowerCase();

  const supabase = createClient();
  const { data: dbProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", key)
    .single();

  const profile = dbProfile ?? (profilesJson as any)[key];
  if (!profile) return notFound();

  const normalized = dbProfile
    ? {
        full_name: dbProfile.full_name,
        title: dbProfile.title,
        avatar: dbProfile.avatar_url,
        stats: { connections: "\u2014", views: "\u2014" },
        socials: dbProfile.socials || {},
        featured: [],
      }
    : (profilesJson as any)[key];

  return <ProfilePage username={key} profile={normalized} />;
}
