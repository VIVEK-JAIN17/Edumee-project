exports.isLoggedin = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login');
};

exports.verifyUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/dashboard');
    }
    return next();
};