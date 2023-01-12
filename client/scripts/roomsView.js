// RoomsView is an object which controls the DOM elements
// responsible for displaying and selecting rooms.

var RoomsView = {

  $rooms: $('#rooms'),
  $add: $('#rooms #addRoom'),
  $tab: $('#rooms #keepTabs'),
  $select: $('#rooms select'),

  initialize: function() {
    RoomsView.$add.on('click', RoomsView.handleClick);
    RoomsView.$tab.on('click', RoomsView.handleTab);
    RoomsView.$select.on('change', RoomsView.handleChange);
  },

  render: function() {
    let roomlist = Rooms.getList();
    let renderedRooms = $.map(RoomsView.$select.find($('option')), option => option.value)
    roomlist.forEach(room => {
      if (!renderedRooms.includes(room))
        RoomsView.renderRoom(room);
    });
  },

  // TODO: get shortname to work with tabs too, might have to store
  // shortnames in rooms or smth
  renderRoom: function(roomname) {
    let shortname = roomname.slice(0, 25);
    let template = _.template(
      '<option value="<%- roomname %>"><%- shortname %></option>'
      );
    RoomsView.$select.append(template({
      roomname: roomname,
      shortname: shortname
    }));
  },

  selectRoom: function(roomname) {
    RoomsView.$select.val(roomname);
  },

  handleChange: function(event) {
    Rooms.change(RoomsView.$select.val());
  },

  handleClick: function(event) {
    let roomname = window.prompt('Enter a room name');
    Rooms.add([roomname]);
    RoomsView.renderRoom(roomname);
    RoomsView.$select.val(roomname);
    Rooms.change(roomname);
  },

  // should talk to tabs and add a tab with room name
  handleTab: function(event) {
    Tabs.add(Rooms.get());
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    RoomsView.$add.attr('disabled', status);
    RoomsView.$tab.attr('disabled', status);
  },

};
