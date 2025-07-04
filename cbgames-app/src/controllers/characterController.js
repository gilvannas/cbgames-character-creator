const db = require('../config/database');

exports.createCharacter = async (req, res) => {
  const userId = req.userId;
  const { name, strength, intelligence, dexterity, charisma, skin_color, hair_style } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O nome do personagem é obrigatório.' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO characters (user_id, name, strength, intelligence, dexterity, charisma, skin_color, hair_style) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [userId, name, strength, intelligence, dexterity, charisma, skin_color, hair_style]
    );
    res.status(201).json({ message: 'Personagem criado com sucesso!', characterId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor ao criar personagem.' });
  }
};

exports.getCharacters = async (req, res) => {
  const userId = req.userId;
  try {
    const [characters] = await db.query('SELECT * FROM characters WHERE user_id = ?', [userId]);
    res.json(characters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor ao buscar personagens.' });
  }
};

exports.updateCharacter = async (req, res) => {
  const userId = req.userId;
  const characterId = req.params.id;
  const { name, strength, intelligence, dexterity, charisma, skin_color, hair_style } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE characters SET name = ?, strength = ?, intelligence = ?, dexterity = ?, charisma = ?, skin_color = ?, hair_style = ? WHERE id = ? AND user_id = ?',
      [name, strength, intelligence, dexterity, charisma, skin_color, hair_style, characterId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Personagem não encontrado ou não pertence a este usuário.' });
    }

    res.json({ message: 'Personagem atualizado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor ao atualizar personagem.' });
  }
};

exports.deleteCharacter = async (req, res) => {
  const userId = req.userId;
  const characterId = req.params.id;

  try {
    const [result] = await db.query('DELETE FROM characters WHERE id = ? AND user_id = ?', [characterId, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Personagem não encontrado ou não pertence a este usuário.' });
    }

    res.json({ message: 'Personagem excluído com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor ao excluir personagem.' });
  }
};