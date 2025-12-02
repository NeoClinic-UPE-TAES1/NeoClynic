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

// ===== Estilos =====
const PageLayout = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  background: #f4f6f8;
  min-height: 100vh;
  box-sizing: border-box;
`;

const CalendarContainer = styled.div`
  flex: 1.2;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
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
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;

  /* ADICIONADO: permite rolagem */
  overflow-y: auto;

  /* ADICIONADO: adiciona um pequeno espaço ao final */
  padding-bottom: 2rem;

  /* Opcional: melhora a aparência da barra de rolagem */
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }
`;

const HeaderDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h2 {
    font-size: 1.25rem;
    font-weight: bold;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.75rem;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  resize: none;
  margin-bottom: 0.75rem;
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  margin-right: 0.5rem;
  background: ${(props) =>
    props.delete
      ? "#ff4d4f"
      : props.secondary
      ? "#6c757d"
      : props.view
      ? "#17a2b8"
      : "#007bff"};
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;

const Select = styled.select`
  padding: 0.6rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
  font-weight: 500;
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
    return <PageLayout><div>Carregando...</div></PageLayout>;
  }

  return (
    <PageLayout>
      {/* 🗓️ CALENDÁRIO */}
      <CalendarContainer>
        <h1>Agenda de Consultas</h1>

        <Select
          value={selectedMedicId}
          onChange={(e) => {
            setSelectedMedicId(e.target.value);
            setSelectedEvent(null);
          }}
          disabled={isMedic} // Médico não pode trocar a visualização
        >
          <option value="">Selecione um médico</option>
          {medics.map((medic) => (
            <option key={medic.id} value={medic.id}>
              {medic.name} - {medic.specialty}
            </option>
          ))}
        </Select>

        {selectedMedicId ? (
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
          />
        ) : (
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            🩺 Selecione um médico para visualizar as consultas no calendário.
          </p>
        )}
      </CalendarContainer>

      {/* 📝 PAINEL DE DETALHES */}
      <DetailsPanel>
        <HeaderDetails>
          <h2>Detalhes da Consulta</h2>
          {isSecretary && (
            <Button secondary onClick={handleCreate}>➕ Criar Consulta</Button>
          )}
        </HeaderDetails>

        {selectedEvent ? (
          <>
            <label>Médico:</label>
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

            <label>Paciente:</label>
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

            <label>Data e Hora:</label>
            <Input
              type="datetime-local"
              name="date"
              value={selectedEvent.date}
              onChange={handleChange}
              disabled={!isSecretary}
            />

            <label>
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
              {" "}Consulta de retorno
            </label>

            <div style={{ marginTop: "1rem" }}>
              {isSecretary && (
                <Button onClick={handleSave}>💾 Salvar</Button>
              )}
              {selectedEvent.id && (
                <>
                  <Button view onClick={handleViewDetails}>👁 Ver detalhes</Button>
                  {isSecretary && (
                    <>
                      <label style={{ display: "block", marginTop: "1rem" }}>
                        Senha (para excluir):
                      </label>
                      <Input
                        type="password"
                        value={secretaryPassword}
                        onChange={(e) => setSecretaryPassword(e.target.value)}
                        placeholder="Digite sua senha"
                      />
                      <Button delete onClick={handleDelete}>🗑 Excluir</Button>
                    </>
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <p>
            {selectedMedicId
              ? "Selecione uma consulta no calendário para ver ou editar."
              : "Selecione um médico para começar."}
          </p>
        )}
      </DetailsPanel>
    </PageLayout>
  );
};

export default Calendar;
