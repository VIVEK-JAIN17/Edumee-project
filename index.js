require("dotenv").config();

// Express
const express = require("express");
const app = express();

// Other
const morgan = require('morgan');

// Routes
const router = require("./routes/routes");

// Mongoose Config
const mongoose = require("mongoose");
const uri = (process.env.DATABASE_URI) || "mongodb://localhost:27017/Edumee";
const connect = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// Global Middlewares
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Routes
app.use("/", router);

connect.then(() => {
    console.log(`Correctly Connected to MongoDB Server`);
}).catch((err) => console.log(err));

var PORT = process.env.PORT || "3000";
var HOST = process.env.HOST || "localhost";
app.listen(PORT, () => {
    console.log(`The Edumee Project Server is up and running in ${process.env.NODE_ENV} environment at http://${HOST}:${PORT}`);
});