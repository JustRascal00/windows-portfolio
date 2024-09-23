import React, { useEffect, useState } from 'react';
import styles from './GitHubProfile.module.css';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Github, Users, BookOpen, Star, GitFork } from 'lucide-react';

interface GitHubProfile {
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

const GitHubProfile: React.FC = () => {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [repoLoading, setRepoLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch('https://api.github.com/users/JustRascal00');
      const data = await response.json();
      setProfile(data);
      setLoading(false);
    };

    const fetchRepos = async () => {
      setRepoLoading(true);
      const response = await fetch('https://api.github.com/users/JustRascal00/repos?sort=updated&direction=desc');
      const data = await response.json();
      setRepos(data);
      setRepoLoading(false);
    };

    fetchProfile();
    fetchRepos();
  }, []);

  const RepoCard: React.FC<{ repo: Repository }> = ({ repo }) => (
    <div className={styles.repoItem}>
      <h3 className={styles.repoLink}>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
          {repo.name}
        </a>
      </h3>
      <p className={styles.repoDescription}>{repo.description || 'No description provided.'}</p>
      <div className="flex items-center space-x-4">
        <Badge variant="secondary" className="bg-[#3b3b3b] text-[#d1d5db]">{repo.language || 'N/A'}</Badge>
        <span className="flex items-center text-sm text-[#9ca3af]">
          <Star className="w-4 h-4 mr-1" /> {repo.stargazers_count}
        </span>
        <span className="flex items-center text-sm text-[#9ca3af]">
          <GitFork className="w-4 h-4 mr-1" /> {repo.forks_count}
        </span>
      </div>
    </div>
  );

  if (loading) {
    return <div className="space-y-4"><Skeleton className="h-12 w-full" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-full" /></div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.profileTitle}>GitHub Profile</h2>
      
      <div className="flex items-center space-x-6 mb-6">
        <img src={profile?.avatar_url} alt="GitHub Avatar" className={styles.avatar} />
        <div>
          <h2 className="text-2xl font-bold text-white">{profile?.name || 'N/A'}</h2>
          <p className="text-[#9ca3af]">{profile?.bio || 'No bio available'}</p>
          <Button 
            variant="outline" 
            className="mt-2 text-[#60a5fa] hover:text-[#a5d8ff] bg-[#272727] border-[#3b3b3b]"
            onClick={() => window.open(profile?.html_url, '_blank')}
          >
            <Github className="mr-2 h-4 w-4" /> View on GitHub
          </Button>
        </div>
      </div>

      <div className={styles.statGrid}>
        <div className={styles.statItem}>
          <BookOpen className="h-8 w-8 text-[#60a5fa] mb-2" />
          <p className="text-2xl font-bold">{profile?.public_repos}</p>
          <p className="text-sm">Repositories</p>
        </div>
        <div className={styles.statItem}>
          <Users className="h-8 w-8 text-[#60a5fa] mb-2" />
          <p className="text-2xl font-bold">{profile?.followers}</p>
          <p className="text-sm">Followers</p>
        </div>
        <div className={styles.statItem}>
          <Users className="h-8 w-8 text-[#60a5fa] mb-2" />
          <p className="text-2xl font-bold">{profile?.following}</p>
          <p className="text-sm">Following</p>
        </div>
      </div>

      <Tabs defaultValue="repositories" className={styles.tabsContainer}>
        <TabsList className="grid w-full grid-cols-2 bg-[#272727]">
          <TabsTrigger value="repositories" className="data-[state=active]:bg-[#3a3a3a]">Repositories</TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-[#3a3a3a]">Recent Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="repositories" className={styles.tabContent}>
          <div className={styles.repoContainer}>
            {repoLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                {repos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="activity" className={styles.tabContent}>
          <div className={styles.activityContainer}>
            <h3 className="text-xl font-semibold mb-2">Recent Activity</h3>
            <p className="text-[#9ca3af]">Activity feed coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GitHubProfile;