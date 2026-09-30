"use client";

import { useState } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ProfileCard from "@/components/ProfileCard";
import RepoList from "@/components/RepoList";
import StatsPanel from "@/components/StatsPanel";
import type { Profile, Repo, RepoStats, ReposResponse } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail ?? "Something went wrong");
  return data;
}

function errorMessage(err: unknown): string {
  // fetch() throws a TypeError when the server can't be reached at all
  if (err instanceof TypeError) {
    return "Can't reach the server. Make sure the backend is running.";
  }
  return err instanceof Error ? err.message : "Something went wrong";
}

export default function Home() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [stats, setStats] = useState<RepoStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = username.trim();
    if (!name) {
      setError("Please enter a GitHub username.");
      return;
    }

    setLoading(true);
    setError("");
    setProfile(null);
    setRepos([]);
    setStats(null);

    try {
      const encoded = encodeURIComponent(name);
      const [profileData, repoData] = await Promise.all([
        fetchJson<Profile>(`${API_URL}/api/profile/${encoded}`),
        fetchJson<ReposResponse>(`${API_URL}/api/repos/${encoded}`),
      ]);
      setProfile(profileData);
      setRepos(repoData.repos);
      setStats(repoData.stats);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          GitHub Profile Analyzer
        </h1>
        <p className="mt-2 text-center text-gray-500">
          Enter a username to explore their profile, repositories and top
          languages.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex gap-2">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. torvalds"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && (
          <p
            role="alert"
            className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
          >
            {error}
          </p>
        )}

        {loading && <LoadingSkeleton />}

        {profile && (
          <>
            <ProfileCard profile={profile} />
            {stats && <StatsPanel stats={stats} />}
            <RepoList repos={repos} />
          </>
        )}
      </div>
    </main>
  );
}