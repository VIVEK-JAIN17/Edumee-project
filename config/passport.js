const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = (passport) => {

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            const { id, displayName, name: { givenName, familyName }, photos: [{ value }] = "" } = profile;
            const user = {
                googleId: id,
                displayname: displayName,
                firstname: givenName,
                lastname: familyName,
                image: value
            };
            try {
                let existingUser = await User.findOne({ googleId: id });
                if (existingUser) {
                    done(null, existingUser);
                } else {
                    let newUser = await User.create(user);
                    done(null, newUser);
                }
            } catch (err) {
                console.error(err);
            }
        }
    ));

    // Serialize user
    passport.serializeUser((user, done) => done(null, user.id));

    // Deserialize user 
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
}