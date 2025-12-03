import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import styled from 'styled-components';

const HeaderBar = styled.header`
	width: 100%;
	background: linear-gradient(90deg, #2c6b63, #3aa89a);
	color: white;
	padding: 1rem 1.5rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-shadow: 0 4px 10px rgba(0,0,0,0.08);
	box-sizing: border-box;
	height: 80px;
	position: relative;
`;

const Brand = styled(Link)`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	font-weight: 700;
	flex-shrink: 0;
	height: 100%;
`;

const LogoImg = styled.img`
    height: 60px;
    width: auto;
    object-fit: contain;
`;

const Nav = styled.nav`
	display: flex;
	align-items: center;
	gap: 0.5rem;

	@media (max-width: 768px) {
		position: fixed;
		top: 80px;
		right: ${props => props.$isOpen ? '0' : '-100%'};
		width: 280px;
		height: calc(100vh - 80px);
		background: linear-gradient(180deg, #2c6b63, #3aa89a);
		flex-direction: column;
		padding: 2rem 1rem;
		gap: 1rem;
		box-shadow: -4px 0 10px rgba(0,0,0,0.1);
		transition: right 0.3s ease;
		overflow-y: auto;
		z-index: 1000;
	}
`;

const BurgerButton = styled.button`
	display: none;
	background: none;
	border: none;
	color: white;
	font-size: 1.5rem;
	cursor: pointer;
	padding: 0.5rem;
	z-index: 1001;

	@media (max-width: 768px) {
		display: block;
	}
`;

const Overlay = styled.div`
	display: none;

	@media (max-width: 768px) {
		display: ${props => props.$isOpen ? 'block' : 'none'};
		position: fixed;
		top: 80px;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
	}
`;

const StyledLink = styled(Link)`
    display: inline-block;
    margin: 0 0.25rem;
    padding: 0.5rem 1rem;
    color: #D0E9E8;
    font-size: ${({ theme }) => theme.fonts.sizes.medium};
    font-weight: 600;
    text-decoration: none;
    border-radius: 6px;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
        text-decoration: none;
        background: rgba(161, 192, 177, 0.41);
    }

	@media (max-width: 768px) {
		width: 100%;
		text-align: center;
		padding: 0.75rem 1rem;
		margin: 0;
	}
`;

const BotaoSair = styled.button`
  background-color: rgba(161, 192, 177, 0.41);
  color: white;
  padding: 0.5rem 1.5rem;
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.colors.danger};
  }

  @media (max-width: 768px) {
	width: 100%;
	padding: 0.75rem 1rem;
  }
`;



const Header = ({ userType }) => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsMenuOpen(false);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const renderMenu = () => {
        switch (userType) {
            case 'admin':
                return (
                    <>
                        <StyledLink to="/admin/secretaries" onClick={closeMenu}>Gerenciar Secretárias</StyledLink>
                        <StyledLink to="/admin/medics" onClick={closeMenu}>Gerenciar Médicos</StyledLink>
                        <StyledLink to="/admin/profile" onClick={closeMenu}>Perfil</StyledLink>
                        <BotaoSair onClick={handleLogout}>Sair</BotaoSair>
                    </>
                );
            case 'medic':
                return (
                    <>
                        <StyledLink to="/medic/calendar" onClick={closeMenu}>Calendário</StyledLink>
                        <StyledLink to="/medic/patients" onClick={closeMenu}>Pacientes</StyledLink>
                        <StyledLink to="/medic/profile" onClick={closeMenu}>Perfil</StyledLink>
                        <BotaoSair onClick={handleLogout}>Sair</BotaoSair>
                    </>
                );
            case 'secretary':
                return (
                    <>
                        <StyledLink to="/secretary/calendar" onClick={closeMenu}>Calendário</StyledLink>
                        <StyledLink to="/secretary/patients" onClick={closeMenu}>Pacientes</StyledLink>
                        <StyledLink to="/secretary/profile" onClick={closeMenu}>Perfil</StyledLink>
                        <BotaoSair onClick={handleLogout}>Sair</BotaoSair> 
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <HeaderBar>
                <Brand to="/">
                    <LogoImg src="/logo-neoclinic.png" alt="NeoClinic" />
                </Brand> 

                <BurgerButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? '✕' : '☰'}
                </BurgerButton>

                <Nav $isOpen={isMenuOpen}>
                    {renderMenu()}
                </Nav>
            </HeaderBar>
            <Overlay $isOpen={isMenuOpen} onClick={closeMenu} />
        </>
    );
};

export default Header;