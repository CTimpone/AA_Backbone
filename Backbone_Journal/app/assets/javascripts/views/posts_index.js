JournalApp.Views.PostsIndex = Backbone.View.extend({
  template: JST["posts_index"],

  initialize: function (options) {
    this.listenTo(this.collection, "remove sync", this.render);
  },

  tagName: 'section',

  render: function () {
    var content = this.template(),
        liView;
    this.$el.html(content);

    var $ul = this.$el.find(".post-list");

    this.collection.each(function(post) {
      liView = new JournalApp.Views.PostsIndexItem({model: post});
      $ul.append(liView.render().$el);
    })

    return this;
  }
});
