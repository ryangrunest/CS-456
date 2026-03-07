const express = require("express");
const router = express.Router();
const path = require("path");

const view = (page) => path.join(__dirname, "..", "views", `${page}.html`);

router.get(["/", "/index.html"], (req, res) => res.sendFile(view("index")));
router.get(["/about", "/about.html"], (req, res) =>
  res.sendFile(view("about")),
);
router.get(["/contact", "/contact.html"], (req, res) =>
  res.sendFile(view("contact")),
);
router.get(["/meals", "/meals.html"], (req, res) =>
  res.sendFile(view("meals")),
);
router.get(["/news", "/news.html"], (req, res) => res.sendFile(view("news")));
router.get(["/rooms", "/rooms.html"], (req, res) =>
  res.sendFile(view("rooms")),
);
router.get(["/travel", "/travel.html"], (req, res) =>
  res.sendFile(view("travel")),
);

module.exports = router;
