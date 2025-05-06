import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLinkIcon, GithubIcon } from 'lucide-react';

// Project card component
const ProjectCard = ({ title, description, image, tech, liveLink, githubLink, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all"
    >
      <div className="relative h-[200px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60 z-10"></div>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute bottom-4 left-4 z-20">
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tech.map((item, i) => (
            <span key={i} className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-blue-400">
              {item}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 rounded-lg text-white flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <ExternalLinkIcon size={16} />
            Live Demo
          </a>
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-700 rounded-lg text-white flex items-center gap-2 hover:bg-gray-600 transition-colors"
          >
            <GithubIcon size={16} />
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'A full-featured online shopping platform with cart, payment integration, and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveLink: '#',
      githubLink: '#',
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team features.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      tech: ['React', 'Firebase', 'Tailwind CSS', 'Redux'],
      liveLink: '#',
      githubLink: '#',
    },
    {
      title: 'Weather Dashboard',
      description: 'A weather application showing forecasts, historical data, and location-based information.',
      image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      tech: ['React', 'OpenWeather API', 'Chart.js', 'Geolocation'],
      liveLink: '#',
      githubLink: '#',
    },
  ];

  return (
    <section id="projects" className="relative py-20 bg-gray-900">
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Here are some of my recent projects. Each one is crafted with
            attention to detail and focus on user experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              tech={project.tech}
              liveLink={project.liveLink}
              githubLink={project.githubLink}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="#"
            className="text-blue-400 hover:text-blue-500 font-medium inline-flex items-center gap-2"
          >
            View All Projects
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
