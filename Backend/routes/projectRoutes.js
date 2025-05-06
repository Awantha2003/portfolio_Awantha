import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
  getAllProjects,
  addProject,
  deleteProject
} from '../controllers/projectController.js';

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = 'uploads/projects';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage setup for local uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage });

// Routes
router.get('/', getAllProjects); // Public route

// ❌ Removed authenticateAdmin since you're handling auth in frontend
router.post('/', upload.single('image'), addProject);

// Optional: Delete route (admin in frontend)
router.delete('/:id', deleteProject);

export default router;
