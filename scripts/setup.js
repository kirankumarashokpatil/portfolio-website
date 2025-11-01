#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function setupPortfolio() {
  console.log('🚀 Portfolio Setup Wizard\n');
  
  try {
    // Get user information
    const name = await question('Your full name: ');
    const title = await question('Your professional title (e.g., Lead AI Engineer): ');
    const email = await question('Your email address: ');
    const linkedin = await question('Your LinkedIn URL: ');
    const githubUsername = await question('Your GitHub username: ');
    const location = await question('Your location (e.g., London, UK): ');
    const phone = await question('Your phone number (optional): ');
    
    console.log('\n📝 Updating configuration files...\n');
    
    // Update GitHub Actions workflow
    const workflowPath = '.github/workflows/update-stats.yml';
    if (fs.existsSync(workflowPath)) {
      let workflow = fs.readFileSync(workflowPath, 'utf8');
      workflow = workflow.replace('your-github-username', githubUsername);
      fs.writeFileSync(workflowPath, workflow);
      console.log('✅ Updated GitHub Actions workflow');
    }
    
    // Update personal info in achievements.json
    const achievementsPath = 'public/data/achievements.json';
    if (fs.existsSync(achievementsPath)) {
      const achievements = JSON.parse(fs.readFileSync(achievementsPath, 'utf8'));
      // Update stats with GitHub username for future API calls
      achievements.github_username = githubUsername;
      fs.writeFileSync(achievementsPath, JSON.stringify(achievements, null, 2));
      console.log('✅ Updated achievements configuration');
    }
    
    // Create a basic github-stats.json file
    const githubStatsPath = 'public/data/github-stats.json';
    const basicGitHubStats = {
      followers: 0,
      following: 0,
      public_repos: 0,
      total_stars: 0,
      last_updated: new Date().toISOString(),
      featured_repos: [],
      note: "This will be auto-updated by GitHub Actions"
    };
    fs.writeFileSync(githubStatsPath, JSON.stringify(basicGitHubStats, null, 2));
    console.log('✅ Created initial GitHub stats file');
    
    // Create environment example
    const envExample = `# Portfolio Configuration
# Copy this to .env.local for local development

# GitHub (for stats fetching)
GITHUB_USERNAME=${githubUsername}
GITHUB_TOKEN=your_github_personal_access_token

# Vercel (for deployment)
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id

# Analytics (optional)
GOOGLE_ANALYTICS_ID=your_ga_id
VERCEL_ANALYTICS=true

# Blog RSS (optional)
MEDIUM_USERNAME=your_medium_username
DEVTO_USERNAME=your_devto_username
`;
    
    fs.writeFileSync('.env.example', envExample);
    console.log('✅ Created environment configuration example');
    
    // Create personal contact info file
    const contactInfo = {
      personal: {
        name,
        title,
        email,
        linkedin,
        github: `https://github.com/${githubUsername}`,
        location,
        phone: phone || null
      },
      social: {
        linkedin,
        github: githubUsername,
        email,
        twitter: null, // User can add later
        medium: null,  // User can add later
        devto: null    // User can add later
      },
      config: {
        show_phone: !!phone,
        show_location: true,
        enable_contact_form: false, // Can be enabled later
        analytics_enabled: false
      }
    };
    
    fs.writeFileSync('public/data/contact.json', JSON.stringify(contactInfo, null, 2));
    console.log('✅ Created contact information file');
    
    // Create initial blog posts file
    const blogPosts = {
      posts: [],
      last_updated: new Date().toISOString(),
      total_posts: 0,
      rss_feeds: []
    };
    fs.writeFileSync('public/data/blog-posts.json', JSON.stringify(blogPosts, null, 2));
    console.log('✅ Created blog posts file');
    
    console.log('\n🎉 Setup Complete!\n');
    console.log('Next steps:');
    console.log('1. Edit the JSON files in public/data/ to customize your content');
    console.log('2. Run: npm install');
    console.log('3. Run: npm run dev');
    console.log('4. Create a GitHub repository and push your code');
    console.log('5. Set up Vercel deployment and configure the secrets\n');
    
    console.log('📁 Files you should customize:');
    console.log('- public/data/projects.json (your projects)');
    console.log('- public/data/experience.json (your work history)');
    console.log('- public/data/skills.json (your technical skills)');
    console.log('- public/data/education.json (your education background)\n');
    
    console.log('🔧 For deployment:');
    console.log('- Copy .env.example to .env.local and fill in your tokens');
    console.log('- Update GITHUB_USERNAME in .github/workflows/update-stats.yml');
    console.log('- Set up GitHub repository secrets for Vercel deployment\n');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
}

// Run the setup if this script is executed directly
if (require.main === module) {
  setupPortfolio();
}

module.exports = { setupPortfolio };