const express = require('express');
const router = express.Router();

const siteRouter = require('../app/controllers/SiteController');

      router.get('/search', siteRouter.search);
      router.get('/', siteRouter.index);

module.exports = router;
