import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading]=useState(true);
  const [error, setError] = useState(null);
  const query = new URLSearchParams(useLocation().search);
  const pokemonName = query.get("name");

  useEffect(() => {
    const fetchPokemon = async () => {
      if (!pokemonName) return;

      try{
        const response = await fetch(
        `https://pokedex.mimo.dev/api/pokemon/${pokemonName}`,
      );
      if(!response.ok) throw new Error("Pokemon not found");

      const data = await response.json();
      setPokemon(data);
      setError(null);
    } catch(err) {
      setPokemon(null);
      setError(err.message);
    } finally {
      setLoading(false);
    };
    };

    fetchPokemon();
  }, [pokemonName]);

  return (
    <>
    {loading && <p>Loading...</p>}
    {error && <p>Error</p>}

      {pokemon && (
        <div>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Abilities: {pokemon.abilities.map(ability => ability.ability.name).join(",")}</p>
        </div>
      )}
    </>
  );
};


export default Pokemon;