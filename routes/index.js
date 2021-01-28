const express = require('express');
const validateBodySchema = require('../middleware');
const { apiRoot, validateRule } = require('../controllers')

const router = express.Router();

router.get('/', apiRoot);

router.post('/validate-rule', validateBodySchema(), validateRule)

module.exports = router
