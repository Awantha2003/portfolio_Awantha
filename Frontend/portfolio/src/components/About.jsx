import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="relative py-20 bg-gray-900">
      {/* Background blob */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px]" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image/Blob section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-2/5 relative"
          >
            <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[250px] h-[250px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden border-4 border-gray-800">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-3/5"
          >
            <h3 className="text-2xl font-bold mb-4 text-blue-400">
              Full Stack Developer & UI/UX Designer
            </h3>
            <p className="text-gray-300 mb-6">
              I'm a passionate developer and designer with a strong focus on creating beautiful,
              functional websites and applications. With expertise in both front-end and back-end
              technologies, I bring ideas to life with clean code and stunning designs.
            </p>
            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-3 text-gray-100">Education</h4>
              <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-blue-500 before:rounded-full before:z-10 ml-2 before:shadow-[0_0_0_4px_rgba(59,130,246,0.3)]">
                <h5 className="text-lg font-medium text-gray-200">BSc in Computer Science</h5>
                <p className="text-gray-400">SLIIT - 2023-2027</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="font-semibold text-gray-100">Name:</h4>
                <p className="text-gray-400">John Doe</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-100">Email:</h4>
                <p className="text-gray-400">john@example.com</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-100">Location:</h4>
                <p className="text-gray-400">Colombo, Sri Lanka</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-100">Availability:</h4>
                <p className="text-gray-400">Available for freelance</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              Download CV
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
