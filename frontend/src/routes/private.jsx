// Componente para rotas privadas
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../components/common/Spinner';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
    const { isAuthenticated, user, loading } = useContext(AuthContext);

    if (loading) {
        return <Spinner />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Comparação case-insensitive de roles
    const userRole = user?.role?.toLowerCase();
    const normalizedAllowedRoles = allowedRoles.map(role => role.toLowerCase());
    
    if (allowedRoles.length > 0 && !normalizedAllowedRoles.includes(userRole)) {
        return <Navigate to="/login" />; // ou página de acesso negado
    }

    return children;
};

export default PrivateRoute;