import { verifyToken } from '../utils/jwt.js';

class AuthMiddleware {
    static async verify(req, res, next) {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            console.log('Authorization header is missing');
            return res.status(401).json({ message: 'Accès non autorisé' });
        }

        const token = authHeader.split(' ')[1];
        console.log('Extracted token:', token);

        if (!token) {
            return res.status(401).json({ message: 'Token manquant' });
        }

        try {
            const decoded = verifyToken(token);
            console.log('Decoded token:', decoded);
            req.user = decoded;
            next();
        } catch (err) {
            console.error('Token verification error:', err);
            return res.status(401).json({ message: 'Token invalide' });
        }
    }
}

export default AuthMiddleware;
