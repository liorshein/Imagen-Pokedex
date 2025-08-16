<script setup lang="ts">
import { computed } from 'vue'
import EmptyState from './EmptyState.vue'
import { usePokemonStore } from '@/stores/pokemon'

const pokemonStore = usePokemonStore()

const emptyStateData = computed(() => {
  const filters = pokemonStore.filters

  if (filters.searchQuery.trim()) {
    return {
      title: 'No Pokémon Found',
      description: `No Pokémon match "${filters.searchQuery.trim()}"`,
    }
  }

  if (filters.showFavoritesOnly) {
    return {
      title: 'No Favorites Yet',
      description: "You haven't favorited any Pokémon yet",
    }
  }

  if (filters.selectedTypes.length > 0) {
    const typeText = filters.selectedTypes.join(' + ')
    const plural = filters.selectedTypes.length > 1 ? 's' : ''
    return {
      title: 'No Pokémon Found',
      description: `No Pokémon match the selected type${plural}: ${typeText}`,
    }
  }

  return {
    title: 'No Pokémon Available',
    description: 'No Pokémon available',
  }
})
</script>

<template>
  <EmptyState
    :title="emptyStateData.title"
    :description="emptyStateData.description"
  />
</template>
