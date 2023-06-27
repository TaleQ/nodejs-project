const { userModel } = require('../../models');

const logout = async (req, res) => {
  const { _id } = req.user;
  await userModel.findByIdAndUpdate(_id, { token: '' });
  res.status(204).json('Logout success');
};

module.exports = logout;
