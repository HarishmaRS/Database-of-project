const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    city_id: {
        type: Number,
        required: true
    },
    location_id: {
        type: Number,
        required: true
    },
    city_name: {
        type: String,
        required: true
    },
    country_name: {
        type: String,
        required: true
    },
    __v: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('locations', locationSchema);