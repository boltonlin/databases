// TODO: want to make a list of refreshables and add each tab to
// the refreshables which at set intervals will refresh all tabs
var Tabs = {
  _list: {},
  _current: undefined,

  // should go through each tab, refresh the messages,
  refresh: function () {
    for (let key in Tabs._list) {
      App.fetchRoom(key, () => {
        let tab = Tabs._list[key];
        // gather all new messages
        let newMessages =
          Messages.get(key)
                  .filter(message => !message.read)
                  .map(message => {
                    message.read = false;
                    return message;
                  });
        // push those new messages to the individual tabs
        if (newMessages.length &&
            newMessages.length !== tab['unreadCount']) {
          tab['messages'] = tab['messages'].concat(newMessages);
          tab['unreadCount'] = newMessages.length;
          TabsView.markTab(tab['view'], tab['unreadCount']);
        } else Tabs.checkUnreads(tab);
      });
    }
  },

  checkUnreads: function(tab) {
    let counter = 0;
    tab['unreadCount'] = tab['messages'].reduce(
      (unreadCount, message) => {
        if (!message.read) return unreadCount + 1;
        else return unreadCount;
      }, 0)
    if (tab['unreadCount'] === 0)
      TabsView.killBadge(tab['view']);
    return counter;
  },

  // on add store all messages in that value
  // note it stores messages from oldest to newest
  add: function (roomname) {
    Tabs._current = roomname;
    if (!Tabs._list[roomname]) {
      Tabs._list[roomname] = {
        messages: Messages.get(roomname),
        unreadCount: 0
      };
      Tabs._list[roomname]['view'] = TabsView.renderTab(roomname);
    }
  },

  // close tab
  close: function (tabname) {
    delete Tabs._list[tabname];
    // if there are tabs, go to the first remaining tab
    if (!Tabs.isEmpty())
      Rooms.change(Object.keys(Tabs._list)[0])
  },

  // returns all room names that are tabbed
  get: function() {
    return Tabs._list;
  },

  // changes room and sets read true
  // .read and .seen are different
  // .seen tracks render state on automatic refreshes and is reset
  // whenever rooms are changed
  // .read means it has been rendered but is NOT reset whenever
  // rooms are reset
  change: function (tabname) {
    let didRead = false;
    Rooms.change(tabname, ()=>{
      Tabs._current = tabname;
      Tabs.checkUnreads(Tabs._list[tabname]);
    });
  },

  isEmpty: function () {
    if (!Object.keys(Tabs._list).length) return true;
    else return false;
  },

};