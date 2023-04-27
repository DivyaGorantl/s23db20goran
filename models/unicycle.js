const mongoose = require("mongoose")
const unicycleSchema = mongoose.Schema({
unicycle_type: {
        type: String,
        required: true,
        match: /^[a-zA-Z]+$/
     },
unicycle_size: String,
unicycle_cost:{
    type: Number,
    min:1,
    max:10000
} 
})

module.exports = mongoose.model("unicycle",unicycleSchema)