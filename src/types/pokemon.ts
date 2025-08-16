export type Pokemon = {
  id: number
  name: string
  sprites: {
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
  types: Array<{
    type: {
      name: string
    }
  }>
  stats: Array<{
    base_stat: number
    stat: {
      name: string
    }
  }>
  abilities: Array<{
    ability: {
      name: string
    }
    is_hidden: boolean
  }>
  height: number
  weight: number
}

export type PokemonType = Pokemon['types'][number]
export type PokemonStat = Pokemon['stats'][number]
export type PokemonAbility = Pokemon['abilities'][number]

export type PokemonListItem = {
  name: string
  url: string
}

export type PokemonListResponse = {
  results: PokemonListItem[]
  count: number
  next: string | null
  previous: string | null
}

export type PokemonTypeResponse = {
  pokemon: Array<{
    pokemon: {
      name: string
      url: string
    }
  }>
}
