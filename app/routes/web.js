
const express = require('express');
const router = express.Router();

// Index
router.get('/', IndexController.index);
router.get('/articles', IndexController.articles);
router.get('/articlerr', IndexController.articlesErr);

module.exports = router;
