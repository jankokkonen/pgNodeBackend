// Otetaan käyttöön express-validator -kirjaston validationResult -funktio
const { validationResult } = require('express-validator');

// Tuodaan User -luokka, joka on määritelty models/user.js -tiedostossa
const User = require('../models/user');

// Tuodaan database.js -tiedostosta db-objekti, joka sisältää yhteyden tietokantaan
const db = require('../util/database');

// Tuodaan bcryptjs -kirjaston hash-funktio salasanan käsittelyä varten
const bcrypt = require('bcryptjs');

// Luodaan signup -kontrollerifunktio
exports.signup = async (req, res, next) => {
    // Validoidaan pyynnön mukana tullut data express-validator -kirjaston avulla
    const errors = validationResult(req)

    // Jos virheitä löytyy, palautetaan virhesanoma 422 -virhekoodilla
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    // Jos virheitä ei ole, puretaan pyynnön mukana tullut data muuttujiin
    const { name, email, password } = req.body;

    try {
        // Hashataan salasana bcryptjs -kirjaston avulla
        const hashedPassword = await bcrypt.hash(password, 12)

        // Luodaan käyttäjätiedot -objekti
        const userDetails = {
            name: name,
            email: email,
            password: hashedPassword
        }

        // Tallennetaan käyttäjä tietokantaan User -luokan save -metodin avulla
        const result = await User.save(userDetails)

        // Palautetaan onnistunut vastaus käyttäjälle
        res.status(201).json({ message: 'User registered!' })
        
    } catch(err) {
        // Jos tulee virhe, palautetaan virhekoodi 500
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
