const Joi = require('joi');

// const emailRegExp = '';

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string,
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

const schemas = { registerSchema, loginSchema };

module.exports = schemas;
