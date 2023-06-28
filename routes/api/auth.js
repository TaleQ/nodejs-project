const express = require('express');
const { authCtrl } = require('../../controllers');
const { validateBody, authenticate } = require('../../middlewares');
const { userSchemas } = require('../../schemas');

const router = express.Router();

router
  .route('/register')
  .post(validateBody(userSchemas.registerSchema), authCtrl.register);

router
  .route('/login')
  .post(validateBody(userSchemas.loginSchema), authCtrl.login);

router.route('/logout').post(authenticate, authCtrl.logout);

router.route('/current').get(authenticate, authCtrl.getCurrent);

router
  .route('/subscription')
  .patch(
    authenticate,
    validateBody(userSchemas.subscriptionSchema),
    authCtrl.changeSubscription
  );

module.exports = router;
