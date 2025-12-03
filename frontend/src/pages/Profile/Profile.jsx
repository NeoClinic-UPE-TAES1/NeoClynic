import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';
import useApi from '../../hooks/useApi';

// --- Estilização ---
const Container = styled.div`
    padding: 2rem;
    background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
    min-height: 100vh;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const PageCard = styled.div`
    max-width: 700px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    padding: 2rem;
    border: 1px solid rgba(0, 0, 0, 0.05);

    @media (max-width: 768px) {
        padding: 1.25rem;
    }
`;

const Title = styled.h2`
    font-size: 1.75rem;
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 1.5rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    .title-text {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`;

const UserInfo = styled.div`
    background: linear-gradient(135deg, #ebf4ff 0%, #e8f1ff 100%);
    padding: 1.5rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    border: 2px solid #bfdbfe;
    
    h3 {
        margin: 0 0 1rem 0;
        color: #667eea;
        font-size: 1.1rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    p {
        margin: 0.5rem 0;
        color: #4a5568;
        font-size: 0.95rem;
        
        strong {
            color: #1a202c;
            font-weight: 600;
        }
    }
`;

const Form = styled.form`
    padding: 2rem;
    background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
    border-radius: 12px;
    border: 2px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (max-width: 768px) {
        padding: 1.5rem;
    }
`;

const Input = styled.input`
    padding: 0.75rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.95rem;
    transition: all 0.2s ease;
    
    &:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    &:disabled {
        background-color: #f7fafc;
        color: #718096;
        cursor: not-allowed;
    }

    &::placeholder {
        color: #a0aec0;
    }
`;

const Label = styled.label`
    font-weight: 600;
    font-size: 0.9rem;
    color: #2d3748;
    margin-bottom: -0.5rem;
    letter-spacing: 0.3px;
`;

const Divider = styled.hr`
    margin: 1.5rem 0;
    border: none;
    border-top: 2px solid #e2e8f0;
`;

const Button = styled.button`
    padding: 0.85rem 1.5rem;
    background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    margin-top: 1rem;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(72, 187, 120, 0.2);
    
    &:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(72, 187, 120, 0.3);
    }

    &:active {
        transform: translateY(0);
    }
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

const Message = styled.div`
    padding: 1rem 1.25rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    animation: slideDown 0.3s ease;

    @keyframes slideDown {
        from {
            transform: translateY(-10px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    &.success {
        background-color: #d4edda;
        color: #155724;
        border: 2px solid #c3e6cb;
    }
    
    &.error {
        background-color: #f8d7da;
        color: #721c24;
        border: 2px solid #f5c6cb;
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
        return (
            <Container>
                <PageCard>Carregando...</PageCard>
            </Container>
        );
    }

    return (
        <Container>
            <PageCard>
                <Title>
                    <span className="emoji">👤</span>
                    <span className="title-text">Meu Perfil</span>
                </Title>
                
                <UserInfo>
                    <h3>
                        <span>ℹ️</span>
                        Informações da Conta
                    </h3>
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

                        <Divider />
                        
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
            </PageCard>
        </Container>
    );
};

export default Profile;