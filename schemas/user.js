const Joi = require('joi');
const { subscriptionsEnum, regExps } = require('../constants');

const registerSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .max(20)
    .pattern(regExps.passwordRegExp)
    .required(),
  email: Joi.string().email().pattern(regExps.emailRegExp).required(),
  subscription: Joi.string().valid(...subscriptionsEnum),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().pattern(regExps.emailRegExp).required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionsEnum)
    .required(),
});

const schemas = { registerSchema, loginSchema, subscriptionSchema };

module.exports = schemas;
