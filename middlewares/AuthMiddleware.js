import { verifyToken } from '../utils/jwt.js';

class AuthMiddleware {
    static async verify(req, res, next) {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ message: 'Accès non autorisé' });
        }

        try {
            const decoded = verifyToken(token);
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Token invalide' });
        }
    }
}

export default AuthMiddleware;
