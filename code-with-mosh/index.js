const debug = require("debug")("app:startup");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const express = require("express");
const logger = require("./middleware/logger");
const app = express();

const courses = require("./routes/courses");
const home = require("./routes/home");

app.set("view engine", "pug");
app.set("views", "./views"); //default folder

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //key=value&a=b
app.use(express.static("public"));
app.use(helmet());

app.use("/api/courses", courses);
app.use("/", home);

// Configuration
console.log("Application name: ", config.get("name"));
console.log("Mail server: ", config.get("mail.host"));

// Chỉ chạy ở môi trường đev
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}

app.use(logger);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
