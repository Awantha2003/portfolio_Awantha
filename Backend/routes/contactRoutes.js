import express from 'express';
import { submitMessage } from '../controllers/contactController.js';
import { contactFormLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/', contactFormLimiter, submitMessage);

export default router;
