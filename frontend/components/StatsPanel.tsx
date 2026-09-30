import type { RepoStats } from "@/lib/types";

export default function StatsPanel({ stats }: { stats: RepoStats }) {
  const languageTotal = stats.languages.reduce((sum, l) => sum + l.count, 0);

  return (
    <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900">Repository statistics</h2>

      <div className="mt-4 grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
        <Stat label="Original repos" value={stats.original_repos} />
        <Stat label="Forked repos" value={stats.forked_repos} />
        <Stat label="Total stars" value={stats.total_stars} />
        <Stat label="Total forks" value={stats.total_forks} />
      </div>

      {stats.most_starred && (
        <p className="mt-4 text-sm text-gray-600">
          Most starred:{" "}
          <span className="font-semibold">{stats.most_starred.name}</span> (★{" "}
          {stats.most_starred.stars})
        </p>
      )}

      {stats.languages.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-900">Top languages</h3>
          <ul className="mt-3 space-y-3">
            {stats.languages.slice(0, 5).map((lang) => {
              const percent = Math.round((lang.count / languageTotal) * 100);
              return (
                <li key={lang.name}>
                  <div className="flex justify-between text-sm text-gray-700">
                    <span>{lang.name}</span>
                    <span>
                      {lang.count} {lang.count === 1 ? "repo" : "repos"} · {percent}%
                    </span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
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