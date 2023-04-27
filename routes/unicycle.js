var express = require('express');
const unicycle_controlers= require('../controllers/unicycle');
var router = express.Router();
/* GET unicycles */
router.get('/', unicycle_controlers.unicycle_view_all_Page );
module.exports = router;



// A little function to check if we have an authorized user and continue on
//or
// redirect to login.
const secured = (req, res, next) => {
    if (req.user){
       return next();
    }
       req.session.returnTo = req.originalUrl;
       res.redirect("/login");
}
   

/* GET detail unicycle page */
router.get('/detail',secured ,unicycle_controlers.unicycle_view_one_Page);

/* GET create unicycle page */
router.get('/create', secured,unicycle_controlers.unicycle_create_Page);
/* GET create update page */
router.get('/update',secured, unicycle_controlers.unicycle_update_Page);

router.get('/delete', unicycle_controlers.unicycle_delete_Page);