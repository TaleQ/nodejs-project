const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().alphanum().min(1).max(40).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .pattern(/^\+?[0-9]{6,12}$/)
    .required(),
});

module.exports = {
  schema,
};
