const mongoose = require("mongoose")
const unicycleSchema = mongoose.Schema({
unicycle_type: String,
unicycle_size: String,
unicycle_cost: Number
})

module.exports = mongoose.model("unicycle",unicycleSchema)