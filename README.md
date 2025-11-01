# 🚀 Advanced Interactive Portfolio

A production-ready, fully automated portfolio built with Next.js, featuring dynamic content management, interactive animations, and continuous deployment.

## ✨ Key Features

### 🎨 Interactive & Animated
- **Particle Background**: Dynamic particle system with mouse interaction
- **Terminal Hero**: Realistic terminal typing animation
- **Framer Motion**: Smooth page transitions and micro-interactions
- **Project Modals**: Detailed case studies with animated reveals
- **Responsive Design**: Mobile-first approach with adaptive layouts

### 🤖 Automated Content Management
- **JSON-driven Content**: Edit portfolio by updating JSON files
- **GitHub Actions**: Auto-deploy and daily stats updates
- **Dynamic Loading**: SWR-powered data fetching with caching
- **Blog Integration**: Auto-sync from RSS feeds (Medium, Dev.to)
- **GitHub Stats**: Real-time repository and contribution data

### ⚡ Performance & SEO
- **Next.js Optimized**: Static generation with dynamic features
- **Lazy Loading**: Components load on demand
- **Image Optimization**: Automatic WebP conversion and sizing
- **Lighthouse Optimized**: 90+ performance scores
- **PWA Ready**: Service worker and offline support

## 🏗️ Project Structure

```
my-portfolio/
├── .github/workflows/     # GitHub Actions for automation
│   ├── deploy.yml         # Auto-deploy to Vercel
│   ├── update-stats.yml   # Daily GitHub stats update
│   ├── update-blog.yml    # Blog posts sync
│   └── ci-cd.yml         # CI/CD pipeline
├── components/           # Reusable React components
│   ├── ParticleBackground.js
│   ├── TerminalHero.js
│   ├── ProjectModal.js
│   └── usePortfolioData.js
├── pages/               # Next.js pages
│   ├── _app.js         # App wrapper
│   └── index.js        # Main portfolio page
├── public/data/         # Dynamic content (JSON)
│   ├── projects.json    # Portfolio projects
│   ├── experience.json  # Work experience
│   ├── skills.json     # Technical skills
│   ├── education.json  # Education & certifications
│   ├── achievements.json # Stats & achievements
│   ├── github-stats.json # Auto-updated GitHub data
│   └── blog-posts.json  # Auto-synced blog posts
├── styles/
│   └── globals.css     # Global styles with Tailwind
└── package.json        # Dependencies and scripts
```

## 🚀 Quick Start

### 1. Install Dependencies

```powershell
cd "C:\Users\kiran\OneDrive\Documents\Learning\Portfolio Website\my-portfolio"
npm install
```

### 2. Run Development Server

```powershell
npm run dev
# Open http://localhost:3000
```

### 3. Customize Content

Edit the JSON files in `public/data/` to update your portfolio:

- **Projects**: `public/data/projects.json`
- **Experience**: `public/data/experience.json` 
- **Skills**: `public/data/skills.json`
- **Education**: `public/data/education.json`

## 🤖 Automation Setup

### GitHub Actions (Continuous Deployment)

1. **Create GitHub Repository**
   ```powershell
   git init
   git add .
   git commit -m "Initial portfolio setup"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Set up Vercel Integration**
   - Create account on [Vercel](https://vercel.com)
   - Connect GitHub repository
   - Get these secrets from Vercel dashboard:
     - `VERCEL_TOKEN`
     - `VERCEL_ORG_ID` 
     - `VERCEL_PROJECT_ID`

3. **Configure GitHub Secrets**
   Go to GitHub repo → Settings → Secrets and variables → Actions:
   ```
   VERCEL_TOKEN=your_vercel_token
   VERCEL_ORG_ID=your_org_id
   VERCEL_PROJECT_ID=your_project_id
   GITHUB_TOKEN=automatic (no setup needed)
   ```

4. **Update GitHub Username**
   Edit `.github/workflows/update-stats.yml`:
   ```yaml
   env:
     GITHUB_USERNAME: 'your-actual-username'  # Replace this
   ```

### Auto-Updates

- **📊 GitHub Stats**: Updates daily at 6 AM UTC
- **📝 Blog Posts**: Updates daily at noon UTC  
- **🚀 Deployment**: Automatic on every push to main
- **🔍 Security**: Daily dependency audits

## 📊 Advanced Features

### Dynamic Content Loading

```javascript
import { usePortfolioData } from '../components/usePortfolioData';

