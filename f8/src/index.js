const path = require("path");
const Joi = require("joi");
const express = require("express");
const morgan = require("morgan");
const app = express();
const handlebars = require("express-handlebars");

const port = process.env.PORT || 9561;

const route = require("./routes");
const db = require("./config/db");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

// HTTP Logger
app.use(morgan("combined"));

// Template engine
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Route
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
