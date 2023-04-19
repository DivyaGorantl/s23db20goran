var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var unicycle_controller = require('../controllers/unicycle');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// unicycle ROUTES ///
// POST request for creating a unicycle.
router.post('/unicycle', unicycle_controller.unicycle_create_post);
// DELETE request to delete unicycle.
router.delete('/unicycle/:id', unicycle_controller.unicycle_delete);
// PUT request to update unicycle.
router.put('/unicycle/:id', unicycle_controller.unicycle_update_put);
// GET request for one unicycle.
router.get('/unicycle/:id', unicycle_controller.unicycle_detail);
// GET request for list of all unicycle items.
router.get('/unicycle', unicycle_controller.unicycle_list);
module.exports = router;