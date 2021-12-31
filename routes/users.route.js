const route = require("express").Router();
const usersService = require("../services/users.service");

const isAdmin = require("../middlewares/isAdmin");
const isAuthenticated = require("../middlewares/isAuthenticated");

// get all users
route.get("/admin/allusers", isAuthenticated, isAdmin, usersService.getAllUsers);

// edit user role
route.put("/admin/editrole/:id", isAuthenticated, isAdmin, usersService.editRole);

// delete user
route.delete("/admin/deleteuser/:id", isAuthenticated, isAdmin, usersService.deleteUser);

module.exports = route;