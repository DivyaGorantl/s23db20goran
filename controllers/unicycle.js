var unicycle = require('../models/unicycle');
// List of all unicycles

exports.unicycle_list = function(req, res) {
 res.send('NOT IMPLEMENTED: unicycle list');
};
// for a specific unicycle.
exports.unicycle_detail = function(req, res) {
 res.send('NOT IMPLEMENTED: unicycle detail: ' + req.params.id);
};
// Handle unicycle create on POST.
exports.unicycle_create_post = function(req, res) {
 res.send('NOT IMPLEMENTED: unicycle create POST');
};
// Handle unicycle delete form on DELETE.
exports.unicycle_delete = function(req, res) {
 res.send('NOT IMPLEMENTED: unicycle delete DELETE ' + req.params.id);
};
// Handle unicycle update form on PUT.
//exports.unicycle_update_put = function(req, res) {
 //res.send('NOT IMPLEMENTED: unicycle update PUT' + req.params.id);
//};// List of all unicycles

// List of all unicycle
exports.unicycle_list = async function(req, res) {
    try{
    theunicycle = await unicycle.find();
    res.send(theunicycle);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };



// VIEWS
// Handle a show all view
exports.unicycle_view_all_Page = async function(req, res) {
    try{
    theunicycle = await unicycle.find();
    res.render('unicycle', { title: 'unicycles Search Results', results: theunicycle });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };


   // Handle Costume create on POST.
exports.unicycle_create_post = async function(req, res) {
    console.log(req.body)
    let document = new unicycle();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"unicycle_type":"goat", "cost":12, "size":"large"}
    document.unicycle_type = req.body.unicycle_type;
    document.unicycle_size = req.body.unicycle_size;
    document.unicycle_cost = req.body.unicycle_cost;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
};

// for a specific Drink.
exports.unicycle_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await unicycle.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
    };
    


    // Handle Drink update form on PUT.
exports.unicycle_update_put = async function(req, res) {
 console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
 try {
 let toUpdate = await unicycle.findById( req.params.id)
 if(req.body.checkboxsale) 
   toUpdate.sale = true;
 else 
   toUpdate.same = false;
 // Do updates of properties
 if(req.body.unicycle_type)
   toUpdate.unicycle_type = req.body.unicycle_type;
 if(req.body.unicycle_size) 
   toUpdate.unicycle_size = req.body.unicycle_size;
 if(req.body.unicycle_cost) 
   toUpdate.unicycle_cost = req.body.unicycle_cost;
 let result = await toUpdate.save();
 console.log("Sucess " + result)
 res.send(result)
 } catch (err) {
 res.status(500)
 res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
 }
};