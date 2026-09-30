"use client";

import { useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import type { Profile } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = username.trim();
    if (!name) return;

    setLoading(true);
    setError("");
    setProfile(null);

    try {
      const res = await fetch(
        `${API_URL}/api/profile/${encodeURIComponent(name)}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail ?? "Something went wrong");
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not reach the server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          GitHub Profile Analyzer
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 flex gap-2">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter a GitHub username"
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
          <p className="mt-6 rounded-lg bg-red-50 p-4 text-red-700">{error}</p>
        )}
        {profile && <ProfileCard profile={profile} />}
      </div>
    </main>
  );
}