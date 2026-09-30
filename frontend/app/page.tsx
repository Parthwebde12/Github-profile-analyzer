"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [status, setStatus] = useState("checking...");

  useEffect(() => {
    fetch(`${API_URL}/api/health`)
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus("backend unreachable"));
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-2 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900">
        GitHub Profile Analyzer
      </h1>
      <p className="text-gray-600">Backend status: {status}</p>
    </main>
  );
}