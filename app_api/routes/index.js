const express = require("express");
const router = express.Router();

// import controller functions
const tripsController = require("../controllers/trips");

// define routes and associate them with controller functions
router.get("/trips", tripsController.tripsList);
router.get("/trips/:tripCode", tripsController.tripsFindByCode);
router.post("/trips", tripsController.tripsCreate);
router.put("/trips/:tripCode", tripsController.tripsUpdateTrip);

// export the router to be used in the main app
module.exports = router;
