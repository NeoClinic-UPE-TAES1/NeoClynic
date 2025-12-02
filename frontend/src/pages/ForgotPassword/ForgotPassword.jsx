import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { isValidEmail } from '../../utils/validators';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #cfe9e2 0%, #9fc8b8 100%);
`;

const Form = styled.form`
  background: #416762ff;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  width: 100%;
  max-width: 420px;
`;

const LogoBox = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  margin-top: 20px;
  h1 { margin: 0; color: #0d2b27; }
`;

const LogoImg = styled.img`
  display: block;
  margin: 0 auto 0.5rem auto;
  height: 120px;
`;

const Title = styled.h2`
  color: #7bd5caff;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #7bd5caff;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 18px;
  border: 1px solid #e6e6e6;
  font-size: 0.95rem;
  &:focus { outline: none; border-color: #3dd1c6; box-shadow: 0 6px 20px rgba(61,209,198,0.08); }
`;

const Button = styled.button`
  width: 90%;
  padding: 12px;
  background: #0d2b27;
  color: white;
  border-radius: 12px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  margin-top: 8px;  
  &:disabled { opacity: 0.7; cursor: not-allowed; }
`;

const BackButton = styled.button`
  width: 90%;
  padding: 12px;
  background: transparent;
  color: #7bd5caff;
  border-radius: 12px;
  border: 1px solid #7bd5caff;
  font-weight: 700;
  cursor: pointer;
  margin-top: 8px;
`;

const ErrorMessage = styled.div`
  background: #fff1f1;
  color: #b00020;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 12px;
  border: 1px solid #f5c2c2;
`;

const SuccessMessage = styled.div`
  background: #f0fff0;
  color: #008000;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 12px;
  border: 1px solid #90ee90;
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('admin');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('E-mail é obrigatório');
      return;
    }
    
    if (!isValidEmail(email)) {
      setError('Por favor, insira um endereço de e-mail válido');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      const endpointMap = {
        admin: '/admin/password/request',
        secretary: '/secretary/password/request',
        medic: '/medic/password/request'
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${endpointMap[userType]}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao processar sua solicitação');
      }

      setSuccess('Um e-mail com instruções para redefinir sua senha foi enviado para ' + email);
      setEmail('');
    } catch (err) {
      setError(err.message || 'Erro ao processar sua solicitação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <LogoBox>
          <LogoImg src="/logo-neoclinic.png" alt="NeoClinic" />
        </LogoBox>

        <Title>Recuperação de Senha</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <FormGroup>
          <Label htmlFor="userType">Tipo de Usuário</Label>
          <Input
            as="select"
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            disabled={isSubmitting}
          >
            <option value="admin">Administrador</option>
            <option value="secretary">Secretária</option>
            <option value="medic">Médico</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            disabled={isSubmitting}
          />
        </FormGroup>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </Button>

        <BackButton type="button" onClick={handleBack}>
          Voltar para Login
        </BackButton>
      </Form>
    </Container>
  );
};

export default ForgotPassword;