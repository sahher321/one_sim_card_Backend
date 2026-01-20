const express = require("express");
const router = express.Router();
const contentController = require("../controllers/content.controller");

router.get("/:id", contentController.getContentById);

module.exports = router;
