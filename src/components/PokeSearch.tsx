import axios from 'axios';
import { observer } from 'mobx-react';
import * as React from 'react';
import { IProps } from '../interfaces';

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
    this.props.store.isLoading = true;
    this.props.store.didFoundPokemon = false;
    this.props.store.error = false;
    axios.get(`http://pokeapi.salestock.net/api/v2/pokemon/${this.props.store.pokemonToSearch.toLowerCase()}`).then((response) => {
      this.props.store.isLoading = false;
      this.props.store.didFoundPokemon = true;
      this.props.store.pokemonInfo = response.data
    }).catch(error => {
      this.props.store.isLoading = false;
      this.props.store.error = true;
      // tslint:disable-next-line:no-console
      console.log(error)
    })
  }
}
