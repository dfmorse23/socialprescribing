const express = require("express");
const prisma = require("../../prisma/client");

const router = express.Router();

router.get("/check", async (req, res) => {
    let data = {}
    data.loggedIn = req.session.loggedIn;

    return res.json(data);
});

router.post('/signup', async (req, res) => {
    const { email, password } = req.body 

    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter all fields', success: false })
    }

    req.session.loggedIn = true;

    return res.status(200).json({ message: 'User created', success: true })
});

router.post('/logout', async (req, res) => {
    req.session.loggedIn = false;

    return res.status(200).json({ message: 'User logged out', success: true })
});

module.exports = router;