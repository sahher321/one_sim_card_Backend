const express = require("express");
const router = express.Router();
const {
  submitQuote,
  getAllQuotes,
} = require("../controllers/quote.controller.js");

router.post("/submit", submitQuote);
router.get("/all", getAllQuotes);

module.exports = router;
