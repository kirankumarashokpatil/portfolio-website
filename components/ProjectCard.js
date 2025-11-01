import { useState } from 'react';
import { Play, Github, ExternalLink, Video, X } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleVideoClick = () => {
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
    setIsVideoLoaded(false);
  };

  return (
    <>
      <div className="bg-gradient-to-br from-blue-900/50 to-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group">
        {/* Project Header */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <div className="flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
                title="View on GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
                title="Live Demo"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
            {project.demoVideo && (
              <button
                onClick={handleVideoClick}
                className="p-2 bg-blue-600/30 rounded-lg hover:bg-blue-600/50 transition-colors"
                title="Watch Demo"
              >
                <Video className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-6">
          {project.description}
        </p>

        {/* Impact Metrics */}
        {project.impact && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            {Object.entries(project.impact).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-lg font-bold text-blue-400">{value}</div>
                <div className="text-xs text-gray-400 capitalize">{key}</div>
              </div>
            ))}
          </div>
        )}

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-600/30 rounded-full text-sm hover:bg-blue-600/50 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Demo Video Button */}
        {project.demoVideo && (
          <button
            onClick={handleVideoClick}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105"
          >
            <Play className="w-5 h-5" />
            Watch Demo
          </button>
        )}
      </div>

      {/* Video Modal */}
      {showVideo && project.demoVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={handleCloseVideo}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <video
                src={project.demoVideo}
                controls
                autoPlay
                className="w-full h-auto"
                onLoadedData={() => setIsVideoLoaded(true)}
              >
                Your browser does not support the video tag.
              </video>
              {!isVideoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;