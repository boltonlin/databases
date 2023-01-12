var TabsView = {

  $tablist: $('#tablist'),

  renderTab: function(tab) {
    let tabTemplate = _.template(`
      <button class="tab" value="<%- tab %>"><%- tab %>
      <i class="fa-solid fa-xmark"></i></button>
    `);
    let $tab = $(tabTemplate({tab: tab}));
    $tab.on('click', null, tab, TabsView.handleClick);
    TabsView.$tablist.append($tab);
    return $tab;
  },

  markTab: function ($tab, count) {
    let badgeTemplate = _.template(`
      <span class="tab__badge"><%= count %></span>
    `);
    $tab.append(badgeTemplate({count: count}));
  },

  killBadge: function ($tab) {
    $tab.find('.tab__badge').remove();
  },

  handleClick: function (event) {
    let tabName = event.target.value ? event.target.value : event.data;
    let tabSelector = TabsView.$tablist.find(`[value="${tabName}"]`);
    if (!!event.target.value) {
      if (TabsView.$tablist.val() !== event.target.value) {
        // untoggle all other tabs
        let otherTabs = TabsView.$tablist.children();
        for (let otherTab of otherTabs) {
          if ($(otherTab).attr('class').includes('selected'))
            $(otherTab).toggleClass('selected');
        }
        $(this).toggleClass('selected');
        TabsView.$tablist.val(tabName);
        Tabs.change(tabName);
      }
    } else TabsView.handleClose(tabName, tabSelector)
  },

  handleClose: function (tabname, selector) {
    Tabs.close(tabname);
    selector.remove();
  },

};