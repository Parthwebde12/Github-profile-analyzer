from collections import Counter


def build_stats(repos: list) -> dict:
    own = [r for r in repos if not r["is_fork"]]
    languages = Counter(r["language"] for r in own if r["language"])
    top = max(own, key=lambda r: r["stars"], default=None)

    return {
        "total_repos": len(repos),
        "original_repos": len(own),
        "forked_repos": len(repos) - len(own),
        "total_stars": sum(r["stars"] for r in own),
        "total_forks": sum(r["forks"] for r in own),
        "most_starred": (
            {"name": top["name"], "stars": top["stars"]}
            if top and top["stars"] > 0
            else None
        ),
        "languages": [
            {"name": name, "count": count} for name, count in languages.most_common()
        ],
    }