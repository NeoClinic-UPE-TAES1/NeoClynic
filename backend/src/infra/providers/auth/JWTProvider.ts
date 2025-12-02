import jwt from  'jsonwebtoken';
import { IAuthProvider } from './IAuthProvider';
import { AppError } from '../../../core/errors/AppError';

export class JWTProvider implements IAuthProvider {
    private readonly secretKey: string;

    constructor() {
        if (!process.env.JWT_SECRET) {
            throw new AppError('JWT_SECRET environment variable is not defined', 500);
        }
        this.secretKey = process.env.JWT_SECRET;
    }

    sign(payload: object): string {
        return jwt.sign(payload, this.secretKey, { expiresIn: '1h' });
    }

    verify(token: string): object | null {
        try {
            return jwt.verify(token, this.secretKey) as object;
        } catch (error) {
            return null;
        }
    }
}