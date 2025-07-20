import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Calendar, MapPin, Award, Code, Microscope, Brain, Target, Users, BookOpen, School, Building2 } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const About = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timelineData = [
    {
      year: '2023 - Present',
      title: 'B.Tech Computer Science and Biosciences',
      organization: 'SIMATS Engineering',
      description: 'Currently pursuing an interdisciplinary program that combines computer science fundamentals with bioscience applications, focusing on computational biology and bioinformatics.',
      icon: GraduationCap,
      color: 'from-cyan-400 to-blue-500'
    },
    {
      year: '2022 - 2024',
      title: 'Higher Secondary Education',
      organization: 'Higher Secondary School',
      description: 'Completed with distinction in Science stream, specializing in Physics, Chemistry, Biology and Computer Science, laying a strong foundation for engineering studies.',
      icon: Award,
      color: 'from-purple-400 to-pink-500'
    },
  ];

  const achievements = [
    'Best Project Award in College Tech Fest',
    'Active member of Passion Pitch Club - A Startup Incubator',
    'Participated in National Science Olympiad',
    'Volunteer at local biotech awareness programs',
    'Published research paper on Energy applications',
    'Winner of inter-college Hackathon coding competition',
  ];

  const interests = [
    { icon: Code, label: 'Full-Stack Development', description: 'Building scalable web applications' },
    { icon: Microscope, label: 'Bioinformatics', description: 'Computational analysis of biological data' },
    { icon: Brain, label: 'Machine Learning', description: 'AI applications in healthcare' },
    { icon: Target, label: 'Problem Solving', description: 'Algorithmic thinking and optimization' },
  ];

  const personalValues = [
    {
      title: 'Innovation',
      description: 'Constantly seeking new ways to solve complex problems through technology',
      icon: Brain
    },
    {
      title: 'Collaboration',
      description: 'Believing in the power of teamwork and interdisciplinary approaches',
      icon: Users
    },
    {
      title: 'Learning',
      description: 'Committed to continuous growth and staying updated with latest technologies',
      icon: BookOpen
    },
  ];

  return (
    <section 
      id="about" 
      className={`py-20 transition-all duration-800 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-blue-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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
              About Me
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-all duration-300 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Passionate about leveraging technology to solve biological problems and create innovative solutions 
            that bridge the gap between computational science and life sciences.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Profile Image and Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Profile Image with 3D Effects */}
            <div className="relative group">
              <motion.div
                className="relative overflow-hidden rounded-2xl shadow-2xl"
                style={{
                  perspective: '1000px',
                  transformStyle: 'preserve-3d',
                }}
                whileHover={{
                  rotateY: 5,
                  rotateX: 5,
                  scale: 1.02,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-cyan-400/20 to-purple-400/20'
                    : 'bg-gradient-to-br from-orange-400/20 to-pink-400/20'
                } blur-xl group-hover:blur-2xl`} />
                
                <motion.img
                  src="/My image.jpg"
                  alt="Shreyan - Computer Science and Biosciences Student at SIMATS Engineering College"
                  className="relative z-10 w-full h-auto max-w-md mx-auto rounded-2xl shadow-lg"
                  style={{
                    transform: 'translateZ(20px)',
                  }}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                />
                
                {/* 3D Floating Elements */}
                <motion.div
                  className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-400'
                      : 'bg-gradient-to-r from-orange-400 to-pink-400'
                  }`}
                  animate={{
                    y: [0, -10, 0],
                    rotateZ: [0, 5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    transform: 'translateZ(40px)',
                  }}
                >
                  <Code className="text-white" size={24} />
                </motion.div>

                <motion.div
                  className={`absolute bottom-4 left-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-purple-400 to-cyan-400'
                      : 'bg-gradient-to-r from-pink-400 to-orange-400'
                  }`}
                  animate={{
                    y: [0, 8, 0],
                    rotateZ: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  style={{
                    transform: 'translateZ(30px)',
                  }}
                >
                  <Microscope className="text-white" size={20} />
                </motion.div>
              </motion.div>
            </div>

            {/* Personal Details Card */}
            <motion.div
              className={`rounded-xl p-6 border transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200 shadow-lg'
              }`}
              style={{
                transform: 'translateZ(10px)',
                transformStyle: 'preserve-3d',
              }}
              whileHover={{
                rotateX: 2,
                rotateY: 2,
                scale: 1.02,
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className={`text-2xl font-bold mb-4 transition-all duration-300 ${
                theme === 'dark' ? 'text-cyan-400' : 'text-orange-500'
              }`}>
                Personal Details
              </h3>
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <MapPin className={`transition-all duration-300 ${
                    theme === 'dark' ? 'text-purple-400' : 'text-pink-500'
                  }`} size={20} />
                  <span className={`transition-all duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Kanchipuram, Tamil Nadu, India
                  </span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <GraduationCap className={`transition-all duration-300 ${
                    theme === 'dark' ? 'text-cyan-400' : 'text-orange-500'
                  }`} size={20} />
                  <span className={`transition-all duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    SIMATS Engineering, Chennai
                  </span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Calendar className={`transition-all duration-300 ${
                    theme === 'dark' ? 'text-purple-400' : 'text-pink-500'
                  }`} size={20} />
                  <span className={`transition-all duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    2nd Year Student (2024-2028)
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Interests Grid */}
            <div className="grid grid-cols-2 gap-4">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 hover:border-cyan-400/50'
                      : 'bg-white border-gray-200 hover:border-orange-400/50 shadow-md'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                  whileHover={{
                    rotateX: 5,
                    rotateY: 5,
                    scale: 1.05,
                  }}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-400'
                      : 'bg-gradient-to-r from-orange-400 to-pink-400'
                  }`}>
                    <interest.icon size={16} className="text-white" />
                  </div>
                  <h4 className={`font-semibold text-sm mb-1 transition-all duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {interest.label}
                  </h4>
                  <p className={`text-xs transition-all duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {interest.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Academic Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <h3 className={`text-3xl font-bold mb-8 text-center transition-all duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Academic Journey
            </h3>
            
            <div className="relative space-y-8">
              {/* Timeline Line */}
              <div className={`absolute left-8 top-0 bottom-0 w-0.5 transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gradient-to-b from-cyan-400 to-purple-400'
                  : 'bg-gradient-to-b from-orange-400 to-pink-400'
              }`} />
              
              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                  className="relative flex items-start space-x-4"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                  whileHover={{
                    rotateY: 3,
                    scale: 1.02,
                  }}
                >
                  <motion.div 
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                    whileHover={{
                      rotateZ: 10,
                      scale: 1.1,
                    }}
                    style={{
                      transform: 'translateZ(20px)',
                    }}
                  >
                    <item.icon size={24} className="text-white" />
                  </motion.div>
                  
                  <div className={`flex-1 rounded-xl p-6 border transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-200 shadow-lg'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar size={16} className={`transition-all duration-300 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <span className={`text-sm transition-all duration-300 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {item.year}
                      </span>
                    </div>
                    <h4 className={`text-xl font-semibold mb-2 transition-all duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.title}
                    </h4>
                    <p className={`font-medium mb-3 transition-all duration-300 ${
                      theme === 'dark' ? 'text-cyan-400' : 'text-orange-500'
                    }`}>
                      {item.organization}
                    </p>
                    <p className={`transition-all duration-300 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className={`text-3xl font-bold mb-8 text-center transition-all duration-300 ${
            theme === 'dark' ? 'text-purple-400' : 'text-pink-500'
          }`}>
            Key Achievements
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 hover:border-purple-400/50'
                    : 'bg-white border-gray-200 hover:border-pink-400/50 shadow-md'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
                whileHover={{
                  rotateX: 5,
                  rotateY: 5,
                  scale: 1.05,
                }}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-400'
                      : 'bg-gradient-to-r from-orange-400 to-pink-400'
                  }`} />
                  <span className={`transition-all duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {achievement}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Personal Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <h3 className={`text-3xl font-bold mb-8 transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent'
          }`}>
            Core Values
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {personalValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                className={`p-6 rounded-xl border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200 shadow-lg'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
                whileHover={{
                  rotateX: 10,
                  rotateY: 10,
                  scale: 1.05,
                }}
              >
                <motion.div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-400'
                      : 'bg-gradient-to-r from-orange-400 to-pink-400'
                  }`}
                  whileHover={{
                    rotateZ: 15,
                    scale: 1.1,
                  }}
                  style={{
                    transform: 'translateZ(20px)',
                  }}
                >
                  <value.icon size={28} className="text-white" />
                </motion.div>
                <h4 className={`text-xl font-bold mb-3 transition-all duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {value.title}
                </h4>
                <p className={`transition-all duration-300 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;