const express = require("express");
const router = express.Router();
const controller = require("../controllers/meals");

// Get meals page
router.get("/", controller.meals);

module.exports = router;
