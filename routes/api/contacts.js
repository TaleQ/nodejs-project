const express = require('express');

const ctrl = require('../../controllers/contacts');

const { validateBody } = require('../../middlewares');
const { schema } = require('../../shemas/contacts');

const router = express.Router();

router.get('/', ctrl.listContacts);
router.get('/:contactId', validateBody(schema), ctrl.getContactById);
router.post('/', ctrl.addContact);
router.delete('/:contactId', ctrl.removeContact);
router.put('/:contactId', validateBody(schema), ctrl.updateContact);

module.exports = router;
