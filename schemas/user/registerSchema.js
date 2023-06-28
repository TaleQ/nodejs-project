const Joi = require('joi');
const { subscriptionsEnum, regExps } = require('../../constants');

const registerSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .max(20)
    .pattern(regExps.passwordRegExp)
    .required(),
  email: Joi.string().email().pattern(regExps.emailRegExp).required(),
  subscription: Joi.string().valid(...subscriptionsEnum),
});

module.exports = registerSchema;
