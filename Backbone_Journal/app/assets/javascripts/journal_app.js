window.JournalApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {}
};

$(function () {
  window.JournalApp.router =
      new JournalApp.Routers.AppRouter($('body'));
  Backbone.history.start();
});
