var db = require('../db');

module.exports = {
  has: function (username, callback) {
    db.query(`
      SELECT * FROM users WHERE name='${username}'
    `, (err, results) => {
      if (err) {
        console.log('Error finding user: ', err);
        callback(err, false);
      } else {
        if (results.length === 1) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      }
    });
  },
  getAll: function () {},
  create: function (username, callback) {
    db.query(`
      INSERT INTO users (name) VALUES ('${username}')
    `, (err, results) => {
      if (err) console.log(err);
      else {
        console.log('Inserted into users table.');
        callback();
      }
    });
  }
};
