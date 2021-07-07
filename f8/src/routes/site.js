const express = require("express");
const router = express.Router();

const siteRouter = require("../app/controllers/SiteController");

router.use("/:slug", siteRouter.show);
router.use("/", siteRouter.index);

module.exports = router;
