// src/services/taskService.js
import { Task } from '../models/TaskModel.js';
import { client } from '../config/elasticSearch.js';
import { User } from '../models/UserModel.js';
import { sendMockEmail } from '../utils/mockemail.js';

import { logActivity } from './ActivityService.js';


export const createTaskService = async (data, user, file) => {
    const user_id = user._id;

    const taskData = {
        ...data,
        createdBy: user_id
    };

    if (file) {
        taskData.attachment = file.path; // Save file path
    }

    const task = await Task.create(taskData);

    const { _id, __v, ...esDoc } = task.toObject();

    await client.index({
        index: 'tasks',
        id: _id.toString(),
        document: esDoc,
    });

    // ✅ Send mail to assignee
    if (task.assignedTo) {
        const assignee = await User.findById(task.assignedTo);
        if (assignee && assignee.email) {
            await sendMockEmail({
                to: assignee.email,
                subject: `New Task Assigned: ${task.title}`,
                text: `You have been assigned a new task by ${user.name || user.email}:\n\nTitle: ${task.title}\nDescription: ${task.description}\nDeadline: ${task.deadline}`,
            });
        }
    }

    await logActivity(user_id, task._id, `Created task "${task.title}"`);

    return task;
};




export const getTasksService = async (filters) => {
    const esQuery = {
        bool: {
            must: [],
            must_not: []
        },
    };

    // Filter by priority
    if (filters.priority) {
        esQuery.bool.must.push({ match: { priority: filters.priority } });
    }

    // Filter by status (optional override to show completed tasks)
    if (filters.status) {
        esQuery.bool.must.push({ match: { status: filters.status } });
    } else if (!filters.includeCompleted) {
        // ✅ Exclude completed by default
        esQuery.bool.must_not.push({ match: { status: 'Completed' } });
    }

    // Filter by deadline
    if (filters.deadline) {
        esQuery.bool.must.push({
            range: { deadline: { lte: filters.deadline } },
        });
    }

    // Sort by field if specified
    const sort = filters.sortBy
        ? [{ [filters.sortBy]: { order: 'asc' } }]
        : [];

    // Execute Elasticsearch search
    const { hits } = await client.search({
        index: 'tasks',
        query: esQuery,
        sort
    });


    if (!hits.hits.length) {
        return {
            status: 'No Tasks Found',
            message: 'No tasks matched your search criteria.',
            data: []
        };
    }

    // ✅ If results found
    const tasks = hits.hits.map(hit => ({
        id: hit._id,
        ...hit._source
    }));

    return {
        status: 'Success',
        message: 'Tasks retrieved successfully.',
        data: tasks
    };

}




export const updateTaskStatusService = async (id, status, userId) => {

    //  Update task in MongoDB
    const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
    if (!task) throw new Error('Task not found');

    const { _id, __v, ...esDoc } = task.toObject();

    //  Re-index in Elasticsearch
    await client.index({
        index: 'tasks',
        id: task._id.toString(),
        document: esDoc,
    });

    // Notify creator if task is completed
    if (status === 'Completed' && task.createdBy) {
        const creator = await User.findById(task.createdBy);
        if (creator?.email) {
            await sendMockEmail({
                to: creator.email,
                subject: `Task Completed: ${task.title}`,
                text: `Your task "${task.title}" has been marked as completed`,
            });
        }
    }

    // ✅ Step 4: Log activity (with dynamic message)
    const activityText =
        status === 'Completed'
            ? `Marked task as completed `
            : `Updated task status to "${status}"`;

    await logActivity(userId, task._id, activityText);

    return task;
};

