// se responsabiliza em colocar o token do usuário em uma lista
const blackList = [];

const tokenIsInBlackList = (token) => {
  return blackList.includes(token);
};

const addTokenToBlackList = (token) => {
  blackList.push(token);
};

module.exports = { tokenIsInBlackList, addTokenToBlackList };
