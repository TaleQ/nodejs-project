const { userModel } = require('../../models');
const { HttpError } = require('../../utils');
require('dotenv').config();
const { BASE_URL } = process.env;
const { sendEmail } = require('../../utils');

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    throw HttpError(401, 'User not found');
  }
  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed');
  }

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({
    message: 'Verification email sent',
  });
};

module.exports = resendVerifyEmail;
