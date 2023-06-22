const { Contact } = require('../../models/contact');

const listContacts = async (_req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

module.exports = listContacts;
