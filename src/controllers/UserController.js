

import { deleteUserService, registerUserService, updateUserService } from "../services/UserService.js";

export const register = async (req, res) => {
  try {
    const result = await registerUserService(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const result = await deleteUserService(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const result = await updateUserService(id, updates);

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};