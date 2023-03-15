import "./App.css";
import Header from "./components/Header";
import InputAndSearch from "./components/InputAndSearch";
import Pokemon from "./components/Pokemon";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
export default function App() {
  const [pokemonList, setPokemons] = useState([]);

  const searchForPokemon = async (name) => {
    const s = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const response = await fetch(s);
    const pokemon = await response.json(); //extract JSON from the http response

    const img = pokemon.sprites.front_default;
    const id = uuidv4();//pokemon.id;

    let _pokemonList = pokemonList.concat({ img, id });
    setPokemons(_pokemonList);
  };

  return (
    <div className="App">
      <Header />
      <InputAndSearch onButtonClick={searchForPokemon}/>
      <div>
        {pokemonList.map((pok) => (
          <Pokemon key={pok.id} image={pok.img} />
        ))}
      </div>
    </div>
  );
}
