import ProfilePage from '@/components/profile/ProfilePage';

export default async function UserProfile({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params; // <-- unwrap the Promise
  return <ProfilePage username={username} />;
}
