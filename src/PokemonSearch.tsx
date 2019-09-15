import React, { Component } from 'react';
import { number } from 'prop-types';

interface User {
  name: string;
  numberOfPokemons?: number;
}

interface State {
  error: boolean;
  name: string;
  numberOfAbilities: number;
  baseExperience: number;
  imageUrl: string;
}

export class PokemonSearch extends Component<User> {
  pokemonRef: React.RefObject<HTMLInputElement>;

  constructor(props: User) {
    super(props);
    this.pokemonRef = React.createRef();
  }
  state: State = {
    error: false,
    name: '',
    numberOfAbilities: null,
    baseExperience: null,
    imageUrl: ''
  };
  onSearchClick = () => {
    const inputValue = this.pokemonRef.current.value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`).then(res => {
      if (res.status !== 200) {
        this.setState({ error: true });
      } else {
        res.json().then(data => {
          this.setState({
            error: false,
            name: data.name,
            numberOfAbilities: data.abilities.length,
            baseExperience: data.base_experience,
            imageUrl: data.sprites.front_default
          });
        });
      }
    });
  };
  render() {
    const { name: userName, numberOfPokemons } = this.props;
    const { name, numberOfAbilities, baseExperience, imageUrl } = this.state;
    const resultMarkup = (
      <div>
        <img src={imageUrl} />
        <p>
          {name} has {numberOfAbilities} abilities and {baseExperience} base
          experience points
        </p>
      </div>
    );
    return (
      <div>
        <p>This trainer {userName}</p>
        <p>Has {numberOfPokemons} </p>
        <input type="text" ref={this.pokemonRef}></input>
        <button onClick={this.onSearchClick} className="btn">
          Search
        </button>
        {resultMarkup}
      </div>
    );
  }
}

export default PokemonSearch;
