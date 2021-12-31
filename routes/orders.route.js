const route = require("express").Router();
const ordersService = require("../services/orders.service");

const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdmin = require("../middlewares/isAdmin");

// create order
route.post("/create", isAuthenticated, ordersService.createOrder);

// deliver order
route.put("/admin/deliver/:id", isAuthenticated, isAdmin, ordersService.deliverOrder);

// get orders of a user
route.get("/userorders", isAuthenticated, ordersService.getUserOrders);

// admin get all orders
route.get("/admin/all", isAuthenticated, isAdmin, ordersService.getAllOrders);

module.exports = route;