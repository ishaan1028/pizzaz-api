const Pizza = require("../models/pizza.model");

module.exports = {
    async addPizza(req, res) {
        try {

            const { name, smallPrize, mediumPrize, largePrize, description, image, category } = req.body;

            const pizza = {
                name,
                sizes: ["small", "medium", "large"],
                prices: {
                    "small": +smallPrize,
                    "medium": +mediumPrize,
                    "large": +largePrize,
                },
                category,
                description,
                image
            }

            const newPizza = await Pizza.create(pizza);

            res.send(newPizza);
        }
        catch (err) {
            console.log(err);
            res.status(500).send("error creating pizza");
        }
    },
    async editPizza(req, res) {
        try {

            const { name, smallPrize, mediumPrize, largePrize, description, image, category } = req.body;

            const pizza = {
                name,
                prices: {
                    "small": +smallPrize,
                    "medium": +mediumPrize,
                    "large": +largePrize,
                },
                category,
                description,
                image
            }

            const newPizza = await Pizza.findOneAndUpdate({ _id: req.params.id }, {
                $set: { ...pizza }
            }, { new: true });

            res.send(newPizza);
        }
        catch (err) {
            console.log(err);
            res.status(500).send("error updating pizza");
        }
    },
    async getAllPizzas(req, res) {
        try {

            const pizzas = await Pizza.find();

            res.send(pizzas);

        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },
    async getPizzaById(req, res) {
        try {

            const pizza = await Pizza.findById(req.params.id);

            res.send(pizza);

        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },
    async deletePizza(req, res) {
        try {

            await Pizza.findOneAndDelete({ _id: req.params.id });

            res.send("deleted");

        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
}