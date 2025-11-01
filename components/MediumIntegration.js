import { useState, useEffect } from 'react';
import { ExternalLink, Calendar, Clock, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const MediumIntegration = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Medium profile data (you can update this with your actual Medium profile)
  const mediumProfile = {
    username: 'kirankumarashokpatil',
    name: 'Kirankumar Ashok Patil',
    followers: '1.2K',
    following: '245',
    profileUrl: 'https://medium.com/@kirankumarashokpatil'
  };

  // Sample posts data (replace with actual Medium RSS feed integration)
  const samplePosts = [
    {
      id: 1,
      title: 'Productionizing Retrieval-Augmented Generation (RAG) with Azure OpenAI, Azure Search, and FastAPI',
      excerpt: 'Retrieval-Augmented Generation (RAG) has become one of the most practical patterns for building production-ready AI applications...',
      publishDate: '2024-10-28',
      readTime: '8 min read',
      url: 'https://medium.com/@kirankumarashokpatil/rag-azure-openai',
      tags: ['AI', 'RAG', 'Azure', 'OpenAI', 'FastAPI'],
      claps: 234,
      featured: true
    },
    {
      id: 2,
      title: 'How to Build and Integrate MCP Servers for a Versatile Chat Agent',
      excerpt: 'Imagine chatting with a single assistant that seamlessly checks IP reputations, provides weather forecasts, and queries databases...',
      publishDate: '2024-10-25',
      readTime: '6 min read',
      url: 'https://medium.com/@kirankumarashokpatil/mcp-servers-chat-agent',
      tags: ['MCP', 'AI Agents', 'Chat', 'Integration'],
      claps: 189,
      featured: false
    },
    {
      id: 3,
      title: 'Advanced BESS Optimization Strategies for Energy Trading',
      excerpt: 'Deep dive into mixed-integer linear programming approaches for optimizing battery energy storage systems in dynamic markets...',
      publishDate: '2024-10-20',
      readTime: '12 min read',
      url: 'https://medium.com/@kirankumarashokpatil/bess-optimization',
      tags: ['Energy', 'Optimization', 'MILP', 'Trading'],
      claps: 156,
      featured: false
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch Medium posts
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        
        // In a real implementation, you would fetch from Medium RSS feed or API
        // For now, using sample data
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        
        setPosts(samplePosts);
        setError(null);
      } catch (err) {
        console.error('Error fetching Medium posts:', err);
        setError('Failed to load blog posts');
        setPosts(samplePosts); // Fallback to sample data
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <section className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading latest articles...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Latest Articles
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Insights on AI, energy optimization, and cutting-edge technology
          </p>
        </motion.div>

        {/* Medium Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm p-6 rounded-xl border border-green-500/30 mb-12"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">KP</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">{mediumProfile.name}</h3>
                <p className="text-gray-300">@{mediumProfile.username}</p>
                <div className="flex space-x-4 text-sm text-gray-400 mt-1">
                  <span>{mediumProfile.followers} followers</span>
                  <span>{mediumProfile.following} following</span>
                </div>
              </div>
            </div>
            <a
              href={mediumProfile.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-white font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              Follow on Medium
            </a>
          </div>
        </motion.div>

        {/* Featured Article */}
        {posts.find(post => post.featured) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-yellow-400" />
              Featured Article
            </h3>
            {(() => {
              const featuredPost = posts.find(post => post.featured);
              return featuredPost ? (
                <div className="bg-gradient-to-br from-slate-800/50 to-blue-900/20 backdrop-blur-sm p-8 rounded-2xl border border-yellow-500/30">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(featuredPost.tags || []).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-yellow-300 text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">{featuredPost.title}</h4>
                  <p className="text-gray-300 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(featuredPost.publishDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </span>
                      <span>{featuredPost.claps} claps</span>
                    </div>
                    <a
                      href={featuredPost.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 rounded-lg transition-all duration-300 text-white font-medium transform hover:scale-105"
                    >
                      Read Article
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ) : null;
            })()}
          </motion.div>
        )}

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(posts || []).filter(post => !post.featured).map((post, index) => (
            <motion.article
              key={post.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 group"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {(post.tags || []).slice(0, 2).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h4 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                {post.title}
              </h4>

              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(post.publishDate)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">{post.claps} claps</span>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                >
                  Read More
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Articles Button */}
        <div className="text-center mt-12">
          <a
            href={mediumProfile.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-lg transition-all duration-300 text-white font-semibold transform hover:scale-105"
          >
            View All Articles on Medium
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default MediumIntegration;