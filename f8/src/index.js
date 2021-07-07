const path = require("path");
const Joi = require("joi");
const express = require("express");
const morgan = require("morgan");
const app = express();
const handlebars = require("express-handlebars");

const route = require("./routes");

const port = process.env.PORT || 9561;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

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
app.set("views", path.join(__dirname, "resources/views"));

// Route
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
