const Calendar = ({ readonly = false }) => {
    return <div>Calendário {readonly ? '(Somente Leitura)' : ''}</div>;
};

export default Calendar;