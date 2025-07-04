require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const db = require('./src/config/database');
const userRoutes = require('./src/routes/userRoutes');
const characterRoutes = require('./src/routes/characterRoutes');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/characters', characterRoutes);

app.get('/ping', async (req, res) => {
  try {
    const [results] = await db.query('SELECT "pong" as result');
    res.json({ message: 'Conexão com o banco de dados bem-sucedida!', db_response: results[0] });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao conectar com o banco de dados.', error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('API da CB Games está no ar!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});