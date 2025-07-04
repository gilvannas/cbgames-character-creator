import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import styles from './RegisterPage.module.css';
import { toast } from 'react-toastify'; 

function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/register', {
        username, email, password,
      });
      
      toast.success(response.data.message); 

      setTimeout(() => {
        navigate('/login');
      }, 2000); 

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao registrar.';
      toast.error(errorMessage); 
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formCard}>
        <h1>Registro</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Usuário:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={styles.inputField} required />
          </div>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.inputField} required />
          </div>
          <div className={styles.formGroup}>
            <label>Senha:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.inputField} required />
          </div>
          <button type="submit" className={styles.submitButton}>
            Registrar
          </button>
        </form>
        <p className={styles.switchLink}>
          Já tem uma conta? <Link to="/login">Faça o login</Link>.
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;