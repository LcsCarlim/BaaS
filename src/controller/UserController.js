const Joi = require('joi');

const { addTokenToBlackList, tokenIsInBlackList } = require('../services/User/BlackListService');
const findUserByIdService = require('../services/User/FindUserByIdService');
const getUserService = require('../services/User/GetUserService');
const getUserSelfService = require('../services/User/GetUserSelfService');
const createUserService = require('../services/User/CreateUserService');
const createUserAuthService = require('../services/User/CreateUserAuthService');
const deleteUserService = require('../services/User/DeleteUserService');
const updateUserService = require('../services/User/UpdateUserService');

// a requisição role é uma validação do usuário de ser Admin
module.exports = {
  async list (req, res) {
    const { role } = req.user;
    try {
      const users = await getUserService(role);
      return res.json(users);
    } catch (error) {
      return res.status(500).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  },

  async listSelf (req, res) {
    try {
      const { id } = req.user;
      const users = await getUserSelfService(id);

      return res.json(users);
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
      const user = await findUserByIdService(id, role);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  },

  // aqui é utilizado a lib Joi para fazer validação dos dados, tais para estabelecer minimo de caractere e obrigatoriedade.
  async createUser (req, res) {
    const { name, last_name, email, password, address, phone_number } = req.body;

    const schema = Joi.object({
      name: Joi.string()
        .required(),
      last_name: Joi.string()
        .required(),
      email: Joi.string()
        .email(),
      password: Joi.string()
        .required()
        .min(8),
      address: Joi.string()
        .required(),
      phone_number: Joi.string()
        .required()
        .min(11)

    });

    try {
      await schema.validateAsync({
        name,
        last_name,
        email,
        password,
        address,
        phone_number
      });

      const users = await createUserService(
        name,
        last_name,
        email,
        password,
        address,
        phone_number
      );

      return res.status(201).json(users);
    } catch (error) {
      return res.status(500).json({
        error: 'Registration failed',
        message: error.message
      });
    }
  },

  async deleteUser (req, res) {
    const { role } = req.user;
    const { id } = req.params;

    try {
      await deleteUserService(id, role);

      res.status(201).json({
        message: 'User deleted!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  },

  async updateUser (req, res) {
    const { id } = req.user;

    const { password } = req.body;

    const schema = Joi.object({
      password: Joi.string()
        .required()
        .min(8)
    });

    try {
      await schema.validateAsync({ password });

      await updateUserService(id, password);

      return res.status(200).json({
        message: 'Password changed!'
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  },

  async createUserAuth (req, res) {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string()
        .email(),
      password: Joi.string()
        .required()
        .min(8)
    });
    try {
      await schema.validateAsync({
        email,
        password
      });

      const token = await createUserAuthService(email, password);

      res.status(200).json({
        message: 'Authentication successful',
        token
      });
    } catch (error) {
      res.status(500).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  },

  // para realizar o logout é necessário o token estar em em uma lista (blacklist) e por fim realizar o logout
  async logout (req, res) {
    const token = req.headers.authorization.split(' ')[1];
    if (tokenIsInBlackList(token)) {
      return res.status(400).json({
        error: 'Token already invalidated'
      });
    }
    addTokenToBlackList(token);

    return res.status(200).json({
      message: 'Logout successful'
    });
  }
};
