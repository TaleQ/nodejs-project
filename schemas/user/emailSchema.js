const Joi = require('joi');
const { regExps } = require('../../constants');

const emailSchema = Joi.object({
  email: Joi.string().email().pattern(regExps.emailRegExp).required(),
});

module.exports = emailSchema;
