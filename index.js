const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const AuthRoute = require("./routes/auth.route");
const HomeRoute = require("./routes/home.route");
const pizzasRoute = require("./routes/pizzas.route");
const ordersRoute = require("./routes/orders.route");
const usersRoute = require("./routes/users.route");

const app = express();

dotenv.config();

// Connecting to mongoDb Atlas
mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/auth", AuthRoute);

app.use("/users", usersRoute);

app.use("/pizzas", pizzasRoute);

app.use("/orders", ordersRoute);

app.use("/", HomeRoute);

app.listen(process.env.PORT || 3001);
