import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
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

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 300px;
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
    
    .view, .edit {
        background-color: #ffc107;
        color: #333;
    }
    
    .delete {
        background-color: #dc3545;
        color: white;
    }
`;

// --- Modal ---
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 90%;
    max-width: 700px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 1rem;
    
    h3 {
        margin: 0;
        color: #0056b3;
    }
`;

const CloseButton = styled.button`
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #888;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Input = styled.input`
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const Select = styled.select`
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
`;

const TextArea = styled.textarea`
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    min-height: 100px;
    resize: vertical;
`;

const Label = styled.label`
    font-weight: bold;
    font-size: 0.9rem;
    color: #444;
    margin-bottom: -0.5rem;
`;

const ReadOnlyGroup = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    background: #f9f9f9;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
`;

const ReadOnlyField = styled.div`
    font-size: 0.95rem;
    strong {
        display: block;
        color: #555;
        font-size: 0.85rem;
    }
`;

const SaveButton = styled(Button)`
    background-color: #28a745;
    margin-top: 1rem;
    
    &:hover {
        background-color: #218838;
    }
`;

// --- Mock Data (baseado no schema.prisma) ---
const initialPatients = [];

const emptyPatient = {
    id: null,
    name: '',
    birthDay: '',
    sex: 'Masculino',
    cpf: '',
    ethnicity: 'Pardo',
    email: '',
    observation: null
};

// --- Componente ---
const Patients = () => {
    // 1. Determina o papel do usuário com base na rota
    const location = useLocation();
    const isSecretary = location.pathname.startsWith('/secretary');

    const { apiCall, loading, error } = useApi();

    // 2. Estados
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentPatient, setCurrentPatient] = useState(emptyPatient);
    
    // Carregar pacientes ao montar
    useEffect(() => {
        loadPatients();
    }, []);

    const loadPatients = async () => {
        try {
            const data = await apiCall('/patient/list');
            // Verificar o formato da resposta
            if (Array.isArray(data)) {
                setPatients(data);
            } else if (data && Array.isArray(data.patients)) {
                setPatients(data.patients);
            } else {
                console.error('Formato de resposta inesperado:', data);
                setPatients([]);
            }
        } catch (err) {
            console.error('Erro ao carregar pacientes:', err);
            setPatients([]);
        }
    };
    
    // 3. Lógica de Filtro
    const filteredPatients = useMemo(() => 
        patients.filter(p => 
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.cpf.includes(searchTerm)
        ), 
    [patients, searchTerm]);

    // 4. Handlers de Ações
    const handleOpenModal = (patient) => {
        setCurrentPatient(patient || emptyPatient);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentPatient(emptyPatient);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Aplicar máscara de CPF
        if (name === 'cpf') {
            // Remove tudo que não é dígito
            const numbersOnly = value.replace(/\D/g, '');
            // Limita a 11 dígitos
            const limited = numbersOnly.substring(0, 11);
            // Aplica a máscara: 000.000.000-00
            let formatted = limited;
            if (limited.length > 3) {
                formatted = limited.substring(0, 3) + '.' + limited.substring(3);
            }
            if (limited.length > 6) {
                formatted = formatted.substring(0, 7) + '.' + limited.substring(6);
            }
            if (limited.length > 9) {
                formatted = formatted.substring(0, 11) + '-' + limited.substring(9);
            }
            
            setCurrentPatient(prev => ({
                ...prev,
                [name]: formatted
            }));
        } else {
            setCurrentPatient(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };
    
    const handleObservationChange = (e) => {
        const { name, value } = e.target;
        setCurrentPatient(prev => ({
            ...prev,
            observation: {
                ...prev.observation,
                [name]: value
            }
        }));
    };

    // Ação da Secretária: Salvar cadastro do paciente
    const handleSavePatient = async (e) => {
        e.preventDefault();
        try {
            // Preparar dados do paciente
            // Converter sexo para o formato do backend (M/F)
            let sexValue = 'M';
            if (currentPatient.sex === 'Feminino') {
                sexValue = 'F';
            } else if (currentPatient.sex === 'Masculino') {
                sexValue = 'M';
            }
            
            const patientData = {
                name: currentPatient.name,
                birthDay: currentPatient.birthDay,
                sex: sexValue,
                cpf: currentPatient.cpf.replace(/\D/g, ''),  // Remove máscara antes de enviar
                ethnicity: currentPatient.ethnicity,
                email: currentPatient.email.trim() || null  // null se vazio
            };
            
            if (currentPatient.id) {
                // Atualizar paciente existente
                const response = await apiCall(`/patient/update/${currentPatient.id}`, { 
                    method: 'PATCH', 
                    body: JSON.stringify(patientData)
                });
                const updatedPatient = response.patient || response;
                setPatients(patients.map(p => p.id === currentPatient.id ? updatedPatient : p));
                alert('Paciente atualizado com sucesso!');
            } else {
                // Criar novo paciente
                const response = await apiCall('/patient/register', { 
                    method: 'POST', 
                    body: JSON.stringify(patientData)
                });
                const newPatient = response.patient || response;
                setPatients([...patients, newPatient]);
                alert('Paciente cadastrado com sucesso!');
            }
            handleCloseModal();
        } catch (err) {
            console.error('Erro ao salvar paciente:', err);
            alert('Erro ao salvar paciente: ' + err.message);
        }
    };
    
    // Ação do Médico: Salvar observações clínicas
    const handleSaveObservation = async (e) => {
        e.preventDefault();
        try {
            await apiCall(`/patient/observation/${currentPatient.id}`, { 
                method: 'PATCH', 
                body: JSON.stringify({
                    comorbidity: currentPatient.observation?.comorbidity || '',
                    allergies: currentPatient.observation?.allergies || '',
                    medications: currentPatient.observation?.medications || ''
                })
            });
            
            // Recarregar a lista de pacientes para obter dados atualizados
            await loadPatients();
            
            alert('Observações clínicas atualizadas!');
            handleCloseModal();
        } catch (err) {
            console.error('Erro ao salvar observações:', err);
            alert('Erro ao salvar observações: ' + err.message);
        }
    };

    // Ação da Secretária: Excluir paciente
    const handleDelete = async (id) => {
        const secretaryPassword = window.prompt('Para confirmar a exclusão, digite sua senha de secretária:');
        
        if (!secretaryPassword) {
            return; // Usuário cancelou
        }
        
        if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
            try {
                await apiCall(`/patient/delete/${id}`, { 
                    method: 'DELETE',
                    body: JSON.stringify({ secretaryPassword })
                });
                setPatients(patients.filter(p => p.id !== id));
                alert('Paciente excluído.');
            } catch (err) {
                console.error('Erro ao excluir paciente:', err);
                alert('Erro ao excluir paciente: ' + err.message);
            }
        }
    };

    // --- Renderização ---
    return (
        <Container>
            <Title>Gerenciar Pacientes</Title>
            
            <Header>
                <SearchInput 
                    type="text"
                    placeholder="Buscar por nome ou CPF..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* [RF04] Secretária pode cadastrar paciente */}
                {isSecretary && (
                    <Button onClick={() => handleOpenModal(null)}>
                        Adicionar Paciente
                    </Button>
                )}
            </Header>
            
            <List>
                {filteredPatients.length > 0 ? (
                    filteredPatients.map(patient => (
                        <ListItem key={patient.id}>
                            <ItemInfo>
                                <strong>{patient.name}</strong>
                                <span>CPF: {patient.cpf}</span>
                            </ItemInfo>
                            <ItemActions>
                                {isSecretary ? (
                                    // Ações da Secretária: [RF05] Editar, [RF05] Deletar
                                    <>
                                        <button className="edit" onClick={() => handleOpenModal(patient)}>
                                            Editar
                                        </button>
                                        <button className="delete" onClick={() => handleDelete(patient.id)}>
                                            Excluir
                                        </button>
                                    </>
                                ) : (
                                    // Ação do Médico: [RF-Implícito] Ver prontuário
                                    <button className="view" onClick={() => handleOpenModal(patient)}>
                                        Ver Prontuário
                                    </button>
                                )}
                            </ItemActions>
                        </ListItem>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', color: '#999', padding: '2rem' }}>
                        {searchTerm ? 'Nenhum paciente encontrado' : 'Nenhum paciente cadastrado'}
                    </p>
                )}
            </List>
            
            {/* Modal de Cadastro/Edição (Secretária) ou Visualização (Médico) */}
            {showModal && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>
                            {/* O título muda conforme o papel */}
                            <h3>{isSecretary ? 'Dados do Paciente' : 'Prontuário do Paciente'}</h3>
                            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
                        </ModalHeader>
                        
                        {/* SECRETÁRIA VÊ O FORMULÁRIO DE CADASTRO (RF04, RF05)
                        */}
                        {isSecretary && (
                            <Form onSubmit={handleSavePatient}>
                                <Label htmlFor="name">Nome Completo</Label>
                                <Input 
                                    id="name" 
                                    name="name" 
                                    value={currentPatient.name || ''} 
                                    onChange={handleInputChange} 
                                    required 
                                />
                                
                                <Label htmlFor="cpf">CPF</Label>
                                <Input 
                                    id="cpf" 
                                    name="cpf" 
                                    value={currentPatient.cpf || ''} 
                                    onChange={handleInputChange} 
                                    required 
                                />
                                
                                <Label htmlFor="birthDay">Data de Nascimento</Label>
                                <Input 
                                    id="birthDay" 
                                    name="birthDay" 
                                    type="date" 
                                    value={currentPatient.birthDay ? currentPatient.birthDay.split('T')[0] : ''} 
                                    onChange={handleInputChange} 
                                    required 
                                />
                                
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                    id="email" 
                                    name="email" 
                                    type="email" 
                                    value={currentPatient.email || ''} 
                                    onChange={handleInputChange} 
                                />
                                
                                <Label htmlFor="sex">Sexo</Label>
                                <Select id="sex" name="sex" value={currentPatient.sex || 'Masculino'} onChange={handleInputChange}>
                                    <option>Masculino</option>
                                    <option>Feminino</option>
                                    <option>Outro</option>
                                </Select>
                                
                                <Label htmlFor="ethnicity">Etnia</Label>
                                <Select id="ethnicity" name="ethnicity" value={currentPatient.ethnicity || 'Pardo'} onChange={handleInputChange}>
                                    <option>Branco</option>
                                    <option>Pardo</option>
                                    <option>Preto</option>
                                    <option>Indígena</option>
                                    <option>Amarelo</option>
                                </Select>
                                
                                <SaveButton type="submit">Salvar Paciente</SaveButton>
                            </Form>
                        )}
                        
                        {/* MÉDICO VÊ O PRONTUÁRIO CLÍNICO (RF-Implícito)
                        */}
                        {!isSecretary && (
                            <Form onSubmit={handleSaveObservation}>
                                {/* Dados cadastrais são apenas leitura para o médico */}
                                <ReadOnlyGroup>
                                    <ReadOnlyField><strong>Paciente:</strong> {currentPatient.name}</ReadOnlyField>
                                    <ReadOnlyField><strong>CPF:</strong> {currentPatient.cpf}</ReadOnlyField>
                                    <ReadOnlyField><strong>Nascimento:</strong> {new Date(currentPatient.birthDay).toLocaleDateString()}</ReadOnlyField>
                                    <ReadOnlyField><strong>Sexo:</strong> {currentPatient.sex}</ReadOnlyField>
                                </ReadOnlyGroup>
                                
                                {/* Médico gerencia o histórico clínico (Observações) */}
                                <Label htmlFor="comorbidity">Comorbidades</Label>
                                <TextArea 
                                    id="comorbidity" 
                                    name="comorbidity" 
                                    value={currentPatient.observation?.comorbidity || ''} 
                                    onChange={handleObservationChange} 
                                />
                                
                                <Label htmlFor="allergies">Alergias</Label>
                                <TextArea 
                                    id="allergies" 
                                    name="allergies" 
                                    value={currentPatient.observation?.allergies || ''} 
                                    onChange={handleObservationChange} 
                                />
                                
                                <Label htmlFor="medications">Medicamentos em Uso</Label>
                                <TextArea 
                                    id="medications" 
                                    name="medications" 
                                    value={currentPatient.observation?.medications || ''} 
                                    onChange={handleObservationChange} 
                                />
                                
                                <SaveButton type="submit">Salvar Observações</SaveButton>
                            </Form>
                        )}
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};

export default Patients;