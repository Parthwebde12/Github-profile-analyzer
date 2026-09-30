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