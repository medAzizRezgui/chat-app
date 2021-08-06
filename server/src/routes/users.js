const express = require('express')
const User = require('../models/users')
const auth = require('../middleware/auth')
const router = new express.Router()

// User Register/Sign-up router
router.post('/signup', async (req, res) => {
    const user = new User(req.body)
    
    try {
        const newUser = await user.save()
        const token = await newUser.generateToken()

        res.status(201).send({
            newUser,
            token
        })
    } catch (e) {
        res.status(400).send(e)
    }
})

// User Login router
router.post('/login', async (req, res) => {
    try {
        const user = await User.findCredentials(req.body.email, req.body.password)
        const token = await user.generateToken()

        res.send({
            user,
            token
        })
    } catch (e) {
        res.status(400).send(e)
    }
})

// User logout router
router.post("/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(data => {
            data.token !== req.token
        })

        await req.user.save()
        res.send()
    } catch (e) {
        res.status(400).send(e)
    }
});

// User logout all router
router.post("/logoutall", auth, async (req, res) => {
    try {
        req.user.tokens = []

        await req.user.save();
        res.send();
    } catch (e) {
        res.status(400).send(e);
    }
});

// Fetch the logged in user
router.get('/profile', auth, async (req, res) => {
  res.send(req.user);
});


//Update user information router
router.patch('/profile/update', auth, async (req, res) => {
    const userKeys = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password"];
    const isAllowed = userKeys.every(data => allowedUpdates.includes(data))

    if (!isAllowed) {
        return res.status(400).send({
            errorMessage: 'Invalid Update Field!'
        })
    }

    try {
        userKeys.forEach(data => req.user[data] = req.body[data])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/profile/remove', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send()
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router