const MyComponent = () => {
  const { projects, skills, isLoading, hasError } = usePortfolioData();
  
  if (isLoading) return <div>Loading...</div>;
  if (hasError) return <div>Error loading data</div>;
  
  return (
    <div>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
```

### GitHub Stats Integration

The portfolio automatically fetches and displays:
- Total repositories and stars
- Recent activity
- Language statistics
- Contribution graph

### Blog Integration

To enable blog auto-sync, edit `.github/workflows/update-blog.yml`:

```javascript
const feeds = [
  { name: 'Medium', url: 'https://medium.com/feed/@yourusername' },
  { name: 'Dev.to', url: 'https://dev.to/feed/yourusername' }
];
```

## 🎨 Customization Guide

### Color Scheme

Main colors defined in Tailwind classes:
- **Primary**: `blue-400` to `blue-600`
- **Secondary**: `cyan-400` to `cyan-600`  
- **Accent**: `purple-400` to `purple-600`
- **Background**: `slate-950`, `slate-900`

### Animations

All animations use Framer Motion:
```javascript
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
```

### Particle System

Customize in `components/ParticleBackground.js`:
- Particle count
- Colors and opacity
- Movement speed
- Connection distance

## 📱 Mobile Optimization

- Responsive grid layouts
- Touch-friendly interactions
- Optimized particle count for mobile
- Compressed images and lazy loading

## 🔧 Troubleshooting

### Common Issues

**Build Errors**:
```powershell
# Clear Next.js cache
rm -rf .next
npm run build
```

**Styling Issues**:
```powershell
# Rebuild Tailwind CSS
npx tailwindcss build -i ./styles/globals.css -o ./styles/output.css
```

**GitHub Actions Failing**:
- Check GitHub secrets are set correctly
- Verify `GITHUB_USERNAME` in workflow files
- Check Vercel token permissions

### Performance Tips

1. **Image Optimization**: Use Next.js `<Image>` component
2. **Code Splitting**: Dynamic imports for heavy components
3. **Lazy Loading**: Intersection Observer for animations
4. **Caching**: SWR handles data caching automatically

## 🌐 Deployment Options

### Vercel (Recommended)
- Automatic deployments from GitHub
- Edge network for fast loading
- Built-in analytics and monitoring

### Netlify
- Change workflow in `.github/workflows/deploy.yml`
- Similar features to Vercel

### GitHub Pages
- Free hosting for public repositories
- Requires workflow modification

## 📈 Analytics & Monitoring

### Built-in Metrics
- Page load times
- User interactions
- Component performance
- Error tracking

### Optional Integrations
- Google Analytics
- Hotjar for user behavior
- Sentry for error monitoring

## 🔐 Security Features

- Dependency vulnerability scanning
- No sensitive data in repository
- CORS protection
- Input sanitization

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [GitHub Actions](https://docs.github.com/en/actions)

## 📄 License

MIT License - feel free to use this portfolio template for your own projects!

---

## 🚀 Quick Deploy Checklist

- [ ] Replace placeholder content in JSON files
- [ ] Update GitHub username in workflows
- [ ] Set up Vercel and configure secrets
- [ ] Push to GitHub (auto-deploys)
- [ ] Add custom domain (optional)
- [ ] Enable blog RSS feeds (optional)

**Ready to impress?** Your portfolio will auto-update, look professional, and showcase your technical skills! 🎉
