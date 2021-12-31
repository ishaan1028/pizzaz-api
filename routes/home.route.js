const route = require("express").Router();

route.get("/", (req, res) => {
    res.send("pizzaz backend");
});


module.exports = route;