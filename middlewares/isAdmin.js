
const isAdmin = (req, res, next) => {

    if (!req.user.isAdmin) return res.status(403).send("You dont have access to this content");

    next();

}

module.exports = isAdmin;