import ProfilePage from '@/components/profile/ProfilePage';
import profiles from '@/data/profiles.json';
import { notFound } from 'next/navigation';

type Params = { username: string };

export default async function UserProfile({
  params,
}: {
  params: Promise<Params>;
}) {
  const { username } = await params;
  const key = (username || '').toLowerCase();
  const profile = (profiles as Record<string, any>)[key];

  if (!profile) return notFound();

  return <ProfilePage username={key} profile={profile} />;
}

