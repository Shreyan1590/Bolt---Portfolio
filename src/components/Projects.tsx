import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import InteractiveCard from './InteractiveCard';
import ResponsiveImage from './ResponsiveImage';
import { Github, ExternalLink, Code, Database, Microscope, Brain, Filter } from 'lucide-react';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const projectsRef = useScrollAnimation();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const categories = ['All', 'Web Development', 'Bioinformatics', 'Data Science', 'Mobile'];

  const projects = [
    {
      id: 1,
      title: 'Genomic Sequence Analyzer',
      category: 'Bioinformatics',
      description: 'A comprehensive tool for analyzing DNA sequences with pattern recognition and mutation detection capabilities.',
      longDescription: 'This bioinformatics application provides researchers with advanced tools for genomic analysis. Features include sequence alignment, mutation detection, phylogenetic analysis, and visualization of genetic patterns. Built with Python and BioPython, it processes large genomic datasets efficiently.',
      image: 'https://images.pexels.com/photos/3825580/pexels-photo-3825580.jpeg?auto=compress&cs=tinysrgb&w=500',
      technologies: ['Python', 'BioPython', 'NumPy', 'Matplotlib', 'Pandas'],
      github: '#',
      live: '#',
      icon: Microscope,
      color: 'from-green-400 to-teal-500'
    },
    {
      id: 2,
      title: 'React Task Management App',
      category: 'Web Development',
      description: 'A modern task management application with real-time collaboration features and intuitive UI.',
      longDescription: 'Full-stack web application for team collaboration and task management. Features include real-time updates, user authentication, project organization, and analytics dashboard. Built with React, Node.js, and MongoDB.',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=500',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Tailwind CSS'],
      github: '#',
      live: '#',
      icon: Code,
      color: 'from-blue-400 to-purple-500'
    },
    {
      id: 3,
      title: 'Disease Prediction ML Model',
      category: 'Data Science',
      description: 'Machine learning model for early disease prediction using patient data and symptoms analysis.',
      longDescription: 'Advanced machine learning system that analyzes patient symptoms and medical history to predict potential diseases. Uses ensemble methods and feature engineering to achieve high accuracy. Includes a web interface for healthcare professionals.',
      image: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=500',
      technologies: ['Python', 'Scikit-learn', 'Flask', 'PostgreSQL', 'TensorFlow'],
      github: '#',
      live: '#',
      icon: Brain,
      color: 'from-red-400 to-pink-500'
    },
    {
      id: 4,
      title: 'Protein Structure Visualizer',
      category: 'Bioinformatics',
      description: '3D protein structure visualization tool with interactive molecular analysis features.',
      longDescription: 'Interactive web application for visualizing and analyzing protein structures. Features include 3D rendering, molecular docking simulation, and structural comparison tools. Designed for researchers and students in structural biology.',
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=500',
      technologies: ['Three.js', 'React', 'WebGL', 'PDB Parser', 'D3.js'],
      github: '#',
      live: '#',
      icon: Microscope,
      color: 'from-cyan-400 to-blue-500'
    },
    {
      id: 5,
      title: 'Student Portal System',
      category: 'Web Development',
      description: 'Complete student management system with course enrollment, grades, and communication features.',
      longDescription: 'Comprehensive web platform for educational institutions. Includes student registration, course management, grade tracking, assignment submission, and communication tools. Built with modern web technologies and responsive design.',
      image: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=500',
      technologies: ['React', 'Express.js', 'MySQL', 'JWT', 'Bootstrap'],
      github: '#',
      live: '#',
      icon: Database,
      color: 'from-purple-400 to-indigo-500'
    },
    {
      id: 6,
      title: 'Biometric Analysis Dashboard',
      category: 'Data Science',
      description: 'Real-time biometric data analysis with machine learning insights and health monitoring.',
      longDescription: 'Advanced dashboard for analyzing biometric data from wearable devices. Provides real-time monitoring, trend analysis, and health insights using machine learning algorithms. Includes predictive analytics for health risk assessment.',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=500',
      technologies: ['Python', 'Streamlit', 'Pandas', 'Plotly', 'Redis'],
      github: '#',
      live: '#',
      icon: Brain,
      color: 'from-orange-400 to-red-500'
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
      >
        <div className="relative overflow-hidden h-48">
          <ResponsiveImage
            src={project.image}
            alt={project.title}
            className="w-full h-full transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
          <div className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r ${project.color} flex items-center justify-center`}>
            <project.icon size={24} className="text-white" />
          </div>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">
              {project.category}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>

          <p className="text-gray-300 mb-4 flex-1">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded border border-purple-500/30"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
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
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Github size={20} className="text-gray-300" />
              </motion.a>
              <motion.a
                href={project.live}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ExternalLink size={20} className="text-gray-300" />
              </motion.a>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedProject(project.id)}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
            >
              View Details
            </motion.button>
          </div>
        </div>
      </motion.div>
    </InteractiveCard>
  );

  return (
    <section id="projects" ref={projectsRef} className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
            <Filter size={20} className="text-cyan-400" />
            <span className="text-gray-300">Filter by category:</span>
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
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
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
                className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
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
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                        <button
                          onClick={() => setSelectedProject(null)}
                          className="absolute top-4 right-4 w-8 h-8 bg-gray-800/80 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                          <span className="text-sm text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded">
                            {project.category}
                          </span>
                        </div>
                        
                        <p className="text-gray-300 mb-6 leading-relaxed">
                          {project.longDescription}
                        </p>
                        
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                              <span
                                key={index}
                                className="text-sm bg-purple-500/20 text-purple-300 px-3 py-1 rounded border border-purple-500/30"
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
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                          >
                            <Github size={20} />
                            <span>Source Code</span>
                          </motion.a>
                          <motion.a
                            href={project.live}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
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