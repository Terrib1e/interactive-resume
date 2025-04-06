// src/components/resume/GitHubProjects.tsx
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Badge } from '@/components/ui';
import { Button } from '@/components/ui';
import { FadeIn } from '@/components/animations/fade-in';
import { Star, GitFork, ExternalLink, Github, Clock } from 'lucide-react';
import { fetchUserRepos, GithubRepo } from '@/services/github';
import { formatDistanceToNow } from 'date-fns';

interface GitHubProjectsProps {
  username: string;
  count?: number;
}
const githubUsername = import.meta.env.GITHUB_TOKEN || 'default-username';


export function GitHubProjects({ username, count = 6 }: GitHubProjectsProps) {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRepos() {
      try {
        setIsLoading(true);
        const data = await fetchUserRepos(username, count);
        setRepos(data);
        setError(null);
      } catch (err) {
        setError('Failed to load GitHub projects');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadRepos();
  }, [username, count]);

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-muted-foreground">Loading GitHub projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-destructive">
        <p>{error}</p>
        <Button variant="outline" className="mt-4" onClick={() => window.open(`https://github.com/${username}`, '_blank')}>
          <Github className="w-4 h-4 mr-2" />
          Visit GitHub Profile
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {repos.map((repo, index) => (
        <FadeIn key={repo.id} delay={index * 0.1}>
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-start justify-between text-xl">
                <span>{repo.name}</span>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Star className="w-4 h-4 mr-1" />
                  <span>{repo.stargazers_count}</span>
                </div>
              </CardTitle>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="w-3 h-3 mr-1" />
                <span>Updated {formatDistanceToNow(new Date(repo.updated_at))} ago</span>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
              <p className="text-sm text-muted-foreground mb-4 flex-1">{repo.description || 'No description provided'}</p>

              {repo.language && (
                <div className="mb-3">
                  <Badge variant="secondary">{repo.language}</Badge>
                </div>
              )}

              <div className="flex gap-2 mt-auto">
                <Button variant="outline" size="sm" asChild>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </a>
                </Button>
                {repo.homepage && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      ))}

      <div className="col-span-1 md:col-span-2 text-center mt-4">
        <Button variant="outline" asChild>
          <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
            <Github className="w-4 h-4 mr-2" />
            View All Projects on GitHub
          </a>
        </Button>
      </div>
    </div>
  );
}
