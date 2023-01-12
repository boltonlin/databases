var db = require('../db');

module.exports = {
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
