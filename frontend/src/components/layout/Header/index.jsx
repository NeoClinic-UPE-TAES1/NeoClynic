import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import styled from 'styled-components';

const HeaderBar = styled.header`
	width: 100%;
	background: linear-gradient(90deg, #2c6b63, #3aa89a);
	color: white;
	padding: 0.6rem 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-shadow: 0 4px 10px rgba(0,0,0,0.08);
`;

const Nav = styled.nav`
	display:flex;
	align-items:center;
	gap:1rem;
`;

const Brand = styled(Link)`
	display:flex;
	align-items:center;
	gap: 0.75rem;
	font-weight:700;
`;

const LogoImg = styled.img`
    height:100px;
    width: 200px; 
    object-fit: contain;

`;

const StyledLink = styled(Link)`
    display: inline-block;
    margin: 0 2rem;
    padding: 0.5rem 2rem; /* controla o “espaço clicável” */
    color: #D0E9E8;
    font-size: ${({ theme }) => theme.fonts.sizes.medium};
    font-weight: 600;
    text-decoration: none;

    &:hover {
        text-decoration: none;
        background: rgba(161, 192, 177, 0.41);
    }
`;

const BotaoSair = styled.button`
  background-color: rgba(161, 192, 177, 0.41);
  color: white;
  padding: 0.5rem 2rem;
  font-size: ${({ theme }) => theme.fonts.sizes.medium};

  &:hover {
    background-color: ${({ theme }) => theme.colors.danger};
  }
`;



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
                        <StyledLink to="/admin/secretaries">Gerenciar Secretárias</StyledLink>
                        <StyledLink to="/admin/medics">Gerenciar Médicos</StyledLink>
                        <StyledLink to="/admin/profile">Perfil</StyledLink>
                        <BotaoSair onClick={handleLogout}>Sair</BotaoSair>
                    </>
                );
            case 'medic':
                return (
                    <>
                        <StyledLink to="/medic/calendar">Calendário</StyledLink>
                        <StyledLink to="/medic/patients">Pacientes</StyledLink>
                        <StyledLink to="/medic/profile">Perfil</StyledLink>
                        <BotaoSair onClick={handleLogout}>Sair</BotaoSair>
                    </>
                );
            case 'secretary':
                return (
                    <>
                        <StyledLink to="/secretary/calendar">Calendário</StyledLink>
                        <StyledLink to="/secretary/patients">Pacientes</StyledLink>
                        <StyledLink to="/secretary/profile">Perfil</StyledLink>
                        <BotaoSair onClick={handleLogout}>Sair</BotaoSair> 
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <HeaderBar>
            <Brand to="/">
					<LogoImg src="/logo-neoclinic.png" alt="NeoClinic" />
			</Brand> 

            <Nav>
                {renderMenu()}
            </Nav>

        </HeaderBar>
    );
};

export default Header;