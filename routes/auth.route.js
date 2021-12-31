const route = require("express").Router();
const authServices = require("../services/auth.service");

route.post("/register", authServices.Register);

route.post("/login", authServices.Login);

module.exports = route;