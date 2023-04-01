module.exports = (date) => {
  return new Intl.DateTimeFormat('pt-BR').format(date);
};
