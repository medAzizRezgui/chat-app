const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')

// User Schema model 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        unique: true,
        minLength: 7,
        validator(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Invalid Password')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

// To hide specific properties (like password, tokens, etc..) on response
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

// Function for generating a token using the User Id
userSchema.methods.generateToken = async function () {
    const user = this
    
    const token = jwt.sign({ _id: user._id.toString() }, 'testkey')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    
    return token
}

// Login function
userSchema.statics.findCredentials = async (email, password) => {
    const user = await userModel.findOne({ email });
    
    if (!user) {
        throw new Error('Unable to Login')
    }

    const isFound = await bcrypt.compare(password, user.password)

    if (!isFound) {
        throw new Error('Invalid Password')
    }

    return user
}

// Pre hook for saving and encrypting passport before saving to DB
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const userModel = new mongoose.model('Users', userSchema)


module.exports = userModel