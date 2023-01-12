// This object houses all the room _data_ for the app.
// Treat it like a data structure - add methods to interact
// with and manipulate the data.

var Rooms = {

  _list: {},
  _current: 'lobby',

  add: function (data) {
    data.map(message => message.roomname)
        .forEach((room) => {
          if (!!room)
            Rooms._list[room] = room;
          });
  },

  get: function () {
    return Rooms._current;
  },

  getList: function() {
    return Object.values(Rooms._list);
  },

  set: function (roomname) {
    Rooms._current = roomname;
    RoomsView.selectRoom(roomname);
  },

  // sets _current then asks the app to refresh
  change: function (roomname, callback = ()=>{}) {
    Rooms.set(roomname);
    App.startSpinner();
    App.fetchRoom(roomname, ()=>{
      MessagesView.render();
      callback();
      App.stopSpinner();
    });
  },

  exists: function (roomname) {
    if (Rooms._list[roomname]) return true;
    else return false;
  },

};