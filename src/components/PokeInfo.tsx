import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { IAppStore } from '../App';
import { STORE } from '../constants/props';

interface IPokeInfoInjectedProps {
  store: IAppStore;
}

@inject(STORE)
@observer
export default class PokeInfo extends React.Component {
  get injected() {
    return this.props as IPokeInfoInjectedProps;
  }

  public render() {
    const abilitiesLi = this.injected.store.pokemonInfo.abilities.map(
      (ability, index) => {
        return <li key={index}>{ability.ability.name}</li>;
      }
    );

    let content;

    if (this.injected.store.isLoading) {
      content = <p>Loading...</p>;
    }
    if (!this.injected.store.isLoading && this.injected.store.didFoundPokemon) {
      content = (
        <div>
          <h2>{this.injected.store.pokemonInfo.name}</h2>
          <h3>Abilities:</h3>
          <ul>{abilitiesLi}</ul>
          <p>Specie: {this.injected.store.pokemonInfo.species.name}</p>
        </div>
      );
    }
    if (!this.injected.store.isLoading && this.injected.store.error) {
      content = <h1 className="errorHeader">ERROR!</h1>;
    }

    return <div>{content}</div>;
  }
}
