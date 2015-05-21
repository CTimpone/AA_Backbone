JournalApp.Views.PostForm = Backbone.View.extend({
  events: {
    "submit .new-post": "handleSubmission"
  },

  tagName: "section",

  template: JST["post_form"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function () {
    var content = this.template({post: this.model, errors: this.errors});
    this.$el.html(content);
    return this;
  },

  handleSubmission: function (event) {
    event.preventDefault();
    var data = $(event.currentTarget).serializeJSON();
    var addToCollection = !this.model.id;
    this.model.save(data, {
      success: function () {
        this.errors = null;
        addToCollection && this.collection.add(this.model, {merge: true});
        Backbone.history.navigate(
          "#posts/" + this.model.id,
           {trigger: true}
        );
      }.bind(this),
      error: function (model, response, options) {
        this.errors = response.responseJSON;
        this.render();
      }.bind(this)
    });
  }
});
