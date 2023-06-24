const { contactModel } = require('../../models');
const { HttpError } = require('../../utils');

const updateContactStatus = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactModel.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};

module.exports = updateContactStatus;
