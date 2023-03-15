
class Model {
  constructor() {
    this.pokemonData = [];
  }
  addPokemon(pokeName) {
    this.pokemonData.push(pokeName);
    this.onChangeHandler(this.pokemonData)
  }

  assignModelChangedHandler(handler) {
    this.onChangeHandler = handler;
  }
};

class View {
  constructor() {

    this.app = this.getElement('#root')

    this.title = this.createElement('h1')
    this.title.textContent = 'Pokemon Searcher!'

    this.form = this.createElement('form')
    this.input = this.createElement('input')
    this.input.type = 'text'
    this.input.placeholder = 'Search for pokemon'
    this.input.name = 'pokedex'

    this.submitButton = this.createElement('button')
    this.submitButton.textContent = 'Search!'

    this.pokemonList = this.createElement('div', 'pokemon-view')

    this.form.append(this.input, this.submitButton)

    this.app.append(this.title, this.form, this.pokemonList)
  }

  createElement(tag, className) {
    const e = document.createElement(tag, className);
    if (className) {
      e.classList.add(className);
    }
    return e;
  }

  getElement(tag) {
    const e = document.querySelector(tag);
    return e;
  }
  
  get _getPokemonForSearch() {
    return this.input.value;
  }

  assignPokemonSearchHandler(element, eventType, handler) {
    element.addEventListener(eventType.toString(), event => {
      event.preventDefault();
      handler(this._getPokemonForSearch);
    })
  }

  displayPokemon(pokemonData) {
      if (pokemonData.length > 0) {
        const pokemonToShow = pokemonData[pokemonData.length - 1];
        console.log(pokemonToShow.sprites)
        const img = this.createElement('img');
        img.src = pokemonToShow.sprites.front_default;
        this.pokemonList.appendChild(img);
      }
    }
};

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.assignPokemonSearchHandler(this.view.submitButton, 'click', this.handleSearchForPokemon)
    this.model.assignModelChangedHandler(this.handlePokemonSearched)
    this.handlePokemonSearched(this.model.pokemonData);
  }

  handleSearchForPokemon = async (name) => {
    const s = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const response = await fetch(s);
    const pokemon = await response.json(); //extract JSON from the http response
    this.model.addPokemon(pokemon);

  }
  handlePokemonSearched = (pokemonData) => {
    this.view.displayPokemon(pokemonData)
  }
};


const app = new Controller(new Model(), new View())
