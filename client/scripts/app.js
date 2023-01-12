// This App object represents the Chatterbox application.
// It should initialize the other parts of the application
// and begin making requests to the Parse API for data.

var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',

  handler: null,

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();
    NavView.initialize();

    App.startSpinner();
    App.fetch(()=>{
      RoomsView.render();
      Rooms.set('lobby');
      App.fetchRoom(Rooms.get(), ()=>{
        Messages.checkMentions();
        MessagesView.render();
        App.stopSpinner();
        App.startTimer();
      });
    });
  },

  startTimer: function () {
    App.handler = setInterval(()=>{
      App.startSpinner();
      App.refresh(App.stopSpinner);
    }, 10000);
  },

  pauseTimer: function () {
    clearInterval(App.handler);
    App.handler = null;
  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      Messages.add(data);
      Rooms.add(data);
      callback();
    });
  },

  // should fetch messages only for selected room
  fetchRoom: function (roomname, callback = ()=>{}) {
    Parse.readRoom(roomname, (data) => {
      Messages.add(data);
      callback();
    });
  },

  refresh: function (callback = ()=>{}) {
    App.fetch(()=>{
      RoomsView.render();
      App.fetchRoom(Rooms.get(), ()=>{
        MessagesView.render();
        Tabs.refresh();
        Messages.checkMentions();
        callback();
      });
    });
  },

  startSpinner: function() {
    App.$spinner.show();
    RoomsView.setStatus(true);
    FormView.setStatus(true);
    NavView.toggleStatus();
    let tablist = Tabs.get()
    for(let tab in tablist)
      tablist[tab]['view'].off('click');
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    RoomsView.setStatus(false);
    FormView.setStatus(false);
    NavView.toggleStatus();
    let tablist = Tabs.get()
    for(let tab in tablist)
      tablist[tab]['view'].on('click', null, tab, TabsView.handleClick);
  },

  clean: _.template('<%- input %>'),

};
