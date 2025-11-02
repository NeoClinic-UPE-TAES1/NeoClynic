import React, { useState } from 'react';
import styled from 'styled-components';

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

// --- Dados Mock (simulando o banco) ---
const mockMedics = [
    { id: 'uuid10', name: 'Dr. Carlos Moreira', email: 'carlos.moreira@neoclinic.com', specialty: 'Cardiologia' },
    { id: 'uuid11', name: 'Dra. Helena Braga', email: 'helena.braga@neoclinic.com', specialty: 'Pediatria' },
];

// --- Componente ---
const ManageMedics = () => {
    const [medics, setMedics] = useState(mockMedics);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', specialty: '' });
    const [editingId, setEditingId] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Simulação de API
        if (editingId) {
            // --- Lógica de ATUALIZAÇÃO (UPDATE) ---
            console.log('Atualizando médico:', editingId, formData);
            setMedics(medics.map(med => 
                med.id === editingId ? { ...med, name: formData.name, email: formData.email, specialty: formData.specialty } : med
            ));
            alert('Médico atualizado com sucesso!');
        } else {
            // --- Lógica de CRIAÇÃO (CREATE) ---
            const newMedic = { 
                id: `uuid${Date.now()}`, // ID mock
                ...formData 
            };
            console.log('Criando novo médico:', newMedic);
            setMedics([...medics, newMedic]);
            alert('Médico cadastrado com sucesso!');
        }
        
        // Limpa o formulário e o modo de edição
        setFormData({ name: '', email: '', password: '', specialty: '' });
        setEditingId(null);
    };

    const handleEdit = (medic) => {
        setEditingId(medic.id);
        // Preenche o formulário. Omitimos a senha por segurança.
        setFormData({ name: medic.name, email: medic.email, password: '', specialty: medic.specialty });
    };

    const handleDelete = (id) => {
        // --- Lógica de REMOÇÃO (DELETE) ---
        if (window.confirm('Tem certeza que deseja excluir este médico?')) {
            console.log('Excluindo médico:', id);
            setMedics(medics.filter(med => med.id !== id));
            alert('Médico excluído!');
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
                <Button type="submit">{editingId ? 'Atualizar' : 'Cadastrar'}</Button>
            </Form>

            <List>
                {medics.map(med => (
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
            </List>
        </Container>
    );
};

export default ManageMedics;