import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: 'No token provided, authorization denied' 
             });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add user info to request object
        req.user = {
            id: decoded.id,
            email: decoded.email,
        }

        next();
    } catch (error) {
        return res.status(401).json({ 
            success: false,
            message: 'Token is not valid' 
         });
    }
};

export default authMiddleware;