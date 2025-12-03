import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #cfe9e2 0%, #9fc8b8 100%);
`;

const LoginForm = styled.form`
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
  padding: 12px 0px;
  border-radius: 18px;
  border: 1px solid #e6e6e6;
  font-size: 0.95rem;
  &:focus { outline: none; border-color: #3dd1c6; box-shadow: 0 6px 20px rgba(61,209,198,0.08); }
`;

const TwoFactorInput = styled.input`
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  border: 2px solid #e6e6e6;
  font-size: 1.5rem;
  text-align: center;
  letter-spacing: 0.5rem;
  font-weight: 600;
  &:focus { outline: none; border-color: #3dd1c6; box-shadow: 0 6px 20px rgba(61,209,198,0.15); }
`;

const LoginButton = styled.button`
  width: 100%;
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
  width: 100%;
  padding: 12px;
  background: transparent;
  color: #7bd5caff;
  border-radius: 12px;
  border: 2px solid #7bd5caff;
  font-weight: 700;
  cursor: pointer;
  margin-top: 12px;
  &:hover { background: rgba(123, 213, 202, 0.1); }
`;

const Forgot = styled.a`
  display: inline-block;
  margin-top: 12px;
  color: #7bd5caff;
`;

const ErrorMessage = styled.div`
  background: #fff1f1;
  color: #b00020;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 12px;
  border: 1px solid #f5c2c2;
`;

const InfoMessage = styled.div`
  background: #e3f2fd;
  color: #1565c0;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 12px;
  border: 1px solid #90caf9;
  text-align: center;
  font-size: 0.9rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 0px;
  border-radius: 18px;
  border: 1px solid #e6e6e6;
  font-size: 0.95rem;
  background: white;
  &:focus { outline: none; border-color: #3dd1c6; box-shadow: 0 6px 20px rgba(61,209,198,0.08); }
`;

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', userType: 'admin' });
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório';
    if (!formData.password.trim()) newErrors.password = 'Senha é obrigatória';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkIfAdminEmail = (email) => {
    // Verifica se é um email de admin
    const adminEmails = ['neoclynic@gmail.com'];
    return email.toLowerCase().includes('admin') || adminEmails.includes(email.toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (showTwoFactor) {
      // Submissão com código 2FA
      if (!twoFactorCode || twoFactorCode.length !== 6) {
        setErrors({ twoFactor: 'Código deve ter 6 dígitos' });
        return;
      }
      
      setIsSubmitting(true);
      setErrors({});

      try {
        await login(formData.email, formData.password, twoFactorCode, formData.userType);
        navigate('/', { replace: true });
      } catch (err) {
        console.error(err);
        const errorMessage = err.message || 'Código de autenticação inválido';
        setErrors({ general: errorMessage });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Primeira etapa - email e senha
      if (!validateForm()) return;
      
      setIsSubmitting(true);
      setErrors({});

      try {
        // Se for admin, tentar login sem 2FA para validar credenciais
        // O backend vai retornar erro pedindo o 2FA
        if (formData.userType === 'admin') {
          try {
            await login(formData.email, formData.password, undefined, formData.userType);
            // Se chegou aqui sem erro, redireciona
            navigate('/', { replace: true });
          } catch (err) {
            // Se o erro for sobre 2FA, mostra a tela de 2FA
            const errorMessage = err.message || '';
            if (errorMessage.includes('Two-factor') || errorMessage.includes('2FA') || errorMessage.includes('authentication code required')) {
              setShowTwoFactor(true);
              setIsSubmitting(false);
              return;
            }
            // Se for outro erro, mostra a mensagem
            throw err;
          }
        } else {
          // Se não for admin, fazer login normal
          await login(formData.email, formData.password, undefined, formData.userType);
          navigate('/', { replace: true });
        }
      } catch (err) {
        console.error(err);
        const errorMessage = err.message || 'E-mail ou senha inválidos';
        setErrors({ general: errorMessage });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBackFrom2FA = () => {
    setShowTwoFactor(false);
    setTwoFactorCode('');
    setErrors({});
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <LogoBox>
          <LogoImg src="/logo-neoclinic.png" alt="NeoClinic" />
        </LogoBox>

        {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}

        {!showTwoFactor ? (
          <>
            <FormGroup>
              <Label htmlFor="userType">Tipo de Usuário</Label>
              <Select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
              >
                <option value="admin">Administrador</option>
                <option value="secretary">Secretária</option>
                <option value="medic">Médico</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="username"
              />
              {errors.email && <div style={{ color: '#b00020', marginTop: 6 }}>{errors.email}</div>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              {errors.password && <div style={{ color: '#b00020', marginTop: 6 }}>{errors.password}</div>}
            </FormGroup>

            <LoginButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </LoginButton>

            <Forgot
              as="button"
              onClick={(e) => {
                e.preventDefault();
                setFormData({ email: '', password: '' });
                navigate('/forgot-password');
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Esqueci minha senha
            </Forgot>
          </>
        ) : (
          <>
            <InfoMessage>
              <strong>Autenticação de Dois Fatores</strong>
              <br />
              Digite o código de 6 dígitos do seu aplicativo autenticador
            </InfoMessage>

            <FormGroup>
              <Label htmlFor="twoFactorCode">Código de Verificação</Label>
              <TwoFactorInput
                id="twoFactorCode"
                name="twoFactorCode"
                type="text"
                maxLength="6"
                placeholder="000000"
                value={twoFactorCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setTwoFactorCode(value);
                  if (errors.twoFactor) setErrors({});
                }}
                autoComplete="one-time-code"
                autoFocus
              />
              {errors.twoFactor && <div style={{ color: '#b00020', marginTop: 6 }}>{errors.twoFactor}</div>}
            </FormGroup>

            <LoginButton type="submit" disabled={isSubmitting || twoFactorCode.length !== 6}>
              {isSubmitting ? 'Verificando...' : 'Verificar Código'}
            </LoginButton>

            <BackButton type="button" onClick={handleBackFrom2FA}>
              Voltar
            </BackButton>
          </>
        )}
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
