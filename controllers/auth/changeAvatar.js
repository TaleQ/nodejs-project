const { userModel } = require('../../models');
const { HttpError } = require('../../utils');
const path = require('path');
const fs = require('fs/promises');
const jimp = require('jimp');

const resizeImage = async (imagePath, width, height) => {
  const image = await jimp.read(imagePath);
  await image.resize(width, height);
  await image.writeAsync(imagePath);
};

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
