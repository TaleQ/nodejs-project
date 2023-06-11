const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().min(1).max(40).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .min(6)
    .max(15)
    .pattern(/^\+?[0-9]{5,15}$/)
    .required(),
});

module.exports = {
  schema,
};
