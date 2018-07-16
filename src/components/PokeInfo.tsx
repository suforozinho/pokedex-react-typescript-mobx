import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { IAppStore } from '../App';
import { STORE } from '../constants/props';

interface IPokeInfoInjectedProps {
  store: IAppStore;
}

interface IPokeInfoState {
  pokemonType: string;
}

@inject(STORE)
@observer
export default class PokeInfo extends React.Component {
  constructor(props: IPokeInfoInjectedProps) {
    super(props);
    this.state = {
      pokemonType: ''
    };
  }

  get injected() {
    return this.props as IPokeInfoInjectedProps;
  }

  get pokeInfoState() {
    return this.state as IPokeInfoState;
  }

  public render() {
    // const abilitiesLi = this.injected.store.pokemonInfo.abilities.map(
    //   (ability, index) => {
    //     return <li key={index}>{ability.ability.name}</li>;
    //   }
    // );

    let content;

    if (this.injected.store.isLoading) {
      content = <p>Loading...</p>;
    }
    if (!this.injected.store.isLoading && this.injected.store.didFoundPokemon) {
      setTimeout(() => {
        this.setState({
          pokemonType: this.injected.store.pokemonInfo.types[0].type.name
        });
      }, 100);

      content = (
        <div>
          <div className="PokeInfo__header">
            <div className="PokeInfo__header__column-1">
              <div className="PokeInfo__header__image">
                <img
                  src={this.injected.store.pokemonInfo.sprites.front_default}
                />
              </div>
              <div className="PokeInfo__header__name">
                <span>{this.injected.store.pokemonInfo.name}</span>
                <span>{this.injected.store.pokemonInfo.id}</span>
              </div>
            </div>
            <div className="PokeInfo__header__type">
              <span className="PokeInfo__header__type__span">
                {this.pokeInfoState.pokemonType}
              </span>
            </div>
          </div>
          {/* <h2>{this.injected.store.pokemonInfo.name}</h2>
          <h3>Abilities:</h3>
          <ul>{abilitiesLi}</ul>
          <p>Specie: {this.injected.store.pokemonInfo.species.name}</p> */}
        </div>
      );
    }
    if (!this.injected.store.isLoading && this.injected.store.error) {
      content = <h1 className="errorHeader">ERROR!</h1>;
    }

    return <div>{content}</div>;
  }
}
