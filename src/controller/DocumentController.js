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

      const accounts = await createDocumentService(filename, name, document_type, id);
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
    try {
      const documents = await getDocumentService();
      return res.status(200).json(documents);
    } catch (error) {
      return res.status(500).json({
        error: 'Something wrong happened, try again',
        message: 'Documents not found!'
      });
    }
  },

  async findById (req, res) {
    const { id } = req.user;
    try {
      const document = await findDocumentByIdService(id);
      res.status(200).json(document);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
};
