import React from 'react';
import { motion } from 'framer-motion';
import { CodeIcon, DatabaseIcon, PaletteIcon, ServerIcon, LayoutIcon } from 'lucide-react';

// Skill card component
const SkillCard = ({ icon, title, skills, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all"
    >
      <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 ${color}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <ul className="space-y-2">
        {skills.map((skill, index) => (
          <li key={index} className="text-gray-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const Skills = () => {
  const skillCategories = [
    {
      icon: <CodeIcon size={28} className="text-white" />,
      title: 'Frontend Development',
      color: 'bg-gradient-to-br from-blue-500 to-blue-700',
      skills: ['HTML5 & CSS3', 'JavaScript/TypeScript', 'React.js', 'Tailwind CSS'],
    },
    {
      icon: <ServerIcon size={28} className="text-white" />,
      title: 'Backend Development',
      color: 'bg-gradient-to-br from-green-500 to-green-700',
      skills: ['Node.js', 'Express', 'MongoDB', 'RESTful APIs'],
    },
    {
      icon: <LayoutIcon size={28} className="text-white" />,
      title: 'UI/UX Design',
      color: 'bg-gradient-to-br from-purple-500 to-purple-700',
      skills: ['Figma', 'Adobe XD', 'Wireframing', 'Prototyping'],
    },
    {
      icon: <DatabaseIcon size={28} className="text-white" />,
      title: 'Database',
      color: 'bg-gradient-to-br from-yellow-500 to-yellow-700',
      skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase'],
    },
    {
      icon: <div className="text-white" />, // fixed: dummy div for missing icon
      title: 'Dev Tools',
      color: 'bg-gradient-to-br from-red-500 to-red-700',
      skills: ['Git & GitHub', 'VS Code', 'Webpack', 'Docker'],
    },
    {
      icon: <PaletteIcon size={28} className="text-white" />,
      title: 'Design Tools',
      color: 'bg-gradient-to-br from-pink-500 to-pink-700',
      skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator'],
    },
  ];

  return (
    <section id="skills" className="relative py-20 bg-gray-900">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px]" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            I've worked with a range of technologies in the web development world, from front-end
            to back-end and design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={index}
              icon={category.icon}
              title={category.title}
              skills={category.skills}
              color={category.color}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
