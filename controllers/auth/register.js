const { nanoid } = require('nanoid');
const { userModel } = require('../../models');
const { HttpError, sendEmail } = require('../../utils');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
require('dotenv').config();

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const avatarURL = gravatar.url(email, { s: '250', d: 'mp' });
  const hashPassword = await bcrypt.hash(password, 10);

  const verificationToken = nanoid();
  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`,
  };
  await sendEmail(verifyEmail);

  const newUser = await userModel.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
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
