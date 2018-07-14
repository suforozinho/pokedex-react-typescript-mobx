import { observer } from 'mobx-react';
import * as React from 'react';
import { IProps } from '../interfaces';

@observer
export default class PokeInfo extends React.Component<IProps, {}> {
  public render() {
    const abilitiesLi = this.props.store.pokemonInfo.abilities.map((ability, index) => {
      return <li key={index}>{ability.ability.name}</li>
    })

    let content;

    if (this.props.store.isLoading) {
      content = <p>Loading...</p>
    }
    if (!this.props.store.isLoading && this.props.store.didFoundPokemon) {
      content = (
        <div>
          <h2>{this.props.store.pokemonInfo.name}</h2>
          <h3>Abilities:</h3>
          <ul>{abilitiesLi}</ul>
          <p>Specie: {this.props.store.pokemonInfo.species.name}</p>
        </div>
      )
    }
    if (!this.props.store.isLoading && this.props.store.error) {
      content = (
        <h1 className="errorHeader">ERROR!</h1>
      )
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}