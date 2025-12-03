import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
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

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    gap: 1rem;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

const SearchInput = styled.input`
    padding: 0.75rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    width: 300px;
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
        width: 100%;
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
`;

const ItemActions = styled.div`
    position: relative;
    display: flex;
    gap: 0.5rem;
    
    .view {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        font-size: 0.85rem;
        transition: all 0.2s ease;
        white-space: nowrap;
        background-color: #17a2b8;
        color: white;

        &:hover {
            background-color: #138496;
        }
    }

    @media (max-width: 768px) {
        width: 100%;
        
        .view {
            flex: 1;
        }
    }
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

// --- Modal ---
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
    animation: fadeIn 0.2s ease;

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

const ModalContent = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 16px;
    width: 90%;
    max-width: 700px;
    max-height: 85vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease;

    @keyframes slideUp {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    scrollbar-width: thin;
    scrollbar-color: #cbd5e0 transparent;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #cbd5e0;
        border-radius: 8px;
    }

    @media (max-width: 768px) {
        padding: 1.5rem;
        width: 95%;
    }
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 1rem;
    
    h3 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 700;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
`;

const CloseButton = styled.button`
    background: transparent;
    border: none;
    font-size: 1.75rem;
    cursor: pointer;
    color: #718096;
    transition: color 0.2s ease;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    &:hover {
        color: #1a202c;
        background: #f7fafc;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
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

const Select = styled.select`
    padding: 0.75rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    background: white;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
`;

const TextArea = styled.textarea`
    padding: 0.75rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    min-height: 100px;
    resize: vertical;
    font-size: 0.95rem;
    font-family: inherit;
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
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

const ReadOnlyGroup = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
    padding: 1.25rem;
    border-radius: 12px;
    margin-bottom: 1rem;
    border: 1px solid #e2e8f0;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const ReadOnlyField = styled.div`
    font-size: 0.95rem;
    
    strong {
        display: block;
        color: #718096;
        font-size: 0.8rem;
        margin-bottom: 0.25rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    span {
        color: #1a202c;
        font-weight: 600;
    }
`;

const SaveButton = styled(Button)`
    background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
    margin-top: 1rem;
    
    &:hover {
        box-shadow: 0 4px 8px rgba(72, 187, 120, 0.3);
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
    const [openMenuId, setOpenMenuId] = useState(null);
    
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

    // Função para formatar CPF com máscara
    const formatCPF = (cpf) => {
        if (!cpf) return '';
        const cleaned = cpf.replace(/\D/g, '');
        if (cleaned.length <= 11) {
            return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        }
        return cleaned;
    };

    // Handler para aplicar máscara enquanto o usuário digita
    const handleCPFChange = (e) => {
        const value = e.target.value;
        const cleaned = value.replace(/\D/g, ''); // Remove tudo que não é número
        setCurrentPatient({ ...currentPatient, cpf: cleaned });
    };
    
    // 3. Lógica de Filtro
    const filteredPatients = useMemo(() => 
        patients.filter(p => 
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.cpf.includes(searchTerm)
        ), 
    [patients, searchTerm]);

    // Função para mapear sexo do backend para o frontend
    const mapSexFromBackend = (sex) => {
        if (sex === 'M') return 'Masculino';
        if (sex === 'F') return 'Feminino';
        return sex; // Retorna como está se for 'Outro' ou outro valor
    };

    // 4. Handlers de Ações
    const handleOpenModal = (patient) => {
        if (patient) {
            // Converter sexo do backend (M/F) para o frontend (Masculino/Feminino)
            const mappedPatient = {
                ...patient,
                sex: mapSexFromBackend(patient.sex)
            };
            setCurrentPatient(mappedPatient);
        } else {
            setCurrentPatient(emptyPatient);
        }
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
                // Filtrar campos vazios para não enviar ao backend
                const filteredData = Object.fromEntries(
                    Object.entries(patientData).filter(([_, value]) => value !== null && value !== '')
                );
                const response = await apiCall(`/patient/update/${currentPatient.id}`, { 
                    method: 'PATCH', 
                    body: JSON.stringify(filteredData)
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
            await apiCall(`/patient/update/${currentPatient.id}`, { 
                method: 'PATCH', 
                body: JSON.stringify({
                    observation: {
                        comorbidity: currentPatient.observation?.comorbidity || '',
                        allergies: currentPatient.observation?.allergies || '',
                        medications: currentPatient.observation?.medications || ''
                    }
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
            <PageCard>
                <Title>
                    <span>👥</span>
                    <span className="title-text">Gerenciar Pacientes</span>
                </Title>
                
                <Header>
                    <SearchInput 
                        type="text"
                        placeholder="🔍 Buscar por nome ou CPF..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {/* [RF04] Secretária pode cadastrar paciente */}
                    {isSecretary && (
                        <Button onClick={() => handleOpenModal(null)}>
                            ➕ Adicionar Paciente
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
                                        <MenuButton onClick={() => setOpenMenuId(openMenuId === patient.id ? null : patient.id)}>
                                            ⋮
                                        </MenuButton>
                                        {openMenuId === patient.id && (
                                            <DropdownMenu>
                                                <DropdownItem className="edit" onClick={() => {
                                                    handleOpenModal(patient);
                                                    setOpenMenuId(null);
                                                }}>
                                                    ✏️ Editar
                                                </DropdownItem>
                                                <DropdownItem className="delete" onClick={() => {
                                                    handleDelete(patient.id);
                                                    setOpenMenuId(null);
                                                }}>
                                                    🗑️ Excluir
                                                </DropdownItem>
                                            </DropdownMenu>
                                        )}
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
                                    value={formatCPF(currentPatient.cpf || '')} 
                                    onChange={handleCPFChange} 
                                    required 
                                    maxLength="14"
                                    placeholder="000.000.000-00"
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
                                    <ReadOnlyField><strong>Sexo:</strong> {mapSexFromBackend(currentPatient.sex)}</ReadOnlyField>
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
            </PageCard>
        </Container>
    );
};

export default Patients;