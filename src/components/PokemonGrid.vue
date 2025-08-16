<script setup lang="ts">
import PokemonCard from './PokemonCard.vue'
import type { Pokemon } from '@/types/pokemon'

defineProps<{
  pokemons: Pokemon[]
}>()

const emit = defineEmits<{
  pokemonClick: [pokemon: Pokemon]
}>()

const handlePokemonClick = (pokemon: Pokemon) => {
  emit('pokemonClick', pokemon)
}
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
  >
    <PokemonCard
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
      @click="handlePokemonClick"
    />
  </div>
</template>
