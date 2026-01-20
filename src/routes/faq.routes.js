const express = require("express");
const router = express.Router();
const faqController = require("../controllers/faq.controller");

router.get("/groups", faqController.getFaqGroups);
router.get("/by-group/:groupId", faqController.getFaqsByGroup);
router.get("/search", faqController.searchFaq);

module.exports = router;
