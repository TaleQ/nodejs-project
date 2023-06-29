const { userModel } = require('../../models');
const { HttpError, resizeImage } = require('../../utils');
const path = require('path');
const fs = require('fs/promises');

const changeAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;

  await resizeImage(tmpUpload, 250, 250);

  const avatarsDir = path.join('public', 'avatars');
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tmpUpload, resultUpload);
  const avatarURL = path.join('public', 'avatars', filename);

  const result = await userModel.findByIdAndUpdate(
    _id,
    { avatarURL },
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({ avatarURL });
};

module.exports = changeAvatar;
