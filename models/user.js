// Ladataan tietokantamoduuli
const db = require('../util/database');

// Määritellään User-luokka
module.exports = class User {

    // Luodaan konstruktori, joka ottaa vastaan käyttäjän nimen, sähköpostin ja salasanan
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // Määritellään staattinen find-metodi, joka hakee käyttäjän tietokannasta sähköpostiosoitteen perusteella
    static find(email) {
        return db.query(
            'SELECT * FROM users2 WHERE email = $1', [email]
        )
    }

    // Määritellään staattinen save-metodi, joka tallentaa käyttäjän tietokantaan
    static async save(user) {
        try {
            // Suoritetaan tietokantakysely, joka laskee käyttäjät, joiden sähköpostiosoite vastaa tallennettavan käyttäjän sähköpostiosoitetta
            const { rows } = await db.query('SELECT COUNT(*) FROM users2 WHERE email = $1', [user.email]);
            const userCount = rows[0].count;

            // Jos käyttäjän sähköpostiosoite on jo käytössä, heitetään poikkeus
            if (userCount > 0) {
                throw new Error('Email already exists');
            } else {
                // Muussa tapauksessa suoritetaan tietokantakysely, joka tallentaa uuden käyttäjän tietokantaan
                const result = await db.query(
                    'INSERT INTO users2 (name, email, password) VALUES ($1, $2, $3)',
                    [user.name, user.email, user.password]
                );
                return result;
            }

        } catch(err) {
            // Jos tapahtuu virhe, tulostetaan se konsoliin ja heitetään se edelleen
            console.error(err);
            throw err;
        }
    }
};
