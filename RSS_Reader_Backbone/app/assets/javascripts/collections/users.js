NewsReader.Collections.Users = Backbone.Collection.extend({
  model: NewsReader.Models.User,

  url: "api/users"
});
