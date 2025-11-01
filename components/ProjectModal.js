import { motion } from 'framer-motion';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{project.title}</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-sm text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Impact Metrics */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {Object.entries(project.impact).map(([key, value], idx) => (
              <motion.div
                key={key}
                className="bg-slate-800/50 rounded-xl p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-2xl font-bold text-cyan-400 mb-1">{value}</div>
                <div className="text-sm text-gray-400 capitalize">{key.replace('_', ' ')}</div>
              </motion.div>
            ))}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Overview</h3>
            <p className="text-gray-300 leading-relaxed">{project.description}</p>
          </div>

          {/* Details */}
          {project.details && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Case Study</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-slate-800/30 rounded-xl p-4">
                    <h4 className="font-semibold text-red-400 mb-2">Problem</h4>
                    <p className="text-gray-300 text-sm">{project.details.problem}</p>
                  </div>
                  <div className="bg-slate-800/30 rounded-xl p-4">
                    <h4 className="font-semibold text-yellow-400 mb-2">Solution</h4>
                    <p className="text-gray-300 text-sm">{project.details.solution}</p>
                  </div>
                  <div className="bg-slate-800/30 rounded-xl p-4">
                    <h4 className="font-semibold text-green-400 mb-2">Results</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {project.details.results.map((result, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="font-semibold text-white mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.details.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-sm text-purple-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-700 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-white"
          >
            Close
          </button>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors text-white"
            >
              View Code
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;