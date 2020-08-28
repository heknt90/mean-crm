const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')


module.exports.login = async function(req, res) {
    // check email and password
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        // User exist
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            // Generate token. Password right
            const token = jwt.sign({
                email: candidate.email,
                id: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60} )

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            // Password wrong
            res.status(401).json({
                "message": "Вы указали неправильный пароль."
            })
        }
        
    } else {
        // error
        res.status(404).json({
            "message": "Пользователь с таким email'ом не найден."
        })
    }
}

module.exports.register = async function(req, res) {
    // email password
    // find email
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        // User exist -> should return error
        res.status(409).json({
            "message": "Такой email уже используется"
        })
    } else {
        // User doesnt exist -> create new User
        // encode password
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
        })

        try {
            await user.save()
            res.status(201).json(user)
        }
        catch(error) {

        }
    }
}