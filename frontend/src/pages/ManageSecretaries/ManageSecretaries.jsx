import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useApi from '../../hooks/useApi';

// --- Estilização ---
const Container = styled.div`
    padding: 2rem;
    font-family: 'Istok Web', sans-serif;
`;

const Title = styled.h2`
    color: #333;
    margin-bottom: 1.5rem;
`;

const Form = styled.form`
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
`;

const Input = styled.input`
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    flex: 1 1 200px; /* Permite que os inputs quebrem a linha em telas menores */
    min-width: 200px;
`;

const Button = styled.button`
    padding: 0.75rem 1.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s;
    
    &:hover {
        background-color: #0056b3;
    }
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
`;

const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #eee;
    
    &:nth-child(even) {
        background: #fcfcfc;
    }
`;

const ItemInfo = styled.div`
    flex: 1;
    span {
        display: block;
        font-size: 0.9rem;
        color: #555;
    }
`;

const ItemActions = styled.div`
    display: flex;
    gap: 0.5rem;
    
    button {
        padding: 0.4rem 0.8rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    
    .edit {
        background-color: #ffc107;
        color: #333;
    }
    
    .delete {
        background-color: #dc3545;
        color: white;
    }
`;

// --- Componente ---
const ManageSecretaries = () => {
    const { apiCall, loading, error } = useApi();
    const [secretaries, setSecretaries] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [editingId, setEditingId] = useState(null);

    // Carregar secretárias ao montar
    useEffect(() => {
        loadSecretaries();
    }, []);

    const loadSecretaries = async () => {
        try {
            const data = await apiCall('/secretary/list');
            // Verifica se data é um array, caso contrário, tenta acessar a propriedade que contém as secretárias
            if (Array.isArray(data)) {
                setSecretaries(data);
            } else if (data && Array.isArray(data.secretaries)) {
                setSecretaries(data.secretaries);
            } else if (data && Array.isArray(data.data)) {
                setSecretaries(data.data);
            } else {
                console.error('Formato de resposta inesperado:', data);
                setSecretaries([]);
            }
        } catch (err) {
            console.error('Erro ao carregar secretárias:', err);
            setSecretaries([]); // Garante que secretaries seja sempre um array
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
                // Atualizar
                const response = await apiCall(`/secretary/update/${editingId}`, { method: 'PATCH', body: JSON.stringify(formData) });
                const updatedSecretary = response.secretary || response;
                setSecretaries(secretaries.map(sec => 
                    sec.id === editingId ? { ...sec, ...updatedSecretary } : sec
                ));
                alert('Secretária atualizada com sucesso!');
            } else {
                // Criar
                const response = await apiCall('/secretary/register', { method: 'POST', body: JSON.stringify(formData) });
                const newSecretary = response.secretary || response;
                setSecretaries([...secretaries, newSecretary]);
                alert('Secretária cadastrada com sucesso!');
            }
            
            // Limpa o formulário e o modo de edição
            setFormData({ name: '', email: '', password: '' });
            setEditingId(null);
        } catch (err) {
            alert('Erro ao salvar secretária: ' + err.message);
        }
    };

    const handleEdit = (secretary) => {
        setEditingId(secretary.id);
        // Preenche o formulário. Omitimos a senha por segurança.
        setFormData({ name: secretary.name, email: secretary.email, password: '' });
    };

    const handleDelete = async (id) => {
        const password = window.prompt('Para confirmar a exclusão, digite a senha da secretária:');
        
        if (!password) {
            return; // Usuário cancelou
        }
        
        if (window.confirm('Tem certeza que deseja excluir esta secretária?')) {
            try {
                await apiCall(`/secretary/delete/${id}`, { 
                    method: 'DELETE',
                    body: JSON.stringify({ password })
                });
                setSecretaries(secretaries.filter(sec => sec.id !== id));
                alert('Secretária excluída!');
            } catch (err) {
                console.error('Erro ao excluir secretária:', err);
                alert('Erro ao excluir secretária: ' + err.message);
            }
        }
    };

    return (
        <Container>
            <Title>Gerenciar Secretárias</Title>
            
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
                    type="password" 
                    name="password" 
                    placeholder={editingId ? "Nova Senha (deixe em branco para manter)" : "Senha"} 
                    value={formData.password}
                    onChange={handleInputChange}
                    required={!editingId} // Senha é obrigatória apenas na criação
                />
                <Button type="submit" disabled={loading}>
                    {loading ? 'Salvando...' : (editingId ? 'Atualizar' : 'Cadastrar')}
                </Button>
            </Form>

            {error && <p style={{ color: 'red' }}>Erro: {error}</p>}

            <List>
                {Array.isArray(secretaries) && secretaries.map(sec => (
                    <ListItem key={sec.id}>
                        <ItemInfo>
                            <strong>{sec.name}</strong>
                            <span>{sec.email}</span>
                        </ItemInfo>
                        <ItemActions>
                            <button className="edit" onClick={() => handleEdit(sec)}>Editar</button>
                            <button className="delete" onClick={() => handleDelete(sec.id)}>Excluir</button>
                        </ItemActions>
                    </ListItem>
                ))}
                {(!Array.isArray(secretaries) || secretaries.length === 0) && (
                    <p style={{ textAlign: 'center', color: '#999', padding: '2rem' }}>
                        Nenhuma secretária cadastrada
                    </p>
                )}
            </List>
        </Container>
    );
};

export default ManageSecretaries;