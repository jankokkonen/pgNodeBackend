// Ladataan Express-moduuli
const express = require('express');

// Ladataan body-parser-moduuli, joka auttaa käsittelemään HTTP-pyyntöjä
const bodyParser = require('body-parser');

// Ladataan authRoutes-moduuli, joka käsittelee käyttäjän todennusta liittyviä HTTP-pyyntöjä
const authRoutes = require('./routes/auth');

// Ladataan errorController-moduuli, joka käsittelee virheellisiä HTTP-pyyntöjä
const errorController = require('./controllers/error');

// Luodaan Express-sovellus
const app = express();

// Määritetään sovelluksen portti (tai käytetään oletusarvoa 3000)
const ports = process.env.PORT || 3000;

// Käytetään body-parseria käsittelemään JSON-pyyntöjä
app.use(bodyParser.json());

// Asetetaan vastausotsikot, jotta selain voi lähettää HTTP-pyynnöt sovellukseen
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

// Määritellään tietokannan yhteysolio
const pool = require('./util/database');

// Testataan tietokannan yhteys
pool.connect((err, client, done) => {
  if (err) throw err;
  console.log('Connected to database');
});

// Asetetaan polku käyttäjän todennukseen liittyville HTTP-pyynnöille
app.use('/auth', authRoutes);

// Asetetaan polku virheellisille HTTP-pyynnöille
app.use(errorController.get404);

// Asetetaan polku sisäisille virheille
app.use(errorController.get500);

// Käynnistetään sovellus määritetyllä portilla
app.listen(ports, () => console.log(`listening on port ${ports}`));
