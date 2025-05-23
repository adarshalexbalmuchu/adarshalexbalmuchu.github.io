import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpCircle, 
  Github, 
  Linkedin, 
  Mail, 
  Twitter, 
  Briefcase, 
  User, 
  Rss, 
  MessageCircle,
  Award // Added Award from lucide-react
} from 'lucide-react';

const Footer: React.FC = () => {
  const yourName = "ADARSH ALEX BALMUCHU";
  const yourEmail = "adarshalex.balmuchui23@iimranchi.ac.in";
  const githubUrl = "https://github.com/Adarsh17115-gh";
  const linkedinUrl = "https://www.linkedin.com/in/adarshalexbalmuhu/";
  const twitterUrl = "https://x.com/AdarshBalmuchu";

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const quickLinks = [
    { name: 'Home', href: '#home', icon: <User size={16} className="mr-2 opacity-70" /> },
    { name: 'About', href: '#about', icon: <Briefcase size={16} className="mr-2 opacity-70" /> },
    { name: 'Projects', href: '#projects', icon: <Rss size={16} className="mr-2 opacity-70" /> },
    // Using Award icon from lucide-react
    { name: 'Skills', href: '#skills', icon: <Award size={16} className="mr-2 opacity-70" /> }, 
    { name: 'Contact', href: '#contact', icon: <MessageCircle size={16} className="mr-2 opacity-70" /> },
  ];
  
  // Removed local AwardIcon definition as we are importing it from lucide-react

  const socialMediaLinks = [
    { name: 'GitHub', href: githubUrl, icon: <Github size={20} /> },
    { name: 'LinkedIn', href: linkedinUrl, icon: <Linkedin size={20} /> },
    { name: 'X (Twitter)', href: twitterUrl, icon: <Twitter size={20} /> },
    { name: 'Email', href: `mailto:${yourEmail}`, icon: <Mail size={20} /> },
  ];
  
  const footerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.footer 
      className="bg-dark-200 dark:bg-dark-300 text-gray-300 dark:text-gray-400 py-12 md:py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={footerAnimation}
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 md:mb-12 items-start">
          {/* Column 1: Brand and Intro */}
          <div className="md:col-span-4 lg:col-span-5">
            <a href="#home" className="text-3xl font-bold gradient-text mb-4 inline-block">{yourName}</a>
            <p className="text-sm leading-relaxed mb-6 max-w-md">
              Management student leveraging creativity and analytical skills for impactful marketing outcomes and community development. Let's connect!
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-4 lg:col-span-3 md:pl-6">
            <h4 className="text-lg font-semibold text-gray-100 dark:text-white mb-5">Quick Navigation</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="flex items-center text-gray-300 hover:text-primary-400 dark:hover:text-primary-300 transition-colors duration-300 group"
                  >
                    {link.icon}
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Connect */}
          <div className="md:col-span-4 lg:col-span-4">
            <h4 className="text-lg font-semibold text-gray-100 dark:text-white mb-5">Get In Touch</h4>
            <div className="flex flex-wrap gap-3 mb-4">
              {socialMediaLinks.map((social) => (
                <motion.a 
                  key={social.name}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-dark-100 dark:bg-dark-200/50 text-gray-300 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-400 transition-all duration-300 transform hover:scale-110"
                  aria-label={social.name}
                  whileHover={{ y: -2 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <p className="text-sm">
              Feel free to reach out via email or connect on social media.
            </p>
             <p className="text-sm mt-2">
              <a href={`mailto:${yourEmail}`} className="hover:text-primary-400 transition-colors duration-300 underline underline-offset-2">
                {yourEmail}
              </a>
            </p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-700 dark:border-gray-600/50 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} {yourName}. All rights reserved.
            <br className="sm:hidden"/> {/* Line break for mobile */}
            <span className="hidden sm:inline"> | </span> 
            Designed & Built with <span className="text-red-500">&hearts;</span> using React, TypeScript & Tailwind CSS.
          </p>
          
          <motion.button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-dark-100 dark:bg-dark-200/50 text-primary-400 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-400 transition-all duration-300 shadow-md"
            whileHover={{ y: -4, scale: 1.05, boxShadow: "0 0 15px rgba(14, 165, 233, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <ArrowUpCircle className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
