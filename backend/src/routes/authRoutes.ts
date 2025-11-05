import { Router, Request, Response } from 'express';
import { JWTProvider } from '../infra/providers/auth/JWTProvider';
import { SecretaryRepository } from '../modules/secretary/domain/repository/SecretaryRepository';
import { MedicRepository } from '../modules/medic/domain/repository/MedicRepository';
import bcrypt from 'bcrypt';

const authRoutes = Router();

const jwtProvider = new JWTProvider();
const secretaryRepository = new SecretaryRepository();
const medicRepository = new MedicRepository();

authRoutes.post('/auth/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Try secretary
        let user = await secretaryRepository.findByEmail(email);
        let role = 'secretary';

        if (!user) {
            // Try medic
            user = await medicRepository.findByEmail(email);
            role = 'medic';
        }

        if (!user) {
            // For admin, hardcoded for now
            if (email === 'admin@neoclinic.com' && password === 'admin123') {
                const token = jwtProvider.sign({ id: 'admin', role: 'admin' });
                return res.status(200).json({ 
                    token, 
                    role: 'admin',
                    user: {
                        id: 'admin',
                        name: 'Administrador',
                        email: 'admin@neoclinic.com'
                    }
                });
            }
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwtProvider.sign({ id: user.id, role });
        
        // Retornar dados do usuário sem a senha
        const userData: any = {
            id: user.id,
            name: user.name,
            email: user.email
        };
        
        // Se for médico, incluir a especialidade
        if (role === 'medic' && 'specialty' in user) {
            userData.specialty = user.specialty;
        }
        
        return res.status(200).json({ 
            token, 
            role,
            user: userData
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default authRoutes;