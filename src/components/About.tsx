import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Palette, Rocket, Briefcase, Award, Users, FileText, Quote 
} from 'lucide-react'; 
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useTheme } from '../context/ThemeContext'; // Assuming this path is correct

const About: React.FC = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true, 
    threshold: 0.1,
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const aboutMeSummary = "My Philosophy: \"May be you're not Behind , you're just building something that takes time\"";
  const philosophyQuoteText = aboutMeSummary.split(': "')[1]?.slice(0,-1) || "May be you're not Behind , you're just building something that takes time";


  const aboutMeJourney = "IPM student at IIM Ranchi focusing on entrepreneurship and marketing with proven success in business competitions. National finalist at Kotler's Konundrum (IIM Ahmedabad) and 1st place winner in Snap and Solve Case Competition (IIM Bangalore). Published in Wealth Street magazine.\nCurrently developing skills in coding, website, and app development to bring business ideas to life. Active in Media and Digital Communication Committee at IIM Ranchi handling content creation and design.\nSeeking opportunities that combine marketing expertise with tech innovation. Passionate about building digital business solutions through creative problem-solving and collaboration.";
  const keySkills = ["Entrepreneurship", "Marketing", "Business Competitions", "Tech Innovation", "Coding", "Web Development", "App Development", "Content Creation", "Design", "Problem-Solving", "Collaboration"];
  const workingImageUrl = "/images/my-journey-photo.jpg"; // Ensure this image is in public/images/

  // Using the structure provided by the user, with enhanced descriptions
  const experiencesData = [
    {
      type: "competition",
      title: "National Finalist, Kotler's Konundrum",
      company: "IIM Ahmedabad",
      date: "2024",
      description: "Achieved national finalist recognition by developing and presenting a comprehensive 5-year marketing strategy for FitLife360, focusing on enhancing digital presence and ROI in a highly competitive environment.",
      icon: <Award />,
    },
    {
      type: "competition",
      title: "1st Place Winner, Snap and Solve Case Competition",
      company: "IIM Bangalore",
      date: "2024",
      description: "Secured 1st place by devising impactful and innovative solutions for a critical sustainable supply chain management case, demonstrating strategic problem-solving and analytical prowess.",
      icon: <Award />,
    },
    {
      type: "publication", 
      title: "Published in Wealth Street Magazine",
      company: "Wealth Street Magazine (IBS Ahmedabad)",
      date: "2024", // User provided 2024 for this
      description: "Authored an insightful article/contribution for the magazine, showcasing expertise and clear communication on relevant business/economic topics.",
      icon: <FileText />, 
    },
    {
      type: "role", 
      title: "Media and Digital Communication Committee",
      company: "IIM Ranchi",
      date: "Ongoing",
      description: "Actively contributing to IIM Ranchi's digital footprint by handling content creation, strategy, and design for the Media and Digital Communication Committee.",
      icon: <Users />, 
    },
    {
      type: "experience", 
      title: "Social Internship Program (SIP)",
      company: "Rural Immersion Project",
      date: "2025",
      description: "Led a 21-day rural immersion project, positively impacting 65+ villagers through health camps and educational programs. Organized a health camp with Sadar Hospital Ranchi, providing medical services to 65 villagers. Co-created a 5-day summer camp for 40+ children, focusing on nutrition and education in partnership with Magic Bus Foundation. Conducted soil testing across 5 farms to improve crop planning with Krishi Vigyan Kendra. Developed sales pitch videos and marketing brochures for SHG women at Palash Uttam, boosting local enterprise visibility.",
      icon: <Briefcase />,
    },
     {
      type: "competition",
      title: "National Finalist, Unbounded Possibilities Photography Competition",
      company: "IIM Bangalore (VISTA)",
      date: "2024", 
      description: "Recognized as a national finalist for capturing evocative, thematic photographs centered on girl child education, effectively depicting family and village life through a compelling visual storytelling project.",
      icon: <Palette />, 
    },
  ];

  // Sort experiences: "Ongoing" first, then by year descending
  const sortedExperiences = [...experiencesData].sort((a, b) => {
    // Prioritize "Ongoing"
    if (a.date === "Ongoing" && b.date !== "Ongoing") return -1;
    if (b.date === "Ongoing" && a.date !== "Ongoing") return 1;
    if (a.date === "Ongoing" && b.date === "Ongoing") return 0; // Should not happen if dates are unique for ongoing
    
    // Parse years for numeric comparison
    const yearA = parseInt(a.date);
    const yearB = parseInt(b.date);

    // Handle cases where parsing might result in NaN (though "Ongoing" is handled)
    // This ensures any non-standard date strings are pushed towards the end if not "Ongoing"
    if (isNaN(yearA) && !isNaN(yearB)) return 1; 
    if (!isNaN(yearA) && isNaN(yearB)) return -1;
    if (isNaN(yearA) && isNaN(yearB)) return 0; // If both are NaN, keep original order relative to each other

    // Sort by year in descending order (e.g., 2025 before 2024)
    return yearB - yearA; 
  });
  
  return (
    <section id="about" ref={ref} className="section bg-gray-50 dark:bg-dark-200">
      <div className="container-custom">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl md:text-4xl font-bold">About <span className="gradient-text">Me</span></h2>
          
          <motion.div
            className="my-8 p-6 rounded-xl glass border-l-4 border-primary-500 shadow-xl relative overflow-hidden"
            variants={fadeIn}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Quote className="absolute top-3 left-3 w-8 h-8 text-primary-400 dark:text-primary-300 opacity-30 transform scale-x-[-1]" />
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 font-medium italic leading-relaxed text-center px-6 py-4 selection:bg-primary-500/20">
              {philosophyQuoteText}
            </p>
            <Quote className="absolute bottom-3 right-3 w-8 h-8 text-primary-400 dark:text-primary-300 opacity-30" />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-500/10 rounded-lg z-0 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent-500/10 rounded-lg z-0 animate-pulse [animation-delay:0.5s]"></div>
              <motion.div 
                className="relative z-10 overflow-hidden rounded-lg shadow-2xl"
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <img 
                  src={workingImageUrl} 
                  alt="Adarsh Alex Balmuchu - My Journey" 
                  className="w-full h-auto object-cover aspect-square md:aspect-auto"
                  onError={(e) => ((e.target as HTMLImageElement).src = 'https://placehold.co/600x600/38bdf8/FFFFFF?text=My+Journey')}
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <h3 className="mb-4 text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">My Journey</h3>
            {aboutMeJourney.split('\n').map((paragraph, index) => (
              <p key={index} className="text-gray-600 dark:text-gray-400 mb-4 last:mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
            
            <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-6">
              {keySkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  className="glass rounded-md px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y:-2 }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-4">
              <motion.a 
                href="#contact"
                className="flex items-center w-fit btn-primary shadow-lg hover:shadow-primary-500/40"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Let's Work Together
              </motion.a>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 md:mt-28">
          <motion.h3 
            className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gray-800 dark:text-white"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Key <span className="gradient-text">Experiences & Achievements</span>
          </motion.h3>

          <VerticalTimeline lineColor={theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}>
            {/* Ensure you are mapping over sortedExperiences here */}
            {sortedExperiences.map((exp, index) => ( 
              <VerticalTimelineElement
                key={index}
                className="vertical-timeline-element--work" 
                contentStyle={{
                  background: theme === 'dark' ? 'rgba(30, 30, 42, 0.75)' : 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(12px)',
                  color: theme === 'dark' ? '#f3f4f6' : '#1a202c',
                  boxShadow: theme === 'dark' ? '0 6px 20px rgba(0, 0, 0, 0.3)' : '0 6px 20px rgba(0, 0, 0, 0.1)', 
                  borderRadius: '16px',
                  border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)'}`
                }}
                contentArrowStyle={{ borderRight: theme === 'dark' ? '8px solid rgba(30, 30, 42, 0.75)' : '8px solid rgba(255, 255, 255, 0.8)' }}
                date={exp.date}
                iconStyle={{ 
                  background: exp.type === 'experience' ? '#0ea5e9' : (exp.type === 'competition' ? '#ec4899' : (exp.type === 'publication' ? '#10b981' : '#f59e0b')),
                  color: '#ffffff',
                  boxShadow: `0 0 0 4px ${theme === 'dark' ? '#16161f' : '#f1f5f9'}, 0 3px 8px rgba(0,0,0,0.2)`
                }}
                icon={exp.icon}
                visible={inView}
              >
                <h3 className="vertical-timeline-element-title font-semibold text-lg md:text-xl mb-1 text-gray-900 dark:text-white">{exp.title}</h3>
                <h4 className="vertical-timeline-element-subtitle text-primary-600 dark:text-primary-400 mb-2.5 text-sm md:text-base font-medium">{exp.company}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {exp.description}
                </p>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </section>
  );
};

export default About;
