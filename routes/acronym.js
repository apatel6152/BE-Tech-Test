const express = require('express');
const Acronym = require('../models/acronym.js');
const acronymController = require('../controllers/acronymController.js');
const router = express.Router();

//all routes in here are starting with acronym
router.get('/', acronymController.get);

router.get('/', acronymController.findAll);

router.post('/', acronymController.create);

router.patch('/:acronymId', acronymController.update)

router.delete('/:acronymId', acronymController.delete)

module.exports = router;