const Order = require("../models/order.model");
const stripe = require("stripe")("sk_test_51KBg3uSHge9UlUwhxiG4louSytIjNiaU2AvjuEPNo9SID8RciL2mZyg4Zo5BVSUES9NHTnAjULSMSFXu7b51sL4o00ObaM2J9q");
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async createOrder(req, res) {
        try {

            const { token, subTotal, cartItems } = req.body;

            const customer = await stripe.customers.create({
                email: token.email,
                source: token.id
            });

            const payment = await stripe.charges.create({
                amount: subTotal * 100,
                currency: "inr",
                customer: customer.id,
                receipt_email: customer.email
            }, {
                idempotencyKey: uuidv4()
            });

            if (!payment) return res.status(402).send("payment failed");

            const order = await Order.create({
                name: req.user.name,
                email: req.user.email,
                userId: req.user._id,
                orderItems: cartItems,
                shippingAddress: {
                    street: token.card.address_line1,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    pincode: token.card.address_zip
                },
                orderAmount: subTotal,
                transactionId: payment.source.id
            });

            res.send(order);
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    },
    async getUserOrders(req, res) {
        try {

            const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });

            res.send(orders);

        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },
    async getAllOrders(req, res) {
        try {
            const orders = await Order.find().sort({ createdAt: -1 });
            res.send(orders);
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },
    async deliverOrder(req, res) {
        try {
            const order = await Order.findOneAndUpdate({ _id: req.params.id }, {
                $set: { isDelivered: true }
            }, {
                new: true
            })
            res.send(order);
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
}