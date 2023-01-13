var models = require('../models');

module.exports = {
  get: function (req, res) {
    if (Object.entries(req.query).length) {
      models.messages.getRoom(req.query.roomname, (data) => {
        res.status(200).send(data);
      });
    } else {
      models.messages.getAll((data) => {
        res.status(200).send(data);
      });
    }
  }, // a function which handles a get request for all messages
  post: function (req, res) {
    const { username, text, roomname } = req.body;
    // if the user doesn't exist... then must create new user
    models.users.has(username, (err, hasUser) => {
      if (!hasUser) {
        models.users.create(username, () => console.log('created user'));
      }
      models.messages.create(req.body, () => {
        res.status(201).send('Added message to model.');
      });
    });
  } // a function which handles posting a message to the database
};
