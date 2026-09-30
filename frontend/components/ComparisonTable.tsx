import LanguageIcon from "@/components/LangIcon";
import type { UserData } from "@/lib/api";

type Row = { label: string; a: number; b: number; highlight?: boolean };

function NumberCell({
  value,
  other,
  highlight,
}: {
  value: number;
  other: number;
  highlight?: boolean;
}) {
  const wins = highlight && value > other;
  return (
    <td
      className={`px-4 py-3 text-center ${
        wins ? "font-bold text-green-600" : "text-gray-900"
      }`}
    >
      {value}
    </td>
  );
}

function TopLanguage({ data }: { data: UserData }) {
  const top = data.stats.languages[0]?.name;
  if (!top) return <span className="text-gray-400">—</span>;
  return (
    <span className="inline-flex items-center gap-2">
      <LanguageIcon language={top} />
      {top}
    </span>
  );
}

export default function ComparisonTable({ a, b }: { a: UserData; b: UserData }) {
  const rows: Row[] = [
    { label: "Followers", a: a.profile.followers, b: b.profile.followers, highlight: true },
    { label: "Following", a: a.profile.following, b: b.profile.following },
    { label: "Public repos", a: a.profile.public_repos, b: b.profile.public_repos, highlight: true },
    { label: "Total stars", a: a.stats.total_stars, b: b.stats.total_stars, highlight: true },
    { label: "Total forks", a: a.stats.total_forks, b: b.stats.total_forks, highlight: true },
  ];

  return (
    <section className="mt-8 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Metric</th>
            <th className="px-4 py-3 text-center font-medium">@{a.profile.username}</th>
            <th className="px-4 py-3 text-center font-medium">@{b.profile.username}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row) => (
            <tr key={row.label}>
              <td className="px-4 py-3 text-gray-600">{row.label}</td>
              <NumberCell value={row.a} other={row.b} highlight={row.highlight} />
              <NumberCell value={row.b} other={row.a} highlight={row.highlight} />
            </tr>
          ))}
          <tr>
            <td className="px-4 py-3 text-gray-600">Top language</td>
            <td className="px-4 py-3 text-center text-gray-900">
              <TopLanguage data={a} />
            </td>
            <td className="px-4 py-3 text-center text-gray-900">
              <TopLanguage data={b} />
            </td>
          </tr>
        </tbody>
      </table>
      <p className="border-t border-gray-100 px-4 py-2 text-xs text-gray-500">
        Stars and forks count original (non-fork) repos among the 100 most
        recently updated. Green marks the higher value.
      </p>
    </section>
  );
}