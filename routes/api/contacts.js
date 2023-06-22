const express = require('express');
const { contactsCtrl } = require('../../controllers');
const { validateBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/contact');

const router = express.Router();

router
  .route('/')
  .get(contactsCtrl.listContacts)
  .post(validateBody(schemas.bodySchema), contactsCtrl.addContact);

router.use('/:contactId', isValidId);
router
  .route('/:contactId')
  .get(contactsCtrl.getContactById)
  .put(validateBody(schemas.bodySchema), contactsCtrl.updateContact)
  .delete(contactsCtrl.deleteContact);

router
  .route('/:contactId/favorite')
  .patch(
    isValidId,
    validateBody(schemas.favoriteSchema),
    contactsCtrl.updateContactStatus
  );

module.exports = router;
