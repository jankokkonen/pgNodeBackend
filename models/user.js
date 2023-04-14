const db = require('../util/database');

module.exports = class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static find(email) {
        return db.query(
            'SELECT * FROM users2 WHERE email = $1', [email]
        )
    }

    static save(user) {
        return db.query(
            'INSERT INTO users2 (name, email, password) VALUES ($1, $2, $3)', 
            [user.name, user.email, user.password]
        )
    }
};

