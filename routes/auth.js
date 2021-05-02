const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = require('../middleware/auth');

router.get('/login', auth.verifyUser, (req, res) => {
    res.render('login');
});

router.get('/google', auth.verifyUser, passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login'
}), (req, res) => {
    res.redirect('/dashboard');
});

router.get('/logout', auth.isLoggedin, (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;