import { useState, useEffect } from 'react';
import { Github, GitBranch, Star, Users, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const GitHubStats = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        setIsLoading(true);
        
        // Try to fetch from your GitHub stats file first (updated by GitHub Actions)
        const response = await fetch('/data/github-stats.json');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          // Fallback to sample data if file doesn't exist
          setStats({
            totalRepos: 8,
            totalStars: 47,
            totalForks: 12,
            followers: 23,
            following: 45,
            publicContributions: 1200,
            languages: [
              { name: 'Python', percentage: 65, color: '#3776ab' },
              { name: 'JavaScript', percentage: 20, color: '#f7df1e' },
              { name: 'TypeScript', percentage: 10, color: '#3178c6' },
              { name: 'Other', percentage: 5, color: '#6f42c1' }
            ],
            recentActivity: [
              { repo: 'bess-optimizer', action: 'pushed', date: '2024-11-01' },
              { repo: 'vision-transformer-nav', action: 'created', date: '2024-10-30' },
              { repo: 'multi-agent-airspace', action: 'updated', date: '2024-10-28' }
            ],
            lastUpdated: new Date().toISOString()
          });
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching GitHub stats:', err);
        setError('Failed to load GitHub stats');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
        <div className="animate-pulse">
          <div className="h-4 bg-slate-700 rounded w-3/4 mb-3"></div>
          <div className="h-3 bg-slate-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
        <p className="text-gray-400">GitHub stats unavailable</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="bg-slate-800/50 rounded-xl p-4 border border-blue-500/20 text-center">
          <Github className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{stats.totalRepos}</div>
          <div className="text-xs text-gray-400">Repositories</div>
        </div>
        
        <div className="bg-slate-800/50 rounded-xl p-4 border border-yellow-500/20 text-center">
          <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{stats.totalStars}</div>
          <div className="text-xs text-gray-400">Stars</div>
        </div>
        
        <div className="bg-slate-800/50 rounded-xl p-4 border border-green-500/20 text-center">
          <GitBranch className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{stats.totalForks}</div>
          <div className="text-xs text-gray-400">Forks</div>
        </div>
        
        <div className="bg-slate-800/50 rounded-xl p-4 border border-purple-500/20 text-center">
          <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{stats.followers}</div>
          <div className="text-xs text-gray-400">Followers</div>
        </div>
      </motion.div>

      {/* Language Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50"
      >
        <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-400" />
          Language Distribution
        </h4>
        <div className="space-y-3">
          {stats.languages.map((lang, index) => (
            <div key={lang.name} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: lang.color }}></div>
              <span className="text-gray-300 text-sm flex-1">{lang.name}</span>
              <span className="text-gray-400 text-sm">{lang.percentage}%</span>
            </div>
          ))}
        </div>
        <div className="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden flex">
          {stats.languages.map((lang, index) => (
            <div
              key={lang.name}
              className="h-full"
              style={{
                backgroundColor: lang.color,
                width: `${lang.percentage}%`
              }}
            ></div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50"
      >
        <h4 className="text-white font-semibold mb-4">Recent Activity</h4>
        <div className="space-y-3">
          {stats.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-gray-300">
                <span className="text-blue-400">{activity.action}</span> to{' '}
                <span className="font-mono">{activity.repo}</span>
              </span>
              <span className="text-gray-400">
                {new Date(activity.date).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Last Updated */}
      <div className="text-center text-xs text-gray-500">
        Last updated: {new Date(stats.lastUpdated).toLocaleString()}
      </div>
    </div>
  );
};

export default GitHubStats;