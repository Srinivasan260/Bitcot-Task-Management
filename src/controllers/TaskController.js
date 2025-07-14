// src/controllers/taskController.js
import { createTaskService, getTasksService, updateTaskStatusService } from '../services/TaskService.js';

export const createTask = async (req, res) => {
    try {

        const task = await createTaskService(req.body, req.user,req.file);
        res.status(201).json({task });
    } catch (err) {
        res.status(400).json({ status : "Failure" ,message: err.message });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await getTasksService(req.query);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({status:"Failure", message: err.message });
    }
};

export const updateTaskStatus = async (req, res) => {
    try {
        const updated = await updateTaskStatusService(req.params.id, req.body.status,req.user);
        res.json(updated);
    } catch (err) {
        res.status(400).json({status: "Failure", message: err.message });
    }
};
