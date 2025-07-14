
import { getUserActivity } from '../services/ActivityService.js';

export const fetchActivityLogs = async (req, res) => {
  try {
    const logs = await getUserActivity(req.user._id);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
