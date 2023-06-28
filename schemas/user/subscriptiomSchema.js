const Joi = require('joi');
const { subscriptionsEnum } = require('../../constants');

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionsEnum)
    .required(),
});

module.exports = subscriptionSchema;
