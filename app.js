const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

const pageRoutes = require("./routes/pages");

app.use(express.static(path.join(__dirname, "public")));
app.use("/", pageRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
