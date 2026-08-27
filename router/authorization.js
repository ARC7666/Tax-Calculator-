const express = require("express");
require('dotenv').config();
const user = require("../database/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const router = express.Router();

// --- Google OAuth Setup ---
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Check if user already exists
            let existingUser = await user.findOne({ email: profile.emails[0].value });
            if (existingUser) {
                // If exists but doesn't have googleId, attach it
                if (!existingUser.googleId) {
                    existingUser.googleId = profile.id;
                    await existingUser.save();
                }
                return done(null, existingUser);
            }
            
            // If completely new user, create them
            const newUser = await user.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id
            });
            done(null, newUser);
        } catch (err) {
            done(err, null);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const foundUser = await user.findById(id);
            done(null, foundUser);
        } catch (err) {
            done(err, null);
        }
    });
}

// Google Auth Routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", 
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        // Successful authentication, generate JWT
        let token = jwt.sign({
            name: req.user.name,
            email: req.user.email,
            role: "user"
        }, process.env.JWT_SECRET || 'secret', { expiresIn: '2h' });

        // Set token as a cookie or redirect with it
        res.cookie('token', token);
        res.redirect("/income"); 
    }
);


// --- Standard Auth Routes ---
router.post("/signup", async (req, res) => {
    const { fullname, email, phonenumber, password } = req.body;

    if (!fullname || !email || !phonenumber || !password) {
        return res.status(422).json({ message: "Please enter all the values" });
    }

    try {
        const existingUser = await user.findOne({ 
            $or: [{ email: email }, { mobile: phonenumber }]
        });

        if (existingUser) {
            return res.status(400).json({ msg: "Credentials already used" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await user.create({
            name: fullname,
            email: email,
            mobile: phonenumber,
            password: hashedPassword
        });

        let token = jwt.sign({
            name: fullname,
            email: email,
            mobile: phonenumber,
            role: "user"
        }, process.env.JWT_SECRET || 'secret', { expiresIn: '2h' });

        return res.status(201).header("token", token).json({ msg: "Signup successful" });
    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});

router.put("/login", async (req, res) => {
    try {
        const { emailormobile, password } = req.body;

        if (!emailormobile || !password) {
            return res.status(400).json({ msg: "Email/Mobile and Password are required" });
        }

        let query = (emailormobile.indexOf('@') === -1) 
            ? { mobile: emailormobile } 
            : { email: emailormobile };

        const checkuser = await user.findOne(query);

        if (!checkuser || !checkuser.password) {
            return res.status(404).json({ msg: "User does not exist or uses Google Login" });
        }

        const isPasswordValid = await bcrypt.compare(password, checkuser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: "Invalid password" });
        }

        let token = jwt.sign({
            name: checkuser.name,
            email: checkuser.email,
            mobile: checkuser.mobile,
            role: "user"
        }, process.env.JWT_SECRET || 'secret', { expiresIn: '2h' });
        
        res.header("token", token).json({
            name: checkuser.name,
            email: checkuser.email,
            mobile: checkuser.mobile
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

module.exports = router;
