import { verify } from 'jsonwebtoken';
const config = process.env;

export default (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
        auth: false,
        message: 'No token provided',
        });
    }
    return verify(token, config.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
        return res.status(500).json({
            auth: false,
            message: 'Failed to authenticate token.',
        });
        }
        req.userId = decoded.id;
        return next();
    });
};
