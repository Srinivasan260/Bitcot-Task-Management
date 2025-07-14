import bcrypt from 'bcryptjs';
import { User } from '../models/UserModel.js';

export const registerUserService = async ({ name, email, password }) => {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({ name, email, password: hashedPassword });

      return { status: 'Success', message: 'User Created Successfully' };
};

export const deleteUserService = async (id) => {
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) throw new Error('User not found');

      return { status: 'Success', message: 'User deleted successfully' };
};

export const updateUserService = async (id, updates) => {
      const updateData = {};

      if (updates.name) updateData.name = updates.name;
      if (updates.email) updateData.email = updates.email;


      const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

      if (!updatedUser) {
        throw new Error('User not found');
      }

      return {
        status: 'Success',
        message: 'User updated successfully',
        user: updatedUser,
      };
};