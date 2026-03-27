const fs = require("fs");
const path = require("path");

// GET travel page
const travel = (req, res) => {
  const trips = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../data/trips.json"), "utf8"),
  );
  res.render("travel", {
    title: "Travlr Getaways",
    trips,
  });
};

module.exports = {
  travel,
};
