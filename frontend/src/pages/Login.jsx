import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: '#a3c3bb',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <img
        src="/logo-neoclinic.png"
        alt="Logo"
        className="login-logo"
      />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.2rem',
        width: '100%',
        maxWidth: '350px',
      }}>
        <label htmlFor="email" className="login-label">E-mail:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="login-input"
          required
        />
        <label htmlFor="password" className="login-label">Senha:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="login-input"
          required
        />
        <a
          href="#"
          className="login-link"
        >Esqueci minha senha</a>
        <span className="login-link-line"></span>
      </div>
    </div>
  );
};

export default Login;
