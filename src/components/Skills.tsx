import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Music2, Zap, Award as AwardIcon, BookOpen, BarChart3, Palette,
  GitMerge, Cpu, BarChartHorizontal, PieChart, MonitorPlay, Camera, Clapperboard, 
  Search, Target, UsersRound, Brain, Settings, TrendingUp, Sparkles, Code2, // Changed CodeXml to Code2
  FileSpreadsheet, Github, PenTool 
  // Removed: Edit3, Briefcase, Terminal, FileText, Database, Users, Lightbulb, ShieldCheck, MessageSquareText
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext'; // Assuming this path is correct

interface Skill {
  name: string;
  category: string;
  icon: React.ReactNode; 
}

interface EducationItem {
  degree: string;
  institution: string;
  details: string; 
  year: string;
}

interface ActivityItem {
  title: string;
  description: string;
  year?: string; 
  details?: string[];
}

// Skills from your CV with Icons
const skillsData: Skill[] = [
  // Tools & DevOps
  { name: "Git", category: "tools", icon: <GitMerge size={28} className="text-sky-500" /> },
  { name: "GitHub", category: "tools", icon: <Github size={28} className="text-sky-500" /> }, 
  { name: "VS Code", category: "tools", icon: <Code2 size={28} className="text-sky-500" /> }, // Corrected Icon
  { name: "Excel", category: "tools", icon: <FileSpreadsheet size={28} className="text-sky-500" /> },
  // Programming & Analytics
  { name: "Python", category: "programming", icon: <Cpu size={28} className="text-green-500" /> },
  { name: "Java", category: "programming", icon: <Cpu size={28} className="text-green-500" /> },
  { name: "R Studio", category: "programming", icon: <BarChartHorizontal size={28} className="text-green-500" /> },
  { name: "Tableau", category: "programming", icon: <PieChart size={28} className="text-green-500" /> },
  { name: "Power BI", category: "programming", icon: <BarChart3 size={28} className="text-green-500" /> },
  // Design & Media
  { name: "Canva", category: "design", icon: <Palette size={28} className="text-pink-500" /> },
  { name: "PowerPoint", category: "design", icon: <MonitorPlay size={28} className="text-pink-500" /> },
  { name: "Adobe Express", category: "design", icon: <Sparkles size={28} className="text-pink-500" /> },
  { name: "Adobe Lightroom", category: "design", icon: <Camera size={28} className="text-pink-500" /> },
  { name: "Adobe Premiere Pro", category: "design", icon: <Clapperboard size={28} className="text-pink-500" /> },
  { name: "Photography", category: "design", icon: <Camera size={28} className="text-pink-500" /> },
  // Marketing & Research
  { name: "Market Research", category: "marketing", icon: <Search size={28} className="text-amber-500" /> },
  { name: "STP Analysis", category: "marketing", icon: <Target size={28} className="text-amber-500" /> },
  { name: "Consumer Segmentation", category: "marketing", icon: <UsersRound size={28} className="text-amber-500" /> },
  { name: "Data Interpretation", category: "marketing", icon: <Brain size={28} className="text-amber-500" /> },
];

// Education from your CV
const educationData: EducationItem[] = [
  {
    degree: "Integrated BBA + MBA (Foundational Management)",
    institution: "Indian Institute of Management, Ranchi",
    year: "2028",
  },
  {
    degree: "Class XII - Commerce with Computer Science (ISC)",
    institution: "ST. Xavier's English School, Chaibasa",
    // details: "78.5%",
    year: "2023",
  },
  {
    degree: "Class X - ICSE",
    institution: "ST. Xavier's English School, Chakradharpur",
    // details: "75.4%",
    year: "2021",
  },
];

// Extra-Curricular Activities from your CV
const extraCurricularData: { categoryTitle: string; items: ActivityItem[], icon: React.ReactNode }[] = [
  {
    categoryTitle: "Music Achievements",
    icon: <Music2 className="w-7 h-7 text-primary-500 mr-3" />,
    items: [
      { title: "Classical Guitar - Musicea Level 1 Certificate (Grade 2)", description: "Passed with Merit", year: "2023" },
      { title: "Acoustic Guitar - Musicea Level 1 Certificate (Grade 1)", description: "Passed with Distinction", year: "2021" },
      { title: "Classical Hindustani Music - Intermediate (3rd Year)", description: "Passed with Merit, Akhil Bharatiya Gandharva Mahavidyalaya Mandal", year: "2018" },
    ]
  },
  {
    categoryTitle: "Sports Involvement",
    icon: <Zap className="w-7 h-7 text-accent-500 mr-3" />,
    items: [
      { title: "Passion for Multiple Sports", description: "Badminton, cricket, football, and basketball." },
      { title: "Tournament Wins", description: "Won district-level and school-level tournaments in football and basketball." },
    ]
  }
];

