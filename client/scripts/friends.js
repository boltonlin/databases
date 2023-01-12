// This object houses all the friend _data_ for the app.
// Treat it like a data structure - add methods to interact
// with and manipulate the data.

var Friends = {
  // TODO: Define how you want to store your list of friends.

  _list: {},

  // TODO: Define methods which allow you to add, toggle,
  // and check the friendship status of other users.

  get: function () {
    return Friends._list;
  },

  exists: function (username) {
    if (Object.keys(Friends._list).includes(username))
    return true;
    else return false;
  },

  toggleStatus: function (username) {
    if (!!Friends._list[username]) {
      delete Friends._list[username];
    } else {
      Friends._list[username] = username;
    }
  },

};