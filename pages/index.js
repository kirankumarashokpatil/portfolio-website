import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Menu, X, Mail, Linkedin, Github, ChevronDown, Battery, Zap, BarChart3, Code, Award, Briefcase } from 'lucide-react';
import ClientOnly from '../components/ClientOnly';

// Dynamic imports to prevent SSR issues
const ProjectCard = dynamic(() => import('../components/ProjectCard'), { ssr: false });
const TestimonialsSection = dynamic(() => import('../components/TestimonialsSection'), { ssr: false });
const ContactForm = dynamic(() => import('../components/ContactForm'), { ssr: false });
const MediumIntegration = dynamic(() => import('../components/MediumIntegration'), { ssr: false });
const GitHubStats = dynamic(() => import('../components/GitHubStats'), { ssr: false });
const TechnologyStack = dynamic(() => import('../components/TechnologyStack'), { ssr: false });

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [projects, setProjects] = useState([]);

  // Load projects data with error handling
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch('/data/projects.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Ensure data.projects exists and is an array
        if (data && Array.isArray(data.projects)) {
          setProjects(data.projects);
        } else {
          console.warn('Projects data is not in expected format:', data);
          setProjects([]); // Set empty array as fallback
        }
      } catch (error) {
        console.error('Error loading projects:', error);
        setProjects([]); // Set empty array as fallback
      }
    };

    loadProjects();
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-slate-900/95 backdrop-blur-sm z-50 border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              KP
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Projects', 'Articles', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`hover:text-blue-400 transition-colors ${
                    activeSection === item.toLowerCase() ? 'text-blue-400' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-blue-500/20">
            {['Home', 'About', 'Projects', 'Articles', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left px-4 py-3 hover:bg-slate-700"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, #06b6d4 0%, transparent 50%)`,
            backgroundSize: '100px 100px, 150px 150px',
            animation: 'float 20s ease-in-out infinite'
          }}></div>
        </div>

        {/* Main Content */}
        <div className="relative min-h-screen flex items-center justify-center px-4 pt-16">
          <div className="max-w-6xl mx-auto text-center">
            
            {/* Professional Introduction */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-3 px-4 py-2 bg-blue-600/20 backdrop-blur-sm rounded-full border border-blue-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-blue-300 font-medium">Available for opportunities</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-white">Hi, I'm </span>
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Kirankumar Patil
                </span>
              </h1>
              
              <h2 className="text-xl md:text-2xl text-blue-300 font-medium">
                Quantitative Analyst & AI Specialist
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Transforming energy markets through <span className="text-cyan-400 font-semibold">BESS optimization</span>, 
                <span className="text-blue-400 font-semibold"> AI-driven forecasting</span>, and 
                <span className="text-purple-400 font-semibold"> automated trading systems</span>
              </p>

              {/* Key Highlights - Compact Grid */}
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-8">
                <div className="bg-slate-800/40 backdrop-blur-sm p-4 rounded-xl border border-blue-500/20">
                  <Battery className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">BESS</div>
                  <div className="text-xs text-gray-400">Optimization</div>
                </div>
                <div className="bg-slate-800/40 backdrop-blur-sm p-4 rounded-xl border border-cyan-500/20">
                  <BarChart3 className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">MILP</div>
                  <div className="text-xs text-gray-400">Modeling</div>
                </div>
                <div className="bg-slate-800/40 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20">
                  <Zap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">AI/ML</div>
                  <div className="text-xs text-gray-400">Systems</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <a 
                  href="mailto:kirankumarashokpatil@gmail.com" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 font-medium"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Let's Connect
                </a>
                <a 
                  href="https://linkedin.com/in/kirankumarashokpatil" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-500/50 hover:border-blue-400 text-blue-300 hover:text-blue-200 rounded-lg transition-all duration-300 backdrop-blur-sm hover:bg-blue-600/10 font-medium"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/kirankumarashokpatil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-500/50 hover:border-gray-400 text-gray-300 hover:text-gray-200 rounded-lg transition-all duration-300 backdrop-blur-sm hover:bg-gray-600/10 font-medium"
                >
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => scrollToSection('about')}
              className="flex flex-col items-center space-y-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span className="text-sm font-medium">Explore</span>
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </button>
          </div>
        </div>

        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `}</style>
      </section>

      {/* About & Experience Section - Combined */}
      <section id="about" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">About & Experience</span>
          </h2>
          
          {/* About Overview */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-blue-500/20 mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-blue-400">Profile</h3>
                <p className="text-gray-300 leading-relaxed">
                  Production-focused Quantitative Analyst specializing in Battery Energy Storage Systems (BESS). 
                  Experienced in building MILP optimizers, probabilistic market forecasts, and automated trading 
                  solutions for UK energy markets.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-blue-400">Core Expertise</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                  <span className="flex items-center"><Zap className="w-4 h-4 text-cyan-400 mr-2" />Trading (EPEX M7)</span>
                  <span className="flex items-center"><BarChart3 className="w-4 h-4 text-cyan-400 mr-2" />MILP Optimization</span>
                  <span className="flex items-center"><Battery className="w-4 h-4 text-cyan-400 mr-2" />SoC/SoH Modeling</span>
                  <span className="flex items-center"><Code className="w-4 h-4 text-cyan-400 mr-2" />Python Development</span>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Experience - Compact */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center text-blue-400 mb-8">Professional Experience</h3>
            
            {/* Current Role */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h4 className="text-lg font-bold text-blue-400">Software Development Engineer</h4>
                  <p className="text-gray-300">Natpower UK, London</p>
                </div>
                <span className="text-cyan-400 font-semibold text-sm">July 2024 - Present</span>
              </div>
              <div className="text-sm text-gray-300 space-y-1">
                <p>• Developed MILP-based BESS optimization engine for multi-GW portfolio</p>
                <p>• Built automated bidding strategies for day-ahead auctions and EPEX M7 markets</p>
                <p>• Improved realized revenue by 10% through probabilistic forecasting pipelines</p>
              </div>
            </div>

            {/* Previous Role */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h4 className="text-lg font-bold text-blue-400">Senior Executive</h4>
                  <p className="text-gray-300">Adani Electricity Mumbai Limited, India</p>
                </div>
                <span className="text-cyan-400 font-semibold text-sm">Dec 2020 - Jul 2022</span>
              </div>
              <div className="text-sm text-gray-300 space-y-1">
                <p>• Coordinated technical planning and system integration using SAP</p>
                <p>• Achieved 15% increase in operational efficiency and 20% reduction in downtime</p>
              </div>
            </div>

            {/* Education - Inline */}
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <div className="bg-slate-800/30 backdrop-blur-sm p-4 rounded-lg border border-blue-500/10">
                <h4 className="text-sm font-bold text-blue-400 mb-1">MSc Applied AI</h4>
                <p className="text-xs text-gray-300">Cranfield University, UK (2024)</p>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm p-4 rounded-lg border border-cyan-500/10">
                <h4 className="text-sm font-bold text-cyan-400 mb-1">B.Tech Electrical Engineering</h4>
                <p className="text-xs text-gray-300">Walchand College, India (2020)</p>
              </div>
            </div>
          </div>

          {/* GitHub Stats - Compact */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4 text-blue-400 text-center">GitHub Activity</h3>
            <ClientOnly fallback={<div className="animate-pulse h-16 bg-slate-700 rounded"></div>}>
              <GitHubStats />
            </ClientOnly>
          </div>
        </div>
      </section>

      {/* Projects & Technologies Section - Combined */}
      <section id="projects" className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Projects & Technologies</span>
          </h2>
          
          {/* Key Projects */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6 text-center text-blue-400">Featured Projects</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {projects && projects.length > 0 ? (
                projects.slice(0, 4).map((project) => (
                  <ClientOnly key={project.id} fallback={<div className="animate-pulse h-32 bg-slate-700 rounded-xl"></div>}>
                    <ProjectCard project={project} />
                  </ClientOnly>
                ))
              ) : (
                <div className="col-span-2 text-center text-gray-400">
                  <p>Loading projects...</p>
                </div>
              )}
            </div>
            
            {/* GitHub Link */}
            <div className="text-center mt-6">
              <a
                href="https://github.com/kirankumarashokpatil"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg hover:from-gray-600 hover:to-gray-500 transition-all duration-300 text-sm"
              >
                <Github className="w-4 h-4" />
                View All Projects
              </a>
            </div>
          </div>

          {/* Technology Stack - Compact */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-center text-blue-400">Technology Stack</h3>
            <ClientOnly fallback={<div className="animate-pulse h-24 bg-slate-700 rounded"></div>}>
              <TechnologyStack />
            </ClientOnly>
          </div>
        </div>
      </section>

      {/* Articles & Testimonials Section - Combined */}
      <section id="articles" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Articles & Testimonials</span>
          </h2>
          
          {/* Medium Articles */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6 text-center text-blue-400">Latest Articles</h3>
            <ClientOnly fallback={<div className="animate-pulse h-32 bg-slate-700 rounded"></div>}>
              <MediumIntegration />
            </ClientOnly>
          </div>

          {/* Testimonials */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-center text-blue-400">What People Say</h3>
            <ClientOnly fallback={<div className="animate-pulse h-32 bg-slate-700 rounded"></div>}>
              <TestimonialsSection />
            </ClientOnly>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <ClientOnly fallback={<div className="py-20 text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div></div>}>
          <ContactForm />
        </ClientOnly>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-blue-500/20 bg-slate-900">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>© 2025 Kirankumar Ashok Patil. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
