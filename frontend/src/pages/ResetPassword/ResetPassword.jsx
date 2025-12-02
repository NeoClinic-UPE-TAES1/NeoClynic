import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';

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

const PasswordRequirements = styled.div`
  font-size: 0.85rem;
  color: #7bd5caff;
  margin-top: 0.5rem;
  ul {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }
`;

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('admin');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    const typeParam = searchParams.get('type');
    
    if (!tokenParam) {
      setError('Token inválido ou expirado. Por favor, solicite um novo link de recuperação.');
      return;
    }
    
    setToken(tokenParam);
    if (typeParam && ['admin', 'secretary', 'medic'].includes(typeParam)) {
      setUserType(typeParam);
    }
  }, [searchParams]);

  const validatePassword = (pwd) => {
    if (pwd.length < 8) {
      return 'A senha deve ter no mínimo 8 caracteres';
    }
    if (!/[A-Z]/.test(pwd)) {
      return 'A senha deve conter pelo menos uma letra maiúscula';
    }
    if (!/[a-z]/.test(pwd)) {
      return 'A senha deve conter pelo menos uma letra minúscula';
    }
    if (!/[0-9]/.test(pwd)) {
      return 'A senha deve conter pelo menos um número';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
      return 'A senha deve conter pelo menos um caractere especial';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      setError('Token inválido. Por favor, solicite um novo link de recuperação.');
      return;
    }

    if (!password.trim() || !confirmPassword.trim()) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      const endpointMap = {
        admin: '/admin/password/reset',
        secretary: '/secretary/password/reset',
        medic: '/medic/password/reset'
      };

      const requestBody = { token, newPassword: password };
      console.log('Sending reset password request:', {
        endpoint: `${import.meta.env.VITE_API_BASE_URL}${endpointMap[userType]}`,
        userType,
        tokenLength: token?.length,
        passwordLength: password?.length,
        body: requestBody
      });

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${endpointMap[userType]}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao redefinir senha');
      }

      setSuccess('Senha redefinida com sucesso! Você será redirecionado para o login...');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Erro ao redefinir senha. O token pode ter expirado. Tente solicitar um novo link.');
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

        <Title>Redefinir Senha</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        {!token && (
          <ErrorMessage>
            Link inválido ou expirado. Por favor, solicite um novo link de recuperação.
          </ErrorMessage>
        )}

        {token && (
          <>
            <FormGroup>
              <Label htmlFor="userType">Tipo de Usuário</Label>
              <Input
                as="select"
                id="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                disabled={isSubmitting || success}
              >
                <option value="admin">Administrador</option>
                <option value="secretary">Secretária</option>
                <option value="medic">Médico</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Nova Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua nova senha"
                disabled={isSubmitting || success}
              />
              <PasswordRequirements>
                <ul>
                  <li>Mínimo 8 caracteres</li>
                  <li>Pelo menos uma letra maiúscula</li>
                  <li>Pelo menos uma letra minúscula</li>
                  <li>Pelo menos um número</li>
                  <li>Pelo menos um caractere especial (!@#$%^&*)</li>
                </ul>
              </PasswordRequirements>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Digite sua senha novamente"
                disabled={isSubmitting || success}
              />
            </FormGroup>

            <Button type="submit" disabled={isSubmitting || success || !token}>
              {isSubmitting ? 'Redefinindo...' : 'Redefinir Senha'}
            </Button>
          </>
        )}

        <BackButton type="button" onClick={handleBack}>
          Voltar para Login
        </BackButton>
      </Form>
    </Container>
  );
};

export default ResetPassword;
