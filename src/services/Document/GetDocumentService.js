// se responsabiliza em pegar as informações dos documentos de todos os usuários. Necessário ser um Admin
const DocumentModel = require('../../database/model/DocumentModel');

module.exports = async (role) => {
  if (role !== 'Admin') throw new Error('Must be an admin');

  const documents = await DocumentModel.find();

  if (documents.length === 0) throw new Error('Documents not found');

  return documents;
};
