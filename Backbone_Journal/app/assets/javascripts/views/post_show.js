JournalApp.Views.PostShow = Backbone.View.extend({
  tagName: "article",

  events: {
    "dblclick .post-title": "editTitle",
    "dblclick .post-body": "editBody",
    "blur .post-title-inline-edit": "saveTitle",
    "blur .post-body-inline-edit": "saveBody"
  },

  initialize: function () {
    this.listenTo(this.model, "destroy", this.empty);
    this.listenTo(this.model, "sync", this.render);
    console.log("show", this.model);
  },

  template: JST["post_show"],

  render: function () {
    var content = this.template({post: this.model});
    this.$el.html(content);

    return this;
  },

  empty: function () {
    this.stopListening();
    this.$el.empty();
  },

  editTitle: function (event) {
    var $title = $(event.currentTarget).empty();
    $title.html(JST["post_title_inline_edit"]({post: this.model}));
    $title.find("input").trigger("focus");
  },

  saveTitle: function (event) {
    var newTitle = $(event.currentTarget).val();
    this.model.save({post: {title: newTitle}}, {success:this.render.bind(this)});
  },

  editBody: function (event) {
    var $body = $(event.currentTarget).empty();
    $body.html(JST["post_body_inline_edit"]({post: this.model}));
    $body.find("textarea").trigger("focus");
  },

  saveBody: function (event) {
    var newBody = $(event.currentTarget).val();
    this.model.save({post: {body: newBody}}, {success:this.render.bind(this)});
  }
});
