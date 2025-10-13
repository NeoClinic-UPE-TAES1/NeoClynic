import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../components/common/Spinner';

const RootRedirect = () => {
    const { isAuthenticated, user, loading } = useContext(AuthContext);

    if (loading) {
        return <Spinner />;
    }

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