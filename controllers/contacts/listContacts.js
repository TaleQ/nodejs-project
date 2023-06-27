const { contactModel } = require('../../models');

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const result = await contactModel.find({ owner }, '', {
    skip: skip,
    limit: limit,
  });
  res.status(200).json(result);
};

module.exports = listContacts;
