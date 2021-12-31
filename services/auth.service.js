
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {

    async Register(req, res) {
        try {

            // Checking if user already exists
            const user = await User.findOne({ email: req.body.email });
            if (user) return res.status(403).send("This email is already registered.");

            //Encoding password
            req.body.password = await bcryptjs.hash(req.body.password, 10);

            // Creating new user
            const newUser = new User({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            });

            await newUser.save();

            res.send("user registered successfully.");

        }
        catch (err) {
            console.log(err);
            res.status(500).send("Couldn't register user.");
        }

    },
    async Login(req, res) {
        try {

            // Checking if user exists
            const user = await User.findOne({ email: req.body.email });
            if (!user) return res.status(404).send("user not found.");

            // Checking if password is matching
            const validPass = await bcryptjs.compare(req.body.password, user.password);
            if (!validPass) return res.status(401).send("wrong password");

            // generating jwt token
            const token = jwt.sign({ user }, process.env.SECRET);

            const { password, ...other } = user._doc;

            res.send({
                "token": token,
                "user": other
            });

        }
        catch (err) {
            console.log(err);
            res.status(500).send("Couldn't login user.");
        }

    }
}