import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import styles from './LoginPage.module.css';
import { toast } from 'react-toastify'; 

function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      toast.success('Login bem-sucedido!');

      navigate('/');
      onLoginSuccess();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao fazer login.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formCard}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Usuário:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Entrar
          </button>
        </form>
        <p className={styles.switchLink}>
          Não tem uma conta? <Link to="/register">Registre-se aqui</Link>.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;