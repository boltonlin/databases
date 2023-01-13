var db = require('../db');

module.exports = {
  getRoom: function (roomname, callback) {
    db.query(`
      SELECT messages.id, users.name, text, roomname FROM messages, users
      WHERE messages.user_id=users.id AND messages.roomname='${roomname}'
    `, (err, results) => {
      results = results.map((result) => {
        return { 'message_id': result.id, 'username': result.name, 'text': result.text, 'roomname': result.roomname };
      });
      callback(results);
    });
  },
  getAll: function (callback) {
    db.query(`
      SELECT messages.id, users.name,
      text, roomname FROM messages, users
      WHERE messages.user_id=users.id
    `, (err, results) => {
      results = results.map((result) => {
        return { 'message_id': result.id, 'username': result.name, 'text': result.text, 'roomname': result.roomname };
      });
      callback(results);
    })
  }, // a function which produces all the messages
  create: function ({ username, text, roomname }, callback) {
    db.query(`
      INSERT INTO messages (user_id, text, roomname) VALUES
      (
        (SELECT id FROM users WHERE name='${username}'),
        "${text}",
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
