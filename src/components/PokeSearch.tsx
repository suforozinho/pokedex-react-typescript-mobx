import axios from 'axios';
import { observer } from 'mobx-react';
import * as React from 'react';
import { IPokemonInfo } from '../App'

interface IProps {
  store: {
    pokemonToSearch: string,
    pokemonInfo: IPokemonInfo
  };
}

@observer
export default class PokeSearch extends React.Component<IProps, {}> {
  public render() {
    return (
      <div className='PokeSearch'>
        <input
          type="text"
          value={this.props.store.pokemonToSearch}
          onChange={this.handleInput}
          className="PokeSearch__input"
        />
        <button onClick={this.searchPokemon} className="PokeSearch__button">Search</button>
      </div>
    );
  }

  private handleInput = (e: React.SyntheticEvent<HTMLInputElement>) => {
    this.props.store.pokemonToSearch = e.currentTarget.value;
  };

  private searchPokemon = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    axios.get(`http://pokeapi.salestock.net/api/v2/pokemon/${this.props.store.pokemonToSearch}`).then((response) => {
      this.props.store.pokemonInfo = response.data
    })
  }
}
