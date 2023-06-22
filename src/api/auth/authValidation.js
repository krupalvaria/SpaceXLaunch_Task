const Joi = require("@hapi/joi");
const { password } = require("../common/customValidation");

const login = {
  body: Joi.object().keys({
    sEmail: Joi.string().email().required(),
    sPassword: Joi.string().custom(password)
  })
};

const register = {
  body: Joi.object().keys({
    sName: Joi.string().required(),
    sEmail: Joi.string().required().email(),
    sPassword: Joi.string().custom(password),
    nPhoneNumber: Joi.number().required()
  })
};
module.exports = {
  login,
  register
};
