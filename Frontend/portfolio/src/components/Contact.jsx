import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  InstagramIcon,
  SendIcon
} from 'lucide-react';
import { submitContactForm } from '../api/contactAPI';

// Contact info item component
const ContactInfoItem = ({ icon, title, value, href = '#' }) => {
  return (
    <a
      href={href}
      className="flex items-start gap-4 p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:bg-gray-800 transition-all"
    >
      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <p className="text-white font-medium">{value}</p>
      </div>
    </a>
  );
};

// Social media button component
const SocialButton = ({ icon, href = '#', color }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
      className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}
    >
      {icon}
    </motion.a>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    const res = await submitContactForm(formData);
    if (res.success) {
      setStatus('✅ Message sent!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setStatus('❌ Failed to send. Try again.');
    }
  };

  return (
    <section id="contact" className="relative py-20 bg-gray-900">
      {/* Background elements */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <ContactInfoItem
                icon={<MailIcon size={20} className="text-blue-400" />}
                title="Email"
                value="awanthaimesh123@gmail.com"
                href="awanthaimesh123@gmail.com"
              />
              <ContactInfoItem
                icon={<PhoneIcon size={20} className="text-blue-400" />}
                title="Phone"
                value="+94 123 456 789"
                href="tel:+94704949394"
              />
              <ContactInfoItem
                icon={<MapPinIcon size={20} className="text-blue-400" />}
                title="Location"
                value="Colombo, Sri Lanka"
              />
              <ContactInfoItem
                icon={<GithubIcon size={20} className="text-blue-400" />}
                title="GitHub"
                value="@johndoe"
                href="https://github.com/johndoe"
              />
            </div>

            <h3 className="text-xl font-bold mb-4">Social Media</h3>
            <div className="flex gap-4">
              <SocialButton icon={<GithubIcon size={20} className="text-white" />} color="bg-gray-800 hover:bg-gray-700" />
              <SocialButton icon={<LinkedinIcon size={20} className="text-white" />} color="bg-blue-600 hover:bg-blue-700" />
              <SocialButton icon={<TwitterIcon size={20} className="text-white" />} color="bg-blue-400 hover:bg-blue-500" />
              <SocialButton
                icon={<InstagramIcon size={20} className="text-white" />}
                color="bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
              />
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-6">Send Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="Your email"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="Subject"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-none"
                    placeholder="Your message"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                >
                  Send Message
                  <SendIcon size={18} />
                </motion.button>
                {status && <p className="mt-4 text-sm text-gray-400">{status}</p>}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;