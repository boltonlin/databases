var models = require('../models');

module.exports = {
  get: function (req, res) {
    models.messages.getAll((data) => {
      res.status(200).send(data);
    })
  }, // a function which handles a get request for all messages
  post: function (req, res) {
    models.messages.create(req.body, () => {
      res.status(201).send('Added message to model.');
    });
  } // a function which handles posting a message to the database
};