const categories = [
  { id: "all", name: "All Skills", icon: <Sparkles size={18} className="mr-2 opacity-80" /> },
  { id: "tools", name: "Tools & DevOps", icon: <Settings size={18} className="mr-2 opacity-80" /> },
  { id: "programming", name: "Programming & Analytics", icon: <Cpu size={18} className="mr-2 opacity-80" /> },
  { id: "design", name: "Design & Media", icon: <PenTool size={18} className="mr-2 opacity-80" /> },
  { id: "marketing", name: "Marketing & Research", icon: <TrendingUp size={18} className="mr-2 opacity-80" /> },
];

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredSkills, setFilteredSkills] = useState(skillsData);
  const { theme } = useTheme(); 
  
  const [skillsSectionRef, skillsSectionInView] = useInView({ triggerOnce: false, threshold: 0.05 });
  const [educationSectionRef, educationSectionInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [extraCurricularSectionRef, extraCurricularSectionInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredSkills(skillsData);
    } else {
      setFilteredSkills(skillsData.filter(skill => skill.category === activeCategory));
    }
  }, [activeCategory]);

  const sectionAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };
  
  const itemAnimation = (delay: number) => ({
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, delay, ease: "easeOut" } },
  });

  const skillCardHoverEffect = theme === 'dark' 
    ? { scale: 1.08, y: -5, boxShadow: "0 0 25px rgba(56, 189, 248, 0.5), 0 0 10px rgba(56, 189, 248, 0.3)" } 
    : { scale: 1.08, y: -5, boxShadow: "0 0 25px rgba(14, 165, 233, 0.4), 0 0 10px rgba(14, 165, 233, 0.2)" }; 

  return (
    <section id="skills" className="section bg-gray-100 dark:bg-dark-300 py-20 md:py-28 overflow-hidden">
      <div className="container-custom">
        {/* Skills Section */}
        <motion.div
          ref={skillsSectionRef}
          initial="hidden"
          animate={skillsSectionInView ? "visible" : "hidden"}
          variants={sectionAnimation}
        >
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
            <motion.h2 
              className="mb-4 text-4xl md:text-5xl font-bold"
              variants={itemAnimation(0)} 
              initial="hidden" 
              animate={skillsSectionInView ? "visible" : "hidden"}
            >
              My <span className="gradient-text">Skill Arsenal</span>
            </motion.h2>
            <motion.p 
              className="text-gray-600 dark:text-gray-400 text-lg md:text-xl"
              variants={itemAnimation(0.1)} 
              initial="hidden"
              animate={skillsSectionInView ? "visible" : "hidden"}
            >
              A dynamic toolkit honed through diverse experiences and continuous learning.
            </motion.p>
          </div>

          <motion.div 
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 md:mb-16"
            variants={itemAnimation(0.2)} 
            initial="hidden"
            animate={skillsSectionInView ? "visible" : "hidden"}
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 border-2
                  ${activeCategory === category.id
                    ? 'bg-primary-500 border-primary-500 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-white dark:bg-dark-200 border-gray-300 dark:border-dark-100 text-gray-700 dark:text-gray-300 hover:border-primary-400 dark:hover:border-primary-500 hover:text-primary-500 dark:hover:text-primary-400'
                  }`}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
              >
                {category.icon}
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="group relative bg-white dark:bg-dark-200 p-5 rounded-xl shadow-lg text-center glass cursor-pointer overflow-hidden"
                variants={itemAnimation(0.3 + index * 0.04)}
                initial="hidden"
                animate={skillsSectionInView ? "visible" : "hidden"}
                whileHover={skillCardHoverEffect}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="mb-3 flex justify-center items-center h-12 w-12 mx-auto rounded-full bg-primary-500/10 dark:bg-primary-400/15 transition-all duration-300 group-hover:bg-primary-500/20 dark:group-hover:bg-primary-400/25">
                  {React.isValidElement(skill.icon) ? React.cloneElement(skill.icon as React.ReactElement, { 
                    className: `transition-all duration-300 group-hover:text-primary-500 dark:group-hover:text-primary-300 ${(skill.icon as React.ReactElement).props.className || ''}` 
                  }) : null}
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-sm md:text-base truncate group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors duration-300">{skill.name}</h4>
                 <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-400 dark:group-hover:border-primary-500 rounded-xl transition-all duration-300 pointer-events-none opacity-0 group-hover:opacity-100"
                       style={{ clipPath: 'inset(0 0 0 0 round 12px)' }}></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div 
          ref={educationSectionRef}
          className="mt-20 md:mt-28 glass p-6 py-10 md:p-10 md:py-12 rounded-2xl shadow-xl"
          initial="hidden"
          animate={educationSectionInView ? "visible" : "hidden"}
          variants={sectionAnimation}
        >
          <motion.h3 
            className="text-3xl md:text-4xl font-bold mb-8 md:mb-10 text-center text-gray-800 dark:text-gray-100"
            variants={itemAnimation(0)}
            initial="hidden"
            animate={educationSectionInView ? "visible" : "hidden"}
          >
            <BookOpen className="inline-block w-8 h-8 mr-3 text-primary-500" /> My <span className="gradient-text">Education</span>
          </motion.h3>
          <div className="space-y-8">
            {educationData.map((edu, index) => (
              <motion.div 
                key={index}
                className="flex flex-col sm:flex-row items-start p-5 bg-white/10 dark:bg-dark-100/40 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                variants={itemAnimation(0.1 + index * 0.1)}
                initial="hidden"
                animate={educationSectionInView ? "visible" : "hidden"}
              >
                <div className="flex-shrink-0 mb-3 sm:mb-0 sm:mr-5">
                  <div className="w-12 h-12 bg-primary-500/20 dark:bg-primary-400/25 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary-600 dark:text-primary-300" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100">{edu.degree}</h4>
                  <p className="text-gray-700 dark:text-gray-300">{edu.institution}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{edu.details}</p>
                </div>
                <span className="text-primary-500 dark:text-primary-400 mt-2 sm:mt-0 font-semibold text-sm md:text-base whitespace-nowrap">{edu.year}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Extra-Curricular Activities Section */}
        <motion.div
          ref={extraCurricularSectionRef}
          className="mt-16 md:mt-20 glass p-6 py-10 md:p-10 md:py-12 rounded-2xl shadow-xl"
          initial="hidden"
          animate={extraCurricularSectionInView ? "visible" : "hidden"}
          variants={sectionAnimation}
        >
          <motion.h3 
            className="text-3xl md:text-4xl font-bold mb-8 md:mb-10 text-center text-gray-800 dark:text-gray-100"
            variants={itemAnimation(0)}
            initial="hidden"
            animate={extraCurricularSectionInView ? "visible" : "hidden"}
          >
             <AwardIcon className="inline-block w-8 h-8 mr-3 text-accent-500" /> Beyond the <span className="gradient-text">Books</span>
          </motion.h3>
          <div className="space-y-10">
            {extraCurricularData.map((activityCategory, catIndex) => (
              <motion.div 
                key={activityCategory.categoryTitle}
                variants={itemAnimation(0.1 + catIndex * 0.15)} 
                initial="hidden"
                animate={extraCurricularSectionInView ? "visible" : "hidden"}
              >
                <h4 className="flex items-center text-xl md:text-2xl font-semibold mb-5 text-gray-800 dark:text-gray-100">
                  {activityCategory.icon} 
                  {activityCategory.categoryTitle}
                </h4>
                <div className="space-y-4 ml-4 pl-6 border-l-2 border-primary-500/30 dark:border-accent-500/30">
                  {activityCategory.items.map((item, itemIndex) => (
                    <motion.div 
                      key={itemIndex} 
                      className="relative p-4 bg-white/10 dark:bg-dark-100/40 rounded-lg shadow hover:shadow-md transition-shadow duration-300"
                      variants={itemAnimation(0.15 + catIndex * 0.15 + itemIndex * 0.05)} 
                      initial="hidden"
                      animate={extraCurricularSectionInView ? "visible" : "hidden"}
                    >
                       <div className="absolute -left-[29px] top-5 w-3 h-3 rounded-full bg-primary-500 dark:bg-accent-500 ring-4 ring-gray-100 dark:ring-dark-300"></div>
                      <p className="font-semibold text-gray-700 dark:text-gray-200">{item.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                      {item.year && <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 font-medium">{item.year}</p>}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
