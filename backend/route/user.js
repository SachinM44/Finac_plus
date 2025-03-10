const express = require('express');
const router = express.Router();
const { RegistrationInput, LoginInput, UpdateInput } = require("@finacplus1/common");
const { User } = require('../db/db');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const middleware = require('../config/middleware');
const { JWT_SECRET } = process.env;

router.post('/register', async (req, res) => {
    const { success, error } = RegistrationInput.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            msg: "Invalid input",
            error: error.errors
        });
    }

    await User.create({
        name: req.body.name,
        age: req.body.age,
        dateOfBirth: req.body.dateOfBirth,
        password: req.body.password,
        gender: req.body.gender,
        about: req.body.about
    });

    res.status(201).json({
        msg: "User registered successfully"
    });
});

router.post('/login', async (req, res) => {
    const { success, error } = LoginInput.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            msg: "Invalid input",
            error: error.errors
        });
    }
    const user = await User.findOne({ name: req.body.name });
    if (user && user.password === req.body.password) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        return res.json({ token: token });
    }
    res.status(401).json({
        msg: "Invalid name or password"
    });
});

router.get('/profile', middleware, async (req, res) => {
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json({
            msg: "User not found"
        });
    }
    res.status(200).json(user);
});

router.put('/update', middleware, async (req, res) => {
    const { success, error } = UpdateInput.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            msg: "Invalid input",
            error: error.errors
        });
    }

    const updatedUser = await User.findByIdAndUpdate(req.userId, {
        name: req.body.name,
        age: req.body.age,
        dateOfBirth: req.body.dateOfBirth,
        password: req.body.password,
        gender: req.body.gender,
        about: req.body.about
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

router.delete('/delete', middleware, async (req, res) => {
    const userId = req.userId;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
        return res.status(404).json({
            msg: "User not found"
        });
    }

    res.status(200).json({
        msg: "User deleted successfully"
    });
});

module.exports = router;