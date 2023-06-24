const express = require('express');
const { contactsCtrl } = require('../../controllers');
const { validateBody, isValidId } = require('../../middlewares');
const { contactSchemas } = require('../../schemas');

const router = express.Router();

router
  .route('/')
  .get(contactsCtrl.listContacts)
  .post(validateBody(contactSchemas.bodySchema), contactsCtrl.addContact);

router.use('/:contactId', isValidId);
router
  .route('/:contactId')
  .get(contactsCtrl.getContactById)
  .put(validateBody(contactSchemas.bodySchema), contactsCtrl.updateContact)
  .delete(contactsCtrl.deleteContact);

router
  .route('/:contactId/favorite')
  .patch(
    isValidId,
    validateBody(contactSchemas.favoriteSchema),
    contactsCtrl.updateContactStatus
  );

module.exports = router;
