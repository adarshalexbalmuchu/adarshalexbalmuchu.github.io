import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react'; // Assuming you have Mail icon
import ParticleBackground from './ParticleBackground';

const Hero: React.FC = () => {
  // Extract these from your CV or provide directly
  const yourName = "Adarsh"; // [cite: 1]
  const tagline1 = "IPM Student at IIM Ranchi"; // [cite: 1]
  const tagline2 = "Marketing, Content Creation & Technical Development"; // [cite: 1, 2]
  const briefIntro = "Passionate about leveraging creativity and analytical skills to deliver impactful marketing outcomes with a strong commitment to community development and social impact."; // [cite: 3]
  const githubLink = "https://github.com/adarshalexbalmuchu"; // Updated GitHub link
  const linkedinLink = "https://www.linkedin.com/in/adarshalexbalmuhu/"; // Updated LinkedIn link
  const emailAddress = "adarshalex.balmuchui23@iimranchi.ac.in"; // [cite: 1]
  const profileImageUrl = "images/about-me.png"; // Replace with your desired profile image URL

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      
      <div className="container-custom z-10 pt-16 md:pt-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            className="flex-1 max-w-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className="inline-block text-lg font-medium text-primary-500 dark:text-primary-400 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Hello, I'm
            </motion.span>
            
            <motion.h1 
              className="gradient-text mb-6 font-bold" // Keep existing style for name
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {yourName} {/* [cite: 1] */}
            </motion.h1>
            
            <motion.h2 
              className="text-2xl md:text-3xl text-gray-800 dark:text-gray-200 mb-3" // Adjusted margin
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {tagline1} {/* [cite: 1] */}
            </motion.h2>
             <motion.h3 
              className="text-xl md:text-2xl gradient-text font-semibold mb-6" // Using gradient for second tagline
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {tagline2} {/* [cite: 1, 2] */}
            </motion.h3>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-400 mb-8 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {briefIntro} {/* [cite: 3] */}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <a href="#contact" className="btn-primary">
                Get in Touch
              </a>
              <a 
                href="#projects"
                className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 
                rounded-lg font-medium hover:border-primary-500 dark:hover:border-primary-400 
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 hover:shadow-md
                transition-all duration-300"
              >
                View Projects
              </a>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-4 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <a 
                href={githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a 
                href={linkedinLink}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href={`mailto:${emailAddress}`}
                className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="flex-1 max-w-md"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-accent-400/20 rounded-full animate-pulse" />
              <div className="absolute inset-4 bg-gradient-to-r from-primary-500/30 to-accent-500/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute inset-8 glass rounded-full overflow-hidden">
                <img 
                  src={profileImageUrl} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <a 
        href="#about" 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6 text-gray-600 dark:text-gray-400" />
      </a>
    </section>
  );
};

export default Hero;