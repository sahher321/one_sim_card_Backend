const express = require("express");
const router = express.Router();
const coverageController = require("../controllers/coverage.controller");

router.get("/", coverageController.getCoverage);
router.get("/countries", coverageController.getCountries);
router.get("/operators", coverageController.getOperatorsByCountry);

module.exports = router;
