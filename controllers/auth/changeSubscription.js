const { userModel } = require('../../models');
const { HttpError } = require('../../utils');

const changeSubscription = async (req, res) => {
  const { _id } = req.user;
  const result = await userModel.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};

module.exports = changeSubscription;