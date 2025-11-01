#!/usr/bin/env node

const fs = require('fs');
const https = require('https');

function fetchData(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'portfolio-updater',
        ...headers
      }
    };

    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse JSON: ${e.message}`));
        }
      });
    }).on('error', reject);
  });
}

async function updateGitHubStats() {
  try {
    // Read current config
    const contactPath = 'public/data/contact.json';
    if (!fs.existsSync(contactPath)) {
      throw new Error('Contact info not found. Run setup.js first.');
    }

    const contact = JSON.parse(fs.readFileSync(contactPath, 'utf8'));
    const username = contact.social.github;

    if (!username) {
      throw new Error('GitHub username not configured');
    }

    console.log(`🔄 Fetching GitHub stats for ${username}...`);

    const headers = {};
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    // Fetch user data
    const userData = await fetchData(`https://api.github.com/users/${username}`, headers);
    
    // Fetch repositories
    const reposData = await fetchData(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      headers
    );

    // Calculate stats
    const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = reposData.reduce((sum, repo) => sum + repo.forks_count, 0);
    
    // Get featured repos (most starred, non-fork repos)
    const featuredRepos = reposData
      .filter(repo => !repo.fork && repo.stargazers_count >= 0)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .map(repo => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        url: repo.html_url,
        updated_at: repo.updated_at,
        topics: repo.topics || []
      }));

    // Get language stats
    const languages = {};
    reposData.forEach(repo => {
      if (repo.language && !repo.fork) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    const sortedLanguages = Object.entries(languages)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8)
      .map(([lang, count]) => ({ language: lang, repos: count }));

    const stats = {
      username,
      name: userData.name,
      bio: userData.bio,
      followers: userData.followers,
      following: userData.following,
      public_repos: userData.public_repos,
      total_stars: totalStars,
      total_forks: totalForks,
      account_created: userData.created_at,
      last_updated: new Date().toISOString(),
      featured_repos: featuredRepos,
      languages: sortedLanguages,
      profile_url: userData.html_url,
      avatar_url: userData.avatar_url
    };

    // Ensure data directory exists
    if (!fs.existsSync('public/data')) {
      fs.mkdirSync('public/data', { recursive: true });
    }

    // Write stats
    fs.writeFileSync('public/data/github-stats.json', JSON.stringify(stats, null, 2));

    console.log('✅ GitHub stats updated successfully!');
    console.log(`📊 ${stats.public_repos} repos, ${stats.total_stars} stars, ${stats.followers} followers`);
    console.log(`🔥 Featured repos: ${featuredRepos.map(r => r.name).join(', ')}`);

  } catch (error) {
    console.error('❌ Error updating GitHub stats:', error.message);
    
    // Create fallback stats file
    const fallbackStats = {
      error: error.message,
      last_attempted: new Date().toISOString(),
      note: "GitHub stats will be updated when API is accessible"
    };
    
    fs.writeFileSync('public/data/github-stats.json', JSON.stringify(fallbackStats, null, 2));
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  updateGitHubStats();
}

module.exports = { updateGitHubStats };