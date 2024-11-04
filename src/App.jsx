// App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PokemonDetail from './components/PokemonDetail';
import './App.css';



const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [filter, setFilter] = useState({
    name: '',
    type: '',
    number: ''
  });
  // https://pokeapi.co/api/v2/pokemon?limit=1302
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=1302')
      .then(response => {
        const fetches = response.data.results.map(pokemon => 
          axios.get(pokemon.url).then(res => res.data)
        );
        Promise.all(fetches).then(data => setPokemonData(data));
      });
  }, []);

  const handleChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value.toLowerCase()
    });
  };

  const filteredPokemon = pokemonData.filter(pokemon => 
    pokemon.name.includes(filter.name) &&
    (filter.type ? pokemon.types.some(t => t.type.name.includes(filter.type)) : true) &&
    (filter.number ? pokemon.id.toString().includes(filter.number) : true)
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="pokedex">
            <h1>Pokedex</h1>
            <div className="filters">
              <input name="name" placeholder="Search by Name" onChange={handleChange} />
              <input name="type" placeholder="Search by Type" onChange={handleChange} />
              <input name="number" placeholder="Search by Number" onChange={handleChange} />
            </div>
            <div className="pokemon-list">
              {filteredPokemon.map((pokemon, index) => (
                <Link to={`/pokemon/${pokemon.id}`} key={index}>
                  <div className="pokemon-card">
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <h2>{pokemon.name}</h2>
                    <p>Number: {pokemon.id}</p>
                    <p>Type: {pokemon.types.map(type => type.type.name).join(', ')}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        } />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
