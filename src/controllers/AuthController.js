import { loginUser,requestPasswordReset,resetPassword } from '../services/AuthService.js';


export const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const forgotPassword = async (req, res) => {
  try {
    const result = await requestPasswordReset(req.body.email);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const result = await resetPassword(req.params.token, req.body.newPassword);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};