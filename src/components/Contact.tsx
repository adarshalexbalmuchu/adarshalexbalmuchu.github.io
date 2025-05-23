import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, MapPin, Phone, Mail, Linkedin, Github as GithubIcon } from 'lucide-react'; // Added Linkedin, GithubIcon

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission (Replace with actual submission logic if you have a backend)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const yourEmail = "adarshalex.balmuchui23@iimranchi.ac.in"; // [cite: 1]
  const yourPhone = "+91-7295029691"; // [cite: 1]
  const yourLocation = "Ranchi, India"; // Based on IIM Ranchi, adjust if preferred
  const yourLinkedin = "https://www.linkedin.com/in/adarshalexbalmuhu/"; // Updated LinkedIn link
  const yourGithub = "YOUR_GITHUB_LINK_HERE"; // Replace

  const contactInfo = [
    { icon: <Mail className="w-5 h-5 text-primary-500" />, text: yourEmail, href: `mailto:${yourEmail}` }, // [cite: 1]
    { icon: <Phone className="w-5 h-5 text-primary-500" />, text: yourPhone, href: `tel:${yourPhone}` }, // [cite: 1]
    { icon: <MapPin className="w-5 h-5 text-primary-500" />, text: yourLocation },
    // { icon: <Clock className="w-5 h-5 text-primary-500" />, text: "Mon - Fri: 9am - 6pm" }, // Optional: Add availability
  ];

  const socialLinks = [
    { name: "LinkedIn", href: yourLinkedin, icon: <Linkedin className="w-5 h-5" /> },
    { name: "GitHub", href: yourGithub, icon: <GithubIcon className="w-5 h-5" /> },
    // Add other social media if relevant
  ];


  return (
    <section id="contact" ref={ref} className="section">
      <div className="container-custom">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4">Get In <span className="gradient-text">Touch</span></h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Have a project in mind, want to collaborate, or just want to say hi? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-dark-100 rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-semibold mb-6">Send Me a Message</h3>
              
              {submitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-medium mb-2">Message Sent!</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Form fields remain the same */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 
                        bg-white dark:bg-dark-200 text-gray-800 dark:text-gray-200 focus:ring-2 
                        focus:ring-primary-500 focus:border-transparent transition-colors"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 
                        bg-white dark:bg-dark-200 text-gray-800 dark:text-gray-200 focus:ring-2 
                        focus:ring-primary-500 focus:border-transparent transition-colors"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 
                      bg-white dark:bg-dark-200 text-gray-800 dark:text-gray-200 focus:ring-2 
                      focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Project Inquiry"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 
                      bg-white dark:bg-dark-200 text-gray-800 dark:text-gray-200 focus:ring-2 
                      focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Hello, I'd like to talk about..."
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white dark:bg-dark-100 rounded-xl shadow-md p-8 h-full">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      {item.icon}
                    </div>
                    <div className="ml-4">
                      {item.href ? (
                        <a href={item.href} className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                          {item.text}
                        </a>
                      ) : (
                        <p className="text-gray-700 dark:text-gray-300">{item.text}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-medium mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((link) => (
                     <a 
                        key={link.name}
                        href={link.href} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-dark-200 
                        hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 transition-colors"
                        aria-label={link.name}
                      >
                       {link.icon}
                      </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;