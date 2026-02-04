const express = require('express');
const router = express.Router();
const controller = require('../controllers/keyFeatures.controller');

router.get('/', controller.getKeyFeatures);

module.exports = router;
