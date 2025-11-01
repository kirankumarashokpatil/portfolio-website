#!/usr/bin/env node

const fs = require('fs');

function validatePortfolioData() {
  console.log('🔍 Validating portfolio data...\n');
  
  let hasErrors = false;
  const warnings = [];
  
  // Check required files
  const requiredFiles = [
    'public/data/projects.json',
    'public/data/experience.json', 
    'public/data/skills.json',
    'public/data/education.json',
    'public/data/achievements.json'
  ];
  
  for (const file of requiredFiles) {
    if (!fs.existsSync(file)) {
      console.error(`❌ Missing required file: ${file}`);
      hasErrors = true;
    } else {
      try {
        const data = JSON.parse(fs.readFileSync(file, 'utf8'));
        console.log(`✅ ${file} - Valid JSON`);
        
        // File-specific validations
        if (file.includes('projects.json')) {
          if (!data.projects || !Array.isArray(data.projects)) {
            console.error(`❌ ${file} - Missing or invalid 'projects' array`);
            hasErrors = true;
          } else if (data.projects.length === 0) {
            warnings.push(`⚠️ ${file} - No projects defined`);
          }
        }
        
        if (file.includes('experience.json')) {
          if (!data.experience || !Array.isArray(data.experience)) {
            console.error(`❌ ${file} - Missing or invalid 'experience' array`);
            hasErrors = true;
          }
        }
        
        if (file.includes('skills.json')) {
          if (!data.skillCategories || !Array.isArray(data.skillCategories)) {
            console.error(`❌ ${file} - Missing or invalid 'skillCategories' array`);
            hasErrors = true;
          }
        }
        
      } catch (error) {
        console.error(`❌ ${file} - Invalid JSON: ${error.message}`);
        hasErrors = true;
      }
    }
  }
  
  // Check GitHub Actions configuration
  const workflowFile = '.github/workflows/update-stats.yml';
  if (fs.existsSync(workflowFile)) {
    const workflow = fs.readFileSync(workflowFile, 'utf8');
    if (workflow.includes('your-github-username')) {
      warnings.push('⚠️ GitHub Actions - Update GITHUB_USERNAME in workflow files');
    }
    console.log('✅ GitHub Actions workflows found');
  } else {
    warnings.push('⚠️ GitHub Actions workflows not found');
  }
  
  // Check for contact info
  if (fs.existsSync('public/data/contact.json')) {
    try {
      const contact = JSON.parse(fs.readFileSync('public/data/contact.json', 'utf8'));
      if (!contact.social?.github) {
        warnings.push('⚠️ GitHub username not configured in contact.json');
      }
      console.log('✅ Contact information found');
    } catch (error) {
      warnings.push('⚠️ Invalid contact.json file');
    }
  } else {
    warnings.push('⚠️ Contact information not configured (run setup.js)');
  }
  
  // Check package.json dependencies
  if (fs.existsSync('package.json')) {
    try {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const requiredDeps = ['next', 'react', 'react-dom', 'lucide-react', 'framer-motion'];
      const missing = requiredDeps.filter(dep => !pkg.dependencies?.[dep]);
      
      if (missing.length > 0) {
        console.error(`❌ Missing dependencies: ${missing.join(', ')}`);
        hasErrors = true;
      } else {
        console.log('✅ All required dependencies found');
      }
    } catch (error) {
      console.error('❌ Invalid package.json');
      hasErrors = true;
    }
  }
  
  // Display warnings
  if (warnings.length > 0) {
    console.log('\n⚠️ Warnings:');
    warnings.forEach(warning => console.log(warning));
  }
  
  // Summary
  console.log('\n📋 Validation Summary:');
  if (hasErrors) {
    console.log('❌ Validation failed - fix errors before deploying');
    process.exit(1);
  } else if (warnings.length > 0) {
    console.log('⚠️ Validation passed with warnings - review recommendations');
  } else {
    console.log('✅ All validations passed - ready for deployment!');
  }
  
  // Quick setup recommendations
  console.log('\n🚀 Quick Start:');
  console.log('1. npm install');
  console.log('2. npm run dev');
  console.log('3. Edit JSON files in public/data/');
  console.log('4. Set up GitHub repository');
  console.log('5. Configure Vercel deployment');
}

// Run if called directly
if (require.main === module) {
  validatePortfolioData();
}

module.exports = { validatePortfolioData };