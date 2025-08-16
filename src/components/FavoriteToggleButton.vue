<script setup lang="ts">
import { computed } from 'vue'
import { Button } from '@/components'
import { Heart } from 'lucide-vue-next'
import { usePokemonStore } from '@/stores/pokemon'
import { useFavoritesStore } from '@/stores/favorites'

const pokemonStore = usePokemonStore()
const favoritesStore = useFavoritesStore()

const showingFavorites = computed(() => pokemonStore.filters.showFavoritesOnly)

const toggleFavorites = async () => {
  await pokemonStore.setFavoritesFilter(!showingFavorites.value)
}
</script>

<template>
  <div class="flex items-center justify-between">
    <Button
      @click="toggleFavorites"
      variant="outline"
      class="flex items-center gap-2 cursor-pointer text-white bg-background/20 hover:text-white hover:bg-background/40"
    >
      <Heart :size="16" :fill="showingFavorites ? 'currentColor' : 'none'" class="text-red-500" />
      <span>
        {{ showingFavorites ? 'Show All' : 'Show Favorites' }}
        <span
          v-if="!showingFavorites && favoritesStore.getFavoriteCount() > 0"
          class="ml-1 opacity-75"
        >
          ({{ favoritesStore.getFavoriteCount() }})
        </span>
      </span>
    </Button>
  </div>
</template>
