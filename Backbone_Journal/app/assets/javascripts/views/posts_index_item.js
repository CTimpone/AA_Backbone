JournalApp.Views.PostsIndexItem = Backbone.View.extend({
  events: {
    "click .destroy": "deleteModel"
  },

  initialize: function () {
    this.listenTo(this.model, "change:title", this.render);
    if (this.model.id === 14) console.log("listItem", this.model);
  },

  template: JST["posts_index_item"],

  tagName: "li",

  className: "posts-list-item",

  render: function () {
    var content = this.template({post: this.model});
    this.$el.html(content);
    console.log("new title")

    return this;
  },

  deleteModel: function () {
    this.model.destroy();
  }
});
