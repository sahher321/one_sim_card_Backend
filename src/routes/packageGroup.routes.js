const express = require("express");
const router = express.Router();
const controller = require("../controllers/packageGroup.controller");

router.get("/countries", controller.getCountries);
router.get("/packages/:country", controller.getPackagesByCountry);

module.exports = router;
