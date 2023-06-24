const { userModel } = require('../../models');

const login = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
};

module.exports = login;
