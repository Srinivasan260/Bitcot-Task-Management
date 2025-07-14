// validations/taskValidation.js
import Joi from 'joi';

export const createTaskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    deadline: Joi.date().iso().optional(),
    priority: Joi.string().valid('Low', 'Medium', 'High').default('Medium'),
    status: Joi.string().valid('Not Started', 'In Progress', 'Completed').default('Not Started'),
    assignedTo: Joi.string().required(),
});
