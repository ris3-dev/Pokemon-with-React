import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import "./Search.css";

const Search = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [input, setInput] = useState("");

  const fetchPokemons = async() => {
    const response = await fetch('https://pokedex.mimo.dev/api/pokemon')
    const data = await response.json();
    setPokemons(data);
  }
  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    if (input == ""){
      setFilteredPokemons([]);
    }else{
      const filtered = pokemons.filter((pokemon) => 
      pokemon.name.toLowerCase().startsWith(input.toLowerCase()),
      );
      setFilteredPokemons(filtered);
    }
  }, [input, pokemons]);

  return (
    <>
   <h1>Search a Pokémon</h1>
    
    <input placeholder="Enter Pokemon name..." 
    value= {input} onChange={(e) => setInput(e.target.value)}/>

   <ul>
   {filteredPokemons.map((pokemon) => (
    <PokemonCard key={pokemon.name} pokemon={pokemon}/>
   ))}
   </ul>
   </>
  );
};

export default Search;