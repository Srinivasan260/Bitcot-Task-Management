import bcrypt from 'bcryptjs';
import { User } from '../models/UserModel.js';
import { generateToken } from '../utils/jwt.js';
import crypto from 'crypto';
import { sendMockEmail } from '../utils/mockemail.js';




export const loginUser = async ({ email, password }) => {

    const user = await User.findOne({ email });

    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error('Invalid credentials');

    const token = generateToken(user._id);

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
        token,
    };
};


export const requestPasswordReset = async (email) => {

    const user = await User.findOne({ email });

    if (!user) throw new Error('User not found');

    const token = crypto.randomBytes(20).toString('hex');

    const expire = Date.now() + 10 * 60 * 1000; // 10 mins

    user.resetToken = token;

    user.resetTokenExpire = expire;

    await user.save();

    const resetLink = `http://localhost:5000/api/auth/reset-password/${token}`;

    console.log(token)

    await sendMockEmail({
        to: email,
        subject: 'Password Reset',
        text: `Click this link to reset password: ${resetLink}`,
    });

    return { message: 'Reset link sent (mocked email)' };
};

export const resetPassword = async (token, newPassword) => {
    const user = await User.findOne({
        resetToken: token,
        resetTokenExpire: { $gt: Date.now() },
    });

    if (!user) throw new Error('Invalid or expired token');

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.resetToken = null;
    user.resetTokenExpire = null;
    await user.save();

    return { message: 'Password reset successful' };
};