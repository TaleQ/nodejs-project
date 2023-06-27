const { contactModel } = require('../../models');

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  if (favorite) {
    const result = await contactModel
      .find({ owner }, '', {
        skip: skip,
        limit: limit,
      })
      .where('favorite')
      .equals(favorite);
    res.status(200).json(result);
  }
  const result = await contactModel.find({ owner }, '', {
    skip: skip,
    limit: limit,
  });
  res.status(200).json(result);
};

module.exports = listContacts;
