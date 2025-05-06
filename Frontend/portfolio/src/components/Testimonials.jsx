import React from 'react';
import { motion } from 'framer-motion';

// Testimonial card component
const TestimonialCard = ({ name, role, quote, image, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-white shadow-lg"
    >
      <div className="flex items-center gap-4 mb-4">
        <img src={image} alt={name} className="w-14 h-14 rounded-full object-cover border-2 border-blue-500" />
        <div>
          <h4 className="text-lg font-bold">{name}</h4>
          <p className="text-sm text-gray-400">{role}</p>
        </div>
      </div>
      <p className="text-gray-300 italic">“{quote}”</p>
    </motion.div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Williams',
      role: 'Startup Founder',
      quote: 'Absolutely amazing! This developer transformed our ideas into a stunning product.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      name: 'David Chen',
      role: 'Product Manager',
      quote: 'Their attention to detail and communication made the whole process smooth and enjoyable.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Anjali Perera',
      role: 'Freelance Designer',
      quote: 'Always on time, clean code, and beautiful UI. Highly recommended!',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
  ];

  return (
    <section id="testimonials" className="relative py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What People Say</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            A few kind words from clients and collaborators I've worked with.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <TestimonialCard
              key={index}
              name={item.name}
              role={item.role}
              quote={item.quote}
              image={item.image}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
