import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { AuthContext } from "../../context/AuthContext";

const PageWrapper = styled.div`
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
  min-height: 100vh;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 1rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
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

const Section = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  border-radius: 12px;
  border: 2px solid #e2e8f0;

  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #667eea;
    margin: 0 0 1rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 0.75rem;
  gap: 0.5rem;

  strong {
    min-width: 180px;
    color: #2d3748;
    font-weight: 600;
  }

  span {
    color: #4a5568;
    flex: 1;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.25rem;

    strong {
      min-width: auto;
    }
  }
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  font-size: 0.9rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
  letter-spacing: 0.3px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  resize: vertical;
  margin-bottom: 1rem;
  font-family: inherit;
  font-size: 0.95rem;
  min-height: 120px;
  transition: all 0.2s ease;
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

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  transition: all 0.2s ease;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  white-space: nowrap;
  background: ${(props) => (props.$secondary ? 'linear-gradient(135deg, #718096 0%, #4a5568 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)')};
  color: white;
  box-shadow: ${(props) => (props.$secondary ? '0 2px 4px rgba(113, 128, 150, 0.2)' : '0 2px 4px rgba(102, 126, 234, 0.2)')};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: ${(props) => (props.$secondary ? '0 4px 8px rgba(113, 128, 150, 0.3)' : '0 4px 8px rgba(102, 126, 234, 0.3)')};
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

const EmptyState = styled.p`
  text-align: center;
  color: #718096;
  padding: 2rem;
  font-style: italic;
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
    return (
      <PageWrapper>
        <Container>
          <EmptyState>Carregando...</EmptyState>
        </Container>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Container>
        <Header>
          <Title>
            <span>📋</span>
            <span className="title-text">Detalhes da Consulta</span>
          </Title>
          <Button $secondary onClick={() => navigate(getCalendarRoute())}>
            ← Voltar ao Calendário
          </Button>
        </Header>

        <Section>
          <h2>🗓️ Informações da Consulta</h2>
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
          <h2>👨‍⚕️ Informações do Médico</h2>
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
          <h2>🧑‍⚕️ Informações do Paciente</h2>
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
          <h2>📝 Prontuário (Observation)</h2>
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
        <h2>📄 Relatório da Consulta (Report)</h2>
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
              <ButtonGroup>
                <Button onClick={() => setIsEditingReport(true)}>
                  ✏️ Editar Relatório
                </Button>
              </ButtonGroup>
            )}
          </>
        ) : (
          <>
            {isMedic ? (
              <>
                <Label>Descrição:</Label>
                <TextArea
                  name="description"
                  value={report.description}
                  onChange={handleReportChange}
                  placeholder="Descreva os detalhes da consulta..."
                />

                <Label>Diagnóstico:</Label>
                <TextArea
                  name="diagnosis"
                  value={report.diagnosis}
                  onChange={handleReportChange}
                  placeholder="Informe o diagnóstico..."
                />

                <Label>Prescrição (opcional):</Label>
                <TextArea
                  name="prescription"
                  value={report.prescription}
                  onChange={handleReportChange}
                  placeholder="Informe a prescrição médica..."
                />

                <ButtonGroup>
                  <Button onClick={handleSaveReport}>💾 Salvar Relatório</Button>
                  {consultation.report && (
                    <Button $secondary onClick={() => {
                      setIsEditingReport(false);
                      setReport(consultation.report);
                    }}>
                      Cancelar
                    </Button>
                  )}
                </ButtonGroup>
              </>
            ) : (
              <EmptyState>Nenhum relatório disponível para esta consulta ainda.</EmptyState>
            )}
          </>
        )}
      </Section>
      </Container>
    </PageWrapper>
  );
};

export default ConsultationDetail;
