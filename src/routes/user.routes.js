import express from 'express'
import { deleteUser,register, updateUser } from '../controllers/UserController.js'
import { protect } from '../middlewares/auth.js'
import { validate } from '../middlewares/validate.js';
import { updateUserSchema, userValidationSchema } from '../validations/UserValidations.js';


const router = express.Router()

router.post('/register',validate(userValidationSchema),register)
router.delete('/:id',protect,deleteUser)
router.put('/update/:id',protect,validate(updateUserSchema),updateUser)




export default router