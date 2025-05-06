import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Project from './models/Project.js';

dotenv.config();
connectDB();

const seedProjects = async () => {
  try {
    await Project.deleteMany();

    const sampleProjects = [
      {
        title: 'E-commerce Platform',
        description: 'A full-featured online shopping platform with cart, payment integration, and admin dashboard.',
        image: 'https://images.unsplash.com/photo-1661956602944-249bcd04b63f?auto=format&fit=crop&w=1170&q=80',
        tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        liveLink: '#',
        githubLink: '#',
      },
      {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates and team features.',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1170&q=80',
        tech: ['React', 'Firebase', 'Tailwind CSS', 'Redux'],
        liveLink: '#',
        githubLink: '#',
      },
      {
        title: 'Weather Dashboard',
        description: 'A weather application showing forecasts, historical data, and location-based information.',
        image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=1170&q=80',
        tech: ['React', 'OpenWeather API', 'Chart.js', 'Geolocation'],
        liveLink: '#',
        githubLink: '#',
      }
    ];

    await Project.insertMany(sampleProjects);
    console.log('✅ Projects seeded!');
    process.exit();
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedProjects();
