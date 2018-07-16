import axios from 'axios';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { IAppStore } from '../App';
import { STORE } from '../constants/props';

interface IPokeSearchInjectedProps {
  store: IAppStore;
}

@inject(STORE)
@observer
export default class PokeSearch extends React.Component {
  get injected() {
    return this.props as IPokeSearchInjectedProps;
  }

  public render() {
    return (
      <div className="PokeSearch">
        <input
          type="text"
          value={this.injected.store.pokemonToSearch}
          onChange={this.handleInput}
          className="PokeSearch__input"
          placeholder="Search..."
        />
        <button onClick={this.searchPokemon} className="PokeSearch__button">
          <i className="fa fa-search" />
        </button>
      </div>
    );
  }

  private handleInput = (e: React.SyntheticEvent<HTMLInputElement>) => {
    this.injected.store.pokemonToSearch = e.currentTarget.value;
  };

  private searchPokemon = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    this.injected.store.isLoading = true;
    this.injected.store.didFoundPokemon = false;
    this.injected.store.error = false;
    axios
      .get(
        `http://pokeapi.salestock.net/api/v2/pokemon/${this.injected.store.pokemonToSearch.toLowerCase()}`
      )
      .then(response => {
        this.injected.store.isLoading = false;
        this.injected.store.didFoundPokemon = true;
        this.injected.store.pokemonInfo = response.data;
      })
      .catch(error => {
        this.injected.store.isLoading = false;
        this.injected.store.error = true;
        // tslint:disable-next-line:no-console
        console.log(error);
      });
  };
}
