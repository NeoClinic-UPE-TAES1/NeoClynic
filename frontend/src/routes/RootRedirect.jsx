import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const RootRedirect = () => {
    const { isAuthenticated, user } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Redirecionar baseado no role
    switch (user?.role) {
        case 'admin':
            return <Navigate to="/admin" replace />;
        case 'medic':
            return <Navigate to="/medic" replace />;
        case 'secretary':
            return <Navigate to="/secretary" replace />;
        default:
            return <Navigate to="/login" replace />;
    }
};

export default RootRedirect;