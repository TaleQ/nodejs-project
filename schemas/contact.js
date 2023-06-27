const Joi = require('joi');
const { regExps } = require('../constants');

const bodySchema = Joi.object({
  name: Joi.string().min(1).max(40).required(),
  email: Joi.string().email(regExps.emailRegExp).required(),
  phone: Joi.string().min(13).max(15).pattern(regExps.phoneRegExp).required(),
  favorite: Joi.boolean(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = { bodySchema, favoriteSchema };

module.exports = schemas;
