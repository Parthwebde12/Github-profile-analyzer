import LanguageIcon from "@/components/LangIcon";
import type { Repo } from "@/lib/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function RepoList({ repos }: { repos: Repo[] }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold text-gray-900">
        Repositories ({repos.length})
      </h2>

      {repos.length === 0 ? (
        <p className="mt-4 text-gray-500">No public repositories.</p>
      ) : (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {repos.map((repo) => (
            <li
              key={repo.name}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="wrap-break-word font-semibold text-blue-600 hover:underline"
              >
                {repo.name}
              </a>
              {repo.is_fork && (
                <span className="ml-2 rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                  Fork
                </span>
              )}
              <p className="mt-2 text-sm text-gray-600">
                {repo.description ?? "No description."}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                {repo.language && (
                  <span className="flex items-center gap-1.5">
                    <LanguageIcon language={repo.language} />
                    {repo.language}
                  </span>
                )}
                <span>★ {repo.stars}</span>
                <span>Forks {repo.forks}</span>
                <span>Updated {formatDate(repo.updated_at)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}