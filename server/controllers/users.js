var models = require('../models');

module.exports = {
  get: function (req, res) {},
  post: function (req, res) {
    const { username } = req.body;
    models.users.create(username, () => {
      res.status(201).send(`Added ${username} to model.`);
    });
  }
};
