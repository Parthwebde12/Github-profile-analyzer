"use client";

import Link from "next/link";
import { useState } from "react";
import ComparisonTable from "@/components/ComparisonTable";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ProfileCard from "@/components/ProfileCard";
import StatsPanel from "@/components/StatsPanel";
import { errorMessage, fetchUserData } from "@/lib/api";
import type { UserData } from "@/lib/api";

export default function ComparePage() {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [users, setUsers] = useState<UserData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const a = first.trim();
    const b = second.trim();

    if (!a || !b) {
      setError("Please enter two GitHub usernames.");
      return;
    }
    if (a.toLowerCase() === b.toLowerCase()) {
      setError("Please enter two different usernames.");
      return;
    }

    setLoading(true);
    setError("");
    setUsers(null);

    try {
      setUsers(await Promise.all([fetchUserData(a), fetchUserData(b)]));
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← Back to search
        </Link>
        <h1 className="mt-4 text-center text-3xl font-bold text-gray-900">
          Compare GitHub Users
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-3xl flex-col gap-2 sm:flex-row"
        >
          <input
            value={first}
            onChange={(e) => setFirst(e.target.value)}
            placeholder="First username"
            className={inputClass}
          />
          <input
            value={second}
            onChange={(e) => setSecond(e.target.value)}
            placeholder="Second username"
            className={inputClass}
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Comparing..." : "Compare"}
          </button>
        </form>

        {error && (
          <p
            role="alert"
            className="mx-auto mt-6 max-w-3xl rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
          >
            {error}
          </p>
        )}

        {loading && (
          <div className="mx-auto max-w-3xl">
            <LoadingSkeleton />
          </div>
        )}

        {users && (
          <>
            <ComparisonTable a={users[0]} b={users[1]} />
            <div className="grid gap-x-6 lg:grid-cols-2">
              {users.map((u) => (
                <div key={u.profile.username}>
                  <ProfileCard profile={u.profile} />
                  <StatsPanel stats={u.stats} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}