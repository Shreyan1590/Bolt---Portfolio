import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Microscope, Brain, Server, Palette } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Skills = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: Code,
      color: 'from-cyan-400 to-blue-500',
      skills: [
        { name: 'Python', level: 85 },
        { name: 'JavaScript', level: 80 },
        { name: 'Java', level: 75 },
        { name: 'C++', level: 70 },
        { name: 'R', level: 65 },
      ]
    },
    {
      title: 'Web Technologies',
      icon: Server,
      color: 'from-purple-400 to-pink-500',
      skills: [
        { name: 'React.js', level: 80 },
        { name: 'Node.js', level: 75 },
        { name: 'HTML/CSS', level: 85 },
        { name: 'Express.js', level: 70 },
        { name: 'MongoDB', level: 65 },
      ]
    },
    {
      title: 'Bioinformatics',
      icon: Microscope,
      color: 'from-green-400 to-teal-500',
      skills: [
        { name: 'BioPython', level: 70 },
        { name: 'Sequence Analysis', level: 65 },
        { name: 'BLAST', level: 60 },
        { name: 'Phylogenetics', level: 55 },
        { name: 'Genomics', level: 50 },
      ]
    },
    {
      title: 'Data Science',
      icon: Brain,
      color: 'from-orange-400 to-red-500',
      skills: [
        { name: 'Machine Learning', level: 75 },
        { name: 'Data Visualization', level: 80 },
        { name: 'Statistics', level: 70 },
        { name: 'Pandas/NumPy', level: 85 },
        { name: 'Scikit-learn', level: 70 },
      ]
    },
    {
      title: 'Databases',
      icon: Database,
      color: 'from-indigo-400 to-purple-500',
      skills: [
        { name: 'MySQL', level: 75 },
        { name: 'PostgreSQL', level: 70 },
        { name: 'MongoDB', level: 65 },
        { name: 'SQLite', level: 80 },
        { name: 'Redis', level: 60 },
      ]
    },
    {
      title: 'Design & Tools',
      icon: Palette,
      color: 'from-pink-400 to-rose-500',
      skills: [
        { name: 'Figma', level: 75 },
        { name: 'Git/GitHub', level: 85 },
        { name: 'Docker', level: 60 },
        { name: 'Linux', level: 70 },
        { name: 'Adobe Creative Suite', level: 65 },
      ]
    },
  ];

  const SkillBar = ({ skill, index }: { skill: { name: string; level: number }, index: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-2">
        <span className={`font-medium transition-all duration-300 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {skill.name}
        </span>
        <span className={`text-sm transition-all duration-300 ${
          theme === 'dark' ? 'text-cyan-400' : 'text-orange-500'
        }`}>
          {skill.level}%
        </span>
      </div>
      <div className={`w-full rounded-full h-2 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
      }`}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: 0.2 * index }}
          className={`h-2 rounded-full transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-cyan-400 to-purple-400'
              : 'bg-gradient-to-r from-orange-400 to-pink-400'
          }`}
        />
      </div>
    </motion.div>
  );

  return (
    <section id="skills" className={`py-20 transition-all duration-800 ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'
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
              Technical Skills
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-all duration-300 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            A comprehensive overview of my technical expertise spanning computer science, 
            bioinformatics, and interdisciplinary technologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 * categoryIndex }}
              className={`rounded-xl p-6 border transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-700 hover:border-cyan-400/50'
                  : 'bg-white border-gray-200 hover:border-orange-400/50 shadow-lg'
              }`}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                  <category.icon size={24} className="text-white" />
                </div>
                <h3 className={`text-xl font-bold transition-all duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar key={skill.name} skill={skill} index={skillIndex} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className={`text-2xl font-bold mb-8 transition-all duration-300 ${
            theme === 'dark' ? 'text-cyan-400' : 'text-orange-500'
          }`}>
            Additional Competencies
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Agile Development', 'Team Leadership', 'Technical Writing', 'Problem Solving',
              'Research Methodology', 'Project Management', 'Public Speaking', 'Critical Thinking'
            ].map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-cyan-300 hover:from-cyan-500/30 hover:to-purple-500/30'
                    : 'bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-400/30 text-orange-600 hover:from-orange-500/30 hover:to-pink-500/30'
                }`}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;