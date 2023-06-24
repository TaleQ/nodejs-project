const { contactModel } = require('../../models');
const { HttpError } = require('../../utils');

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactModel.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({ message: 'contact deleted' });
};

module.exports = deleteContact;
