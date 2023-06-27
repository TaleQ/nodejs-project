const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../utils');
const { subscriptionsEnum, regExps } = require('../constants');

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      match: regExps.emailRegExp,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionsEnum,
      default: 'starter',
    },
    token: String,
  },
  { versionKey: false }
);

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

module.exports = User;
