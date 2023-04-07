
var express = require('express');
var router = express.Router();

/* GET Notebook details */
router.get('/', function(req, res, next) {
  res.render('unicycle', { title: 'Search Results of unicycle' });
});

module.exports = router;