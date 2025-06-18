import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
    const token = jwt.sign(
        { userId: user._id },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
    );
     
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    
    return res.status(200).json({
        success: true,
        message,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            photoUrl: user.photoUrl,
            role: user.role
        }
    });
};