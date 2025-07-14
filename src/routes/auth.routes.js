import express from 'express'
import { login, forgotPassword, updatePassword } from '../controllers/authController.js';
import { validate } from '../middlewares/validate.js';
import { loginSchema, resetPasswordEmailSchema, UpdatePasswordSchema } from '../validations/AuthValidations.js';



const router = express.Router();


router.post('/login', validate(loginSchema), login)
router.post('/forgot-password', validate(resetPasswordEmailSchema), forgotPassword);
router.post('/reset-password/:token', validate(UpdatePasswordSchema), updatePassword);


export default router;