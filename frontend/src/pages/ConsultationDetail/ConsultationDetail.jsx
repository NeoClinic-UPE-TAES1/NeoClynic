import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { AuthContext } from "../../context/AuthContext";

const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid #007bff;
  padding-bottom: 1rem;

  h1 {
    font-size: 1.75rem;
    color: #2d3748;
  }
`;

const Section = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;

  h2 {
    font-size: 1.25rem;
    color: #007bff;
    margin-bottom: 1rem;
  }
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 0.75rem;

  strong {
    min-width: 150px;
    color: #495057;
  }

  span {
    color: #212529;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #ced4da;
  resize: vertical;
  margin-bottom: 0.75rem;
  font-family: inherit;
  min-height: 100px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #ced4da;
  margin-bottom: 0.75rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  margin-right: 0.5rem;
  background: ${(props) => (props.secondary ? "#6c757d" : "#007bff")};
  color: white;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ConsultationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { apiCall, loading } = useApi();
  const { user } = useContext(AuthContext);

  const [consultation, setConsultation] = useState(null);
  const [medic, setMedic] = useState(null);
  const [patient, setPatient] = useState(null);
  const [report, setReport] = useState({
    description: "",
    diagnosis: "",
    prescription: ""
  });
  const [isEditingReport, setIsEditingReport] = useState(false);

  const isMedic = user?.role === "MEDIC";
  const isSecretary = user?.role === "SECRETARY";

  useEffect(() => {
    loadConsultationDetails();
  }, [id]);

  const getCalendarRoute = () => {
    if (isMedic) return "/medic/calendar";
    if (isSecretary) return "/secretary/calendar";
    return "/";
  };

  const loadConsultationDetails = async () => {
    try {
      // Carregar dados da consulta
      const consultationData = await apiCall(`/consultation/list/${id}`);
      setConsultation(consultationData.consultation);

      // Carregar dados do médico
      const medicData = await apiCall(`/medic/list/${consultationData.consultation.medicId}`);
      setMedic(medicData.medic);

      // Carregar dados do paciente
      const patientData = await apiCall(`/patient/list/${consultationData.consultation.patientId}`);
      setPatient(patientData.patient);

      // Se houver relatório, carregá-lo
      if (consultationData.consultation.report) {
        setReport(consultationData.consultation.report);
      }
    } catch (error) {
      console.error("Erro ao carregar detalhes da consulta:", error);
      alert("Erro ao carregar detalhes da consulta");
    }
  };

  const handleReportChange = (e) => {
    const { name, value } = e.target;
    setReport((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveReport = async () => {
    if (!isMedic) {
      alert("Apenas médicos podem criar/editar relatórios.");
      return;
    }

    if (!report.description || !report.diagnosis) {
      alert("Descrição e diagnóstico são obrigatórios.");
      return;
    }

    try {
      const reportData = {
        description: report.description,
        diagnosis: report.diagnosis,
        prescription: report.prescription?.trim() || ''
      };

      await apiCall(`/consultation/update/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ report: reportData })
      });
      
      alert(consultation.report ? "Relatório atualizado com sucesso!" : "Relatório criado com sucesso!");
      
      setIsEditingReport(false);
      loadConsultationDetails();
    } catch (error) {
      console.error("Erro ao salvar relatório:", error);
      alert("Erro ao salvar relatório: " + error.message);
    }
  };

  if (loading || !consultation) {
    return <Container>Carregando...</Container>;
  }

  return (
    <Container>
      <Header>
        <h1>Detalhes da Consulta</h1>
        <Button secondary onClick={() => navigate(getCalendarRoute())}>
          ← Voltar ao Calendário
        </Button>
      </Header>

      <Section>
        <h2>Informações da Consulta</h2>
        <InfoRow>
          <strong>Data e Hora:</strong>
          <span>{new Date(consultation.date).toLocaleString("pt-BR")}</span>
        </InfoRow>
        <InfoRow>
          <strong>Consulta de Retorno:</strong>
          <span>{consultation.hasFollowUp ? "Sim" : "Não"}</span>
        </InfoRow>
      </Section>

      {medic && (
        <Section>
          <h2>Informações do Médico</h2>
          <InfoRow>
            <strong>Nome:</strong>
            <span>{medic.name}</span>
          </InfoRow>
          <InfoRow>
            <strong>Especialidade:</strong>
            <span>{medic.specialty}</span>
          </InfoRow>
          <InfoRow>
            <strong>Email:</strong>
            <span>{medic.email}</span>
          </InfoRow>
        </Section>
      )}

      {patient && (
        <Section>
          <h2>Informações do Paciente</h2>
          <InfoRow>
            <strong>Nome:</strong>
            <span>{patient.name}</span>
          </InfoRow>
          <InfoRow>
            <strong>CPF:</strong>
            <span>{patient.cpf}</span>
          </InfoRow>
          <InfoRow>
            <strong>Data de Nascimento:</strong>
            <span>{new Date(patient.birthDay).toLocaleDateString("pt-BR")}</span>
          </InfoRow>
          <InfoRow>
            <strong>Sexo:</strong>
            <span>{patient.sex === 'M' ? 'Masculino' : patient.sex === 'F' ? 'Feminino' : patient.sex}</span>
          </InfoRow>
          <InfoRow>
            <strong>Etnia:</strong>
            <span>{patient.ethnicity}</span>
          </InfoRow>
          {patient.email && (
            <InfoRow>
              <strong>Email:</strong>
              <span>{patient.email}</span>
            </InfoRow>
          )}
        </Section>
      )}

      {patient?.observation && (
        <Section>
          <h2>Prontuário (Observation)</h2>
          {patient.observation.comorbidity && (
            <InfoRow>
              <strong>Comorbidades:</strong>
              <span>{patient.observation.comorbidity}</span>
            </InfoRow>
          )}
          {patient.observation.allergies && (
            <InfoRow>
              <strong>Alergias:</strong>
              <span>{patient.observation.allergies}</span>
            </InfoRow>
          )}
          {patient.observation.medications && (
            <InfoRow>
              <strong>Medicações:</strong>
              <span>{patient.observation.medications}</span>
            </InfoRow>
          )}
        </Section>
      )}

      <Section>
        <h2>Relatório da Consulta (Report)</h2>
        {consultation.report && !isEditingReport ? (
          <>
            <InfoRow>
              <strong>Descrição:</strong>
              <span>{report.description}</span>
            </InfoRow>
            <InfoRow>
              <strong>Diagnóstico:</strong>
              <span>{report.diagnosis}</span>
            </InfoRow>
            {report.prescription && (
              <InfoRow>
                <strong>Prescrição:</strong>
                <span>{report.prescription}</span>
              </InfoRow>
            )}
            {isMedic && (
              <Button onClick={() => setIsEditingReport(true)}>
                ✏️ Editar Relatório
              </Button>
            )}
          </>
        ) : (
          <>
            {isMedic ? (
              <>
                <label>Descrição:</label>
                <TextArea
                  name="description"
                  value={report.description}
                  onChange={handleReportChange}
                  placeholder="Descreva os detalhes da consulta..."
                />

                <label>Diagnóstico:</label>
                <TextArea
                  name="diagnosis"
                  value={report.diagnosis}
                  onChange={handleReportChange}
                  placeholder="Informe o diagnóstico..."
                />

                <label>Prescrição (opcional):</label>
                <TextArea
                  name="prescription"
                  value={report.prescription}
                  onChange={handleReportChange}
                  placeholder="Informe a prescrição médica..."
                />

                <Button onClick={handleSaveReport}>💾 Salvar Relatório</Button>
                {consultation.report && (
                  <Button secondary onClick={() => {
                    setIsEditingReport(false);
                    setReport(consultation.report);
                  }}>
                    Cancelar
                  </Button>
                )}
              </>
            ) : (
              <p>Nenhum relatório disponível para esta consulta ainda.</p>
            )}
          </>
        )}
      </Section>
    </Container>
  );
};

export default ConsultationDetail;
