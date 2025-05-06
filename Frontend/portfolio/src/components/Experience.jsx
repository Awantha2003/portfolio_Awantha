import React from 'react';
import { motion } from 'framer-motion';
import { BriefcaseIcon, CalendarIcon } from 'lucide-react';

// Experience card component
const ExperienceCard = ({ title, company, period, description, skills, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <BriefcaseIcon size={24} className="text-blue-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-blue-400">{company}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-4 text-gray-400">
        <CalendarIcon size={16} />
        <span>{period}</span>
      </div>
      <p className="text-gray-300 mb-5">{description}</p>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-blue-400"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const experiences = [
    {
      title: 'Junior Frontend Developer',
      company: 'TechSolutions Inc.',
      period: 'Jan 2023 - Present',
      description:
        'Working on developing responsive web applications using React and collaborating with the design team to implement UI/UX improvements.',
      skills: ['React', 'JavaScript', 'UI/UX', 'Tailwind CSS'],
    },
    {
      title: 'Web Development Intern',
      company: 'Digital Innovations',
      period: 'Jun 2022 - Dec 2022',
      description:
        'Assisted in developing and maintaining company websites and web applications. Worked on implementing responsive designs and optimizing performance.',
      skills: ['HTML/CSS', 'JavaScript', 'WordPress', 'PHP'],
    },
  ];

  return (
    <section id="experience" className="relative py-20 bg-gray-900">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px]" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            My professional journey and work experience in the tech industry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={index}
              title={exp.title}
              company={exp.company}
              period={exp.period}
              description={exp.description}
              skills={exp.skills}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
