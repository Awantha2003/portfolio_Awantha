import React from 'react';
import { motion } from 'framer-motion';
import { BriefcaseIcon, CalendarIcon } from 'lucide-react';

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
          <span key={index} className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-blue-400">
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
      title: 'Software Engineering Intern',
      company: 'SLIIT / Local Software Company',
      period: 'Jan 2025 - Present',
      description:
        'Assisting in the development of web applications using the MERN stack. Collaborating on frontend design and backend APIs while following agile practices.',
      skills: ['Java', 'MongoDB', 'React.js', 'Node.js', 'Express.js', 'UI/UX'],
    },
    {
      title: 'Data Science Intern (Virtual)',
      company: 'CodSoft',
      period: 'Nov 2024 - Dec 2024',
      description:
        'Worked on data analysis and machine learning mini-projects. Gained practical experience in data preprocessing, visualization, and using tools like pandas and scikit-learn.',
      skills: ['Python', 'Pandas', 'Machine Learning', 'Data Analysis'],
    },
  ];

  return (
    <section id="experience" className="relative py-20 bg-gray-900">
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
