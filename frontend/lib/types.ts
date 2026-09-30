export type Profile = {
  username: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
  html_url: string;
};

export type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  stars: number;
  forks: number;
  language: string | null;
  updated_at: string;
  is_fork: boolean;
};

export type LanguageStat = { name: string; count: number };

export type RepoStats = {
  total_repos: number;
  original_repos: number;
  forked_repos: number;
  total_stars: number;
  total_forks: number;
  most_starred: { name: string; stars: number } | null;
  languages: LanguageStat[];
};

export type ReposResponse = { repos: Repo[]; stats: RepoStats };