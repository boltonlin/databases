// FormView is an object which houses all the message form functionality.
// Consider the provided code and complete the functionality.
// Apply what you learn here to other interactive views if necessary.

var FormView = {

  $form: $('#send'),
  $message: $('#message'),
  $username: $('#send .client-username'),

  initialize: function() {
    //TODO: figure out why submit form button is broken with/without comments
    FormView.$username.text(App.username);
    FormView.$message.attr('placeholder', 'Enter message here');
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function(event) {
    //TODO: want to create a message object with correct username and stuff
    event.preventDefault();
    Messages.post(App.username, FormView.$message.val(), Rooms.get());
    FormView.$message.val('');
    FormView.$message.attr('placeholder', 'Message sent!')
    setTimeout(() => {
      FormView.$message.attr('placeholder', 'Enter message here')
    }, 1000);
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  },

};