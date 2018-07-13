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
export default class PokeInfo extends React.Component<IProps, {}> {
  public render() {
    const abilitiesLi = this.props.store.pokemonInfo.abilities.map((ability, index) => {
      return <li key={index}>{ability.ability.name}</li>
    })

    return (
      <div>
        <h2>{this.props.store.pokemonInfo.name}</h2>
        <h3>Abilities:</h3>
        <ul>{abilitiesLi}</ul>
        <p>Specie: {this.props.store.pokemonInfo.species.name}</p>
      </div>
    )
  }
}