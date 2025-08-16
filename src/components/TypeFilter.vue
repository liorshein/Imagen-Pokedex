<script setup lang="ts">
import { computed } from 'vue'
import { ToggleGroup, ToggleGroupItem } from '@/components'
import { usePokemonStore } from '@/stores/pokemon'
import { POKEMON_TYPES, getTypeClass } from '@/lib/pokemon'

const pokemonStore = usePokemonStore()

const selectedTypes = computed({
  get: () => pokemonStore.filters.selectedTypes,
  set: async (value: string[]) => {
    await pokemonStore.setTypeFilter(value)
  },
})

const getToggleTypeClass = (type: string) => {
  const baseTypeClass = getTypeClass(type)
  const toggleClass = baseTypeClass.replace(/^bg-/, 'data-[state=on]:bg-').replace(/text-/, 'data-[state=on]:text-')
  return `capitalize text-xs px-3 py-1 w-20 min-w-20 max-w-20 text-center bg-background/20 text-white ${toggleClass}`
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
        :class="getToggleTypeClass(type)"
      >
        {{ type }}
      </ToggleGroupItem>
    </ToggleGroup>
  </div>
</template>
