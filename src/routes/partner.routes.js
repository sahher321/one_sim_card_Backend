const express = require("express");
const router = express.Router();
const partnerController = require("../controllers/partner.controller");

router.get("/sections", partnerController.getAllSections);
router.get("/item/:id", partnerController.getItemDetails);

module.exports = router;
