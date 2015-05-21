JournalApp.Collections.Posts = Backbone.Collection.extend({
  url: "/posts",
  model: JournalApp.Models.Post,

  getOrFetch: function (id, options) {
    var post = this.get(id),
        addPost = false;
    options = options || {};
    if (!post) {
      post = new this.model({id: id});
      this.add(post);
      addPost = true;
    }

    post.fetch({
      success: function () {
        // debugger
        if (addPost) {
          this.add(post, {merge: true});
        }
        options.success && options.success();
      }.bind(this)
    });

    return post;
  }
});
