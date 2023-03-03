const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");
const User = require('../models/User.model');
const isAuthenticated = require('../middlewares/isAuthenticated');


router.post('/signup', async (req, res, next) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const salt = bcrypt.genSaltSync(13);
        const passwordHash = bcrypt.hashSync(req.body.password, salt);
        if (email === '' || passwordHash === '' || username === ''){
            res.status(400).json({ errorMessage: "Provide username, email and password" });
            return;
        }
        if (!emailRegex.test(email)) {
            res.status(400).json({ message: 'Provide a valid email address.' });
            return;
        }
        await User.create({ username: username, passwordHash: passwordHash, email: email });
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.log("Error signing up: ", error);
    }
})

router.post('/login', async (req, res, next) => {
    const username = req.body.username;

    try {
        const foundUser = await User.find({ username: username });
        if (foundUser.length) {
            if (bcrypt.compareSync(req.body.password, foundUser[0].passwordHash)) {

                const authToken = jwt.sign(
                    {
                        expiresIn: '6h',
                        user: foundUser[0] // Put yhe data of your user in there
                    },
                    process.env.TOKEN_SECRET,
                    {
                        algorithm: 'HS256',
                    }
                )
                res.status(200).json({ token: authToken });
            } else {
                res.status(403).json('Password incorrect')
            }
        } else {
            res.status(404).json('User not found')
        }
    } catch (error) {
        console.log("Error finding user: ", error);
    }
})

router.post('/verify', isAuthenticated, (req, res, next) => {
    if (req.payload) {
        console.log("PAYLOAD: ", req.payload);
        res.json(req.payload.user);
    }
})

module.exports = router