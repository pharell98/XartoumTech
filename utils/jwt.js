import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.profile.role },
        process.env.TOKEN_SECRET,
        { expiresIn: '7d' }
    );
};

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.TOKEN_SECRET);
};
