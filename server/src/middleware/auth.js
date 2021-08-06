const User = require('../models/users')
const jwt = require('jsonwebtoken')

// Authentication Middleware
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'testkey')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        
        if (!user) {
            throw new Error()
        }

        req.user = user
        req.token = token

        next()
    } catch (e) {
        res.status(400).send({
            errroMessage: 'Please Authenticate'
        })
    }
}

module.exports = auth