

import { Activity } from '../models/ActivitylogModel.js';

export const logActivity = async (userId, taskId, action) => {
  await Activity.create({ user: userId, task: taskId, action });
};

export const getUserActivity = async (userId) => {
  return await Activity.find({ user: userId }).populate('task').sort({ timestamp: -1 });
};
