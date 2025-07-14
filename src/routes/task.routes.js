// routes/taskRoutes.js
import express from 'express';
import { createTask, getTasks,updateTaskStatus } from '../controllers/TaskController.js';
import { protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { createTaskSchema } from '../validations/TaskValidations.js';
import { upload } from '../middlewares/upload.js';

const router = express.Router();

router.post('/', protect, upload.single('file'),validate(createTaskSchema), createTask);
router.get('/', protect, getTasks);
router.put('/:id/status', protect, updateTaskStatus);

export default router;
