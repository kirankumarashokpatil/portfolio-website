import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Linkedin, Github, ChevronDown, Battery, Zap, BarChart3, Code, Award, Briefcase } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactForm from '../components/ContactForm';
import MediumIntegration from '../components/MediumIntegration';
import GitHubStats from '../components/GitHubStats';
import TechnologyStack from '../components/TechnologyStack';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [projects, setProjects] = useState([]);

  // Load projects data with error handling
  useEffect(() => {
    fetch('/data/projects.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Ensure data.projects exists and is an array
        if (data && Array.isArray(data.projects)) {
          setProjects(data.projects);
        } else {
          console.warn('Projects data is not in expected format:', data);
          setProjects([]); // Set empty array as fallback
        }
      })
      .catch(error => {
        console.error('Error loading projects:', error);
        setProjects([]); // Set empty array as fallback
      });
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
              {['Home', 'About', 'Experience', 'Projects', 'Technologies', 'Articles', 'Testimonials', 'Contact'].map((item) => (
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
            {['Home', 'About', 'Experience', 'Projects', 'Technologies', 'Articles', 'Testimonials', 'Contact'].map((item) => (
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
                             radial-gradient(circle at 75% 75%, #06b6d4 0%, transparent 50%),
                             radial-gradient(circle at 50% 50%, #8b5cf6 0%, transparent 50%)`,
            backgroundSize: '100px 100px, 150px 150px, 200px 200px',
            animation: 'float 20s ease-in-out infinite'
          }}></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Main Content */}
        <div className="relative min-h-screen flex items-center justify-center px-4 pt-16">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Side - Professional Introduction */}
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-3 px-4 py-2 bg-blue-600/20 backdrop-blur-sm rounded-full border border-blue-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-blue-300 font-medium">Available for opportunities</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-white">Hi, I'm </span>
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Kiran
                  </span>
                </h1>
                
                <h2 className="text-xl md:text-2xl text-blue-300 font-medium">
                  Quantitative Analyst & AI Specialist
                </h2>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Transforming complex energy markets through <span className="text-cyan-400 font-semibold">BESS optimization</span>, 
                <span className="text-blue-400 font-semibold"> AI-driven forecasting</span>, and 
                <span className="text-purple-400 font-semibold"> automated trading systems</span>. 
                Bridging the gap between advanced mathematics and production-ready solutions.
              </p>

              {/* Key Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-slate-800/40 backdrop-blur-sm p-4 rounded-xl border border-blue-500/20">
                  <Battery className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">BESS</div>
                  <div className="text-sm text-gray-400">Optimization Expert</div>
                </div>
                <div className="bg-slate-800/40 backdrop-blur-sm p-4 rounded-xl border border-cyan-500/20">
                  <BarChart3 className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">MILP</div>
                  <div className="text-sm text-gray-400">Modeling Specialist</div>
                </div>
                <div className="bg-slate-800/40 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20">
                  <Zap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">AI/ML</div>
                  <div className="text-sm text-gray-400">Systems Developer</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="mailto:kirankumarashokpatil@gmail.com" 
                  className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 font-medium shadow-lg"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Let's Connect
                </a>
                <a 
                  href="https://linkedin.com/in/kirankumarashokpatil" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-blue-500/50 hover:border-blue-400 text-blue-300 hover:text-blue-200 rounded-lg transition-all duration-300 backdrop-blur-sm hover:bg-blue-600/10 font-medium"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  View LinkedIn
                </a>
              </div>
            </div>

            {/* Right Side - Visual Elements */}
            <div className="relative">
              {/* Professional Avatar Area */}
              <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
                {/* Animated Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-spin-slow"></div>
                <div className="absolute inset-4 rounded-full border-2 border-cyan-400/20 animate-spin-reverse"></div>
                <div className="absolute inset-8 rounded-full border border-purple-400/20 animate-pulse"></div>
                
                {/* Profile Picture Placeholder */}
                <div className="absolute inset-12 rounded-full bg-gradient-to-br from-slate-800 to-slate-700 border border-blue-500/30 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold text-2xl">
                        KP
                      </div>
                      <div className="text-white font-medium">Professional Photo</div>
                      <div className="text-gray-400 text-sm">Coming Soon</div>
                    </div>
                  </div>
                </div>

                {/* Floating Tech Icons */}
                <div className="absolute -top-4 -right-4 p-3 bg-blue-600/20 backdrop-blur-sm rounded-xl border border-blue-500/30 animate-float">
                  <Code className="w-6 h-6 text-blue-400" />
                </div>
                <div className="absolute top-1/2 -left-6 p-3 bg-cyan-600/20 backdrop-blur-sm rounded-xl border border-cyan-500/30 animate-float-delay">
                  <BarChart3 className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="absolute -bottom-4 right-8 p-3 bg-purple-600/20 backdrop-blur-sm rounded-xl border border-purple-500/30 animate-float-delay-2">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => scrollToSection('about')}
              className="flex flex-col items-center space-y-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span className="text-sm font-medium">Explore More</span>
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
          @keyframes float-delay {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          @keyframes float-delay-2 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-25px); }
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes spin-reverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-float-delay {
            animation: float-delay 4s ease-in-out infinite 1s;
          }
          .animate-float-delay-2 {
            animation: float-delay-2 5s ease-in-out infinite 2s;
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
          .animate-spin-reverse {
            animation: spin-reverse 15s linear infinite;
          }
        `}</style>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">About Me</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-blue-500/20">
                <h3 className="text-2xl font-bold mb-4 text-blue-400">Profile</h3>
                <p className="text-gray-300 leading-relaxed">
                  Production-focused Quantitative Analyst specializing in Battery Energy Storage Systems (BESS). 
                  Experienced in building MILP optimizers, probabilistic market forecasts, and automated trading 
                  solutions for UK energy markets. Strong track record integrating telemetry and physical battery 
                  models with market-facing bidding strategies.
                </p>
              </div>
              
              {/* GitHub Stats */}
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20">
                <h3 className="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">
                  <Github className="w-6 h-6" />
                  GitHub Activity
                </h3>
                <GitHubStats />
              </div>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-blue-500/20">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Core Expertise</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <Zap className="w-5 h-5 text-cyan-400 mr-2 mt-1 flex-shrink-0" />
                  <span>Day-ahead & intraday trading (EPEX M7)</span>
                </li>
                <li className="flex items-start">
                  <BarChart3 className="w-5 h-5 text-cyan-400 mr-2 mt-1 flex-shrink-0" />
                  <span>MILP & stochastic optimization</span>
                </li>
                <li className="flex items-start">
                  <Battery className="w-5 h-5 text-cyan-400 mr-2 mt-1 flex-shrink-0" />
                  <span>SoC/SoH & degradation modeling</span>
                </li>
                <li className="flex items-start">
                  <Code className="w-5 h-5 text-cyan-400 mr-2 mt-1 flex-shrink-0" />
                  <span>Production-grade Python development</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Professional Experience</span>
          </h2>
          <div className="space-y-8">
            {/* Natpower UK */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-blue-500/20 hover:border-blue-400/40 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-blue-400">Software Development Engineer</h3>
                  <p className="text-xl text-gray-300">Natpower UK, London</p>
                </div>
                <span className="text-cyan-400 font-semibold">July 2024 - Present</span>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">▸</span>
                  <span>Developed MILP-based BESS optimization engine for multi-GW portfolio, integrating price & availability forecasts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">▸</span>
                  <span>Designed automated bidding strategies for day-ahead auctions and EPEX M7 intraday markets with NIV-chasing logic</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">▸</span>
                  <span>Built probabilistic forecasting pipelines improving realized revenue by 10% vs deterministic baselines</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">▸</span>
                  <span>Led vendor evaluation and onboarding for third-party optimizers and data providers</span>
                </li>
              </ul>
            </div>

            {/* Adani */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-blue-500/20 hover:border-blue-400/40 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-blue-400">Senior Executive</h3>
                  <p className="text-xl text-gray-300">Adani Electricity Mumbai Limited, India</p>
                </div>
                <span className="text-cyan-400 font-semibold">Dec 2020 - Jul 2022</span>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">▸</span>
                  <span>Coordinated technical planning and system integration using SAP</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">▸</span>
                  <span>Achieved 15% increase in operational efficiency and 20% reduction in downtime</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Key Projects</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects && projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div className="col-span-2 text-center text-gray-400">
                <p>Loading projects...</p>
              </div>
            )}
          </div>
          
          {/* GitHub Integration Note */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">
              🔄 This portfolio automatically syncs with GitHub repositories
            </p>
            <a
              href="https://github.com/kirankumarashokpatil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg hover:from-gray-600 hover:to-gray-500 transition-all duration-300"
            >
              <Github className="w-5 h-5" />
              View All Projects on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section id="technologies">
        <TechnologyStack />
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Education</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20">
              <Award className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-xl font-bold mb-2">MSc Applied Artificial Intelligence</h3>
              <p className="text-gray-300">Cranfield University, UK</p>
              <p className="text-cyan-400 text-sm">Sept 2023 - Sept 2024</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20">
              <Award className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="text-xl font-bold mb-2">B.Tech Electrical Engineering</h3>
              <p className="text-gray-300">Walchand College Of Engineering, India</p>
              <p className="text-cyan-400 text-sm">June 2016 - October 2020</p>
            </div>
          </div>
        </div>
      </section>

      {/* Medium Articles Section */}
      <section id="articles">
        <MediumIntegration />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials">
        <TestimonialsSection />
      </section>

      {/* Contact Section */}
      <ContactForm />

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-blue-500/20 bg-slate-900">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>© 2025 Kirankumar Ashok Patil. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
