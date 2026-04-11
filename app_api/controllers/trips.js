const mongoose = require("mongoose");
const Trip = require("../models/travlr");
const Model = mongoose.model("trips");

// GET: /trips - list all trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async (req, res) => {
  const query = await Model.find({}).exec(); // no filters, return all trips

  console.log(query);

  if (!query) {
    return res.status(404).json({ message: "No trips found" });
  }

  return res.status(200).json(query);
};

// GET /trips/:tripCode - lists a single trip by its unique tripCode
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async (req, res) => {
  const query = await Model.find({ code: req.params.tripCode }).exec(); // filter by tripCode

  if (!query) {
    return res.status(404).json({ message: "No trips found" });
  }

  return res.status(200).json(query);
};

// POST /trips - creates a new trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsCreate = async (req, res) => {
  try {
    const newTrip = await Model.create(req.body);
    return res.status(201).json(newTrip);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error creating trip", error: error.message });
  }
};

// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
  // Uncomment for debugging
  console.log(req.params);
  console.log(req.body);

  const q = await Model.findOneAndUpdate(
    { code: req.params.tripCode },
    {
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description,
    },
  ).exec();

  if (!q) {
    // Database returned no data
    return res.status(400).json({ message: "Error updating trip" });
  } else {
    // Return resulting updated trip
    return res.status(201).json(q);
  }
  // Uncomment the following line to show results of operation;
  // on the console
  // console.log(q);
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsCreate,
  tripsUpdateTrip,
};
