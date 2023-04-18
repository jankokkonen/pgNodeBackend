// Luodaan funktio, joka kutsutaan, jos pyydettyä polkua ei löydy
exports.get404 = (req, res, next) => {
    const error = new Error('Not found');
    error.statusCode = 404; // Asetetaan virhekoodi
    next(error); // Siirrytään error middlewareen
}

// Luodaan funktio, joka käsittelee mahdolliset virheet sovelluksen sisällä
exports.get500 = (error, req, res, next) => {
    const data = error.data; // Otetaan talteen mahdollinen lisätieto virheestä
    res.status(error.statusCode || 500); // Asetetaan virhekoodi, joko virheen statusCode-kentästä tai oletuksena 500
    res.json({
        error: {
            message: error.message, // Otetaan talteen virheen viesti
            data: data // Lähetetään mahdollinen lisätieto virheestä vastauksessa
        },
    })
}
