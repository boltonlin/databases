var db = require('../db');

module.exports = {
  getAll: function (callback) {
    db.query(`
      SELECT text, roomname FROM messages
    `, (err, results) => {
      console.log('getAll errors: ', err);
      console.log('getAll results: ', results);
      callback(results);
    })
  }, // a function which produces all the messages
  create: function ({ username, message, roomname }, callback) {
    db.query(`
      INSERT INTO messages (user_id, text, roomname) VALUES
      (
        (SELECT id FROM users WHERE name='${username}'),
        "${message}",
        "${roomname}"
      )
    `, (err, results) => {
      if (err) console.log(err);
      else {
        console.log('Inserted message to db.');
        callback();
      }
    })
  } // a function which can be used to insert a message into the database
};
