import { useState, useEffect } from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export const usePortfolioData = () => {
  const [mounted, setMounted] = useState(false);

  // Fetch all data sources
  const { data: projects, error: projectsError } = useSWR('/data/projects.json', fetcher);
  const { data: experience, error: experienceError } = useSWR('/data/experience.json', fetcher);
  const { data: skills, error: skillsError } = useSWR('/data/skills.json', fetcher);
  const { data: education, error: educationError } = useSWR('/data/education.json', fetcher);
  const { data: achievements, error: achievementsError } = useSWR('/data/achievements.json', fetcher);
  const { data: githubStats, error: githubError } = useSWR('/data/github-stats.json', fetcher);
  const { data: blogPosts, error: blogError } = useSWR('/data/blog-posts.json', fetcher);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLoading = !mounted || !projects || !experience || !skills || !education || !achievements;
  const hasError = projectsError || experienceError || skillsError || educationError || achievementsError;

  const data = {
    projects: projects?.projects || [],
    experience: experience?.experience || [],
    skills: skills?.skillCategories || [],
    programmingLanguages: skills?.programmingLanguages || [],
    frameworks: skills?.frameworks || [],
    education: education?.education || [],
    certifications: education?.certifications || [],
    achievements: achievements?.achievements || [],
    stats: achievements?.stats || {},
    githubStats: githubStats || null,
    blogPosts: blogPosts?.posts || [],
    isLoading,
    hasError: !!hasError,
    error: hasError
  };

  return data;
};

export const useGitHubStats = () => {
  const { data, error } = useSWR('/data/github-stats.json', fetcher, {
    refreshInterval: 3600000, // Refresh every hour
    revalidateOnFocus: false,
    dedupingInterval: 60000
  });

  return {
    stats: data || null,
    isLoading: !error && !data,
    isError: error
  };
};

export const useBlogPosts = (limit = 5) => {
  const { data, error } = useSWR('/data/blog-posts.json', fetcher, {
    refreshInterval: 1800000, // Refresh every 30 minutes
    revalidateOnFocus: false
  });

  return {
    posts: data?.posts?.slice(0, limit) || [],
    isLoading: !error && !data,
    isError: error,
    lastUpdated: data?.last_updated || null
  };
};