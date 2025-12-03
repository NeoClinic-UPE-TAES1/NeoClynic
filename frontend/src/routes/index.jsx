// Arquivo principal de rotas
import { Routes, Route } from 'react-router-dom';

// Importa os componentes de página
import Login from '../pages/Login/Login';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import AdminHome from '../pages/AdminHome/AdminHome';
import MedicHome from '../pages/MedicHome/MedicHome';
import SecretaryHome from '../pages/SecretaryHome/SecretaryHome';
import ManageSecretaries from '../pages/ManageSecretaries/ManageSecretaries';
import ManageMedics from '../pages/ManageMedics/ManageMedics';
import Calendar from '../pages/Calendar/Calendar';
import ConsultationDetail from '../pages/ConsultationDetail/ConsultationDetail';
import Patients from '../pages/Patients/Patients';
import Profile from '../pages/Profile/Profile';
import NaoEncontrada from '../pages/NaoEncontrada/NaoEncontrada';

// Importa o componente de rota privada/protegida
import PrivateRoute from './private';
import RootRedirect from './RootRedirect';

import styled from 'styled-components';

const ContainerBoasVindas = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    min-height: calc(100vh - 80px - 100px); /* viewport - header - footer */
    padding: 2rem;
    box-sizing: border-box;
`;

const WelcomeCard = styled.div`
    background: #ffffff;
    padding: 3rem 4rem;
    border-radius: 20px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
    text-align: center;
    border: 2px solid rgba(102, 126, 234, 0.1);
    animation: fadeInUp 0.6s ease;

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 768px) {
        padding: 2rem 1.5rem;
    }
`;

const WelcomeEmoji = styled.div`
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: wave 1.5s ease-in-out infinite;

    @keyframes wave {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(14deg); }
        75% { transform: rotate(-14deg); }
    }

    @media (max-width: 768px) {
        font-size: 3rem;
    }
`;

const WelcomeTitle = styled.h1`
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 0 0.5rem 0;

    @media (max-width: 768px) {
        font-size: 1.8rem;
    }
`;

const WelcomeSubtitle = styled.p`
    font-size: 1.1rem;
    color: #718096;
    margin: 0;
    font-weight: 400;

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

const AppRoutes = () => {
    return (
        <Routes>
            {/* Rota raiz */}
            <Route path="/" element={<RootRedirect />} />

            {/* Rota pública */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Rotas para Administrador */}
            <Route 
                path="/admin" 
                element={
                    <PrivateRoute allowedRoles={['admin']}>
                        <AdminHome />
                    </PrivateRoute>
                }
            >
                <Route index element={
                    <ContainerBoasVindas>
                        <WelcomeCard>
                            <WelcomeEmoji>👨‍💼</WelcomeEmoji>
                            <WelcomeTitle>Bem-vindo, Administrador!</WelcomeTitle>
                            <WelcomeSubtitle>Gerencie o sistema com eficiência</WelcomeSubtitle>
                        </WelcomeCard>
                    </ContainerBoasVindas>
                } />
                <Route path="secretaries" element={<ManageSecretaries />} />
                <Route path="medics" element={<ManageMedics />} />
                <Route path="profile" element={<Profile />} />
            </Route>

            {/* Rotas para Médico */}
            <Route 
                path="/medic" 
                element={
                    <PrivateRoute allowedRoles={['medic']}>
                        <MedicHome />
                    </PrivateRoute>
                }
            >
                <Route index element={
                    <ContainerBoasVindas>
                        <WelcomeCard>
                            <WelcomeEmoji>👨‍⚕️</WelcomeEmoji>
                            <WelcomeTitle>Bem-vindo, Médico!</WelcomeTitle>
                            <WelcomeSubtitle>Cuide de seus pacientes com excelência</WelcomeSubtitle>
                        </WelcomeCard>
                    </ContainerBoasVindas>
                } />
                <Route path="calendar" element={<Calendar readonly />} />
                <Route path="patients" element={<Patients />} />
                <Route path="profile" element={<Profile />} />
            </Route>

            {/* Rotas para Secretária */}
            <Route 
                path="/secretary" 
                element={
                    <PrivateRoute allowedRoles={['secretary']}>
                        <SecretaryHome />
                    </PrivateRoute>
                }
            >
                <Route index element={
                    <ContainerBoasVindas>
                        <WelcomeCard>
                            <WelcomeEmoji>👩‍💼</WelcomeEmoji>
                            <WelcomeTitle>Bem-vindo, Secretária!</WelcomeTitle>
                            <WelcomeSubtitle>Organize as consultas e atendimentos</WelcomeSubtitle>
                        </WelcomeCard>
                    </ContainerBoasVindas>
                } />
                <Route path="calendar" element={<Calendar />} />
                <Route path="patients" element={<Patients />} />
                <Route path="profile" element={<Profile />} />
            </Route>

            {/* Rota de detalhes da consulta (compartilhada entre médico e secretária) */}
            <Route 
                path="/consulta/:id" 
                element={
                    <PrivateRoute allowedRoles={['medic', 'secretary']}>
                        <ConsultationDetail />
                    </PrivateRoute>
                }
            />

            {/* Redirecionar ou página 404 */}
            <Route path="*" element={<NaoEncontrada />} />
        </Routes>
    );
}

export default AppRoutes;