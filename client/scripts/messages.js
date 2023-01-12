// This object houses all the message _data_ for the app.
// Treat it like a data structure - add methods to interact
// with and manipulate the data.

var Messages = {

  _list: {},
  _size: 0,

  add: function (messages) {
    messages.forEach((message) => {
      if (Messages.isValid(message)) {
        Messages._list[message.message_id] = message;
        Messages._size++;
      }
    });
  },

  // returns singular message if id is passed
  // otherwise an array of messages belonging to a roomname
  // TODO: see if get case for roomname can be factored out since render
  // now allows filtering by room
  get: function (identifier) {
    if (Messages._list[identifier]) {
      return Messages._list[identifier];
    } else {
      let roomname = identifier;
      if (!!roomname) {
        return Object.values(Messages._list)
                     .filter(message => message.roomname === roomname);
      } else return Object.values(Messages._list);
    }

  },

  isValid: function(message) {
    if (!Messages._list[message.message_id] &&
        !(message.username === null ||
        message.text === null ||
        message.roomname === null)) {
      return true;
    }
    else return false;
  },

  post: function (username, text, roomname) {
    let message = {
      username: username,
      text: text,
      roomname: roomname
    }
    App.startSpinner();
    Parse.create(message, () => {
      App.refresh(() => {
        MessagesView.render();
        App.stopSpinner();
      });
    });
  },

  refreshSeen: function () {
    for (let id in Messages._list)
      Messages._list[id].seen = false;
  },

  checkMentions: function () {
    let counter = 0;
    let regex = new RegExp(`(^|\\s)\\@(${App.username})(\\s|$)`, 'g');
    let unreadMessages =
      Messages.get()
              .filter(message => !message.read);
    let str = '';
    unreadMessages.forEach((message, index) => {
      if (!!message.text.match(regex) && !message.notified) {
        if (counter > 0) str = str.concat('\n');
        str = str.concat('You were mentioned by ' + message.username + ' in room ' + message.roomname + '!');
        message.notified = true;
        message.mention = true;
        counter++;
      }
    });
    if (counter)
      window.alert(str);
  },

};