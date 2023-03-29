const DocumentModel = require('../../database/model/DocumentModel');

module.exports = async (user_id) => {
  const document = await DocumentModel.findOne({ user_id });
  if (!document) throw new Error('Document not found');
  return document;
};
