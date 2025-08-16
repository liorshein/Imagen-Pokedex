<script setup lang="ts">
import type { PokemonAbility } from '@/types/pokemon'

defineProps<{
  abilities: PokemonAbility[]
}>()
</script>

<template>
  <div class="space-y-3">
    <h3 class="text-lg font-semibold text-foreground border-b border-border pb-1">Abilities</h3>
    <div class="flex flex-wrap gap-2">
      <div
        v-for="ability in abilities"
        :key="ability.ability.name"
        :class="[
          'px-3 py-1 rounded-full text-sm font-medium capitalize',
          ability.is_hidden
            ? 'bg-purple-500/80 text-white border border-purple-300/50'
            : 'bg-blue-500/80 text-white',
        ]"
      >
        {{ ability.ability.name.replace('-', ' ') }}
        <span v-if="ability.is_hidden" class="text-xs opacity-75 ml-1">(Hidden)</span>
      </div>
    </div>
  </div>
</template>
