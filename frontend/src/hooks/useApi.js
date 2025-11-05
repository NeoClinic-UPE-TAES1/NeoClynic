import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useApi = () => {
    const { logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiCall = async (url, options = {}) => {
        setLoading(true);
        setError(null);

        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
        const fullUrl = `${baseUrl}${url}`;

        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        try {
            const response = await fetch(fullUrl, {
                ...options,
                headers,
            });

            if (response.status === 401) {
                logout();
                throw new Error('Sessão expirada');
            }

            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { apiCall, loading, error };
};

export default useApi;