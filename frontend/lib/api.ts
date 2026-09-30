import type { Profile, Repo, RepoStats, ReposResponse } from "@/lib/types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type UserData = {
  profile: Profile;
  repos: Repo[];
  stats: RepoStats;
};

export async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail ?? "Something went wrong");
  return data;
}

export function errorMessage(err: unknown): string {
  // fetch() throws a TypeError when the server can't be reached at all
  if (err instanceof TypeError) {
    return "Can't reach the server. Make sure the backend is running.";
  }
  return err instanceof Error ? err.message : "Something went wrong";
}

export async function fetchUserData(username: string): Promise<UserData> {
  const encoded = encodeURIComponent(username);
  const [profile, repoData] = await Promise.all([
    fetchJson<Profile>(`${API_URL}/api/profile/${encoded}`),
    fetchJson<ReposResponse>(`${API_URL}/api/repos/${encoded}`),
  ]);
  return { profile, repos: repoData.repos, stats: repoData.stats };
}