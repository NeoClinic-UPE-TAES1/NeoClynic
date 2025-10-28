// Arquivo principal de rotas
import { Routes, Route } from 'react-router-dom';

// Importa os componentes de página
import Login from '../pages/Login/Login';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import AdminHome from '../pages/AdminHome/AdminHome';
import MedicHome from '../pages/MedicHome/MedicHome';
import SecretaryHome from '../pages/SecretaryHome/SecretaryHome';
import ManageSecretaries from '../pages/ManageSecretaries/ManageSecretaries';
import ManageMedics from '../pages/ManageMedics/ManageMedics';
import Calendar from '../pages/Calendar/Calendar';
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
    font-size: 1.5rem;
    height: 100%;
`;

const AppRoutes = () => {
    return (
        <Routes>
            {/* Rota raiz */}
            <Route path="/" element={<RootRedirect />} />

            {/* Rotas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Rotas para Administrador */}
            <Route 
                path="/admin" 
                element={
                    <PrivateRoute allowedRoles={['admin']}>
                        <AdminHome />
                    </PrivateRoute>
                }
            >
                <Route index element={<ContainerBoasVindas>Bem-vindo, Administrador!</ContainerBoasVindas>} />
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
                <Route index element={<ContainerBoasVindas>Bem-vindo, Médico!</ContainerBoasVindas>} />
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
                <Route index element={<ContainerBoasVindas>Bem-vindo, Secretária!</ContainerBoasVindas>} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="patients" element={<Patients />} />
                <Route path="profile" element={<Profile />} />
            </Route>

            {/* Redirecionar ou página 404 */}
            <Route path="*" element={<NaoEncontrada />} />
        </Routes>
    );
}

export default AppRoutes;