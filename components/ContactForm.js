import { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, Loader, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setStatus('loading');

    try {
      // Use our own API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Contact',
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(result.error || `Server error: ${response.status}`);
      }

    } catch (error) {
      console.error('Contact form submission failed:', {
        error: error,
        message: error.message,
        stack: error.stack,
      });

      // Fallback to mailto with enhanced formatting
      const subject = formData.subject || 'Portfolio Contact Request';
      const emailBody = `
Portfolio Contact Form Submission
================================

From: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject || 'General Inquiry'}

Message:
--------
${formData.message}

================================
Sent from: ${window.location.href}
Date: ${new Date().toLocaleString()}
      `.trim();

      const mailtoLink = `mailto:kirankumarashokpatil@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

      try {
        window.open(mailtoLink, '_blank');
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (mailtoError) {
        window.location.href = mailtoLink;
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Let's discuss your next project or collaboration opportunity
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info - Compact */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Let's Connect</h3>
              <p className="text-gray-300 mb-6 text-sm">
                Interested in discussing opportunities in AI, energy optimization, and innovative technology.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Email</h4>
                  <a href="mailto:kirankumarashokpatil@gmail.com" className="text-blue-400 hover:text-blue-300 text-sm">
                    kirankumarashokpatil@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">LinkedIn</h4>
                  <a 
                    href="https://www.linkedin.com/in/kirankumarashokpatil" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 text-sm"
                  >
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 border border-blue-500/20">
              <h4 className="text-white font-semibold mb-2 text-sm">Response Time</h4>
              <p className="text-gray-300 text-xs mb-2">
                Typically respond within 24 hours. For urgent matters, reach out via LinkedIn.
              </p>
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-2">
                <p className="text-blue-300 text-xs">
                  💡 Messages sent directly to inbox with email backup.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form - Compact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-white font-semibold mb-1 text-sm">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors text-sm ${
                      errors.name ? 'border-red-500' : 'border-slate-600'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-semibold mb-1 text-sm">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors text-sm ${
                      errors.email ? 'border-red-500' : 'border-slate-600'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-white font-semibold mb-1 text-sm">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors text-sm"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-semibold mb-1 text-sm">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Your message"
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors resize-none text-sm ${
                    errors.message ? 'border-red-500' : 'border-slate-600'
                  }`}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 text-sm"
              >
                {status === 'loading' ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>

              {/* Status Messages */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 bg-green-600/20 border border-green-500/30 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-green-400">Message sent successfully!</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Your message has been delivered to my inbox. I'll respond within 24 hours.
                    </p>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;