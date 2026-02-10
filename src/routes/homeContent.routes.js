const express = require("express");
const router = express.Router();
const controller = require("../controllers/homeContent.controller");

router.get("/", controller.getHomeContent);

module.exports = router;
