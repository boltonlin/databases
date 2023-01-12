// NavView is an object which controls the DOM elements
// responsible for displaying and selecting the nav links.

var NavView = {

  $nav: $('.nav'),
  $normal: $('#normal'),
  $following: $('#following'),
  $liked: $('#liked'),
  $stats: $('#stats'),
  $allButtons: Array.from($('.nav-item a')),
  _status: 'active',

  initialize: function() {
    NavView.setActive(NavView.$normal);
    NavView.$nav.on('click', NavView.handleClick);
    NavView.$nav.on('change', NavView.handleChange);
  },

  setActive: function($button) {
    NavView.$allButtons.forEach(
      button => $(button).removeClass('active')
    );
    $button.addClass('active');
    NavView.setNavVal($button);
  },

  setNavVal: function($button) {
    NavView.$nav.val($button.attr('id'));
  },

  handleClick: function(event) {
    if (NavView.$nav.val() !== $(event.target).attr('id')) {
      NavView.setActive($(event.target));
      NavView.$nav.change();
    }
  },

  handleChange: function() {
    switch (NavView.$nav.val()) {
      case 'following':
      case 'liked':
      case 'stats':
        App.pauseTimer();
        RoomsView.$rooms.fadeOut('fast');
        TabsView.$tablist.fadeOut('fast');
        MessagesView.clear();
        switch (NavView.$nav.val()) {
          case 'following':
            for (let room of Rooms.getList()) {
              App.startSpinner();
              App.fetchRoom(room, ()=>{
                App.stopSpinner();
                MessagesView.render(message =>
                  Friends.exists(message.username), 'fr');
              });
            }
            break;
          case 'liked':
            MessagesView.render(message =>
              message.liked, 'rl');
            break;
          case 'stats':
            break;
        }
        break;
      case 'normal':
        RoomsView.$rooms.fadeIn('fast');
        TabsView.$tablist.fadeIn('fast');
        MessagesView.render();
        App.startTimer();
        break;
    }
  },

  toggleStatus: function() {
    let status = NavView._status === 'active' ? true : false;
    if (status) {
      NavView.$allButtons.forEach(
        button => $(button).addClass('disabled')
      );
      NavView.$nav.off('click');
      NavView.$nav.off('change');
      NavView._status = 'inactive';
    } else {
      NavView.$allButtons.forEach(
        button => $(button).removeClass('disabled')
      );
      NavView.$nav.on('click', NavView.handleClick);
      NavView.$nav.on('change', NavView.handleChange);
      NavView._status = 'active';
    }
  },

}