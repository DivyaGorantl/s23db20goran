var express = require('express');
const unicycle_controlers= require('../controllers/unicycle');
var router = express.Router();
/* GET costumes */
router.get('/', unicycle_controlers.unicycle_view_all_Page );
module.exports = router;