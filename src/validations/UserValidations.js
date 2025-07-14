import Joi from 'joi';

export const userValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name cannot be empty',
  }),

  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Email must be a valid email address',
    'string.empty': 'Email cannot be empty',
  }),

  password: Joi.string().min(6).required().messages({
    'any.required': 'Password is required',
    'string.min': 'Password must be at least 6 characters',
    'string.empty': 'Password cannot be empty',
  }),

  resetToken: Joi.string().optional(),

  resetTokenExpire: Joi.date().optional(),
});


export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional().messages({
    'string.min': 'Name must be at least 3 characters',
    'string.max': 'Name must be at most 50 characters',
    'string.empty': 'Name cannot be empty',
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be a valid email address',
    'string.empty': 'Email cannot be empty',
  }),
  password: Joi.string().min(6).optional().messages({
    'string.min': 'Password must be at least 6 characters',
    'string.empty': 'Password cannot be empty',
  }),
});
