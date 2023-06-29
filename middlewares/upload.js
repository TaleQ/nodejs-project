const multer = require('multer');
const path = require('path');
const { HttpError } = require('../utils');

const tempDir = path.join(__dirname, '..', 'tmp');
const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileSize = 3000000;
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(
      HttpError(
        400,
        `Avatar must be .png or .jpeg file and must not exceed ${
          fileSize / 1000000
        } Mb`
      )
    );
  }
};

const upload = multer({
  storage: multerConfig,
  limits: {
    fileSize: fileSize,
  },
  fileFilter: fileFilter,
});

module.exports = upload;
