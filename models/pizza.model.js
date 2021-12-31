const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 200,
        trim: true
    },
    sizes: {
        type: [String],
        required: true
    },
    prices: {
        type: Object,
        required: true,
        _id: false
    },
    category: {
        type: String,
        required: true,
        enum: ["veg", "nonveg"]
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 4000,
        trim: true
    },
}, { timestamps: true });

module.exports = mongoose.model("Pizza", pizzaSchema, "pizzas");