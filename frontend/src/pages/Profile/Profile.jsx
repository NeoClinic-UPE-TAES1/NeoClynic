import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';

// --- Estilização ---
const Container = styled.div`
    padding: 2rem;
    font-family: 'Istok Web', sans-serif;
    max-width: 600px;
    margin: 0 auto;
`;

const Title = styled.h2`
    color: #333;
    margin-bottom: 1.5rem;
    text-align: center;
`;

const Form = styled.form`
    padding: 2rem;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Input = styled.input`
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
`;

const Label = styled.label`
    font-weight: bold;
    font-size: 0.9rem;
    color: #444;
    margin-bottom: -0.5rem;
`;

const Button = styled.button`
    padding: 0.85rem 1.5rem;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1rem;
    margin-top: 1rem;
    transition: background-color 0.2s;
    
    &:hover {
        background-color: #218838;
    }
`;

// --- Componente ---
const Profile = () => {
    const { user } = useContext(AuthContext);

    // Estado para os dados do formulário
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Carregar dados do usuário ao montar o componente
    useEffect(() => {
        if (user) {
            // Simulação: em produção, buscar dados da API
            // Por enquanto, usar dados mock baseados no role
            const mockData = {
                admin: { name: 'Administrador', email: 'admin@neoclinic.com' },
                medic: { name: 'Dr. Médico', email: 'medic@neoclinic.com' },
                secretary: { name: 'Secretária', email: 'secretary@neoclinic.com' }
            };
            const data = mockData[user.role] || { name: '', email: '' };
            setFormData(prev => ({ ...prev, name: data.name, email: data.email }));
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        // Simulação de API para atualizar o perfil
        console.log('Atualizando perfil com:', {
            name: formData.name,
            email: formData.email,
            password: formData.newPassword || undefined // Só envia a senha se for preenchida
        });
        
        // Em produção: await fetch('/api/profile/update', { method: 'PATCH', body: JSON.stringify(formData) });
        
        alert('Perfil atualizado com sucesso!');
        setFormData(prev => ({ ...prev, newPassword: '', confirmPassword: '' }));
    };

    if (!user) {
        return <Container>Carregando...</Container>;
    }

    return (
        <Container>
            <Title>Meu Perfil</Title>
            
            <Form onSubmit={handleSubmit}>
                <Label htmlFor="name">Nome</Label>
                <Input 
                    type="text" 
                    id="name"
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                />
                
                <Label htmlFor="email">Email</Label>
                <Input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                />
                
                <Label htmlFor="newPassword">Nova Senha</Label>
                <Input 
                    type="password" 
                    id="newPassword"
                    name="newPassword" 
                    placeholder="Deixe em branco para não alterar"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                />
                
                <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                <Input 
                    type="password" 
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirme a nova senha"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                />
                
                <Button type="submit">Atualizar Perfil</Button>
            </Form>
        </Container>
    );
};

export default Profile;