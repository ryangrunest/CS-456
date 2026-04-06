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

module.exports = {
  tripsList,
  tripsFindByCode,
};
