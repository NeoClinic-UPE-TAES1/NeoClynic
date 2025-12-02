import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verificar se há token no localStorage
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const userData = localStorage.getItem('user');
        
        if (token && role) {
            const parsedUser = userData ? JSON.parse(userData) : { role };
            setUser(parsedUser);
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = async (email, password, twoFactorCode = null, userType = 'admin') => {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
        
        // Determinar qual endpoint usar baseado no userType
        const endpointMap = {
            'admin': '/admin/login',
            'secretary': '/secretary/login',
            'medic': '/medic/login'
        };
        const endpoint = endpointMap[userType] || '/admin/login';
        
        const body = { email, password };
        if (twoFactorCode) {
            body.twoFactorCode = twoFactorCode;
        }
        
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Credenciais inválidas');
        }

        const data = await response.json();
        console.log('Login response data:', data);
        
        const result = data.result || data;
        console.log('Login result:', result);
        
        if (!result.token) {
            throw new Error('Token não encontrado na resposta');
        }
        
        localStorage.setItem('token', result.token);
        
        // Determinar role baseado na resposta
        let role = 'USER';
        let userInfo = {};
        
        if (result.admin) {
            role = 'ADMIN';
            userInfo = result.admin;
        } else if (result.secretary) {
            role = 'SECRETARY';
            userInfo = result.secretary;
        } else if (result.medic) {
            role = 'MEDIC';
            userInfo = result.medic;
        } else if (result.user) {
            userInfo = result.user;
        }
        
        console.log('Determined role:', role);
        console.log('User info:', userInfo);
        
        localStorage.setItem('role', role);
        
        // Salvar dados completos do usuário
        const userData = {
            role: role,
            ...userInfo
        };
        
        console.log('Saving user data:', userData);
        localStorage.setItem('user', JSON.stringify(userData));
        
        setUser(userData);
        setIsAuthenticated(true);
        setLoading(false);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
    };

    const updateUser = (updatedData) => {
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};