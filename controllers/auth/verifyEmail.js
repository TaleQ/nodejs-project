const { userModel } = require('../../models');
const { HttpError } = require('../../utils');

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await userModel.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, 'User not found');
  }

  await userModel.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: '',
  });

  res.status(200).json({
    message: 'Verification successful',
  });
};

module.exports = verifyEmail;
