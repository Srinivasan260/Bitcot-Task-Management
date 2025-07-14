import express from 'express';
import { protect } from '../middlewares/auth.js';
import { fetchActivityLogs } from '../controllers/ActivityController.js';

const router = express.Router();

router.get('/', protect, fetchActivityLogs);

export default router;
