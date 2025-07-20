import React from 'react';
import { motion } from 'framer-motion';
import { Building } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { Microscope, Brain, Dna, ChartBar, BookOpen, Users } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Research = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const researchAreas = [
    {
      title: 'Computational Biology',
      description: 'Developing algorithms for biological sequence analysis, protein folding prediction, and genomic data interpretation.',
      icon: Dna,
      color: 'from-green-400 to-teal-500',
      projects: [
        'Protein Structure Prediction using Deep Learning',
        'Genomic Variant Analysis Pipeline',
        'Phylogenetic Tree Construction Algorithms'
      ]
    },
    {
      title: 'Bioinformatics',
      description: 'Creating tools and databases for biological data analysis, focusing on genomics and proteomics applications.',
      icon: Microscope,
      color: 'from-cyan-400 to-blue-500',
      projects: [
        'Gene Expression Analysis Framework',
        'Metabolic Pathway Visualization Tool',
        'Biomarker Discovery Platform'
      ]
    },
    {
      title: 'Machine Learning in Biology',
      description: 'Applying AI and machine learning techniques to solve complex biological problems and predict biological phenomena.',
      icon: Brain,
      color: 'from-purple-400 to-pink-500',
      projects: [
        'Drug-Target Interaction Prediction',
        'Disease Classification from Genetic Data',
        'Protein Function Prediction Models'
      ]
    },
    {
      title: 'Data Science for Healthcare',
      description: 'Leveraging big data analytics to improve healthcare outcomes and develop personalized medicine solutions.',
      icon: ChartBar,
      color: 'from-orange-400 to-red-500',
      projects: [
        'Electronic Health Record Analysis',
        'Predictive Models for Disease Onset',
        'Clinical Decision Support Systems'
      ]
    },
  ];

  const publications = [
    {
      title: 'Machine Learning Approaches for Protein Structure Prediction',
      authors: 'Shreyan Kumar, Dr. Research Supervisor',
      journal: 'Student Research Journal',
      year: '2024',
      status: 'Under Review'
    },
    {
      title: 'Comparative Analysis of Genomic Variant Calling Algorithms',
      authors: 'Shreyan Kumar, Research Team',
      journal: 'Undergraduate Research Conference',
      year: '2024',
      status: 'Presented'
    },
  ];

  const ResearchCard = ({ area, index }: { area: typeof researchAreas[0], index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      className={`rounded-xl p-6 border transition-all duration-300 group ${
        theme === 'dark'
          ? 'bg-gray-900 border-gray-700 hover:border-cyan-400/50'
          : 'bg-white border-gray-200 hover:border-orange-400/50 shadow-lg'
      }`}
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${area.color} flex items-center justify-center`}>
          <area.icon size={24} className="text-white" />
        </div>
        <h3 className={`text-xl font-bold transition-colors ${
          theme === 'dark'
            ? 'text-white group-hover:text-cyan-400'
            : 'text-gray-900 group-hover:text-orange-500'
        }`}>
          {area.title}
        </h3>
      </div>

      <p className={`mb-4 leading-relaxed transition-all duration-300 ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
      }`}>
        {area.description}
      </p>

      <div className="space-y-2">
        <h4 className={`text-sm font-semibold transition-all duration-300 ${
          theme === 'dark' ? 'text-purple-400' : 'text-pink-500'
        }`}>
          Current Projects:
        </h4>
        <ul className="space-y-1">
          {area.projects.map((project, projectIndex) => (
            <li key={projectIndex} className={`text-sm flex items-start space-x-2 transition-all duration-300 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <div className={`w-1 h-1 rounded-full mt-2 flex-shrink-0 transition-all duration-300 ${
                theme === 'dark' ? 'bg-cyan-400' : 'bg-orange-400'
              }`}></div>
              <span>{project}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );

  return (
    <section id="research" className={`py-20 transition-all duration-800 ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
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
              Research Interests
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-all duration-300 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Exploring the intersection of computer science and biological sciences through innovative research 
            projects and collaborative studies.
          </p>
        </motion.div>

        {/* Research Areas */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {researchAreas.map((area, index) => (
            <ResearchCard key={area.title} area={area} index={index} />
          ))}
        </div>

        {/* Publications & Presentations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold mb-8 text-center">
            <span className={`transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent'
            }`}>
              Publications & Presentations
            </span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {publications.map((pub, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                className={`rounded-xl p-6 border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-700'
                    : 'bg-white border-gray-200 shadow-lg'
                }`}
              >
              <div className="flex items-start space-x-3 mb-3">
                  <BookOpen className={`mt-1 transition-all duration-300 ${
                    theme === 'dark' ? 'text-cyan-400' : 'text-orange-500'
                  }`} size={20} />
                  <div>
                    <h4 className={`text-lg font-semibold mb-2 transition-all duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {pub.title}
                    </h4>
                    <p className={`text-sm mb-1 transition-all duration-300 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {pub.authors}
                    </p>
                    <p className={`text-sm mb-2 transition-all duration-300 ${
                      theme === 'dark' ? 'text-purple-400' : 'text-pink-500'
                    }`}>
                      {pub.journal} ({pub.year})
                    </p>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      pub.status === 'Published' ? 'bg-green-500/20 text-green-400' :
                      pub.status === 'Under Review' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {pub.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Research Goals */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-8">
           <span className={`transition-all duration-300 ${
             theme === 'dark'
               ? 'bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'
               : 'bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent'
           }`}>
              Research Goals
            </span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: 'Innovation',
                description: 'Develop novel computational methods for biological problem-solving'
              },
              {
                icon: Users,
                title: 'Collaboration',
                description: 'Work with interdisciplinary teams to advance scientific knowledge'
              },
              {
                icon: ChartBar,
                title: 'Impact',
                description: 'Create solutions that improve healthcare and biological research'
              }
            ].map((goal, index) => (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                className={`rounded-xl p-6 border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-700'
                    : 'bg-white border-gray-200 shadow-lg'
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-400'
                    : 'bg-gradient-to-r from-orange-400 to-pink-400'
                }`}>
                  <goal.icon size={28} className="text-white" />
                </div>
                <h4 className={`text-xl font-bold mb-3 transition-all duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {goal.title}
                </h4>
                <p className={`transition-all duration-300 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {goal.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Research;