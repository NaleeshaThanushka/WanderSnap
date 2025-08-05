import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY || 'yourSecretKey';  // Store this in an environment variable

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization token required' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from Bearer <token>
    try {
        const decoded = jwt.verify(token, secretKey);
        req.userId = decoded.userId; // Store the userId from the decoded token
        next();  // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default authenticate;
