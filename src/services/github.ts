import { githubCache } from "@/lib/cache";

// src/services/github.ts
export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  language: string;
  created_at: string;
  updated_at: string;
  topics: string[];
}

export async function fetchUserRepos(username: string, count: number = 6, sort: 'updated' | 'created' | 'pushed' = 'updated'): Promise<GithubRepo[]> {
  const cacheKey = `repos_${username}_${count}_${sort}`;
  const cachedData = githubCache.get(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=${sort}&per_page=${count}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        // Use environment variable for the token if you're using one
        // 'Authorization': `token ${process.env.GITHUB_TOKEN}`
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    githubCache.set(cacheKey, repos);
    return repos;
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return [];
  }
}

// Fetch repository topics (tags)
export async function fetchRepoTopics(username: string, repoName: string): Promise<string[]> {
  try {
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/topics`, {
      headers: {
        Accept: 'application/vnd.github.mercy-preview+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    return data.names || [];
  } catch (error) {
    console.error('Error fetching repository topics:', error);
    return [];
  }
}
