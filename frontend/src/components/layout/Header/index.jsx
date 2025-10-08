import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

const Header = ({ userType }) => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const renderMenu = () => {
        switch (userType) {
            case 'admin':
                return (
                    <>
                        <Link to="/admin/secretaries">Gerenciar Secretárias</Link>
                        <Link to="/admin/medics">Gerenciar Médicos</Link>
                        <Link to="/admin/profile">Perfil</Link>
                        <button onClick={handleLogout}>Sair</button>
                    </>
                );
            case 'medic':
                return (
                    <>
                        <Link to="/medic/calendar">Calendário</Link>
                        <Link to="/medic/patients">Pacientes</Link>
                        <Link to="/medic/profile">Perfil</Link>
                        <button onClick={handleLogout}>Sair</button>
                    </>
                );
            case 'secretary':
                return (
                    <>
                        <Link to="/secretary/calendar">Calendário</Link>
                        <Link to="/secretary/patients">Pacientes</Link>
                        <Link to="/secretary/profile">Perfil</Link>
                        <button onClick={handleLogout}>Sair</button>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <header>
            <nav>
                {renderMenu()}
            </nav>
        </header>
    );
};

export default Header;