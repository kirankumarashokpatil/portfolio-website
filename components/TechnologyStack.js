import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Database, Cloud, BarChart3, Zap, Settings } from 'lucide-react';

const TechnologyStack = () => {
  const [technologies, setTechnologies] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/data/technologies.json')
      .then(response => response.json())
      .then(data => {
        setTechnologies(data.technologies);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading technologies:', error);
        setIsLoading(false);
      });
  }, []);

  const getCategoryIcon = (categoryName) => {
    const icons = {
      'Programming Languages': <Code2 className="w-6 h-6" />,
      'AI & Machine Learning': <Cpu className="w-6 h-6" />,
      'Data & Analytics': <BarChart3 className="w-6 h-6" />,
      'Optimization & Modeling': <Zap className="w-6 h-6" />,
      'Cloud & Infrastructure': <Cloud className="w-6 h-6" />,
      'Databases': <Database className="w-6 h-6" />,
      'Development Tools': <Settings className="w-6 h-6" />
    };
    return icons[categoryName] || <Code2 className="w-6 h-6" />;
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-300',
      purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-300',
      green: 'from-green-500/20 to-green-600/20 border-green-500/30 text-green-300',
      orange: 'from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-300',
      cyan: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30 text-cyan-300',
      indigo: 'from-indigo-500/20 to-indigo-600/20 border-indigo-500/30 text-indigo-300',
      gray: 'from-gray-500/20 to-gray-600/20 border-gray-500/30 text-gray-300'
    };
    return colors[color] || colors.blue;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (!technologies) {
    return null;
  }

  return (
    <section className="py-20 px-4 bg-slate-900/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-4">
            TECHNOLOGIES
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Powering My Work
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            A comprehensive toolkit spanning AI/ML, optimization, cloud infrastructure, 
            and data engineering - battle-tested in production environments
          </p>
        </motion.div>

        {/* Technology Grid */}
        <div className="space-y-12">
          {technologies.categories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="space-y-6"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className={`p-3 rounded-xl bg-gradient-to-br border ${getColorClasses(category.color)}`}>
                  {getCategoryIcon(category.name)}
                </div>
                <h3 className="text-2xl font-bold text-white">{category.name}</h3>
              </div>

              {/* Technology Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {category.technologies.map((tech, techIndex) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (categoryIndex * 0.1) + (techIndex * 0.05) }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`group relative bg-gradient-to-br border rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${getColorClasses(category.color)}`}
                    onClick={() => setActiveCategory(activeCategory === `${category.name}-${tech.name}` ? null : `${category.name}-${tech.name}`)}
                  >
                    {/* Technology Icon/Emoji */}
                    <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                      {tech.icon}
                    </div>

                    {/* Technology Name */}
                    <h4 className="text-white font-bold text-center text-sm mb-2 group-hover:text-white transition-colors">
                      {tech.name}
                    </h4>

                    {/* Proficiency Bar */}
                    <div className="w-full bg-slate-700/50 rounded-full h-2 mb-2">
                      <motion.div
                        className={`h-2 rounded-full bg-gradient-to-r ${
                          category.color === 'blue' ? 'from-blue-400 to-blue-600' :
                          category.color === 'purple' ? 'from-purple-400 to-purple-600' :
                          category.color === 'green' ? 'from-green-400 to-green-600' :
                          category.color === 'orange' ? 'from-orange-400 to-orange-600' :
                          category.color === 'cyan' ? 'from-cyan-400 to-cyan-600' :
                          category.color === 'indigo' ? 'from-indigo-400 to-indigo-600' :
                          'from-gray-400 to-gray-600'
                        }`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${tech.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: (categoryIndex * 0.1) + (techIndex * 0.05) + 0.5, duration: 1 }}
                      />
                    </div>

                    {/* Proficiency Percentage */}
                    <p className="text-xs text-center text-gray-400">
                      {tech.proficiency}%
                    </p>

                    {/* Hover Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                      {tech.description}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Expanded Description */}
              {activeCategory?.startsWith(category.name) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`mt-4 p-6 rounded-xl bg-gradient-to-br border ${getColorClasses(category.color)}`}
                >
                  {(() => {
                    const activeTech = category.technologies.find(tech => 
                      activeCategory === `${category.name}-${tech.name}`
                    );
                    return activeTech ? (
                      <div className="text-center">
                        <h4 className="text-xl font-bold text-white mb-2">{activeTech.name}</h4>
                        <p className="text-gray-300">{activeTech.description}</p>
                        <div className="mt-4">
                          <span className="text-sm text-gray-400">Proficiency: </span>
                          <span className="text-white font-semibold">{activeTech.proficiency}%</span>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">35+</div>
            <div className="text-gray-400">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">7</div>
            <div className="text-gray-400">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">5+</div>
            <div className="text-gray-400">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400">100%</div>
            <div className="text-gray-400">Production Ready</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologyStack;