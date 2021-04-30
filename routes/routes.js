const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

router.get('/courses', (req, res) => {
    res.render('courses');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/logout', (req, res) => {
    res.send('will be implemented soon !');
});

module.exports = router;