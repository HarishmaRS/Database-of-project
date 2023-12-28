const mongoose = require("mongoose");

const menuitemSchema = new mongoose.Schema({
    restaurant_name: {
        type: String,
        required: true
    },

    restaurant_id: {
        type: String,
        required: true
    },
    menu_items: [{
        name : {
            type : String,
            required : true
        },
        description: {
            type: String,
            required : true
        },
        price: {
            type: Number,
            required : true
        },
        qty:{
            type: Number,
            required : true
        },
        image_url:{
            type: String,
            required : true
        }
    }]
});

module.exports = mongoose.model('menuitems', menuitemSchema);