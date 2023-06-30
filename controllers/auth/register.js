const { userModel } = require('../../models');
const { HttpError } = require('../../utils');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const avatarURL = gravatar.url(email, { s: '250', d: 'mp' });
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    ...req.body,
    password: hashPassword,
    avatarURL: avatarURL,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

module.exports = register;
