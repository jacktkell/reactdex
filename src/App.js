import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [pokemonName, setPokemonName] = useState(""); // pokemon name to be typed into search funtion and displayed on page
  const [pokemonChosen, setPokemonChosen] = useState(false); // boolean to return pokemon info or else text promting a pokemon to be chosen
  const [pokemon, setPokemon] = useState({
    num: "",
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  }); // empty info for pokemon to be assigned on fetch request

  // fetch request for pokemon. sets all pokemon info and sets pokemonChosen to true.
  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response) => {
        setPokemon({
          name: pokemonName,
          num: response.data.id,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
        });
        setPokemonChosen(true);
      }
    );
  };

  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Pokemon Stats</h1>
        <input
          type="text"
          onChange={(e) => {
            setPokemonName(e.target.value);
          }}
        />
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className="DisplaySection">
        {!pokemonChosen ? (
          <h1>Please choose a Pokemon</h1>
        ) : (
          <>
            <h1>{pokemon.name.toUpperCase()}</h1>
            <img src={pokemon.img} />
            <h3>
              Species:{" "}
              {pokemon.species.charAt(0).toUpperCase() +
                pokemon.species.slice(1)}
            </h3>{" "}
            {/*capitalizes first letter only*/}
            <h3>Pokedex number: {pokemon.num}</h3>
            <h3>Type: {pokemon.type}</h3>
            <h4>HP: {pokemon.hp}</h4>
            <h4>Attack: {pokemon.attack}</h4>
            <h4>Defense: {pokemon.defense}</h4>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
