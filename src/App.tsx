import { observable } from 'mobx';
import * as React from 'react';
import './App.css';
import PokeInfo from './components/PokeInfo'
import PokeSearch from './components/PokeSearch';

interface IAbilities {
  ability: {
    name: string,
    url: string
  }
  is_hidden: boolean
  slot: number
}

interface IFormItem {
  name: string
  url: string
}

interface IVersion {
  name: string
  url: string
}

interface IGameIndex {
  game_index: number
  version: IVersion
}

interface IVersionDetail {
  rarity: number
  version: IVersion
}

interface IHeldItem {
  item: {
    name: string
    url: string
  }
  version_details: IVersionDetail[]
}

interface INameUrl {
  name: string
  url: string
}

interface IVersionGroupDetail {
  level_learned_at: number
  move_learn_method: INameUrl
  version_group: INameUrl
}

interface IMove {
  move: INameUrl
  version_group_details: IVersionGroupDetail
}

interface ISprites {
  back_default: string
  back_female: string
  back_shiny: string
  back_shiny_female: string
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
}

interface IStat {
  base_stat: number
  effort: number
  stat: INameUrl
}

interface IType {
  slot: number
  type: INameUrl
}

export interface IPokemonInfo {
  abilities: IAbilities[]
  base_experience: number
  forms: IFormItem[]
  game_indices: IGameIndex[]
  height: number
  held_items: IHeldItem[]
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: IMove[]
  name: string
  order: number
  species: INameUrl
  sprites: ISprites
  stats: IStat[]
  types: IType[]
  weight: number
}

export interface IAppStore {
  pokemonToSearch: string
  pokemonInfo: IPokemonInfo
  isLoading: boolean
  didFoundPokemon: boolean
}

export const AppStore: IAppStore = observable({
  didFoundPokemon: false,
  isLoading: false,
  pokemonInfo: {
    abilities: [],
    base_experience: 0,
    forms: [],
    game_indices: [],
    height: 0,
    held_items: [],
    id: 0,
    is_default: false,
    location_area_encounters: '',
    moves: [],
    name: '',
    order: 0,
    species: { url: '', name: '' },
    sprites: {
      back_default: '',
      back_female: '',
      back_shiny: '',
      back_shiny_female: '',
      front_default: '',
      front_female: '',
      front_shiny: '',
      front_shiny_female: ''
    },
    stats: [],
    types: [],
    weight: 0
  },
  pokemonToSearch: ''
});

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <PokeSearch store={AppStore} />
        <PokeInfo store={AppStore} />
      </div>
    );
  }
}

export default App;
