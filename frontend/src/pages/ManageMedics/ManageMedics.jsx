import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useApi from '../../hooks/useApi';

// --- Estilização (Reutilizando os mesmos estilos de ManageSecretaries para consistência) ---
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
    flex: 1 1 200px;
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
    span.specialty {
        font-style: italic;
        color: #0056b3;
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
const ManageMedics = () => {
    const { apiCall, loading, error } = useApi();
    const [medics, setMedics] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', specialty: '' });
    const [editingId, setEditingId] = useState(null);

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
                // Atualizar
                const response = await apiCall(`/medic/update/${editingId}`, { method: 'PATCH', body: JSON.stringify(formData) });
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
        const password = window.prompt('Para confirmar a exclusão, digite a senha do médico:');
        
        if (!password) {
            return; // Usuário cancelou
        }
        
        if (window.confirm('Tem certeza que deseja excluir este médico?')) {
            try {
                await apiCall(`/medic/delete/${id}`, { 
                    method: 'DELETE',
                    body: JSON.stringify({ password })
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
            <Title>Gerenciar Médicos</Title>
            
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
                    {loading ? 'Salvando...' : (editingId ? 'Atualizar' : 'Cadastrar')}
                </Button>
            </Form>

            {error && <p style={{ color: 'red' }}>Erro: {error}</p>}

            <List>
                {Array.isArray(medics) && medics.map(med => (
                    <ListItem key={med.id}>
                        <ItemInfo>
                            <strong>{med.name}</strong>
                            <span className="specialty">{med.specialty}</span>
                            <span>{med.email}</span>
                        </ItemInfo>
                        <ItemActions>
                            <button className="edit" onClick={() => handleEdit(med)}>Editar</button>
                            <button className="delete" onClick={() => handleDelete(med.id)}>Excluir</button>
                        </ItemActions>
                    </ListItem>
                ))}
                {(!Array.isArray(medics) || medics.length === 0) && (
                    <p style={{ textAlign: 'center', color: '#999', padding: '2rem' }}>
                        Nenhum médico cadastrado
                    </p>
                )}
            </List>
        </Container>
    );
};

export default ManageMedics;