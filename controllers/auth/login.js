const { userModel } = require('../../models');
const { HttpError } = require('../../utils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  const updatedUser = await userModel.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token: token,
    user: {
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    },
  });
};

module.exports = login;
