import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';
import useApi from '../../hooks/useApi';

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

const UserInfo = styled.div`
    background: #f0f8ff;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    border-left: 4px solid #007bff;
    
    h3 {
        margin: 0 0 1rem 0;
        color: #007bff;
        font-size: 1.1rem;
    }
    
    p {
        margin: 0.5rem 0;
        color: #555;
        
        strong {
            color: #333;
        }
    }
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
    
    &:disabled {
        background-color: #e9ecef;
        cursor: not-allowed;
    }
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
    
    &:hover:not(:disabled) {
        background-color: #218838;
    }
    
    &:disabled {
        background-color: #6c757d;
        cursor: not-allowed;
    }
`;

const Message = styled.div`
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    
    &.success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    
    &.error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
`;

// --- Componente ---
const Profile = () => {
    const { user, updateUser } = useContext(AuthContext);
    const { apiCall, loading } = useApi();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        specialty: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    
    const [message, setMessage] = useState({ type: '', text: '' });

    // Carregar dados do usuário ao montar o componente
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                specialty: user.specialty || ''
            }));
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setMessage({ type: '', text: '' }); // Limpa mensagens ao editar
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        
        // Validações
        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'As senhas não coincidem!' });
            return;
        }
        
        if (formData.newPassword && !formData.currentPassword) {
            setMessage({ type: 'error', text: 'Informe a senha atual para alterar a senha!' });
            return;
        }

        try {
            // Preparar dados para envio - enviar apenas campos preenchidos
            const updateData = {};
            
            if (formData.name && formData.name.trim()) {
                updateData.name = formData.name.trim();
            }
            if (formData.email && formData.email.trim()) {
                updateData.email = formData.email.trim();
            }
            
            // Adicionar especialidade se for médico
            if (user.role === 'MEDIC' && formData.specialty && formData.specialty.trim()) {
                updateData.specialty = formData.specialty.trim();
            }
            
            // Adicionar senha se estiver sendo alterada
            if (formData.newPassword) {
                updateData.password = formData.newPassword;
                updateData.currentPassword = formData.currentPassword;
            }
            
            // Chamar API apropriada baseada no role
            let endpoint = '';
            if (user.role === 'ADMIN') {
                endpoint = `/admin/update/${user.id}`;
            } else if (user.role === 'MEDIC') {
                endpoint = `/medic/update/${user.id}`;
            } else if (user.role === 'SECRETARY') {
                endpoint = `/secretary/update/${user.id}`;
            } else {
                console.log('Invalid user role:', user.role);
                setMessage({ type: 'error', text: 'Tipo de usuário inválido!' });
                return;
            }
            
            const response = await apiCall(endpoint, {
                method: 'PATCH',
                body: JSON.stringify(updateData)
            });
            
            // Extrair dados atualizados
            const updatedData = response.admin || response.medic || response.secretary || response;
            
            // Atualizar contexto do usuário
            updateUser(updatedData);
            
            setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
            
            // Limpar campos de senha
            setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }));
            
        } catch (err) {
            console.error('Erro ao atualizar perfil:', err);
            setMessage({ type: 'error', text: 'Erro ao atualizar perfil: ' + err.message });
        }
    };

    if (!user) {
        return <Container>Carregando...</Container>;
    }

    return (
        <Container>
            <Title>Meu Perfil</Title>
            
            <UserInfo>
                <h3>Informações da Conta</h3>
                <p><strong>Tipo de Usuário:</strong> {
                    user.role === 'ADMIN' ? 'Administrador' :
                    user.role === 'MEDIC' ? 'Médico' :
                    user.role === 'SECRETARY' ? 'Secretária' : user.role
                }</p>
                <p><strong>ID:</strong> {user.id}</p>
            </UserInfo>
            
            <>
                    {message.text && (
                        <Message className={message.type}>
                            {message.text}
                        </Message>
                    )}
                    
                    <Form onSubmit={handleSubmit}>
                        <Label htmlFor="name">Nome Completo</Label>
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
                        
                        {user.role === 'MEDIC' && (
                            <>
                                <Label htmlFor="specialty">Especialidade</Label>
                                <Input 
                                    type="text" 
                                    id="specialty"
                                    name="specialty"
                                    value={formData.specialty}
                                    onChange={handleInputChange}
                                    required 
                                />
                            </>
                        )}
                        
                        <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #ddd' }} />
                        
                        <Label htmlFor="currentPassword">Senha Atual (para alteração de senha)</Label>
                        <Input 
                            type="password" 
                            id="currentPassword"
                            name="currentPassword"
                            placeholder="Deixe em branco para não alterar"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
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
                        
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Salvando...' : 'Atualizar Perfil'}
                        </Button>
                    </Form>
            </>
        </Container>
    );
};

export default Profile;