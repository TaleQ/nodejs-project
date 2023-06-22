const { HttpError } = require('../utils');
const { schemas } = require('../models/contact');

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      if (schema === schemas.favoriteSchema) {
        throw HttpError(400, 'missing field favorite');
      }
      throw HttpError(400, error.message);
    }
    next();
  };
  return func;
};

module.exports = validateBody;
