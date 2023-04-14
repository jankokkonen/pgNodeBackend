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

    static async save(user) {
        try {

          const { rows } = await db.query('SELECT COUNT(*) FROM users2 WHERE email = $1', [user.email]);
          const userCount = rows[0].count;
          
          if (userCount > 0) {
            throw new Error('Email already exists');

          } else {
            const result = await db.query(
              'INSERT INTO users2 (name, email, password) VALUES ($1, $2, $3)', 
              [user.name, user.email, user.password]
            );
            return result;
          }
          
        } catch(err) {
          console.error(err);
          throw err;
        }
      }
};

