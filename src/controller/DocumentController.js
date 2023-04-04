const createDocumentService = require('../services/Document/CreateDocumentService');
const getDocumentService = require('../services/Document/GetDocumentService');
const findDocumentByIdService = require('../services/Document/FindDocumentByIdService');
const fs = require('fs');

module.exports = {
  async upload (req, res) {
    const { path } = req.file;
    try {
      const { name, document_type } = req.body;
      const { id } = req.user;
      const { filename } = req.file;

      const accounts = await createDocumentService(
        filename,
        name,
        document_type,
        id
      );
      return res.json(accounts);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: 'Something wrong happened, try again',
        message: error.message || 'Upload failed!'
      });
    } finally {
      fs.unlinkSync(path);
    }
  },

  async list (req, res) {
    const { role } = req.user;
    try {
      const documents = await getDocumentService(role);
      return res.status(200).json(documents);
    } catch (error) {
      return res.status(500).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  },

  async findById (req, res) {
    const { role } = req.user;
    const { id } = req.params;
    try {
      const document = await findDocumentByIdService(id, role);
      res.status(200).json(document);
    } catch (error) {
      res.status(404).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  }
};
