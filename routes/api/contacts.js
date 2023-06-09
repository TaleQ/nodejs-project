const express = require('express');

const ctrl = require('../../controllers/contacts');

const { validateBody } = require('../../middlewares');
const { schema } = require('../../shemas/contacts');

const router = express.Router();

router.get('/', ctrl.listContacts);
router.get('/:contactId', ctrl.getContactById);
router.post('/', validateBody(schema), ctrl.addContact);
router.delete('/:contactId', ctrl.removeContact);
router.put('/:contactId', validateBody(schema), ctrl.updateContact);

module.exports = router;
