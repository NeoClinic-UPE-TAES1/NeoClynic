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

    const events = [
        {
        title: "Consulta com Dr. João Figueiro Mario Da Silva",
        start: "2025-10-07T09:30:00",
        end: "2025-10-07T10:30:00",
        description: "Consulta de rotina para acompanhamento de saúde.",
        paciente: "Maria Clara Santos",
        },
        {
            title: "Consulta 2 com Dr. João Figueiro Mario Da Silva",
            start: "2025-10-07T09:30:00",
            end: "2025-10-07T10:30:00",
            description: "Consulta de rotina para acompanhamento de saúde.",
            paciente: "Maria Clara Santos",
        },
        {
        title: "Exame de Rotina",
        start: "2025-10-10T14:00:00",
        end: "2025-10-10T15:00:00",
        description: "Exames laboratoriais e verificação de resultados anteriores.",
        paciente: "João Henrique",
        },
        {
        title: "Retorno com Dra. Maria",
        start: "2025-10-12T16:15:00",
        end: "2025-10-12T17:00:00",
        description: "Avaliação pós-tratamento com resultados de exames.",
        paciente: "Paulo Ricardo",
        },
    ];

    return (
        <PageLayout>
        {/* 🗓️ CALENDÁRIO */}
        <CalendarContainer>
            <h1>Agenda</h1>
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
            eventClick={(info) => {
                setSelectedEvent({
                title: info.event.title,
                start: info.event.start,
                end: info.event.end,
                extendedProps: info.event.extendedProps,
                });
            }}
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
                <strong>Paciente:</strong> {selectedEvent.extendedProps.paciente}
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
                <strong>Descrição:</strong> {selectedEvent.extendedProps.description}
                </p>
            </>
            ) : (
            <p>Selecione uma consulta no calendário para ver os detalhes.</p>
            )}
        </DetailsPanel>
        </PageLayout>
    );

};

export default Calendar;