const express = require("express");
const router = express.Router();
const buyNowController = require("../controllers/buyNow.controller");

router.post("/submit", buyNowController.submitBuyNow);

module.exports = router;
