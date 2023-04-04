const DocumentModel = require('../../database/model/DocumentModel');

module.exports = async (user_id, role) => {
  if (role !== 'Admin') throw new Error('Must be an admin');

  const document = await DocumentModel.findOne({
    user_id
  });

  console.log(user_id);

  if (!document) throw new Error('Document not found');

  if (document.length === 0) throw new Error('Documents not found');

  return document;
};
