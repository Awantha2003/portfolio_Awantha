import Project from '../models/Project.js';
import fs from 'fs';

// @desc   Get all projects
// @route  GET /api/projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch projects', error: error.message });
  }
};

// @desc   Add a new project (admin only)
// @route  POST /api/projects
export const addProject = async (req, res) => {
  try {
    const { title, description, tech, liveLink, githubLink } = req.body;

    const newProject = new Project({
      title,
      description,
      tech: JSON.parse(tech), // 👈 Frontend should send tech as JSON string
      liveLink,
      githubLink,
      image: req.file ? `/uploads/projects/${req.file.filename}` : '',
    });

    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error adding project:', error.message);
    res.status(400).json({ message: 'Failed to add project', error: error.message });
  }
};

// @desc   Delete a project (admin only)
// @route  DELETE /api/projects/:id
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Delete associated image file
    if (project.image) {
      const filePath = `.${project.image}`;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await project.deleteOne();
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error.message);
    res.status(500).json({ message: 'Failed to delete project', error: error.message });
  }
};
