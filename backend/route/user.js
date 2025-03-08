const express = require('express');
const router = express.Router();
const { RegistrationInput, LoginInput, UpdateInput } = require("@finacplus1/common");
const { User } = require('../db/db');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require('dotenv').config();
const middleware = require('../config/middleware');
const { JWT_SECRET } = process.env;

router.post('/register', async (req, res) => {
    const { success } = RegistrationInput.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            msg: "Invalid input",
            
        });
    }
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        return res.status(409).json({
               msg: "Email is already being used trywith another email-id"
        })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword
    })

    res.status(201).json({
        msg: "User registered successfully"
    });
});

router.post('/login', async (req, res) => {
    const { success } = LoginInput.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            msg: "Invalid input",
            
        });
    }
    const user = await User.findOne({
        email: req.body.email
    })
    if (user) {
        const passwordValidation = await bcrypt.compare(req.body.password, user.password);
        if (passwordValidation) {
            const token = jwt.sign({
                userId: user._id
            }, JWT_SECRET);
            return res.json({
                token: token
            });
        }
    }
    res.status(401).json({
        msg: "Invalid email or password"
    })
});

router.put('/update', middleware, async (req, res) => {
    const { success } = UpdateInput.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            msg: "Invalid input",
            
        });
    }

    
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser && existingUser._id.toString() !== req.userId) {
        return res.status(409).json({
            msg: "Email is already being used, try with another email-id"
        });
    }

         const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const updatedUser = await User.findByIdAndUpdate(req.userId, {
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword
    }, { new: true });

    if (!updatedUser) {
        return res.status(404).json({
            msg: "User not found"
        });
    }

    res.status(200).json({
        msg: "User updated successfully",
        user: updatedUser
    });
});

module.exports = router;
