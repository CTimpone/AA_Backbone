JournalApp.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "postsIndex",
    "posts/new": "postNew",
    "posts/:id": "postShow",
    "posts/:id/edit": "postEdit"
  },

  initialize: function ($el) {
    this.$el = $el;
    this._posts = new JournalApp.Collections.Posts();
    console.log(this._posts)
    this._posts.fetch();
    this.$detail = this.$el.find('.detail');
    this.postsIndex();
  },

  postsIndex: function () {
    this.indexView = new JournalApp.Views.PostsIndex({collection: this._posts});
    this.$el.find('.sidebar').html(this.indexView.render().$el);
  },

  postShow: function (id) {
    this.postView =
        new JournalApp.Views.PostShow({model: this._posts.getOrFetch(id)});
    this.$detail.html(this.postView.render().$el);
  },

  postEdit: function (id) {
    this.postView = new JournalApp.Views.PostForm({model: this._posts.getOrFetch(id)});
    this.$detail.html(this.postView.$el);
  },

  postNew: function () {
    var post = new JournalApp.Models.Post();
    this.postView = new JournalApp.Views.PostForm({
      model: post,
      collection: this._posts
    });
    this.$detail.html(this.postView.render().$el);
  }
});
