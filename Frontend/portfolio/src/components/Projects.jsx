import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronRight, ChevronLeft, Plus } from 'lucide-react';

// Particle background effect component
const ParticleBackground = () => {
  const particles = Array.from({ length: 20 });
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-blue-500/30"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5 + 0.1
          }}
          animate={{ 
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: [0.1, 0.5, 0.1]
          }}
          transition={{ 
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// Featured badge component
const FeaturedBadge = () => (
  <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-blue-600 rounded-full text-xs font-medium text-white shadow-lg flex items-center gap-1">
    <span className="block w-2 h-2 rounded-full bg-blue-300 animate-pulse"></span>
    Featured
  </div>
);

// Tech stack pill component with hover effect
const TechPill = ({ tech }) => (
  <motion.span 
    whileHover={{ scale: 1.05, y: -2 }}
    className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-blue-400 border border-gray-700 hover:border-blue-500/50 transition-all"
  >
    {tech}
  </motion.span>
);

// Project card component with enhanced effects
const ProjectCard = ({ title, description, image, tech, liveLink, githubLink, index, featured }) => {
  const imageUrl = `http://localhost:5000${image}`;
  const cardRef = useRef(null);

  // Custom hover animation for card
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 50
      }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl overflow-hidden transition-all group"
      style={{
        boxShadow: isHovered ? "0 20px 25px -5px rgba(37, 99, 235, 0.1), 0 10px 10px -5px rgba(37, 99, 235, 0.04)" : "none"
      }}
    >
      {featured && <FeaturedBadge />}
      
      <div className="relative h-[220px] overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent z-10"
          animate={{ opacity: isHovered ? 0.8 : 0.6 }}
        />
        
        <motion.img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          animate={{ 
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.4 }}
        />
        
        <motion.div 
          className="absolute bottom-4 left-4 z-20"
          animate={{ y: isHovered ? -4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <div className="h-0.5 w-0 bg-blue-500 group-hover:w-1/2 transition-all duration-300"></div>
        </motion.div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-300 mb-4 line-clamp-3">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {tech.map((item, i) => (
            <TechPill key={i} tech={item} />
          ))}
        </div>
        
        <div className="flex gap-4">
          <motion.a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-600 rounded-lg text-white flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <ExternalLink size={16} />
            <span>Live Demo</span>
          </motion.a>
          
          <motion.a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gray-700 rounded-lg text-white flex items-center gap-2 hover:bg-gray-600 transition-colors"
          >
            <Github size={16} />
            <span>GitHub</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

// Modal component for project details
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 50 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };
  
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };
  
  const imageUrl = `http://localhost:5000${project.image}`;
  
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div 
          className="relative bg-gray-800 rounded-xl max-w-3xl w-full mx-4 overflow-hidden"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={e => e.stopPropagation()}
        >
          <button 
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-900/80 text-white"
            onClick={onClose}
          >
            <Plus className="rotate-45" size={20} />
          </button>
          
          <div className="h-64 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
            <img src={imageUrl} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-6 left-6">
              <h2 className="text-2xl font-bold text-white">{project.title}</h2>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-gray-300 mb-6">{project.description}</p>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((item, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-blue-400">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end gap-4">
              <motion.a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-600 rounded-lg text-white flex items-center gap-2"
              >
                <ExternalLink size={16} />
                Visit Site
              </motion.a>
              
              <motion.a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gray-700 rounded-lg text-white flex items-center gap-2"
              >
                <Github size={16} />
                View Code
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Main Projects component with advanced effects
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const projectsPerPage = 6;
  
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  
  // Simulate fetching projects
  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then((res) => res.json())
      .then((data) => {
        // Add featured flag to some projects
        const enhancedData = data.map((project, index) => ({
          ...project,
          featured: index % 3 === 0 // Mark every third project as featured
        }));
        setProjects(enhancedData);
        setFilteredProjects(enhancedData);
      })
      .catch((err) => console.error('Failed to fetch projects:', err));
  }, []);
  
  // Filter projects
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(project => project.tech.includes(activeFilter))
      );
    }
    setCurrentPage(0);
  }, [activeFilter, projects]);
  
  // Get current page projects
  const currentProjects = filteredProjects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  
  // Get unique tech categories
  const techCategories = ['All', ...new Set(projects.flatMap(p => p.tech))];
  
  return (
    <section id="projects" ref={sectionRef} className="relative py-24 bg-gray-900 overflow-hidden">
      {/* Background elements */}
      <ParticleBackground />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          style={{ opacity, y }}
          className="mb-16 text-center"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="px-4 py-1 bg-blue-900/30 border border-blue-500/30 rounded-full text-blue-400 text-sm inline-block mb-3"
          >
            What I've Built
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400"
          >
            My Projects
          </motion.h2>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-blue-500 mx-auto"
          ></motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-gray-300 max-w-2xl mx-auto"
          >
            Here are some of my recent projects. Each one is crafted with attention to detail and focus on user experience.
          </motion.p>
        </motion.div>
        
        {/* Filter tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {techCategories.slice(0, 8).map((tech, index) => (
            <motion.button
              key={tech}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(tech)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === tech 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tech}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {currentProjects.map((project, index) => (
              <ProjectCard
                key={project._id || index}
                title={project.title}
                description={project.description}
                image={project.image}
                tech={project.tech}
                liveLink={project.liveLink}
                githubLink={project.githubLink}
                featured={project.featured}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center items-center gap-2 mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentPage === 0 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              <ChevronLeft size={18} />
            </motion.button>
            
            {Array.from({ length: totalPages }).map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentPage(index)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentPage === index 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {index + 1}
              </motion.button>
            ))}
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={currentPage === totalPages - 1}
              onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentPage === totalPages - 1 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              <ChevronRight size={18} />
            </motion.button>
          </motion.div>
        )}
        
        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg text-white font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all"
          >
            Let's Work Together
          </motion.a>
        </motion.div>
      </div>
      
      {/* Project detail modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;