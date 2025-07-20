import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { useForm as useFormspree } from '@formspree/react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, CheckCircle } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Formspree hook
  const [formspreeState, formspreeHandleSubmit] = useFormspree("xovlqpaa");
  
  // React Hook Form
  const { 
    register, 
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>();

  // Combined submit handler
  const onSubmit = async (data: FormData) => {
    const response = await formspreeHandleSubmit(data);
    if (response && response.ok) {
      reset();
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'shreyanofficial25@gmail.com',
      href: 'mailto:shreyanofficial25@gmail.com',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9894837250',
      href: 'tel:+919894837250',
      color: 'from-green-400 to-teal-500'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Kanchipuram, Tamil Nadu, India',
      href: '#',
      color: 'from-purple-400 to-pink-500'
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/shreyan1590',
      color: 'hover:text-gray-400'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/shreyan_2596',
      color: 'hover:text-blue-400'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: '#',
      color: 'hover:text-cyan-400'
    },
  ];

  return (
    <section id="contact" className={`py-20 transition-all duration-800 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-blue-50'
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
              Get In Touch
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-all duration-300 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            I'm always open to discussing new opportunities, collaborations, or just having a conversation 
            about technology and biology. Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className={`text-2xl font-bold mb-6 transition-all duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 group ${
                      theme === 'dark'
                        ? 'bg-gray-800 hover:bg-gray-700'
                        : 'bg-white hover:bg-gray-50 shadow-lg'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${info.color} flex items-center justify-center`}>
                      <info.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <p className={`text-sm transition-all duration-300 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {info.label}
                      </p>
                      <p className={`font-medium transition-colors ${
                        theme === 'dark'
                          ? 'text-white group-hover:text-cyan-400'
                          : 'text-gray-900 group-hover:text-orange-500'
                      }`}>
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className={`text-2xl font-bold mb-6 transition-all duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Connect on Social Media
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-14 h-14 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      theme === 'dark'
                        ? `bg-gray-800 text-gray-300 hover:bg-gray-700 ${social.color}`
                        : `bg-white text-gray-600 hover:bg-gray-50 shadow-lg ${social.color.replace('hover:text-', 'hover:text-')}`
                    }`}
                    aria-label={social.label}
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className={`rounded-xl p-6 border transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200 shadow-lg'
            }`}>
              <h4 className={`text-xl font-bold mb-4 transition-all duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Quick Facts
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className={`transition-all duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Available for internships
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    theme === 'dark' ? 'bg-cyan-400' : 'bg-orange-400'
                  }`}></div>
                  <span className={`transition-all duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Open to research collaborations
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    theme === 'dark' ? 'bg-purple-400' : 'bg-pink-400'
                  }`}></div>
                  <span className={`transition-all duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Interested in freelance projects
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`rounded-xl p-8 border transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200 shadow-lg'
            }`}
          >
            <h3 className={`text-2xl font-bold mb-6 transition-all duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Send me a message
            </h3>
            
            {formspreeState.succeeded ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h4 className={`text-xl font-semibold mb-2 transition-all duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Message Sent!
                </h4>
                <p className={`transition-all duration-300 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className={`block text-sm font-medium mb-2 transition-all duration-300 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      First Name
                    </label>
                    <input
                      {...register('firstName', { required: 'First name is required' })}
                      type="text"
                      id="firstName"
                      name="firstName"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-orange-400 focus:ring-orange-400/20'
                      }`}
                      placeholder="First Name"
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-sm mt-1">{errors.firstName.message as string}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className={`block text-sm font-medium mb-2 transition-all duration-300 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Last Name
                    </label>
                    <input
                      {...register('lastName', { required: 'Last name is required' })}
                      type="text"
                      id="lastName"
                      name="lastName"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-orange-400 focus:ring-orange-400/20'
                      }`}
                      placeholder="Last Name"
                    />
                    {errors.lastName && (
                      <p className="text-red-400 text-sm mt-1">{errors.lastName.message as string}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 transition-all duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email Address
                  </label>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Please enter a valid email'
                      }
                    })}
                    type="email"
                    id="email"
                    name="email"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-orange-400 focus:ring-orange-400/20'
                    }`}
                    placeholder="mail@example.com"
                  />
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={formspreeState.errors}
                    className="text-red-400 text-sm mt-1"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message as string}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className={`block text-sm font-medium mb-2 transition-all duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Subject
                  </label>
                  <input
                    {...register('subject', { required: 'Subject is required' })}
                    type="text"
                    id="subject"
                    name="subject"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-orange-400 focus:ring-orange-400/20'
                    }`}
                    placeholder="Enter the subject of your message"
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-sm mt-1">{errors.subject.message as string}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className={`block text-sm font-medium mb-2 transition-all duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Message
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    id="message"
                    name="message"
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-orange-400 focus:ring-orange-400/20'
                    }`}
                    placeholder="Type your message here..."
                  />
                  <ValidationError 
                    prefix="Message" 
                    field="message"
                    errors={formspreeState.errors}
                    className="text-red-400 text-sm mt-1"
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.message.message as string}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={formspreeState.submitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full px-6 py-3 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600'
                      : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600'
                  } ${formspreeState.submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  <Send size={20} />
                  <span>{formspreeState.submitting ? 'Sending...' : 'Send Message'}</span>
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;