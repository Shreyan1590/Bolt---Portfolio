import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timelineData = [
    {
      year: '2023 - Present',
      title: 'B.Tech Computer Science and Biosciences',
      organization: 'SIMATS Engineering College',
      description: 'Currently pursuing interdisciplinary program combining computer science fundamentals with bioscience applications.',
      icon: GraduationCap,
      color: 'from-cyan-400 to-blue-500'
    },
    {
      year: '2022 - 2023',
      title: 'Higher Secondary Education',
      organization: 'Senior Secondary School',
      description: 'Completed with focus on Science stream, laying foundation for engineering studies.',
      icon: Award,
      color: 'from-purple-400 to-pink-500'
    },
  ];

  const achievements = [
    'Dean\'s List for Academic Excellence',
    'Active member of Computer Science Society',
    'Participated in National Science Olympiad',
    'Volunteer at local biotech awareness programs',
  ];

  return (
    <section id="about" className="py-20 bg-gray-900">
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
              About Me
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Passionate about leveraging technology to solve biological problems and create innovative solutions 
            that bridge the gap between computational science and life sciences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">Personal Details</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="text-purple-400" size={20} />
                  <span className="text-gray-300">Chennai, Tamil Nadu, India</span>
                </div>
                <div className="flex items-center space-x-3">
                  <GraduationCap className="text-cyan-400" size={20} />
                  <span className="text-gray-300">SIMATS Engineering College</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="text-purple-400" size={20} />
                  <span className="text-gray-300">2nd Year Student</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Key Achievements</h3>
              <ul className="space-y-3">
                {achievements.map((achievement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Academic Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Academic Journey</h3>
            
            <div className="relative space-y-8">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-purple-400"></div>
              
              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                  className="relative flex items-start space-x-4"
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center flex-shrink-0`}>
                    <item.icon size={24} className="text-white" />
                  </div>
                  
                  <div className="flex-1 bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-400">{item.year}</span>
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                    <p className="text-cyan-400 font-medium mb-3">{item.organization}</p>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;