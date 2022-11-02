const express = require("express");
const prisma = require("../../prisma/client");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/check", async (req, res) => {

    let newUser = req.session.user;
    delete newUser.passwordHash;

    let data = {
        loggedIn: req.session.loggedIn || false,
        user: req.session.user || null,
    };

    return res.json(data);
});

router.post('/signup', async (req, res) => {
    const { email, password, name } = req.body 

    if (!email || !password || !name) {
        return res.status(400).json({ message: 'Please enter all fields', success: false })
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email
        } 
    })

    if (user) {
        return res.status(400).json({ message: 'User already exists', success: false })
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const newUser = await prisma.user.create({
        data: {
            email: email,
            passwordHash: hash,
            name: name
        }
    })
    .catch(err => {
        console.log(err)
        return res.status(400).json({ message: 'Error creating user', success: false })
    })
let {password, ...userWithoutPassword}  = newUser
    req.session.loggedIn = true;
    req.session.userId = userWithoutPassword;

    return res.status(200).json({ message: 'User created', success: true })
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter all fields', success: false })
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (!user) {
        return res.status(400).json({ message: 'User does not exist', success: false })
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)

    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials', success: false })
    }
let {password, ...userWithoutPassword} = user
    req.session.loggedIn = true;
    req.session.user = userWithoutPassword;

    return res.status(200).json({ message: 'User logged in', success: true })
});

router.post('/logout', async (req, res) => {
    req.session.loggedIn = false;
    req.session.user = null;

    return res.status(200).json({ message: 'User logged out', success: true })
});

module.exports = router;