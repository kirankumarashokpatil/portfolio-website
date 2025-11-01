import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Linkedin, Github, ChevronDown, Battery, Zap, BarChart3, Code, Award, Briefcase } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [projects, setProjects] = useState([]);

  // Load projects data
  useEffect(() => {
    fetch('/data/projects.json')
      .then(response => response.json())
      .then(data => setProjects(data.projects))
      .catch(error => console.error('Error loading projects:', error));
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
              {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
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
            {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
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
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-4xl text-center">
          <div className="mb-6 animate-pulse">
            <Battery className="w-20 h-20 mx-auto text-blue-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
            Kirankumar Ashok Patil
          </h1>
          <p className="text-xl md:text-2xl text-blue-300 mb-4">
            Quantitative Analyst | BESS Optimization Specialist
          </p>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Production-focused expert in Battery Energy Storage Systems, MILP optimization, 
            and automated trading solutions for UK energy markets
          </p>
          <div className="flex justify-center space-x-4 mb-8">
            <a href="mailto:kirankumarashokpatil@gmail.com" className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors">
              <Mail className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/in/kirankumarashokpatil" target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
          <button
            onClick={() => scrollToSection('about')}
            className="animate-bounce"
          >
            <ChevronDown className="w-8 h-8 text-blue-400" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">About Me</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-blue-500/20">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Profile</h3>
              <p className="text-gray-300 leading-relaxed">
                Production-focused Quantitative Analyst specializing in Battery Energy Storage Systems (BESS). 
                Experienced in building MILP optimizers, probabilistic market forecasts, and automated trading 
                solutions for UK energy markets. Strong track record integrating telemetry and physical battery 
                models with market-facing bidding strategies.
              </p>
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
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
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

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Technical Skills</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Languages & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Julia', 'MATLAB', 'SQL', 'Git', 'Docker'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-blue-600/20 rounded-lg text-sm">{skill}</span>
                ))}
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20">
              <h3 className="text-xl font-bold mb-4 text-cyan-400">Optimization & ML</h3>
              <div className="flex flex-wrap gap-2">
                {['Gurobi', 'CPLEX', 'Pyomo', 'PyTorch', 'TensorFlow', 'scikit-learn'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-cyan-600/20 rounded-lg text-sm">{skill}</span>
                ))}
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20">
              <h3 className="text-xl font-bold mb-4 text-purple-400">Data & Visualization</h3>
              <div className="flex flex-wrap gap-2">
                {['Tableau', 'Power BI', 'pandas', 'NumPy', 'Excel'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-purple-600/20 rounded-lg text-sm">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
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

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Get In Touch</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Interested in BESS optimization, energy trading, or collaboration opportunities?
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="mailto:kirankumarashokpatil@gmail.com"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Email Me
            </a>
            <a
              href="https://linkedin.com/in/kirankumarashokpatil"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold transition-all flex items-center gap-2 border border-blue-500/20"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
          </div>
          <p className="mt-8 text-gray-400">
            📍 London, UK • +44 07393 103415
          </p>
        </div>
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
