const DocumentModel = require('../../database/model/DocumentModel');

module.exports = async () => {
  const documents = await DocumentModel.find();

  return documents;
};
