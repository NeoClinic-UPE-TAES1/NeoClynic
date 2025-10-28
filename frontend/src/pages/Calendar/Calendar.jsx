import React, { useState } from "react";
import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import ptBr from "@fullcalendar/core/locales/pt-br";

// Estilização

// Layout principal (duas colunas)
const PageLayout = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  height: 85vh;
  background: #f4f6f8;
`; 

// Coluna do calendário
const CalendarContainer = styled.div`
  flex: 1.2; /* ocupa um pouco mais da metade */
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

  .fc-event-title {
    white-space: normal !important;
    overflow: visible !important;
    text-overflow: clip !important;
    font-size: 0.9rem !important;
    line-height: 1.2 !important;
  }
`;

// Coluna da direita (detalhes da consulta)
const DetailsPanel = styled.div`
  flex: 0.8; /* menor que o calendário */
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;


const Calendar = ({ readonly = false }) => {

  const [selectedEvent, setSelectedEvent] = useState(null);

  const initialEvents = [
    {
    id: 'evt-1',
    title: "Consulta com Dr. João Figueiro Mario Da Silva",
    start: "2025-10-07T09:30:00",
    end: "2025-10-07T10:30:00",
    description: "Consulta de rotina para acompanhamento de saúde.",
    paciente: "Maria Clara Santos",
    completed: false,
    backgroundColor: '#3788d8',
    },
    {
      id: 'evt-2',
      title: "Consulta 2 com Dr. João Figueiro Mario Da Silva",
      start: "2025-10-07T11:00:00",
      end: "2025-10-07T12:00:00",
      description: "Consulta de rotina para acompanhamento de saúde.",
      paciente: "Maria Clara Santos",
      completed: false,
      backgroundColor: '#3788d8',
    },
    {
    id: 'evt-3',
    title: "Exame de Rotina",
    start: "2025-10-10T14:00:00",
    end: "2025-10-10T15:00:00",
    description: "Exames laboratoriais e verificação de resultados anteriores.",
    paciente: "João Henrique",
    completed: false,
    backgroundColor: '#3788d8',
    },
    {
    id: 'evt-4',
    title: "Retorno com Dra. Maria",
    start: "2025-10-12T16:15:00",
    end: "2025-10-12T17:00:00",
    description: "Avaliação pós-tratamento com resultados de exames.",
    paciente: "Paulo Ricardo",
    completed: false,
    backgroundColor: '#3788d8',
    },
  ];

  const [events, setEvents] = useState(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [formData, setFormData] = useState({ title: '', paciente: '', description: '', start: '', end: '' });

  const openCreateModal = () => {
    setModalMode('create');
    setFormData({ title: '', paciente: '', description: '', start: '', end: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (evt) => {
    setModalMode('edit');
    setFormData({
      id: evt.id,
      title: evt.title,
      paciente: evt.paciente || evt.extendedProps?.paciente || '',
      description: evt.description || evt.extendedProps?.description || '',
      start: evt.start, // ISO strings
      end: evt.end,
    });
    setIsModalOpen(true);
  };

  const handleEventClick = (info) => {
    setSelectedEvent({
      id: info.event.id,
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
      extendedProps: info.event.extendedProps,
    });
  };

  const toggleCompleted = (eventId) => {
    const evt = events.find(e => e.id === eventId);
    if (!evt) return;

    // If not yet completed, ask confirmation first, then optionally reschedule
    if (!evt.completed) {
      const confirmMark = window.confirm('Deseja marcar esta consulta como concluída?');
      if (!confirmMark) return; // user cancelled, do nothing

      const doReschedule = window.confirm('Deseja reagendar um retorno exatamente 1 mês depois?');

      // mark as completed
      setEvents(prev => prev.map(e => e.id === eventId ? { ...e, completed: true, backgroundColor: '#6bbf6b' } : e));

      // clear selectedEvent view so UI refreshes; then re-open if needed
      setSelectedEvent(null);

      if (doReschedule) {
        // create new appointment 1 month later with same paciente and description
        const originalStart = new Date(evt.start);
        const originalEnd = new Date(evt.end);
        const newStart = new Date(originalStart);
        const newEnd = new Date(originalEnd);
        // add one month (Date handles month overflow)
        newStart.setMonth(newStart.getMonth() + 1);
        newEnd.setMonth(newEnd.getMonth() + 1);

        const newEvent = {
          id: `evt-${Date.now()}`,
          title: `Retorno - ${evt.title}`,
          start: newStart.toISOString().slice(0,19),
          end: newEnd.toISOString().slice(0,19),
          description: evt.description,
          paciente: evt.paciente,
          completed: false,
          backgroundColor: '#3788d8',
        };

        setEvents(prev => [...prev, newEvent]);
        alert('Consulta de retorno criada para ' + newStart.toLocaleString());
      } else {
        // just marked as completed
        alert('Consulta marcada como concluída.');
      }
    } else {
      // if already completed, unmark
      if (!window.confirm('Remover marca de concluída desta consulta?')) return;
      setEvents(prev => prev.map(e => e.id === eventId ? { ...e, completed: false, backgroundColor: '#3788d8' } : e));
      setSelectedEvent(null);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.title.trim() || !formData.paciente.trim() || !formData.start || !formData.end) {
      alert('Preencha título, paciente, início e término');
      return;
    }
    if (new Date(formData.start) >= new Date(formData.end)) {
      alert('A data/hora de término deve ser posterior ao início');
      return;
    }

    if (modalMode === 'create') {
      const newEvent = {
        id: `evt-${Date.now()}`,
        title: formData.title,
        start: formData.start,
        end: formData.end,
        description: formData.description,
        paciente: formData.paciente,
        completed: false,
        backgroundColor: '#3788d8',
      };
      setEvents(prev => [...prev, newEvent]);
      setIsModalOpen(false);
    } else if (modalMode === 'edit') {
      setEvents(prev => prev.map(ev => (ev.id === formData.id ? {
        ...ev,
        title: formData.title,
        start: formData.start,
        end: formData.end,
        description: formData.description,
        paciente: formData.paciente,
      } : ev)));
      setIsModalOpen(false);
      // update selectedEvent if open
      if (selectedEvent && selectedEvent.id === formData.id) {
        setSelectedEvent(null);
      }
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm('Deseja realmente excluir esta consulta?')) return;
    setEvents(prev => prev.filter(ev => ev.id !== id));
    if (selectedEvent && selectedEvent.id === id) setSelectedEvent(null);
  };

  return (
    <PageLayout>
    {/* 🗓️ CALENDÁRIO */}
    <CalendarContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Agenda</h1>
        {!readonly && (
          <button onClick={openCreateModal} style={{ background: '#0d2b27', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: 8, cursor: 'pointer' }}>
            Nova Consulta
          </button>
        )}
      </div>
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
      slotLabelFormat={{
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }}
      eventTimeFormat={{
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }}
      nowIndicator={true}
      allDaySlot={false}
      height="100%"
      />

      {/* Modal simples */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: 20, borderRadius: 12, width: 420 }}>
            <h3 style={{ marginTop: 0 }}>{modalMode === 'create' ? 'Nova Consulta' : 'Editar Consulta'}</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 8 }}>
                <label style={{ display: 'block', marginBottom: 4 }}>Título</label>
                <input name="title" value={formData.title} onChange={handleFormChange} style={{ width: '100%', padding: 8, borderRadius: 8 }} />
              </div>
              <div style={{ marginBottom: 8 }}>
                <label style={{ display: 'block', marginBottom: 4 }}>Paciente</label>
                <input name="paciente" value={formData.paciente} onChange={handleFormChange} style={{ width: '100%', padding: 8, borderRadius: 8 }} />
              </div>
              <div style={{ marginBottom: 8 }}>
                <label style={{ display: 'block', marginBottom: 4 }}>Início</label>
                <input name="start" type="datetime-local" value={formData.start} onChange={handleFormChange} style={{ width: '100%', padding: 8, borderRadius: 8 }} />
              </div>
              <div style={{ marginBottom: 8 }}>
                <label style={{ display: 'block', marginBottom: 4 }}>Término</label>
                <input name="end" type="datetime-local" value={formData.end} onChange={handleFormChange} style={{ width: '100%', padding: 8, borderRadius: 8 }} />
              </div>
              <div style={{ marginBottom: 8 }}>
                <label style={{ display: 'block', marginBottom: 4 }}>Descrição</label>
                <textarea name="description" value={formData.description} onChange={handleFormChange} style={{ width: '100%', padding: 8, borderRadius: 8 }} rows={3} />
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '8px 12px', borderRadius: 8 }}>Cancelar</button>
                <button type="submit" style={{ padding: '8px 12px', background: '#0d2b27', color: '#fff', border: 'none', borderRadius: 8 }}>{modalMode === 'create' ? 'Criar' : 'Salvar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </CalendarContainer>

    {/* ✏️ PAINEL DE DETALHES */}
    <DetailsPanel>
      <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>
      Detalhes da Consulta
      </h2>

      {selectedEvent ? (
      <>
        <p>
        <strong>Título:</strong> {selectedEvent.title}
        </p>
        <p>
        <strong>Paciente:</strong> {selectedEvent.extendedProps?.paciente}
        </p>
        <p>
        <strong>Início:</strong>{" "}
        {new Date(selectedEvent.start).toLocaleString("pt-BR")}
        </p>
        <p>
        <strong>Término:</strong>{" "}
        {new Date(selectedEvent.end).toLocaleString("pt-BR")}
        </p>
        <p>
        <strong>Descrição:</strong> {selectedEvent.extendedProps?.description}
        </p>

        {!readonly && (
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <button onClick={() => {
              // find event data and open edit modal
              const evt = events.find(ev => ev.id === selectedEvent.id);
              if (evt) openEditModal(evt);
            }} style={{ padding: '8px 12px', borderRadius: 8, background: '#0d2b27', color: '#fff', border: 'none' }}>Editar</button>

            <button onClick={() => toggleCompleted(selectedEvent.id)} style={{ padding: '8px 12px', borderRadius: 8, background: '#2e7d32', color: '#fff', border: 'none' }}>
              {events.find(ev => ev.id === selectedEvent.id)?.completed ? 'Desmarcar concluída' : 'Marcar como concluída'}
            </button>

            <button onClick={() => handleDelete(selectedEvent.id)} style={{ padding: '8px 12px', borderRadius: 8, background: '#b00020', color: '#fff', border: 'none' }}>Apagar</button>
          </div>
        )}
      </>
      ) : (
      <p>Selecione uma consulta no calendário para ver os detalhes.</p>
      )}
    </DetailsPanel>
    </PageLayout>
  );

};

export default Calendar;