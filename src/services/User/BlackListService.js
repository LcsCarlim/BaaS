const blackList = [];

const tokenIsInBlackList = (token) => {
  return blackList.includes(token);
};

const addTokenToBlackList = (token) => {
  blackList.push(token);
};

module.exports = { tokenIsInBlackList, addTokenToBlackList };
