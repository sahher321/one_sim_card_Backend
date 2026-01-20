const express = require("express");
const router = express.Router();

const SupportController = require("../controllers/m2mSupport.controller");

router.post("/submit", SupportController.submitForm);

module.exports = router;
