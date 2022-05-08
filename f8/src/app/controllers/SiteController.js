const { multipleMongooseToObject } = require("../../util/mongoose");
const Course = require("../models/Courses");
class SiteController {
  // [GET] /
  index(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render("home", {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }

  // [GET] /search
  search(req, res) {
    res.send("search");
  }
}

module.exports = new SiteController();
