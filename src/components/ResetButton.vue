<script setup lang="ts">
import { computed } from 'vue'
import { Button } from '@/components'
import { RefreshCcw } from 'lucide-vue-next'
import { usePokemonStore } from '@/stores/pokemon'

const pokemonStore = usePokemonStore()

const hasActiveFilters = computed(() => {
  const filters = pokemonStore.filters
  return (
    filters.searchQuery.trim() !== '' ||
    filters.showFavoritesOnly ||
    filters.selectedTypes.length > 0
  )
})

const handleReset = async () => {
  if (hasActiveFilters.value) {
    await pokemonStore.clearAllFilters()
  }
}
</script>

<template>
  <Button
    class="flex items-center gap-2 cursor-pointer text-white bg-background/20 hover:text-white hover:bg-background/40"
    @click="handleReset"
  >
    <RefreshCcw :size="16" />
    <span>Reset</span>
  </Button>
</template>
