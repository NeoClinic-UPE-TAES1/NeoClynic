import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // 👈 Importa o hook para navegar
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import ptBr from "@fullcalendar/core/locales/pt-br";

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

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
  }

  .fc {
    flex: 1;
    min-height: 0;
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
  const navigate = useNavigate(); // 👈 Hook do React Router

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Consulta com Dr. João Figueiro Mario Da Silva",
      start: "2025-10-07T09:30:00",
      end: "2025-10-07T10:30:00",
      description: "Consulta de rotina para acompanhamento de saúde.",
      paciente: "Maria Clara Santos",
      medico: "Dr. João Figueiro",
    },
    {
      id: 2,
      title: "Exame de Rotina",
      start: "2025-10-10T14:00:00",
      end: "2025-10-10T15:00:00",
      description: "Exames laboratoriais e verificação de resultados anteriores.",
      paciente: "João Henrique",
      medico: "Dra. Maria Souza",
    },
    {
      id: 3,
      title: "Retorno com Dra. Maria",
      start: "2025-10-12T16:15:00",
      end: "2025-10-12T17:00:00",
      description: "Avaliação pós-tratamento com resultados de exames.",
      paciente: "Paulo Ricardo",
      medico: "Dra. Maria Souza",
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const doctors = [...new Set(events.map((e) => e.medico))];

  const handleEventClick = (info) => {
    const event = events.find((e) => e.title === info.event.title);
    setSelectedEvent({ ...event });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!selectedEvent.title || !selectedEvent.start || !selectedEvent.end) {
      alert("Preencha todos os campos obrigatórios antes de salvar.");
      return;
    }

    if (!selectedEvent.id) {
      const newEvent = { ...selectedEvent, id: Date.now() };
      setEvents((prev) => [...prev, newEvent]);
      alert("Nova consulta criada com sucesso!");
    } else {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === selectedEvent.id ? selectedEvent : event
        )
      );
      alert("Evento atualizado com sucesso!");
    }
    setSelectedEvent(null);
  };

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja excluir este evento?")) {
      setEvents((prev) => prev.filter((event) => event.id !== selectedEvent.id));
      setSelectedEvent(null);
    }
  };

  const handleCreate = () => {
    if (!selectedDoctor) {
      alert("Selecione um médico antes de criar uma nova consulta.");
      return;
    }

    const newEvent = {
      id: null,
      title: "Nova Consulta",
      start: new Date().toISOString().slice(0, 16),
      end: new Date(new Date().getTime() + 60 * 60 * 1000)
        .toISOString()
        .slice(0, 16),
      description: "",
      paciente: "",
      medico: selectedDoctor,
    };

    setSelectedEvent(newEvent);
  };

  // 👁 Redireciona para a página de detalhes da consulta
  const handleViewDetails = () => {
    if (selectedEvent?.id) {
      navigate(`/consulta/${selectedEvent.id}`, { state: { consulta: selectedEvent } });
    } else {
      alert("Selecione uma consulta existente para ver detalhes.");
    }
  };

  const filteredEvents = selectedDoctor
    ? events.filter((e) => e.medico === selectedDoctor)
    : [];

  return (
    <PageLayout>
      {/* 🗓️ CALENDÁRIO */}
      <CalendarContainer>
        <h1>Agenda</h1>

        <Select
          value={selectedDoctor}
          onChange={(e) => {
            setSelectedDoctor(e.target.value);
            setSelectedEvent(null);
          }}
        >
          <option value="">Selecione um médico</option>
          {doctors.map((doc) => (
            <option key={doc} value={doc}>
              {doc}
            </option>
          ))}
        </Select>

        {selectedDoctor ? (
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
            events={filteredEvents}
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
          <Button secondary onClick={handleCreate}>➕ Criar Consulta</Button>
        </HeaderDetails>

        {selectedEvent ? (
          <>
            <label>Título:</label>
            <Input
              name="title"
              value={selectedEvent.title}
              onChange={handleChange}
            />

            <label>Médico:</label>
            <Input
              name="medico"
              value={selectedEvent.medico}
              onChange={handleChange}
            />

            <label>Paciente:</label>
            <Input
              name="paciente"
              value={selectedEvent.paciente}
              onChange={handleChange}
            />

            <label>Início:</label>
            <Input
              type="datetime-local"
              name="start"
              value={selectedEvent.start.slice(0, 16)}
              onChange={handleChange}
            />

            <label>Término:</label>
            <Input
              type="datetime-local"
              name="end"
              value={selectedEvent.end.slice(0, 16)}
              onChange={handleChange}
            />

            <label>Descrição:</label>
            <TextArea
              rows="3"
              name="description"
              value={selectedEvent.description}
              onChange={handleChange}
            />

            <div style={{ marginTop: "1rem" }}>
              <Button onClick={handleSave}>💾 Salvar</Button>
              {selectedEvent.id && (
                <>
                  <Button view onClick={handleViewDetails}>👁 Ver detalhes</Button>
                  <Button delete onClick={handleDelete}>🗑 Excluir</Button>
                </>
              )}
            </div>
          </>
        ) : (
          <p>
            {selectedDoctor
              ? "Selecione uma consulta no calendário para ver ou editar."
              : "Selecione um médico para começar."}
          </p>
        )}
      </DetailsPanel>
    </PageLayout>
  );
};

export default Calendar;
