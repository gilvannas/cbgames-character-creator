const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token inválido, autorização negada.' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Nenhum token, autorização negada.' });
  }
};

module.exports = { protect };