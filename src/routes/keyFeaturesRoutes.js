const express = require('express');
const router = express.Router();
const controller = require('../controllers/keyFeaturesController');

router.get('/key-features', controller.getKeyFeatures);

module.exports = router;
