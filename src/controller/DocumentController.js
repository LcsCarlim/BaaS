const createDocumentService = require('../services/Document/CreateDocumentService');
const getDocumentService = require('../services/Document/GetDocumentService');
const findDocumentByIdService = require('../services/Document/FindDocumentByIdService');

module.exports = {
  async upload (req, res) {
    try {
      const { filename, name, document_type } = req.body;
      const { id } = req.user;

      const accounts = await createDocumentService(filename, name, document_type, id);
      return res.json(accounts);
    } catch (error) {
      return res.status(500).json({
        error: 'Something wrong happened, try again',
        message: 'Upload failed!'
      });
    }
  },

  async list (req, res) {
    try {
      const documents = await getDocumentService();
      return res.json(documents);
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
