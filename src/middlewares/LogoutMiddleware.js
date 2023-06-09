const { tokenIsInBlackList } = require('../services/User/BlackListService');

// Se responsabiliza efetuar o logout quando o token está em uma BlackList

module.exports = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const resultado = tokenIsInBlackList(token);
  if (resultado) {
    return res.status(401).json({
      error: 'Invalid token'
    });
  }
  next();
};
