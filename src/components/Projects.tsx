import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, ShoppingCart, CreditCard, BarChart2, Zap } from 'lucide-react';
import { Tilt } from 'react-tilt';
// Ensure useTheme is imported from the correct path at the TOP of the file
import { useTheme } from '../context/ThemeContext'; 

// Updated projects data with corrected image paths
const projectsData = [
  {
    id: 1,
    title: "FitLife360 Web App",
    description: "A full-stack wellness app with 7+ core modules including Family Dashboard, Diet Tracker, Sleep Logger, Mood Monitor, Meditation Therapist Booking, and Yap Room (chat). Accelerated development by 25% using AI-assisted coding.",
    image: "/images/proj_1.jpg", 
    tags: ["React", "TypeScript", "Tailwind CSS", "Full-Stack", "AI-assisted"],
    link: "YOUR_FITLIFE360_LIVE_LINK_HERE", // Replace with actual link
    github: "https://github.com/Adarsh17115-gh/FitLife360" 
  },
  {
    id: 2,
    title: "E-Commerce Platform Prototype",
    description: "Designed and implemented a responsive e-commerce platform with product catalog, cart functionality, payment gateway integration, and inventory management. Leveraged AI-assisted coding for efficient frontend development.",
    image: "/images/proj_3.png", 
    tags: ["E-commerce", "Responsive Design", "Payment Gateway", "Inventory Management", "AI-assisted"],
    link: null, // Removed the demo link for the e-commerce project
    // github: "YOUR_ECOMMERCE_GITHUB_LINK_HERE" // Replace with actual link or remove if none
  },
];

const defaultTiltOptions = {
  reverse: false,
  max: 15,
  perspective: 1000,
  scale: 1.05,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

// Helper function to get an icon based on project tags
const getProjectIcon = (tags: string[]): React.ReactNode => {
  if (tags.some(tag => tag.toLowerCase().includes('wellness') || tag.toLowerCase().includes('health'))) {
    return <Zap size={20} className="text-white/80 group-hover:text-white transition-colors" />;
  }
  if (tags.some(tag => tag.toLowerCase().includes('e-commerce'))) {
    return <ShoppingCart size={20} className="text-white/80 group-hover:text-white transition-colors" />;
  }
  if (tags.some(tag => tag.toLowerCase().includes('payment'))) {
    return <CreditCard size={20} className="text-white/80 group-hover:text-white transition-colors" />;
  }
  // Default icon if no specific tags match
  return <BarChart2 size={20} className="text-white/80 group-hover:text-white transition-colors" />; 
};


const Projects: React.FC = () => {
  // State for managing which project card is being hovered over (for subtle effects)
  const [activeProject, setActiveProject] = useState<number | null>(null); 
  
  // Hook to trigger animations when the section scrolls into view
  const [ref, inView] = useInView({
    triggerOnce: true, // Animation triggers once
    threshold: 0.1,    // Triggers when 10% of the element is visible
  });

  // Destructure theme from useTheme hook to make it available in this component
  const { theme } = useTheme(); 
  const yourGithubUsername = "Adarsh17115-gh"; // Your GitHub username for the "View More" link

  return (
    <section id="projects" ref={ref} className="section bg-gray-100 dark:bg-dark-300 py-20 md:py-28">
      <div className="container-custom">
        {/* Section Title and Subtitle */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured <span className="gradient-text">Projects</span></h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Here are some of the projects I've worked on, showcasing my skills in development, problem-solving, and innovation.
          </p>
        </motion.div>

        {/* Grid for Project Cards */}
        <div className={`grid grid-cols-1 ${projectsData.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1 md:max-w-2xl md:mx-auto'} gap-8 lg:gap-10`}>
          {projectsData.map((project, index) => (
            <Tilt key={project.id} options={defaultTiltOptions} className="h-full">
              <motion.div
                className="group h-full flex flex-col" // Card container
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: "easeOut" }}
                onMouseEnter={() => setActiveProject(project.id)} // Sets active project on hover
                onMouseLeave={() => setActiveProject(null)}    // Clears active project on mouse leave
              >
                <div className="relative overflow-hidden rounded-xl shadow-2xl h-full glass hover-scale flex flex-col"> 
                  {/* Project Image Container */}
                  <div className="h-60 md:h-64 overflow-hidden relative">
                    <motion.img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover "
                      whileHover={{ scale: 1.05 }} 
                      transition={{ duration: 0.4 }}
                      onError={(e) => ((e.target as HTMLImageElement).src = `https://placehold.co/600x400/0284c7/FFFFFF?text=${encodeURIComponent(project.title)}`)} // Fallback image
                    />
                    {/* Gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                    {/* Project type icon */}
                    <div className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-sm rounded-full">
                         {getProjectIcon(project.tags)}
                    </div>
                  </div>
                  
                  {/* Project Details Container */}
                  <div className="p-6 flex flex-col flex-grow"> 
                    <motion.h3 
                      className="text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white mb-2"
                    >
                      {project.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-300 flex-grow" 
                    >
                      {project.description}
                    </motion.p>
                    
                    {/* Tags */}
                    <motion.div 
                      className="flex flex-wrap gap-2 mb-5 mt-auto" 
                    >
                      {project.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="text-xs font-medium bg-primary-500/10 dark:bg-primary-400/15 text-primary-700 dark:text-primary-300 px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>
                    
                    {/* Links (Demo/Code) */}
                    <motion.div 
                      className="flex space-x-3 items-center"
                    >
                      {project.link && project.link !== "#" && (
                        <motion.a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium transition-colors shadow-md hover:shadow-lg"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`Visit ${project.title} website`}
                        >
                          <ExternalLink className="w-4 h-4 mr-1.5" /> Demo
                        </motion.a>
                      )}
                      {project.github && project.github !== "#" && (
                        <motion.a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-800 dark:bg-dark-100 dark:hover:bg-dark-200/70 text-white text-sm font-medium transition-colors shadow-md hover:shadow-lg"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`Visit ${project.title} GitHub repository`}
                        >
                          <Github className="w-4 h-4 mr-1.5" /> Code
                        </motion.a>
                      )}
                    </motion.div>
                  </div>
                  
                  {/* Animated border on hover, uses the 'theme' variable */}
                  <motion.div 
                    className="absolute inset-0 border-2 border-transparent rounded-xl pointer-events-none"
                    initial={{ borderColor: 'transparent' }}
                    whileHover={{ borderColor: theme === 'dark' ? 'rgba(56, 189, 248, 0.7)' : 'rgba(14, 165, 233, 0.7)' }} 
                    transition={{ duration: 0.3 }}
                  />
                  {/* Subtle background overlay on hover, uses 'activeProject' state */}
                  <motion.div 
                    className="absolute inset-0 bg-primary-500/10 pointer-events-none rounded-xl" 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeProject === project.id ? 1 : 0 }} 
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
        
        {/* "View More on GitHub" Button */}
        {projectsData.length > 0 && (
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y:20 }}
            animate={inView ? { opacity: 1, y:0 } : { opacity: 0, y:20 }}
            transition={{ duration: 0.5, delay: projectsData.length * 0.1 + 0.2 }}
          >
            <motion.a 
              href={`https://github.com/${yourGithubUsername}?tab=repositories`}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center btn-primary text-base px-8 py-3.5"
              whileHover={{ scale: 1.05, y: -3, boxShadow: "0 10px 20px -5px rgba(14, 165, 233, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5 mr-2.5" />
              View More on GitHub
            </motion.a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
