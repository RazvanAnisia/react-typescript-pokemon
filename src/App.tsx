import React from 'react';
import logo from './logo.svg';
import './App.css';
import PokemonSearch from './PokemonSearch';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <PokemonSearch name={'Ash'} numberOfPokemons={2} />
      </div>
    );
  }
}

export default App;
