const httpStatus = require("http-status");
const { handleError } = require("../../middlewares/error");
const Messages = require("../../utils/messages");
const createResponse = require("../../utils/response");
const authService = require("./authService");

const login = async (req, res) => {
  try {
    const admin = await authService.login(req.body);
    const token = await authService.generateAuthTokens(admin);
    const response = { ...admin, token };
    createResponse(res, httpStatus.OK, Messages.LOGIN, response);
  } catch (error) {
    handleError(error, res);
  }
};

const register = async (req, res) => {
  try {
    const admin = await authService.register(req.body);
    createResponse(res, httpStatus.OK, Messages.REGISTER, { ...admin._doc, sPassword: undefined });
  } catch (error) {
    handleError(error, res);
  }
};

module.exports = {
  login,
  register
};
