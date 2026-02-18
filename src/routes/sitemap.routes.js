const express = require("express");
const router = express.Router();
const controller = require("../controllers/sitemap.controller");

router.get("/sitemap.xml", controller.getSitemap);
router.get("/data", controller.getSitemapData);

module.exports = router;
