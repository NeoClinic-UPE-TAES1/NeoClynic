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

    const login = async (email, password) => {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Credenciais inválidas');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        
        // Salvar dados completos do usuário
        const userData = {
            role: data.role,
            ...data.user
        };
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