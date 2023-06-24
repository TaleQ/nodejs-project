const { contactModel } = require('../../models');
const { HttpError } = require('../../utils');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactModel.findById(contactId);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};

module.exports = getContactById;
