import type { Pokemon } from '@/types/pokemon'
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { usePokemonCache } from '@/composables/usePokemonCache'
import { useFavoritesStore } from './favorites'

const GEN_1_LIMIT = 151

type Filters = {
  searchQuery: string
  showFavoritesOnly: boolean
  selectedTypes: string[]
}

export const usePokemonStore = defineStore('pokemon', () => {
  const {
    pokemonCache,
    pokemonNameList,
    getPokemonById,
    getPokemonByName,
    fetchPokemonByIds,
    fetchPokemonNameList,
    fetchTypeFilterIds,
  } = usePokemonCache()
  const favoritesStore = useFavoritesStore()

  const displayedPokemonIds = ref<number[]>([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const error = ref<string | null>(null)
  const hasMorePokemon = ref(true)

  const allPokemonIds = ref<number[]>([])
  const PAGE_SIZE = 20

  const filters = ref<Filters>({
    searchQuery: '',
    showFavoritesOnly: false,
    selectedTypes: [],
  })

  const currentTypeFilterIds = ref<number[]>([])

  const filteredPokemonIds = computed(() => {
    let result = allPokemonIds.value

    if (filters.value.showFavoritesOnly) {
      result = result.filter((id) => favoritesStore.favoriteIds.has(id))
    }

    if (filters.value.searchQuery.trim()) {
      const searchResults = getSearchResultIds(filters.value.searchQuery)
      result = result.filter((id) => searchResults.includes(id))
    }

    if (filters.value.selectedTypes.length > 0) {
      result = result.filter((id) => currentTypeFilterIds.value.includes(id))
    }

    return result
  })

  const pokemons = computed(() => {
    const cacheRef = pokemonCache.value
    const result = displayedPokemonIds.value
      .map((id) => cacheRef.get(id))
      .filter((pokemon): pokemon is Pokemon => pokemon !== undefined)

    return result
  })

  const getSearchResultIds = (query: string): number[] => {
    if (!query.trim()) return allPokemonIds.value

    const queryLower = query.toLowerCase().trim()
    return pokemonNameList.value
      .filter((pokemon) => pokemon.name.toLowerCase().startsWith(queryLower))
      .map((p) => p.id)
  }

  const resetPagination = () => {
    displayedPokemonIds.value = []
    hasMorePokemon.value = filteredPokemonIds.value.length > 0
  }

  const loadMorePokemon = async () => {
    if (!hasMorePokemon.value || loadingMore.value || error.value) {
      return []
    }

    loadingMore.value = true
    error.value = null

    try {
      const availableIds = filteredPokemonIds.value
      const startIndex = displayedPokemonIds.value.length
      const endIndex = startIndex + PAGE_SIZE
      const nextBatch = availableIds.slice(startIndex, endIndex)

      if (nextBatch.length === 0) {
        hasMorePokemon.value = false
        return []
      }

      const newPokemon = await fetchPokemonByIds(nextBatch)
      const newIds = newPokemon.map((p) => p.id)
      displayedPokemonIds.value = [...displayedPokemonIds.value, ...newIds]
      hasMorePokemon.value = endIndex < availableIds.length

      return newPokemon
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load more Pokemon'
      return []
    } finally {
      loadingMore.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  const setSearchFilter = async (query: string) => {
    // Only update filter and reset if query actually changed
    if (filters.value.searchQuery === query) return

    filters.value.searchQuery = query

    // Reset pagination and immediately load first batch synchronously
    displayedPokemonIds.value = []
    hasMorePokemon.value = filteredPokemonIds.value.length > 0

    // Load first batch immediately without loading state
    if (hasMorePokemon.value) {
      const availableIds = filteredPokemonIds.value
      const firstBatch = availableIds.slice(0, PAGE_SIZE)

      if (firstBatch.length > 0) {
        // Fetch Pokemon details for first batch
        const newPokemon = await fetchPokemonByIds(firstBatch)
        const newIds = newPokemon.map((p) => p.id)
        displayedPokemonIds.value = newIds
        hasMorePokemon.value = PAGE_SIZE < availableIds.length
      }
    }
  }

  const setFavoritesFilter = async (showFavoritesOnly: boolean) => {
    filters.value.showFavoritesOnly = showFavoritesOnly
    resetPagination()

    if (hasMorePokemon.value) {
      await loadMorePokemon()
    }
  }

  const setTypeFilter = async (types: string[]) => {
    filters.value.selectedTypes = types

    // Fetch type-filtered Pokemon IDs using cached version
    if (types.length > 0) {
      currentTypeFilterIds.value = await fetchTypeFilterIds(types)
    } else {
      currentTypeFilterIds.value = []
    }

    resetPagination()

    // Load first batch if there are Pokemon to show
    if (hasMorePokemon.value) {
      await loadMorePokemon()
    }
  }

  const clearAllFilters = async () => {
    filters.value.searchQuery = ''
    filters.value.showFavoritesOnly = false
    filters.value.selectedTypes = []
    resetPagination()

    // Load first batch of Pokemon when clearing filters
    if (hasMorePokemon.value) {
      await loadMorePokemon()
    }
  }

  const initialize = async () => {
    loading.value = true
    error.value = null

    try {
      await fetchAllPokemonNames()

      if (allPokemonIds.value.length === 0) {
        allPokemonIds.value = Array.from({ length: GEN_1_LIMIT }, (_, i) => i + 1)
      }

      resetPagination()
      await loadMorePokemon()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to initialize'
    } finally {
      loading.value = false
    }
  }

  const fetchAllPokemonNames = fetchPokemonNameList

  watch(
    () => favoritesStore.favoriteIds,
    () => {
      if (filters.value.showFavoritesOnly) {
        displayedPokemonIds.value = displayedPokemonIds.value.filter((id) =>
          filteredPokemonIds.value.includes(id),
        )

        hasMorePokemon.value = displayedPokemonIds.value.length < filteredPokemonIds.value.length
      }
    },
    { deep: true },
  )

  return {
    pokemons,
    loading,
    loadingMore,
    error,
    hasMorePokemon,
    filters,
    filteredPokemonIds,
    initialize,
    loadMorePokemon,
    getPokemonById,
    getPokemonByName,
    clearError,
    setSearchFilter,
    setFavoritesFilter,
    setTypeFilter,
    clearAllFilters,
  }
})
