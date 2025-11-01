import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function Dashboard() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/dashboard/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("owner_id", user.id)
    .single();

  const { data: clickStats } = await supabase
    .from("clicks")
    .select("platform")
    .gte("created_at", new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString());

  const platformCounts = (clickStats ?? []).reduce<Record<string, number>>(
    (acc, row: any) => {
      acc[row.platform] = (acc[row.platform] || 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Creator Dashboard</h1>
      <p className="opacity-70 mb-8">
        Edit your profile and see how your links perform.
      </p>

      <section className="grid sm:grid-cols-3 gap-4 mb-8">
        {["instagram", "tiktok", "youtube", "website"].map((p) => (
          <div key={p} className="rounded-2xl border p-4">
            <div className="text-sm opacity-70">{p}</div>
            <div className="text-2xl font-bold">{platformCounts[p] || 0}</div>
          </div>
        ))}
      </section>

      <ProfileEditor initial={profile ?? null} userId={user.id} />
    </main>
  );
}

function toSocials(rec: any) {
  if (!rec || !rec.socials)
    return { instagram: "", tiktok: "", youtube: "", website: "" };
  const s = rec.socials;
  return {
    instagram: s.instagram || "",
    tiktok: s.tiktok || "",
    youtube: s.youtube || "",
    website: s.website || "",
  };
}

function ProfileEditor({ initial, userId }: { initial: any; userId: string }) {
  return (
    <form action={saveProfile} className="rounded-2xl border p-6 space-y-4">
      <input type="hidden" name="owner_id" value={userId} />
      <label className="block">
        <div className="text-sm mb-1">Username</div>
        <input
          name="username"
          defaultValue={initial?.username || ""}
          required
          className="w-full border rounded-xl px-4 py-3"
          placeholder="yourname"
        />
      </label>
      <label className="block">
        <div className="text-sm mb-1">Full name</div>
        <input
          name="full_name"
          defaultValue={initial?.full_name || ""}
          className="w-full border rounded-xl px-4 py-3"
        />
      </label>
      <label className="block">
        <div className="text-sm mb-1">Title</div>
        <input
          name="title"
          defaultValue={initial?.title || ""}
          className="w-full border rounded-xl px-4 py-3"
        />
      </label>
      <label className="block">
        <div className="text-sm mb-1">Avatar URL (optional)</div>
        <input
          name="avatar_url"
          defaultValue={initial?.avatar_url || ""}
          className="w-full border rounded-xl px-4 py-3"
        />
      </label>

      <div className="grid sm:grid-cols-2 gap-4">
        {Object.entries(toSocials(initial)).map(([k, v]) => (
          <label key={k} className="block">
            <div className="text-sm mb-1">{k[0].toUpperCase() + k.slice(1)}</div>
            <input
              name={`socials.${k}`}
              defaultValue={v as string}
              className="w-full border rounded-xl px-4 py-3"
            />
          </label>
        ))}
      </div>

      <button className="rounded-xl px-6 py-3 font-semibold text-white bg-gradient-to-tr from-[#4D00FF] to-[#A832FF]">
        Save changes
      </button>
    </form>
  );
}

export async function saveProfile(formData: FormData) {
  "use server";
  const supabase = createClient();
  const owner_id = String(formData.get("owner_id"));
  const username = String(formData.get("username")).toLowerCase().trim();
  const full_name = String(formData.get("full_name") || "");
  const title = String(formData.get("title") || "");
  const avatar_url = String(formData.get("avatar_url") || "");

  const socials: Record<string, string> = {};
  for (const k of ["instagram", "tiktok", "youtube", "website"]) {
    const val = String(formData.get(`socials.${k}`) || "").trim();
    if (val) socials[k] = val;
  }

  const { error } = await supabase.from("profiles").upsert(
    {
      owner_id,
      username,
      full_name,
      title,
      avatar_url,
      socials,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "username" }
  );

  if (error) throw error;
}
