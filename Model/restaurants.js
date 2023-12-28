const mongoose = require('mongoose');
const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    locality: {
        type: String,
        required : true
    },
    city_name: {
        type: String,
        required : true
    },
    city_id: {
        type: Number,
        required : true
    },
    location_id: {
        type: Number,
        required : true
    },
    address: {
        type: String,
        required : true
    },
    thumb: {
        type: String,
        required : true
    },
    cost: {
        type: Number,
        required : true
    },
    contact_number: {
        type: Number,
        required : true
    },
    mealtype_id:  {
        type : Number,
        required : true
    },
    cuisine_id: [{
        cuisine : {
            type : String,
            required : true
        },
        name: {
            type: String,
            required : true
        }
    }]
});

module.exports = mongoose.model('restaurants', restaurantSchema);