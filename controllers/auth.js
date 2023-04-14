const { validationResult } = require('express-validator');

const db = require('../util/database').pool;

const User = require('../models/user');

const bcrypt = require('bcryptjs');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(password, 12)

        const userDetails = {
            name: name,
            email: email,
            password: hashedPassword
        }
        // avaa tietokantayhteys
        // await db.connect()
        // console.log('Connected to database');

        const result = await User.save(userDetails)

        // sulje tietokantayhteys
        // await db.end()
        // console.log('Disconnected from database');

        res.status(201).json({ message: 'User registered!' })
        
    } catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

