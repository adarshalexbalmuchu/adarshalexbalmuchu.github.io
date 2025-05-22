import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Github } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Replace with your actual GitHub username
  const yourGithubUsername = "Adarsh17115-gh"; // From your GitHub repo name, please verify

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <motion.header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-white/80 dark:bg-dark-200/80 backdrop-blur-md shadow-md' 
          : 'py-5 bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-custom flex justify-between items-center">
        <a 
          href="#home" 
          className="text-2xl font-bold gradient-text"
        >
          Portfolio {/* You can change "Portfolio" to your name if you prefer */}
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-100 transition-colors duration-300"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700" />
            )}
          </button>

          <a 
            href={`https://github.com/${yourGithubUsername}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-100 transition-colors duration-300"
            aria-label="GitHub Profile"
          >
            <Github className="h-5 w-5" />
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-100 transition-colors duration-300"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700" />
            )}
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-100 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-dark-200 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="container-custom py-4">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              {/* This is the corrected part */}
              <li>
                <a 
                  href={`https://github.com/${yourGithubUsername}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center py-2 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
                  onClick={() => setIsOpen(false)} // Also close menu on click
                >
                  <Github className="h-5 w-5 mr-2" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;