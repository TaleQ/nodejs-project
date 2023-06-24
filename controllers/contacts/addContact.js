const { contactModel } = require('../../models');

const addContact = async (req, res) => {
  const result = await contactModel.create(req.body);
  res.status(201).json(result);
};

module.exports = addContact;
