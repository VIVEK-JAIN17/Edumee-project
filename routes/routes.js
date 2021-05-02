const express = require('express');
const router = express.Router();
const { isLoggedin } = require('../middleware/auth');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/dashboard', isLoggedin, (req, res) => {
    res.render('dashboard');
});

router.get('/courses', (req, res) => {
    res.render('courses');
});

module.exports = router;