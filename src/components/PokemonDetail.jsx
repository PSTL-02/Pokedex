// PokemonDetail.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../App.css';



const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => setPokemon(response.data));
  }, [id]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div className="pokemon-detail">
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Number: {pokemon.id}</p>
      <p>Type: {pokemon.types.map(type => type.type.name).join(', ')}</p>
      <p>Height: {pokemon.height / 10} m</p>
      <p>Weight: {pokemon.weight / 10} kg</p>
      <h3>Moves</h3>
      <ul>
        {pokemon.moves.map(move => <li key={move.move.name}>{move.move.name}</li>)}
      </ul>
      <Link to="/">Back to Pokedex</Link>
    </div>
  );
};

export default PokemonDetail;
