import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import styles from './DashboardPage.module.css';
import { toast } from 'react-toastify'; 

const initialFormState = {
  name: '', strength: 5, intelligence: 5, dexterity: 5, charisma: 5,
};

function DashboardPage() {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);

  const fetchCharacters = async () => {
    try {
      const response = await api.get('/characters');
      setCharacters(response.data);
    } catch (err) {
      toast.error('Erro ao buscar personagens. Tente fazer o login novamente.');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchCharacters();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'name' ? value : parseInt(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/characters/${editingId}`, formData);
        toast.success('Personagem atualizado com sucesso!');
      } else {
        await api.post('/characters', formData);
        toast.success('Personagem criado com sucesso!');
      }
      setFormData(initialFormState);
      setEditingId(null);
      fetchCharacters();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao salvar personagem.';
      toast.error(errorMessage);
    }
  };

  const handleStartEdit = (character) => {
    setEditingId(character.id);
    setFormData({
      name: character.name, strength: character.strength, intelligence: character.intelligence,
      dexterity: character.dexterity, charisma: character.charisma,
    });
    window.scrollTo(0, 0);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(initialFormState);
  };

  const handleDeleteCharacter = async (characterId) => {
    if (window.confirm('Tem certeza que deseja excluir este personagem?')) {
      try {
        await api.delete(`/characters/${characterId}`);
        toast.success('Personagem excluído com sucesso!');
        fetchCharacters();
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Erro ao excluir personagem.';
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1>Dashboard de Personagens</h1>
      <div className={styles.formSection}>
        <h2>{editingId ? 'Editando Personagem' : 'Criar Novo Personagem'}</h2>
        <form onSubmit={handleSubmit} className={styles.characterForm}>
            <div className={`${styles.formField} ${styles.fullWidth}`}><label>Nome:</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} required /></div>
            <div className={styles.formField}><label>Força:</label><input type="number" name="strength" value={formData.strength} onChange={handleInputChange} min="1" max="10" /></div>
            <div className={styles.formField}><label>Inteligência:</label><input type="number" name="intelligence" value={formData.intelligence} onChange={handleInputChange} min="1" max="10" /></div>
            <div className={styles.formField}><label>Destreza:</label><input type="number" name="dexterity" value={formData.dexterity} onChange={handleInputChange} min="1" max="10" /></div>
            <div className={styles.formField}><label>Carisma:</label><input type="number" name="charisma" value={formData.charisma} onChange={handleInputChange} min="1" max="10" /></div>
            <button type="submit" className={styles.submitButton}>{editingId ? 'Salvar Alterações' : 'Criar Personagem'}</button>
            {editingId && (<button type="button" onClick={handleCancelEdit} style={{ gridColumn: '1 / -1' }}>Cancelar Edição</button>)}
        </form>
      </div>

      <div className={styles.listSection}>
        <h2>Meus Personagens</h2>
        <ul className={styles.characterList}>
          {characters.length > 0 ? (
            characters.map(char => (
              <li key={char.id} className={styles.characterCard}>
                <div className={styles.characterInfo}><strong>{char.name}</strong><p>Força: {char.strength} | Inteligência: {char.intelligence} | Destreza: {char.dexterity} | Carisma: {char.charisma}</p></div>
                <div className={styles.characterActions}><button onClick={() => handleStartEdit(char)} className={styles.editButton}>Editar</button><button onClick={() => handleDeleteCharacter(char.id)} className={styles.deleteButton}>Excluir</button></div>
              </li>
            ))
          ) : (<p>Você ainda não criou nenhum personagem.</p>)}
        </ul>
      </div>
    </div>
  );
}

export default DashboardPage;