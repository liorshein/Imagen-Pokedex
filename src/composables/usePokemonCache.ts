import { ref } from 'vue'
import { toast } from 'vue-sonner'
import type { Pokemon, PokemonAbility, PokemonStat, PokemonType } from '@/types/pokemon'

const BASE_URL = 'https://pokeapi.co/api/v2'

type PokemonCache = Map<number, Pokemon>
type TypeFilterCache = Map<string, number[]>

export function usePokemonCache() {
  const pokemonCache = ref<PokemonCache>(new Map())
  const typeFilterCache = ref<TypeFilterCache>(new Map())
  const pokemonNameList = ref<{ id: number; name: string }[]>([])

  const getPokemonById = async (id: number) => {
    if (pokemonCache.value.has(id)) {
      return pokemonCache.value.get(id)!
    } else {
      const pokemonArray = await fetchPokemonByIds([id])
      return pokemonArray[0]
    }
  }

  const getPokemonByName = async (name: string) => {
    // Check if the name exists in our Generation 1 Pokemon list
    const nameExists = pokemonNameList.value.some(
      (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase(),
    )

    if (!nameExists) {
      throw new Error(`Pokemon "${name}" is not found in Generation 1`)
    }

    // First check cache for Pokemon with matching name
    for (const pokemon of pokemonCache.value.values()) {
      if (pokemon.name.toLowerCase() === name.toLowerCase()) {
        return pokemon
      }
    }

    try {
      const response = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`)
      if (!response.ok) throw new Error(`Pokemon ${name} not found`)

      const fullPokemon = await response.json()

      const pokemon: Pokemon = {
        id: fullPokemon.id,
        name: fullPokemon.name,
        sprites: {
          other: {
            'official-artwork': {
              front_default: fullPokemon.sprites.other['official-artwork'].front_default,
            },
          },
        },
        types: fullPokemon.types.map((typeItem: PokemonType) => ({
          type: { name: typeItem.type.name },
        })),
        stats: fullPokemon.stats?.map((statItem: PokemonStat) => ({
          base_stat: statItem.base_stat,
          stat: { name: statItem.stat.name },
        })),
        abilities: fullPokemon.abilities?.map((abilityItem: PokemonAbility) => ({
          ability: { name: abilityItem.ability.name },
          is_hidden: abilityItem.is_hidden,
        })),
        height: fullPokemon.height,
        weight: fullPokemon.weight,
      }

      // Only cache if it's a Gen 1 Pokemon (ID 1-151)
      if (pokemon.id >= 1 && pokemon.id <= 151) {
        pokemonCache.value.set(pokemon.id, pokemon)
        return pokemon
      } else {
        throw new Error(`Pokemon ${name} is not from Generation 1`)
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error(`Failed to fetch Pokemon: ${name}`)
    }
  }

  const fetchPokemonByIds = async (ids: number[]) => {
    if (ids.length === 0) {
      return []
    }

    const cachedPokemon = ids
      .map((id) => pokemonCache.value.get(id))
      .filter((pokemon) => pokemon !== undefined)

    const cachedIds = new Set(cachedPokemon.map((p) => p.id))
    const missingIds = ids.filter((id) => !cachedIds.has(id))

    const results = [...cachedPokemon]

    if (missingIds.length > 0) {
      try {
        const fetchPromises = missingIds.map(async (id) => {
          const response = await fetch(`${BASE_URL}/pokemon/${id}`)
          if (!response.ok) throw new Error(`Failed to fetch Pokemon ${id}`)

          const fullPokemon = await response.json()

          const pokemon: Pokemon = {
            id: fullPokemon.id,
            name: fullPokemon.name,
            sprites: {
              other: {
                'official-artwork': {
                  front_default: fullPokemon.sprites.other['official-artwork'].front_default,
                },
              },
            },
            types: fullPokemon.types.map((typeItem: PokemonType) => ({
              type: { name: typeItem.type.name },
            })),
            stats: fullPokemon.stats?.map((statItem: PokemonStat) => ({
              base_stat: statItem.base_stat,
              stat: { name: statItem.stat.name },
            })),
            abilities: fullPokemon.abilities?.map((abilityItem: PokemonAbility) => ({
              ability: { name: abilityItem.ability.name },
              is_hidden: abilityItem.is_hidden,
            })),
            height: fullPokemon.height,
            weight: fullPokemon.weight,
          }

          pokemonCache.value.set(pokemon.id, pokemon)
          return pokemon
        })

        const fetchedPokemon = await Promise.all(fetchPromises)
        results.push(...fetchedPokemon)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error('Failed to load Pokemon', {
          description: 'Unable to fetch Pokemon data from server.',
        })
      }
    }

    return results.sort((a, b) => a.id - b.id)
  }

  const getCacheSize = () => {
    return pokemonCache.value.size
  }

  const fetchTypeFilterIds = async (types: string[]): Promise<number[]> => {
    if (types.length === 0) return []

    try {
      // Fetch each individual type, using cache when possible
      const typeResults: number[][] = []

      for (const type of types) {
        // Check if individual type is cached
        if (typeFilterCache.value.has(type)) {
          typeResults.push(typeFilterCache.value.get(type)!)
        } else {
          // Fetch from API and cache individual type
          const response = await fetch(`${BASE_URL}/type/${type}`)
          if (!response.ok) throw new Error(`Failed to fetch type ${type}`)
          const data = await response.json()

          // Extract Pokemon IDs, filter to Gen 1 only (ID <= 151)
          const typeIds = data.pokemon
            .map((p: { pokemon: { url: string } }) => {
              const id = parseInt(p.pokemon.url.split('/').slice(-2, -1)[0])
              return id
            })
            .filter((id: number) => id <= 151)
            .sort((a: number, b: number) => a - b)

          // Cache individual type result
          typeFilterCache.value.set(type, typeIds)
          typeResults.push(typeIds)
        }
      }

      // Get intersection of all Pokemon that have ALL selected types (AND logic)
      if (typeResults.length === 0) return []

      // Start with the first type's Pokemon list
      let filteredIds = typeResults[0]

      // Filter to only include Pokemon that appear in ALL subsequent type lists
      for (let i = 1; i < typeResults.length; i++) {
        const currentTypeIds = new Set(typeResults[i])
        filteredIds = filteredIds.filter((id: number) => currentTypeIds.has(id))
      }

      return filteredIds
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Filter error', {
        description: 'Unable to load Pokemon types for filtering.',
      })
      return [] // Return empty array on error
    }
  }

  const fetchPokemonNameList = async () => {
    if (pokemonNameList.value.length > 0) {
      return
    }

    try {
      const response = await fetch(`${BASE_URL}/pokemon?limit=151`)
      if (!response.ok) throw new Error('Failed to fetch Pokemon names')

      const data = await response.json()
      pokemonNameList.value = data.results.map((item: { name: string; url: string }) => {
        const urlParts = item.url.split('/')
        const id = parseInt(urlParts[urlParts.length - 2])
        return {
          id,
          name: item.name,
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Initialization failed', {
        description: 'Unable to load Pokemon database.',
      })
    }
  }

  const clearCache = () => {
    pokemonCache.value.clear()
    typeFilterCache.value.clear()
    pokemonNameList.value = []
  }

  return {
    pokemonCache,
    typeFilterCache,
    pokemonNameList,
    getPokemonById,
    getPokemonByName,
    fetchPokemonByIds,
    fetchPokemonNameList,
    fetchTypeFilterIds,
    clearCache,
    getCacheSize,
  }
}
