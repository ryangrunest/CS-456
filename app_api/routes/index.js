const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken"); // enable JSON Web Tokens

// import controller functions
const tripsController = require("../controllers/trips");
const authenticationController = require("../controllers/authentication");

// define routes and associate them with controller functions
router.get("/trips", authenticateJWT, tripsController.tripsList);
router.get(
  "/trips/:tripCode",
  authenticateJWT,
  tripsController.tripsFindByCode,
);
router.post("/trips", authenticateJWT, tripsController.tripsCreate);
router.put(
  "/trips/:tripCode",
  authenticateJWT,
  tripsController.tripsUpdateTrip,
);
router.post("/register", authenticationController.register);
router.post("/login", authenticationController.login);

// Method to authenticate our JWT
function authenticateJWT(req, res, next) {
  // console.log('In Middleware');
  const authHeader = req.headers["authorization"];

  // console.log('Auth Header: ' + authHeader);
  if (authHeader == null) {
    console.log("Auth Header Required but NOT PRESENT!");
    return res.sendStatus(401);
  }

  let headers = authHeader.split(" ");

  if (headers.length < 1) {
    console.log("Not enough tokens in Auth Header: " + headers.length);
    return res.sendStatus(501);
  }

  const token = authHeader.split(" ")[1];

  // console.log('Token: ' + token);

  if (token == null) {
    console.log("Null Bearer Token");
    return res.sendStatus(401);
  }

  // console.log(process.env.JWT_SECRET);
  // console.log(jwt.decode(token));

  const verified = jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, verified) => {
      if (err) {
        return res.sendStatus(401).json("Token Validation Error!");
      }
      req.auth = verified; // Set the auth paramto the decoded object
    },
  );

  next(); // We need to continue or this will hang forever
}

// export the router to be used in the main app
module.exports = router;
