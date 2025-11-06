import { Request, Response, NextFunction } from 'express';
import { IAuthProvider } from '../providers/auth/IAuthProvider';

export function authenticateToken(authProvider: IAuthProvider) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).json({ error: 'Token not provided' });
            return;
        }

        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

        let payload: { id: string; role?: string } | null = null;
        try {
            payload = authProvider.verify(token) as { id: string; role?: string } | null;
            if (!payload || !payload.id) {
                res.status(403).json({ error: 'Invalid token payload' });
                return;
            }

        } catch {
            res.status(403).json({ error: 'Invalid token' });
            return;
        }

        req.user = { id: payload.id };
        next();
    };
}

export function authorizeRoles(...allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = req.user?.role;
        if (!role || !allowedRoles.includes(role)) {
            res.status(403).json({ error: 'Forbidden: insufficient permissions' });
            return;
        }
        next();
    };
}
