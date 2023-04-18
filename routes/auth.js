// Ladataan Express-moduuli
const express = require('express');

// Ladataan body-parser-moduuli, joka auttaa käsittelemään HTTP-pyyntöjä
const { body } = require('express-validator');

// Luodaan Express-reititin
const router = express.Router();

// Ladataan User-malli, joka kuvaa käyttäjän tietoja tietokannassa
const User = require('../models/user');

// Ladataan authController-moduuli, joka käsittelee käyttäjän todennusta liittyviä HTTP-pyyntöjä
const authController = require('../controllers/auth');

// Asetetaan reititin, joka käyttää HTTP POST -pyyntöä polulle '/signup'
router.post(
    '/signup',
    [
        // Määritellään tarkistus sille, että käyttäjänimi ei ole tyhjä
        body('name')
            .trim()
            .not()
            .isEmpty(),

        // Määritellään tarkistus sille, että sähköpostiosoite on oikeassa muodossa
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .normalizeEmail(),

        // Määritellään tarkistus sille, että salasana on vähintään 7 merkkiä pitkä
        body('password')
            .trim()
            .isLength({ min: 7 })
    ],
    authController.signup
);

// Viedään reititin moduulin käyttöön
module.exports = router;
