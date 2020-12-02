const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.render("pages/index");
});

app
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .listen(PORT, () => {
    console.log(`Zaikio node demo listening at http://localhost:${PORT}`);
  });
