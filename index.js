require('dotenv').config();

// Express
const express = require('express');
const app = express();

// Other
const morgan = require('morgan');
const mongoose = require('mongoose');

// Express-session
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// Passport 
const passport = require('passport');
require('./config/passport')(passport);

// Routes
const router = require('./routes/routes');
const authRouter = require('./routes/auth');

// Mongoose Config
const connectDB = require('./config/db');
connectDB();

// Global Middlewares
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Sesion Config
app.use(session({
    name: 'session-id',
    secret: process.env.SERVER_SECRET,
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        autoRemove: 'native'
    })
}));

// Passport Config
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// Routes
app.use('/', router);
app.use('/auth', authRouter);

var PORT = process.env.PORT || '3000';
var HOST = process.env.HOST || 'localhost';
app.listen(PORT, () => {
    console.log(`The Edumee Project Server is up and running in ${process.env.NODE_ENV} environment at http://${HOST}:${PORT}`);
});