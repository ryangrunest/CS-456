const fs = require("fs");
const path = require("path");

// GET travel page
const travel = async (req, res) => {
  const tripsEndpoint = "http://localhost:3000/api/trips";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  await fetch(tripsEndpoint, options)
    .then((response) => response.json())
    .then((data) => {
      let message = null;
      if (!(data instanceof Array)) {
        message = "API lookup error";
        data = [];
      } else if (!data.length) {
        message = "No trips found";
      }

      res.render("travel", {
        title: "Travlr Getaways",
        trips: data,
        message: message,
      });
    })
    .catch((error) => {
      console.error("Error fetching trips:", error);
      res.status(500).json({ message: "Error fetching trips" });
    });
};

module.exports = {
  travel,
};
