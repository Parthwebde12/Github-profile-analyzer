import type { Profile } from "@/lib/types";

export default function ProfileCard({ profile }: { profile: Profile }) {
  const joined = new Date(profile.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <img src={profile.avatar_url} alt={`${profile.username}'s avatar`} className="h-24 w-24 rounded-full" />
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-bold text-gray-900">
            {profile.name ?? profile.username}
          </h2>
          <a href={profile.html_url} target="_blank" rel="noreferrer"className="text-blue-600 hover:underline"> @{profile.username}</a>
          <p className="mt-2 text-gray-600">{profile.bio ?? "No bio provided."}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <Stat label="Followers" value={profile.followers} />
        <Stat label="Following" value={profile.following} />
        <Stat label="Repos" value={profile.public_repos} />
      </div>

      <p className="mt-6 text-sm text-gray-500">Joined {joined}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}