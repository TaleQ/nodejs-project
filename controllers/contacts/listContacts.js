const { contactModel } = require('../../models');

const listContacts = async (_req, res) => {
  const result = await contactModel.find();
  res.status(200).json(result);
};

module.exports = listContacts;
