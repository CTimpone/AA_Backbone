window.Pokedex = (window.Pokedex || {});
window.Pokedex.Models = {};
window.Pokedex.Collections = {};

window.Pokedex.Models.Pokemon = Backbone.Model.extend({
  urlRoot: "/pokemon",

  toys: function () {
    if (this._toys === undefined) {
      this._toys = new Pokedex.Collections.PokemonToys();
    }

    return this._toys;
  },

  parse: function (payload) {
    if (payload.toys !== undefined) {
      this.toys().set(payload.toys);
    }

    delete payload.toys;
    return payload;
  }

});

Pokedex.Models.Toy = Backbone.Model.extend({
  urlRoot: "/toys"
})

window.Pokedex.Collections.Pokemon = Backbone.Collection.extend({
  url: "/pokemon",
  model: Pokedex.Models.Pokemon
});

Pokedex.Collections.PokemonToys = Backbone.Collection.extend({
  model: Pokedex.Models.Toy
})

window.Pokedex.Test = {
  testShow: function (id) {
    var pokemon = new Pokedex.Models.Pokemon({ id: id });
    pokemon.fetch({
      success: function () {
        console.log(pokemon.toJSON());
      }
    });
  },

  testIndex: function () {
    var pokemon = new Pokedex.Collections.Pokemon();
    pokemon.fetch({
      success: function () {
        console.log(pokemon.toJSON());
      }
    });
  }
};

window.Pokedex.RootView = function ($el) {
  this.$el = $el;
  this.pokes = new Pokedex.Collections.Pokemon();
  this.$pokeList = this.$el.find('.pokemon-list');
  this.$pokeDetail = this.$el.find('.pokemon-detail');
  this.$newPoke = this.$el.find('.new-pokemon');
  this.$toyDetail = this.$el.find('.toy-detail');

  this.$pokeList.on(
    "click",
    ".poke-list-item",
    this.selectPokemonFromList.bind(this)
  );

  this.$newPoke.on(
    "submit",
    this.submitPokemonForm.bind(this)
  );

  this.$pokeDetail.on(
    "click",
    ".toys > li",
    this.selectToyFromList.bind(this)
  );

  this.$toyDetail.on(
    "change",
    ".owner-selector",
    this.reassignToy.bind(this)
  );

  this.$pokeDetail.on(
    "click",
    ".destroy",
    this.removePokemon.bind(this)
  );
};

$(function() {
  var $rootEl = $('#pokedex');
	window.Pokedex.rootView = new Pokedex.RootView($rootEl);
  window.Pokedex.rootView.refreshPokemon();
});
