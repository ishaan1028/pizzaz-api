const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    orderItems: [],
    shippingAddress: {
        type: Object
    },
    orderAmount: {
        type: Number,
        required: true
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    transactionId: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema, "orders");