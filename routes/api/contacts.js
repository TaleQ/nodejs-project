const express = require('express');
const ctrl = require('../../controllers/contacts');
const { validateBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/contact');

const router = express.Router();

router
  .route('/')
  .get(ctrl.listContacts)
  .post(validateBody(schemas.bodySchema), ctrl.addContact);

router.use('/:contactId', isValidId);
router
  .route('/:contactId')
  .get(ctrl.getContactById)
  .put(validateBody(schemas.bodySchema), ctrl.updateContact)
  .delete(ctrl.deleteContact);

router
  .route('/:contactId/favorite')
  .patch(
    isValidId,
    validateBody(schemas.favoriteSchema),
    ctrl.updateStatusContact
  );

module.exports = router;
