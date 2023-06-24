const express = require('express');
const { authCtrl } = require('../../controllers');
const { validateBody } = require('../../middlewares');
const { userSchemas } = require('../../schemas');

const router = express.Router();

router.route('/');

router
  .route('/register')
  .post(validateBody(userSchemas.registerSchema), authCtrl.register);

router.route('/login');

router.route('/logout');

router.route('/current');

module.exports = router;
