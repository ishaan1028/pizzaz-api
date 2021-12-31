const User = require("../models/user.model");

module.exports = {
    async getAllUsers(req, res) {
        try {

            const users = await User.find();

            res.send(users);

        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },
    async editRole(req, res) {
        try {

            const user = await User.findById(req.params.id);

            user.isAdmin = !user.isAdmin;

            user.save({ validateBeforeSave: false });

            res.send(user);

        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },
    async deleteUser(req, res) {
        try {

            await User.deleteOne({ _id: req.params.id });

            res.send("deleted user");

        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
}