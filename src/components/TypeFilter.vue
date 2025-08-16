<script setup lang="ts">
import { computed } from 'vue'
import { ToggleGroup, ToggleGroupItem } from '@/components'
import { usePokemonStore } from '@/stores/pokemon'
import { POKEMON_TYPES } from '@/lib/pokemon'

const pokemonStore = usePokemonStore()

const selectedTypes = computed({
  get: () => pokemonStore.filters.selectedTypes,
  set: async (value: string[]) => {
    await pokemonStore.setTypeFilter(value)
  },
})

const getTypeClasses = (type: string) => {
  return {
    // Base styles
    'capitalize text-xs px-3 py-1 w-20 min-w-20 max-w-20 text-center': true,

    // Type-specific colors when toggle is "on" (selected)
    'data-[state=on]:bg-gray-400 data-[state=on]:text-white': type === 'normal',
    'data-[state=on]:bg-red-500 data-[state=on]:text-white': type === 'fire',
    'data-[state=on]:bg-blue-500 data-[state=on]:text-white': type === 'water',
    'data-[state=on]:bg-yellow-400 data-[state=on]:text-black': type === 'electric',
    'data-[state=on]:bg-green-500 data-[state=on]:text-white': type === 'grass',
    'data-[state=on]:bg-blue-300 data-[state=on]:text-black': type === 'ice',
    'data-[state=on]:bg-red-700 data-[state=on]:text-white': type === 'fighting',
    'data-[state=on]:bg-purple-500 data-[state=on]:text-white': type === 'poison',
    'data-[state=on]:bg-yellow-600 data-[state=on]:text-white': type === 'ground',
    'data-[state=on]:bg-indigo-400 data-[state=on]:text-white': type === 'flying',
    'data-[state=on]:bg-pink-500 data-[state=on]:text-white': type === 'psychic',
    'data-[state=on]:bg-green-400 data-[state=on]:text-black': type === 'bug',
    'data-[state=on]:bg-yellow-800 data-[state=on]:text-white': type === 'rock',
    'data-[state=on]:bg-purple-700 data-[state=on]:text-white': type === 'ghost',
    'data-[state=on]:bg-indigo-700 data-[state=on]:text-white': type === 'dragon',
    'data-[state=on]:bg-gray-800 data-[state=on]:text-white': type === 'dark',
    'data-[state=on]:bg-gray-500 data-[state=on]:text-white': type === 'steel',
    'data-[state=on]:bg-pink-300 data-[state=on]:text-black': type === 'fairy',

    // Default background when not selected
    'bg-background/20 text-white': true,
  }
}
</script>

<template>
  <label class="text-sm font-medium text-white">Filter by Type:</label>
  <div class="pt-4">
    <ToggleGroup v-model="selectedTypes" type="multiple" class="flex flex-wrap gap-2">
      <ToggleGroupItem
        v-for="type in POKEMON_TYPES"
        :key="type"
        variant="outline"
        :value="type"
        :class="getTypeClasses(type)"
      >
        {{ type }}
      </ToggleGroupItem>
    </ToggleGroup>
  </div>
</template>
