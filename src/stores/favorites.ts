import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const FAVORITES_STORAGE_KEY = 'pokemon-favorites'

export const useFavoritesStore = defineStore('favorites', () => {
  const favoriteIds = ref<Set<number>>(new Set())

  const loadFavorites = () => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY)
      if (stored) {
        const ids = JSON.parse(stored) as number[]
        favoriteIds.value = new Set(ids)
      }
    } catch (error) {
      console.warn('Failed to load favorites from localStorage:', error)
      favoriteIds.value = new Set()
    }
  }

  const saveFavorites = () => {
    try {
      const ids = Array.from(favoriteIds.value)
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids))
    } catch (error) {
      console.warn('Failed to save favorites to localStorage:', error)
    }
  }

  watch(
    favoriteIds,
    () => {
      saveFavorites()
    },
    { deep: true }
  )

  loadFavorites()

  const toggleFavorite = (pokemonId: number) => {
    if (favoriteIds.value.has(pokemonId)) {
      favoriteIds.value.delete(pokemonId)
    } else {
      favoriteIds.value.add(pokemonId)
    }
    favoriteIds.value = new Set(favoriteIds.value)
  }

  const isFavorite = (pokemonId: number): boolean => {
    return favoriteIds.value.has(pokemonId)
  }

  const getFavoriteCount = (): number => {
    return favoriteIds.value.size
  }

  const clearAllFavorites = () => {
    favoriteIds.value.clear()
    favoriteIds.value = new Set(favoriteIds.value)
  }

  return {
    favoriteIds,
    toggleFavorite,
    isFavorite,
    getFavoriteCount,
    clearAllFavorites,
  }
})