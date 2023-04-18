const { Pool } = require('pg'); // Otetaan käyttöön Pool-olio PostgreSQL-tietokantaan yhteyden muodostamista varten

const config = require('../config/config.json'); // Otetaan käyttöön tietokannan konfiguraatiotiedosto

const pool = new Pool({ // Luodaan uusi tietokantayhteysolio
    host: config.host, // Tietokantapalvelimen osoite
    user: config.user, // Tietokannan käyttäjänimi
    database: config.database, // Tietokannan nimi
    password: config.password // Tietokannan käyttäjän salasana
});

pool.query("SELECT 1", (err, results) => { // Testataan tietokantayhteyttä suorittamalla yksinkertainen SQL-kysely
    if (err) { // Jos virhe tapahtuu
      console.error(err); // Tulostetaan virheilmoitus konsoliin
      console.log("Database connection unsuccessful"); // Tulostetaan ilmoitus, että yhteys tietokantaan ei onnistunut
    } else { // Jos yhteyden muodostus onnistuu
      console.log("Database connection successful"); // Tulostetaan ilmoitus, että yhteys tietokantaan onnistui
    }
});

module.exports = pool; // Viedään tietokantayhteysolio moduulin ulkopuolelle käytettäväksi muualla sovelluksessa
