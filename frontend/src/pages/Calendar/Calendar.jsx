import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import ptBr from "@fullcalendar/core/locales/pt-br";
import useApi from "../../hooks/useApi";
import { AuthContext } from "../../context/AuthContext";
import "./CalendarStyles.css";

// ===== Estilos =====
const PageLayout = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
  min-height: 100vh;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

const CalendarContainer = styled.div`
  flex: 1.2;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.05);
  min-height: 600px;
  overflow: hidden;

  h1 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  h1 .title-text {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 1200px) {
    min-height: 500px;
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    min-height: 400px;

    h1 {
      font-size: 1.5rem;
    }
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  gap: 1rem;
  align-items: center;

  label {
    font-weight: 600;
    color: #2d3748;
  }
`;

const DetailsPanel = styled.div`
  flex: 0.8;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow-y: auto;
  padding-bottom: 2rem;
  max-height: calc(100vh - 4rem);

  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e0;
    border-radius: 8px;
    transition: background-color 0.2s;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #a0aec0;
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    max-height: none;
  }
`;

const HeaderDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a202c;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;

    h2 {
      font-size: 1.25rem;
    }
  }
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  letter-spacing: 0.3px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  box-sizing: border-box;

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

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  resize: vertical;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.2s ease;
  min-height: 100px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  margin-right: 0.5rem;
  background: ${(props) =>
    props.$delete
      ? "#ff4d4f"
      : props.$secondary
      ? "#6c757d"
      : props.$view
      ? "#17a2b8"
      : "#007bff"};
  color: white;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  margin-bottom: 1.5rem;
  font-weight: 500;
  font-size: 0.95rem;
  color: #2d3748;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;

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

  option {
    padding: 0.5rem;
  }
`;

const CalendarWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
  font-weight: 500;
  color: #2d3748;
  cursor: pointer;
  user-select: none;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #667eea;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid #e2e8f0;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: #718096;
  
  p {
    font-size: 1rem;
    line-height: 1.6;
  }

  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
`;

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 1.25rem;
  color: #667eea;
  font-weight: 600;
`;

const PasswordSection = styled.div`
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: #fff5f5;
  border: 2px solid #feb2b2;
  border-radius: 8px;
