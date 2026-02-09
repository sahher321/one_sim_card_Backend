const express = require("express");
const router = express.Router();
const controller = require("../controllers/iotSolutions.controller");

router.get("/", controller.getAllSolutions);
router.get("/:slug", controller.getSolutionBySlug);

module.exports = router;
