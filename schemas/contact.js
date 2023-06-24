const Joi = require('joi');

const bodySchema = Joi.object({
  name: Joi.string().min(1).max(40).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .min(6)
    .max(15)
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
  favorite: Joi.boolean(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = { bodySchema, favoriteSchema };

module.exports = schemas;