`;

// ===== Componente Principal =====
const Calendar = () => {
  const navigate = useNavigate();
  const { apiCall, loading } = useApi();
  const { user } = useContext(AuthContext);

  const [consultations, setConsultations] = useState([]);
  const [medics, setMedics] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedMedicId, setSelectedMedicId] = useState("");
  const [secretaryPassword, setSecretaryPassword] = useState("");

  const isSecretary = user?.role === "SECRETARY";
  const isMedic = user?.role === "MEDIC";

  // Carrega os dados iniciais
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Carrega consultas
      const consultationsData = await apiCall("/consultation/list");
      setConsultations(consultationsData.consultations || []);

      // Carrega médicos
      const medicsData = await apiCall("/medic/list");
      setMedics(medicsData.medics || []);

      // Carrega pacientes (secretária e médico precisam ver os nomes)
      const patientsData = await apiCall("/patient/list");
      setPatients(patientsData.patients || []);

      // Se for médico, seleciona automaticamente suas próprias consultas
      if (isMedic && user?.id) {
        setSelectedMedicId(user.id);
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      alert("Erro ao carregar dados do calendário");
    }
  };

  // Converte consultas para eventos do calendário
  const events = consultations
    .filter((c) => !selectedMedicId || c.medicId === selectedMedicId)
    .map((consultation) => {
      const medic = medics.find((m) => m.id === consultation.medicId);
      const patient = patients.find((p) => p.id === consultation.patientId);
      
      return {
        id: consultation.id,
        title: `${medic?.name || "Médico"} - ${patient?.name || "Paciente"}`,
        start: consultation.date,
        end: new Date(new Date(consultation.date).getTime() + 60 * 60 * 1000).toISOString(),
        extendedProps: {
          medicId: consultation.medicId,
          patientId: consultation.patientId,
          hasFollowUp: consultation.hasFollowUp,
          medicName: medic?.name || "Médico não encontrado",
          patientName: patient?.name || "Paciente não encontrado"
        }
      };
    });

  const handleEventClick = (info) => {
    const consultation = consultations.find((c) => c.id === info.event.id);
    if (consultation) {
      const medic = medics.find((m) => m.id === consultation.medicId);
      const patient = patients.find((p) => p.id === consultation.patientId);
      
      // Converter a data sem ajuste de timezone
      const consultDate = new Date(consultation.date);
      const localDate = new Date(consultDate.getTime() - consultDate.getTimezoneOffset() * 60000);
      
      setSelectedEvent({
        id: consultation.id,
        date: localDate.toISOString().slice(0, 16),
        hasFollowUp: consultation.hasFollowUp,
        medicId: consultation.medicId,
        patientId: consultation.patientId,
        medicName: medic?.name || "Médico não encontrado",
        patientName: patient?.name || "Paciente não encontrado"
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!selectedEvent.date || !selectedEvent.medicId || !selectedEvent.patientId) {
      alert("Preencha todos os campos obrigatórios antes de salvar.");
      return;
    }

    try {
      if (!selectedEvent.id) {
        // Criar nova consulta (apenas secretária)
        if (!isSecretary) {
          alert("Apenas secretárias podem criar consultas.");
          return;
        }

        await apiCall("/consultation/register", {
          method: "POST",
          body: JSON.stringify({
            date: new Date(selectedEvent.date).toISOString(),
            hasFollowUp: selectedEvent.hasFollowUp || false,
            medicId: selectedEvent.medicId,
            patientId: selectedEvent.patientId
          })
        });
        alert("Nova consulta criada com sucesso!");
      } else {
        // Atualizar consulta existente
        await apiCall(`/consultation/update/${selectedEvent.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            date: new Date(selectedEvent.date).toISOString(),
            hasFollowUp: selectedEvent.hasFollowUp || false
          })
        });
        alert("Consulta atualizada com sucesso!");
      }
      
      setSelectedEvent(null);
      loadData(); // Recarrega os dados
    } catch (error) {
      console.error("Erro ao salvar consulta:", error);
      alert("Erro ao salvar consulta: " + error.message);
    }
  };

  const handleDelete = async () => {
    if (!isSecretary) {
      alert("Apenas secretárias podem excluir consultas.");
      return;
    }

    if (!secretaryPassword) {
      alert("Digite sua senha para confirmar a exclusão.");
      return;
    }

    if (window.confirm("Tem certeza que deseja excluir esta consulta?")) {
      try {
        await apiCall(`/consultation/delete/${selectedEvent.id}`, {
          method: "DELETE",
          body: JSON.stringify({ secretaryPassword })
        });
        
        alert("Consulta excluída com sucesso!");
        setSelectedEvent(null);
        setSecretaryPassword("");
        loadData(); // Recarrega os dados
      } catch (error) {
        console.error("Erro ao excluir consulta:", error);
        alert("Erro ao excluir consulta: " + error.message);
      }
    }
  };

  const handleCreate = () => {
    if (!isSecretary) {
      alert("Apenas secretárias podem criar consultas.");
      return;
    }

    if (!selectedMedicId) {
      alert("Selecione um médico antes de criar uma nova consulta.");
      return;
    }

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);

    setSelectedEvent({
      id: null,
      date: tomorrow.toISOString().slice(0, 16),
      hasFollowUp: false,
      medicId: selectedMedicId,
      patientId: patients[0]?.id || "",
      medicName: medics.find(m => m.id === selectedMedicId)?.name || "",
      patientName: patients[0]?.name || ""
    });
  };

  const handleViewDetails = () => {
    if (selectedEvent?.id) {
      navigate(`/consulta/${selectedEvent.id}`);
    } else {
      alert("Selecione uma consulta existente para ver detalhes.");
    }
  };

  if (loading) {
    return (
      <LoadingState>
        <div>⏳ Carregando calendário...</div>
      </LoadingState>
    );
  }

  return (
    <PageLayout>
      {/* 🗓️ CALENDÁRIO */}
      <CalendarContainer>
        <h1>
          <span>📅</span>
          <span className="title-text">Agenda de Consultas</span>
        </h1>

        <Select
          value={selectedMedicId}
          onChange={(e) => {
            setSelectedMedicId(e.target.value);
            setSelectedEvent(null);
          }}
          disabled={isMedic} // Médico não pode trocar a visualização
        >
          <option value="">🩺 Selecione um médico</option>
          {medics.map((medic) => (
            <option key={medic.id} value={medic.id}>
              {medic.name} - {medic.specialty}
            </option>
          ))}
        </Select>

        {selectedMedicId ? (
          <CalendarWrapper>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
              initialView="dayGridMonth"
              locale={ptBr}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
              }}
              buttonText={{
                today: "Hoje",
                month: "Mês",
                week: "Semana",
                day: "Dia",
                list: "Lista",
              }}
              events={events}
              eventClick={handleEventClick}
              nowIndicator={true}
              allDaySlot={false}
              height="100%"
              contentHeight="auto"
            />
          </CalendarWrapper>
        ) : (
          <EmptyState>
            <div className="icon">🩺</div>
            <p>Selecione um médico para visualizar as consultas no calendário.</p>
          </EmptyState>
        )}
      </CalendarContainer>

      {/* 📝 PAINEL DE DETALHES */}
      <DetailsPanel>
        <HeaderDetails>
          <h2>📝 Detalhes da Consulta</h2>
          {isSecretary && (
            <Button $secondary onClick={handleCreate}>➕ Criar Consulta</Button>
          )}
        </HeaderDetails>

        {selectedEvent ? (
          <>
            <Label>👨‍⚕️ Médico:</Label>
            {selectedEvent.id ? (
              <Input
                value={selectedEvent.medicName}
                disabled
              />
            ) : (
              <Select
                name="medicId"
                value={selectedEvent.medicId}
                onChange={handleChange}
                disabled={!isSecretary}
              >
                {medics.map((medic) => (
                  <option key={medic.id} value={medic.id}>
                    {medic.name} - {medic.specialty}
                  </option>
                ))}
              </Select>
            )}

            <Label>👤 Paciente:</Label>
            {selectedEvent.id ? (
              <Input
                value={selectedEvent.patientName}
                disabled
              />
            ) : (
              <Select
                name="patientId"
                value={selectedEvent.patientId}
                onChange={handleChange}
                disabled={!isSecretary}
              >
                <option value="">Selecione um paciente</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} - {patient.cpf}
                  </option>
                ))}
              </Select>
            )}

            <Label>📅 Data e Hora:</Label>
            <Input
              type="datetime-local"
              name="date"
              value={selectedEvent.date}
              onChange={handleChange}
              disabled={!isSecretary}
            />

            <CheckboxLabel>
              <input
                type="checkbox"
                name="hasFollowUp"
                checked={selectedEvent.hasFollowUp}
                onChange={(e) =>
                  setSelectedEvent((prev) => ({
                    ...prev,
                    hasFollowUp: e.target.checked,
                  }))
                }
                disabled={!isSecretary}
              />
              🔄 Consulta de retorno
            </CheckboxLabel>

            <ButtonGroup>
              {isSecretary && (
                <Button onClick={handleSave}>💾 Salvar</Button>
              )}
              {selectedEvent.id && (
                <Button $view onClick={handleViewDetails}>👁 Ver detalhes</Button>
              )}
            </ButtonGroup>

            {selectedEvent.id && isSecretary && (
              <PasswordSection>
                <Label>🔐 Senha (para excluir):</Label>
                <Input
                  type="password"
                  value={secretaryPassword}
                  onChange={(e) => setSecretaryPassword(e.target.value)}
                  placeholder="Digite sua senha para confirmar exclusão"
                />
                <Button $delete onClick={handleDelete}>🗑 Excluir Consulta</Button>
              </PasswordSection>
            )}
          </>
        ) : (
          <EmptyState>
            <div className="icon">📋</div>
            <p>
              {selectedMedicId
                ? "Selecione uma consulta no calendário para ver ou editar."
                : "Selecione um médico para começar."}
            </p>
          </EmptyState>
        )}
      </DetailsPanel>
    </PageLayout>
  );
};

export default Calendar;
