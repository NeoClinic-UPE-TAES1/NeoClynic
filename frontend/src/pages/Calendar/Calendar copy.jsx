import React, { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import ptBr from "@fullcalendar/core/locales/pt-br";
import { AuthContext } from "../../context/AuthContext";

// ============ Styled Components ============
const PageContainer = styled.div`
  padding: 2rem;
  background: #f4f6f8;
  min-height: 100vh;
`;

const PageLayout = styled.div`
  display: flex;
  gap: 2rem;
  height: 85vh;
  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
  }
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

  select {
    padding: 0.5rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 1rem;
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
  position: relative;
  z-index: 2;
`;

const PanelHeader = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #2d3748;
`;

const EventDetail = styled.div`
  margin-bottom: 1rem;
  position: relative;

  strong {
    color: #4a5568;
    display: block;
    margin-bottom: 0.25rem;
  }

  input,
  select {
    width: 100%;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 0.5rem;
    font-size: 1rem;
    color: #2d3748;
    background: ${({ readOnly }) => (readOnly ? "#edf2f7" : "white")};
    pointer-events: ${({ readOnly }) => (readOnly ? "none" : "auto")};
    &:focus {
      outline: none;
      border-color: #3182ce;
    }
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  z-index: 10;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  max-height: 180px;
  overflow-y: auto;
  list-style: none;
  margin: 0.25rem 0 0 0;
  padding: 0;

  li {
    padding: 0.5rem 1rem;
    cursor: pointer;
    &:hover {
      background: #ebf8ff;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SaveButton = styled(Button)`
  background: #3182ce;
  color: white;
  &:hover:not(:disabled) {
    background: #2c5282;
  }
`;

const CancelButton = styled(Button)`
  background: #a0aec0;
  color: white;
  &:hover:not(:disabled) {
    background: #718096;
  }
`;

const DeleteButton = styled(Button)`
  background: #e53e3e;
  color: white;
  &:hover:not(:disabled) {
    background: #c53030;
  }
`;

const AddButton = styled(Button)`
  background: #38a169;
  color: white;
  &:hover:not(:disabled) {
    background: #2f855a;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: #a0aec0;
  padding: 2rem;
`;

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #718096;
`;

// ============ MOCK DATA ============
const mockMedics = [
  { id: "1", name: "Dr. João Silva", specialty: "Cardiologia" },
  { id: "2", name: "Dra. Maria Souza", specialty: "Dermatologia" },
];

const mockPatients = [
  { id: "1", name: "Carlos Oliveira", cpf: "123.456.789-00" },
  { id: "2", name: "Ana Santos", cpf: "987.654.321-00" },
  { id: "3", name: "Carla Mendes", cpf: "555.111.222-33" },
  { id: "4", name: "Antônio Dias", cpf: "444.222.333-11" },
];

let mockConsultations = [
  {
    id: "c1",
    date: new Date().toISOString(),
    followUp: false,
    medic: mockMedics[0],
    patient: mockPatients[0],
  },
];

// ============ Mock Service ============
const consultationService = {
  getConsultations: async (medicId = null) => {
    await new Promise((r) => setTimeout(r, 300));
    if (medicId) return mockConsultations.filter((c) => c.medic.id === medicId);
    return mockConsultations;
  },
  createConsultation: async (data) => {
    const newConsultation = { id: String(Date.now()), ...data };
    mockConsultations = [...mockConsultations, newConsultation]; // 🔧 corrige sobrescrita
    return newConsultation;
  },
  updateConsultation: async (id, data) => {
    mockConsultations = mockConsultations.map((c) =>
      c.id === id ? { ...c, ...data } : c
    );
    return mockConsultations.find((c) => c.id === id);
  },
  deleteConsultation: async (id) => {
    mockConsultations = mockConsultations.filter((c) => c.id !== id);
    return { success: true };
  },
};

// ============ COMPONENT ============
const Calendar = () => {
  const { user } = useContext(AuthContext);
  const userRole = user?.role || "secretary";
  const loggedMedicId = user?.id || mockMedics[0].id;

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMedicId, setSelectedMedicId] = useState(
    userRole === "medic" ? loggedMedicId : mockMedics[0].id
  );

  // dropdown de pacientes
  const [patientSearch, setPatientSearch] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const detailsRef = useRef(null);

  useEffect(() => {
    loadConsultations(selectedMedicId);
  }, [selectedMedicId]);

  const loadConsultations = async (medicId) => {
    setLoading(true);
    const data = await consultationService.getConsultations(medicId);
    setEvents(
      data.map((c) => ({
        id: c.id,
        title: `${c.patient.name} - ${c.medic.name}`,
        start: c.date,
        extendedProps: {
          followUp: c.followUp,
          medic: c.medic,
          patient: c.patient,
        },
      }))
    );
    setLoading(false);
  };

  const handleEventClick = (info) => {
    const c = info.event.extendedProps;
    setSelectedEvent(info.event);
    setEditData({
      id: info.event.id,
      patientId: c.patient.id,
      medicId: c.medic.id,
      patientName: c.patient.name,
      medicName: c.medic.name,
      specialty: c.medic.specialty,
      date: info.event.start.toISOString().slice(0, 16),
      followUp: c.followUp,
    });
  };

  const handleNewConsultation = () => {
    setSelectedEvent(null);
    setEditData({
      patientId: "",
      medicId: selectedMedicId,
      patientName: "",
      medicName: mockMedics.find((m) => m.id === selectedMedicId)?.name || "",
      specialty:
        mockMedics.find((m) => m.id === selectedMedicId)?.specialty || "",
      date: new Date().toISOString().slice(0, 16),
      followUp: false,
    });
    setPatientSearch("");
    setFilteredPatients([]);
    setIsCreating(true);
  };

  const handleCancel = () => {
    setSelectedEvent(null);
    setIsCreating(false);
    setEditData(null);
  };

  const handleSave = async () => {
    if (userRole === "medic") return;
    setIsProcessing(true);

    const medic = mockMedics.find((m) => m.id === selectedMedicId);
    const patient = mockPatients.find((p) => p.id === editData.patientId);

    if (!patient) {
      alert("❌ Selecione um paciente antes de salvar.");
      setIsProcessing(false);
      return;
    }

    const payload = {
      date: new Date(editData.date).toISOString(),
      followUp: !!editData.followUp,
      medic,
      patient,
    };

    let saved;
    if (isCreating) {
      saved = await consultationService.createConsultation(payload);
    } else {
      saved = await consultationService.updateConsultation(editData.id, payload);
    }

    // ✅ em vez de recarregar tudo, atualizamos localmente
    setEvents((prev) => {
      const newEvent = {
        id: saved.id,
        title: `${saved.patient.name} - ${saved.medic.name}`,
        start: saved.date,
        extendedProps: {
          followUp: saved.followUp,
          medic: saved.medic,
          patient: saved.patient,
        },
      };
      if (isCreating) return [...prev, newEvent];
      return prev.map((e) => (e.id === saved.id ? newEvent : e));
    });

    handleCancel();
    setIsProcessing(false);
  };

  const handleDelete = async () => {
    if (userRole === "medic") return;
    if (!window.confirm("Deseja excluir esta consulta?")) return;
    setIsProcessing(true);
    await consultationService.deleteConsultation(editData.id);
    await loadConsultations(selectedMedicId);
    handleCancel();
    setIsProcessing(false);
  };

  // busca de pacientes (autocomplete)
  useEffect(() => {
    if (patientSearch.trim() === "") {
      setFilteredPatients([]);
      setShowDropdown(false);
      return;
    }
    const filtered = mockPatients.filter((p) =>
      p.name.toLowerCase().includes(patientSearch.toLowerCase())
    );
    setFilteredPatients(filtered);
    setShowDropdown(true);
  }, [patientSearch]);

  if (userRole === "admin") {
    return (
      <PageContainer>
        <EmptyState>
          <h2>Acesso restrito</h2>
          <p>Administradores não têm acesso à agenda.</p>
        </EmptyState>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageLayout>
        <CalendarContainer>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>
              {userRole === "medic"
                ? "Agenda do Médico"
                : "Agenda de Consultas"}
            </h1>

            {userRole === "secretary" && (
              <FilterContainer>
                <label>Médico:</label>
                <select
                  value={selectedMedicId}
                  onChange={(e) => setSelectedMedicId(e.target.value)}
                >
                  {mockMedics.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} — {m.specialty}
                    </option>
                  ))}
                </select>
              </FilterContainer>
            )}
          </div>

          {loading ? (
            <LoadingState>Carregando...</LoadingState>
          ) : (
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
              locale={ptBr}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
              }}
              events={events}
              eventClick={handleEventClick}
              height="100%"
            />
          )}
        </CalendarContainer>

        <DetailsPanel ref={detailsRef}>
          <PanelHeader>
            {isCreating
              ? "Nova Consulta"
              : selectedEvent
              ? "Detalhes da Consulta"
              : "Selecione uma consulta"}
          </PanelHeader>

          {(selectedEvent || isCreating) && editData && (
            <>
              <EventDetail readOnly={userRole === "medic"}>
                <strong>Paciente</strong>
                {userRole === "secretary" ? (
                  <>
                    <input
                      type="text"
                      value={patientSearch || editData.patientName}
                      onChange={(e) => {
                        setPatientSearch(e.target.value);
                        setEditData((p) => ({
                          ...p,
                          patientId: "",
                          patientName: e.target.value,
                        }));
                      }}
                      onFocus={() =>
                        patientSearch && setShowDropdown(true)
                      }
                      placeholder="Digite para buscar paciente..."
                    />
                    {showDropdown && filteredPatients.length > 0 && (
                      <DropdownList>
                        {filteredPatients.map((p) => (
                          <li
                            key={p.id}
                            onClick={() => {
                              setEditData((prev) => ({
                                ...prev,
                                patientId: p.id,
                                patientName: p.name,
                              }));
                              setPatientSearch(p.name);
                              setShowDropdown(false);
                            }}
                          >
                            {p.name} — {p.cpf}
                          </li>
                        ))}
                      </DropdownList>
                    )}
                  </>
                ) : (
                  <input value={editData.patientName} readOnly />
                )}
              </EventDetail>

              <EventDetail readOnly>
                <strong>Médico</strong>
                <input value={editData.medicName} readOnly />
              </EventDetail>

              <EventDetail readOnly>
                <strong>Especialidade</strong>
                <input value={editData.specialty} readOnly />
              </EventDetail>

              <EventDetail readOnly={userRole === "medic"}>
                <strong>Data da Consulta</strong>
                <input
                  type="datetime-local"
                  value={editData.date}
                  onChange={(e) =>
                    setEditData((p) => ({ ...p, date: e.target.value }))
                  }
                  readOnly={userRole === "medic"}
                />
              </EventDetail>

              <EventDetail readOnly={userRole === "medic"}>
                <strong>Retorno</strong>
                <select
                  value={editData.followUp ? "Sim" : "Não"}
                  onChange={(e) =>
                    setEditData((p) => ({
                      ...p,
                      followUp: e.target.value === "Sim",
                    }))
                  }
                  disabled={userRole === "medic"}
                >
                  <option>Não</option>
                  <option>Sim</option>
                </select>
              </EventDetail>

              {userRole === "secretary" && (
                <ActionButtons>
                  <SaveButton onClick={handleSave} disabled={isProcessing}>
                    {isProcessing ? "Salvando..." : "Salvar"}
                  </SaveButton>
                  <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
                  {!isCreating && (
                    <DeleteButton onClick={handleDelete}>Excluir</DeleteButton>
                  )}
                </ActionButtons>
              )}
            </>
          )}

          {!selectedEvent && !isCreating && (
            <>
              <EmptyState>Selecione ou crie uma nova consulta.</EmptyState>
              {userRole === "secretary" && (
                <ActionButtons style={{ marginTop: "auto" }}>
                  <AddButton onClick={handleNewConsultation}>
                    Nova Consulta
                  </AddButton>
                </ActionButtons>
              )}
            </>
          )}
        </DetailsPanel>
      </PageLayout>
    </PageContainer>
  );
};

export default Calendar;
