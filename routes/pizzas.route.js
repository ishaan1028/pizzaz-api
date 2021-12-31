const route = require("express").Router();
const pizzasService = require("../services/pizzas.service");
const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdmin = require("../middlewares/isAdmin");

// create pizza
route.post("/admin/addpizza", isAuthenticated, isAdmin, pizzasService.addPizza);

// edit pizza
route.put("/edit/:id", isAuthenticated, isAdmin, pizzasService.editPizza);

//delete pizza
route.delete("/delete/:id", isAuthenticated, isAdmin, pizzasService.deletePizza);

// get all pizzas
route.get("/all", pizzasService.getAllPizzas);

// get pizza by id
route.get("/:id", pizzasService.getPizzaById);

module.exports = route;