<script setup lang="ts">
import { computed } from 'vue'
import { Card, CardContent } from '@/components'
import { useFavoritesStore } from '@/stores/favorites'
import type { Pokemon } from '@/types/pokemon'
import { Heart } from 'lucide-vue-next'
import PokemonImage from './PokemonImage.vue'
import PokemonTypes from './PokemonTypes.vue'

const props = defineProps<{
  pokemon: Pokemon
}>()

const emit = defineEmits<{
  click: [pokemon: Pokemon]
}>()

const favoritesStore = useFavoritesStore()

const isFavorite = computed(() => favoritesStore.isFavorite(props.pokemon.id))

const favoriteButtonClass = computed(() =>
  isFavorite.value ? 'text-red-500' : 'text-white hover:text-red-400',
)

const handleFavoriteClick = (event: Event, pokemonId: number) => {
  event.stopPropagation()
  favoritesStore.toggleFavorite(pokemonId)
}
</script>

<template>
  <Card
    class="cursor-pointer bg-card/10 backdrop-blur-sm border-border text-card-foreground hover:bg-card/15 transition-colors relative"
    @click="emit('click', pokemon)"
  >
    <CardContent class="p-4 mx-auto">
      <button
        @click="handleFavoriteClick($event, pokemon.id)"
        class="absolute top-3 right-3 text-muted/10 transition-all duration-200 z-10"
        :class="favoriteButtonClass"
      >
        <Heart :fill="isFavorite ? 'currentColor' : 'none'" />
      </button>
      <div class="flex justify-center mb-3">
        <PokemonImage
          :src="pokemon.sprites.other['official-artwork'].front_default"
          :alt="pokemon.name"
          size="medium"
          background="bg-background/20"
          radius="full"
        />
      </div>

      <div class="text-center">
        <span
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted/20 text-white border border-primary/20 mb-1"
        >
          #{{ pokemon.id.toString().padStart(3, '0') }}
        </span>
        <h3 class="font-bold text-lg text-white capitalize mb-2">{{ pokemon.name }}</h3>

        <PokemonTypes :types="pokemon.types" size="small" />
      </div>
    </CardContent>
  </Card>
</template>
