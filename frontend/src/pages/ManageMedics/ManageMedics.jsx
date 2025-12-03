import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
    display: flex;
    align-items: center;
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

const Form = styled.form`
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
    border-radius: 12px;
    border: 2px solid #e2e8f0;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: flex-end;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

const Input = styled.input`
    padding: 0.75rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    flex: 1 1 200px;
    min-width: 200px;
    font-size: 0.95rem;
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    &::placeholder {
        color: #a0aec0;
    }

    @media (max-width: 768px) {
        min-width: 100%;
    }
`;

const Button = styled.button`
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
    white-space: nowrap;
    
    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
    }

    &:active {
        transform: translateY(0);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem;
    border-bottom: 1px solid #e2e8f0;
    transition: background-color 0.2s ease;
    
    &:hover {
        background: #f7fafc;
    }

    &:last-child {
        border-bottom: none;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }
`;

const ItemInfo = styled.div`
    flex: 1;
    
    strong {
        display: block;
        font-size: 1.05rem;
        color: #1a202c;
        margin-bottom: 0.25rem;
    }

    span {
        display: block;
        font-size: 0.9rem;
        color: #718096;
    }
    
    span.specialty {
        font-style: italic;
        color: #667eea;
        font-weight: 600;
    }
`;

const ItemActions = styled.div`
    position: relative;
`;

const MenuButton = styled.button`
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 6px;
    color: #718096;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;

    &:hover {
        background-color: #f7fafc;
        color: #667eea;
    }
`;

const DropdownMenu = styled.div`
    position: absolute;
    right: 0;
    top: 100%;
    margin-top: 0.25rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border: 1px solid #e2e8f0;
    min-width: 140px;
    z-index: 100;
    overflow: hidden;
    animation: fadeIn 0.15s ease;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-4px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const DropdownItem = styled.button`
    width: 100%;
    padding: 0.75rem 1rem;
    border: none;
    background: white;
    text-align: left;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.15s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #1a202c;

    &:hover {
        background-color: #f7fafc;
    }

    &.edit {
        color: #d97706;
        
        &:hover {
            background-color: #fffbeb;
        }
    }

    &.delete {
        color: #dc2626;
        
        &:hover {
            background-color: #fef2f2;
        }
    }

    &:not(:last-child) {
        border-bottom: 1px solid #f1f5f9;
    }
`;

// --- Componente ---
const ManageMedics = () => {
    const { apiCall, loading, error } = useApi();
    const [medics, setMedics] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', specialty: '' });
    const [editingId, setEditingId] = useState(null);
    const [openMenuId, setOpenMenuId] = useState(null);

    // Carregar médicos ao montar
    useEffect(() => {
        loadMedics();
    }, []);

    const loadMedics = async () => {
        try {
            const data = await apiCall('/medic/list');
            // Verifica se data é um array, caso contrário, tenta acessar a propriedade que contém os médicos
            if (Array.isArray(data)) {
                setMedics(data);
            } else if (data && Array.isArray(data.medics)) {
                setMedics(data.medics);
            } else if (data && Array.isArray(data.data)) {
                setMedics(data.data);
            } else {
                console.error('Formato de resposta inesperado:', data);
                setMedics([]);
            }
        } catch (err) {
            console.error('Erro ao carregar médicos:', err);
            setMedics([]); // Garante que medics seja sempre um array
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (editingId) {
                // Atualizar - remove campos vazios para não falhar validação
                const updateData = Object.fromEntries(
                    Object.entries(formData).filter(([_, value]) => value !== '')
                );
                console.log('Sending update data:', updateData);
                const response = await apiCall(`/medic/update/${editingId}`, { method: 'PATCH', body: JSON.stringify(updateData) });
                const updatedMedic = response.medic || response;
                setMedics(medics.map(med => 
                    med.id === editingId ? { ...med, ...updatedMedic } : med
                ));
                alert('Médico atualizado com sucesso!');
            } else {
                // Criar
                const response = await apiCall('/medic/register', { method: 'POST', body: JSON.stringify(formData) });
                const newMedic = response.medic || response;
                setMedics([...medics, newMedic]);
                alert('Médico cadastrado com sucesso!');
            }
            
            // Limpa o formulário e o modo de edição
            setFormData({ name: '', email: '', password: '', specialty: '' });
            setEditingId(null);
        } catch (err) {
            alert('Erro ao salvar médico: ' + err.message);
        }
    };

    const handleEdit = (medic) => {
        setEditingId(medic.id);
        // Preenche o formulário. Omitimos a senha por segurança.
        setFormData({ name: medic.name, email: medic.email, password: '', specialty: medic.specialty });
    };

    const handleDelete = async (id) => {
        const adminPassword = window.prompt('Para confirmar a exclusão, digite sua senha de admin:');
        
        if (!adminPassword) {
            return; // Usuário cancelou
        }
        
        if (window.confirm('Tem certeza que deseja excluir este médico?')) {
            try {
                await apiCall(`/medic/delete/${id}`, { 
                    method: 'DELETE',
                    body: JSON.stringify({ adminPassword })
                });
                setMedics(medics.filter(med => med.id !== id));
                alert('Médico excluído!');
            } catch (err) {
                console.error('Erro ao excluir médico:', err);
                alert('Erro ao excluir médico: ' + err.message);
            }
        }
    };

    return (
        <Container>
            <PageCard>
                <Title>
                    <span>👨‍⚕️</span>
                    <span className="title-text">Gerenciar Médicos</span>
                </Title>
                
                <Form onSubmit={handleSubmit}>
                    <Input 
                        type="text" 
                        name="name" 
                        placeholder="Nome Completo" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                    />
                    <Input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                    />
                    <Input 
                        type="text" 
                        name="specialty" 
                        placeholder="Especialidade" 
                        value={formData.specialty}
                        onChange={handleInputChange}
                        required 
                    />
                    <Input 
                        type="password" 
                        name="password" 
                        placeholder={editingId ? "Nova Senha (deixe em branco para manter)" : "Senha"} 
                        value={formData.password}
                        onChange={handleInputChange}
                        required={!editingId} // Senha é obrigatória apenas na criação
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? '⏳ Salvando...' : (editingId ? '✏️ Atualizar' : '➕ Cadastrar')}
                    </Button>
                </Form>

                {error && <p style={{ color: '#dc3545', textAlign: 'center', padding: '1rem' }}>⚠️ Erro: {error}</p>}

                <List>
                {Array.isArray(medics) && medics.map(med => (
                    <ListItem key={med.id}>
                        <ItemInfo>
                            <strong>{med.name}</strong>
                            <span className="specialty">{med.specialty}</span>
                            <span>{med.email}</span>
                        </ItemInfo>
                        <ItemActions>
                            <MenuButton onClick={() => setOpenMenuId(openMenuId === med.id ? null : med.id)}>
                                ⋮
                            </MenuButton>
                            {openMenuId === med.id && (
                                <DropdownMenu>
                                    <DropdownItem className="edit" onClick={() => {
                                        handleEdit(med);
                                        setOpenMenuId(null);
                                    }}>
                                        ✏️ Editar
                                    </DropdownItem>
                                    <DropdownItem className="delete" onClick={() => {
                                        handleDelete(med.id);
                                        setOpenMenuId(null);
                                    }}>
                                        🗑️ Excluir
                                    </DropdownItem>
                                </DropdownMenu>
                            )}
                        </ItemActions>
                    </ListItem>
                ))}
                {(!Array.isArray(medics) || medics.length === 0) && (
                    <p style={{ textAlign: 'center', color: '#718096', padding: '2rem' }}>
                        📋 Nenhum médico cadastrado
                    </p>
                )}
            </List>
            </PageCard>
        </Container>
    );
};

export default ManageMedics;