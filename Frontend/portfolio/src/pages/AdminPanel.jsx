import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech: '',
    liveLink: '',
    githubLink: '',
    image: null,
  });
  const [editId, setEditId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [authEmail, setAuthEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const ADMIN_EMAIL = 'awanthaimesh65@gmail.com';
  const ADMIN_PASSWORD = 'Awantha65@';

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/projects');
      setProjects(res.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAuth = (e) => {
    e.preventDefault();
    if (authEmail === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert('Invalid admin credentials');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'tech') {
        data.append(key, JSON.stringify(value.split(',').map((t) => t.trim())));
      } else {
        data.append(key, value);
      }
    });

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/projects/${editId}`, data);
        alert('✅ Project updated!');
        setEditId(null);
      } else {
        await axios.post('http://localhost:5000/api/projects', data);
        alert('✅ Project uploaded!');
      }
      setFormData({ title: '', description: '', tech: '', liveLink: '', githubLink: '', image: null });
      fetchProjects();
    } catch (err) {
      console.error('Upload failed:', err);
      alert('❌ Failed to submit project');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      fetchProjects();
    } catch (err) {
      alert('❌ Delete failed');
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      tech: project.tech.join(', '),
      liveLink: project.liveLink,
      githubLink: project.githubLink,
      image: null,
    });
    setEditId(project._id);
  };

  if (!authenticated) {
    return (
      <div className="p-10 bg-black text-white min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <form onSubmit={handleAuth} className="space-y-4 max-w-sm">
          <input
            type="email"
            placeholder="Admin Email"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            onChange={(e) => setAuthEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-blue-600 px-4 py-2 rounded">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-10 bg-black text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleInputChange}
          className="p-2 rounded bg-gray-800 border border-gray-600"
        />
        <input
          type="text"
          name="tech"
          placeholder="Tech (comma-separated)"
          value={formData.tech}
          onChange={handleInputChange}
          className="p-2 rounded bg-gray-800 border border-gray-600"
        />
        <input
          type="text"
          name="liveLink"
          placeholder="Live Link"
          value={formData.liveLink}
          onChange={handleInputChange}
          className="p-2 rounded bg-gray-800 border border-gray-600"
        />
        <input
          type="text"
          name="githubLink"
          placeholder="GitHub Link"
          value={formData.githubLink}
          onChange={handleInputChange}
          className="p-2 rounded bg-gray-800 border border-gray-600"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          className="p-2 rounded bg-gray-800 border border-gray-600 col-span-full"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleInputChange}
          className="col-span-full text-white"
        />
        <button className="col-span-full bg-green-600 px-4 py-2 rounded">
          {editId ? 'Update Project' : 'Upload Project'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div key={proj._id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <img src={`http://localhost:5000${proj.image}`} alt={proj.title} className="w-full h-48 object-cover rounded mb-3" />
            <h3 className="text-xl font-semibold mb-1">{proj.title}</h3>
            <p className="text-gray-300 mb-2">{proj.description}</p>
            <p className="text-sm text-blue-400 mb-2">Tech: {proj.tech?.join(', ')}</p>
            <div className="flex justify-between text-sm text-blue-400">
              <a href={proj.liveLink} target="_blank" rel="noreferrer">Live</a>
              <a href={proj.githubLink} target="_blank" rel="noreferrer">GitHub</a>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => handleEdit(proj)} className="flex-1 bg-yellow-500 py-1 rounded text-white">
                Edit
              </button>
              <button onClick={() => handleDelete(proj._id)} className="flex-1 bg-red-600 py-1 rounded text-white">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;