const path = require("path");
const Joi = require('joi');
const express = require("express");
const morgan = require("morgan");
const app = express();
const handlebars = require("express-handlebars");

const port = process.env.PORT || 3000;

app.use(express.json());

const courses = [
  {id: 1, name: 'course1'},
  {id: 2, name: 'course2'},
  {id: 3, name: 'course3'},
]

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

app.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.params);

})

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if(!course) res.status(404).send("The course with the given ID was not found");
  res.send(course);
})

app.post('/api/courses', (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course);
  res.send(course);
})

app.get("/", (req, res) => {
  res.render("home", {
    title: "home",
  });
});

app.get("/news", (req, res) => {
  res.render("news", {
    title: "news",
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
