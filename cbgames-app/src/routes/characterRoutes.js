const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, characterController.createCharacter);

router.get('/', protect, characterController.getCharacters);

router.put('/:id', protect, characterController.updateCharacter);

router.delete('/:id', protect, characterController.deleteCharacter);

module.exports = router;