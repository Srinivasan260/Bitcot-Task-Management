// models/Activity.js
import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Activity = mongoose.model('Activity', activitySchema);
