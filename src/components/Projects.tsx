import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import InteractiveCard from './InteractiveCard';
import { Building } from 'lucide-react';
import ResponsiveImage from './ResponsiveImage';
import { Github, ExternalLink, Code, Database, Microscope, Brain, Filter } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Projects = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const projectsRef = useScrollAnimation();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const categories = ['All', 'Web Development', 'FinTech', 'Data Science'];

  const projects = [
    {
      id: 1,
      title: 'Banking Application',
      category: 'FinTech',
      description: 'Shreyan Bank is a simple and interactive banking application simulation that allows users to experience basic digital banking operations like deposits, withdrawals, and transaction history through a clean and responsive interface.',
      longDescription: 'Shreyan Bank is a simple digital banking simulator that lets users check balances, deposit, withdraw, and view transaction history in real-time. It features a clean, responsive interface with quick performance, making it a smooth and educational tool for learning basic banking operations.',
      image: 'https://static.vecteezy.com/system/resources/previews/018/754/407/non_2x/mobile-banking-app-concept-free-vector.jpg',
      technologies: ['React', 'Typescript', 'Tailwind CSS', 'Javascript', 'Node.js'],
      github: '#',
      live: 'https://shreyan-bank.netlify.app/',
      icon: Building,
      color: 'from-green-400 to-teal-500'
    },
    {
      id: 2,
      title: 'Online Quiz System with Proctoring',
      category: 'Web Development',
      description: 'QuizzyNet Pro is a modern and interactive online quiz application that allows users to take engaging quizzes with a clean and responsive interface, providing instant feedback and performance tracking.',
      longDescription: 'QuizzyNet Pro is a fast and user-friendly online quiz platform designed for effortless learning and assessment. It offers a clean, responsive interface that works smoothly on all devices, with real-time timers and instant result feedback. Users can take quizzes without the need to sign up, making it quick and accessible. Built on a high-speed serverless system, QuizzyNet Pro ensures fast load times and a seamless experience for students, teachers, and casual learners alike.',
      image: 'https://www.cipcourses.com/wp-content/uploads/2022/06/How-does-a-proctored-exam-work.png',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Tailwind CSS'],
      github: '#',
      live: 'https://quizzynet-pro.netlify.app/',
      icon: Code,
      color: 'from-blue-400 to-purple-500'
    },
    {
      id: 3,
      title: 'Energy Consumption Prediction',
      category: 'Data Science',
      description: 'The AI-powered diagnostic tool uses advanced machine learning algorithms to predict disease risks in patients health records, symptoms, and test results, identifying early warning signs for chronic diseases, cancer, and neurological disorders, improving patient outcomes.',
      longDescription: 'This AI-powered energy forecasting system uses advanced machine learning to analyze consumption patterns and predict demand with high accuracy. It combines smart meter data, weather inputs, and IoT sensor readings through automated feature engineering and ensemble modeling. The web interface lets data scientists build, compare, and deploy models with explainable AI insights, while the scalable backend handles large datasets and production workflows.',
      image: 'https://ars.els-cdn.com/content/image/1-s2.0-S266616592030034X-fx1.jpg',
      technologies: ['Python', 'Scikit-learn', 'Flask', 'PostgreSQL', 'TensorFlow'],
      github: '#',
      live: '#',
      icon: LineChart,
      color: 'from-red-400 to-pink-500'
    },
  ];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => (
    <InteractiveCard className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 * index }}
        className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-400/50 transition-all duration-300 group h-full flex flex-col"
        className={`rounded-xl overflow-hidden border transition-all duration-300 group h-full flex flex-col ${
          theme === 'dark'
            ? 'bg-gray-900 border-gray-700 hover:border-cyan-400/50'
            : 'bg-white border-gray-200 hover:border-orange-400/50 shadow-lg'
        }`}
      >
        <div className="relative overflow-hidden h-48">
          <ResponsiveImage
            src={project.image}
            alt={project.title}
            className="w-full h-full transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className={`absolute inset-0 bg-gradient-to-t to-transparent opacity-60 ${
            theme === 'dark' ? 'from-gray-900' : 'from-white'
          }`} />
          <div className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r ${project.color} flex items-center justify-center`}>
            <project.icon size={24} className="text-white" />
          </div>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-medium px-2 py-1 rounded transition-all duration-300 ${
              theme === 'dark'
                ? 'text-cyan-400 bg-cyan-400/10'
                : 'text-orange-500 bg-orange-500/10'
            }`}>
              {project.category}
            </span>
          </div>
          <h3 className={`text-xl font-bold mb-3 transition-colors ${
            theme === 'dark'
              ? 'text-white group-hover:text-cyan-400'
              : 'text-gray-900 group-hover:text-orange-500'
          }`}>
            {project.title}
          </h3>

          <p className={`mb-4 flex-1 transition-all duration-300 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech, techIndex) => (
              <span
                key={techIndex}
                className={`text-xs px-2 py-1 rounded border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                    : 'bg-pink-500/20 text-pink-600 border-pink-500/30'
                }`}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className={`text-xs px-2 py-1 rounded transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              <motion.a
                href={project.github}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <Github size={20} className={`transition-all duration-300 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`} />
              </motion.a>
              <motion.a
                href={project.live}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <ExternalLink size={20} className={`transition-all duration-300 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`} />
              </motion.a>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedProject(project.id)}
              className={`px-4 py-2 text-white rounded-lg text-sm font-medium transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600'
                  : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600'
              }`}
            >
              View Details
            </motion.button>
          </div>
        </div>
      </motion.div>
    </InteractiveCard>
  );

  return (
    <section id="projects" ref={projectsRef} className={`py-20 transition-all duration-800 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className={`transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent'
            }`}>
              Featured Projects
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-all duration-300 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            A showcase of my work spanning web development, bioinformatics, and data science projects 
            that demonstrate my interdisciplinary approach to problem-solving.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Filter size={20} className={`transition-all duration-300 ${
              theme === 'dark' ? 'text-cyan-400' : 'text-orange-500'
            }`} />
            <span className={`transition-all duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Filter by category:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? theme === 'dark'
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                      : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                    : theme === 'dark'
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-700'
                    : 'bg-white border-gray-200'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const project = projects.find(p => p.id === selectedProject);
                  if (!project) return null;
                  
                  return (
                    <div>
                      <div className="relative">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-64 object-cover"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t to-transparent ${
                          theme === 'dark' ? 'from-gray-900' : 'from-white'
                        }`} />
                        <button
                          onClick={() => setSelectedProject(null)}
                          className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors ${
                            theme === 'dark'
                              ? 'bg-gray-800/80 hover:bg-gray-700'
                              : 'bg-gray-600/80 hover:bg-gray-500'
                          }`}
                        >
                          ×
                        </button>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className={`text-2xl font-bold transition-all duration-300 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {project.title}
                          </h3>
                          <span className={`text-sm px-3 py-1 rounded transition-all duration-300 ${
                            theme === 'dark'
                              ? 'text-cyan-400 bg-cyan-400/10'
                              : 'text-orange-500 bg-orange-500/10'
                          }`}>
                            {project.category}
                          </span>
                        </div>
                        
                        <p className={`mb-6 leading-relaxed transition-all duration-300 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {project.longDescription}
                        </p>
                        
                        <div className="mb-6">
                          <h4 className={`text-lg font-semibold mb-3 transition-all duration-300 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                              <span
                                key={index}
                                className={`text-sm px-3 py-1 rounded border transition-all duration-300 ${
                                  theme === 'dark'
                                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                                    : 'bg-pink-500/20 text-pink-600 border-pink-500/30'
                                }`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex space-x-4">
                          <motion.a
                            href={project.github}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                              theme === 'dark'
                                ? 'bg-gray-800 hover:bg-gray-700 text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                            }`}
                          >
                            <Github size={20} />
                            <span>Source Code</span>
                          </motion.a>
                          <motion.a
                            href={project.live}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-all duration-300 ${
                              theme === 'dark'
                                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600'
                                : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600'
                            }`}
                          >
                            <ExternalLink size={20} />
                            <span>Live Demo</span>
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;