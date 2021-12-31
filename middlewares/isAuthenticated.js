const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) return res.status(401).send("Please login to access the content!");

        //verifying if users token is valid
        const { user } = jwt.verify(token, process.env.SECRET);

        const { password, ...other } = user;
        req.user = other;

        next();

    }
    catch (err) {
        console.log(err)
        res.status(401).send("Please login to access the content!");
    }
}

module.exports = isAuthenticated;