<script setup lang="ts">
import { computed } from 'vue'
import { getTypeClass } from '@/lib/pokemon'
import type { PokemonType } from '@/types/pokemon'

const props = withDefaults(
  defineProps<{
    types: PokemonType[]
    size?: 'small' | 'medium' | 'large'
  }>(),
  {
    size: 'medium',
  },
)

const sizeClasses = computed(() => {
  const classes = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-2 py-1 text-xs',
    large: 'px-3 py-1 text-sm',
  }
  return classes[props.size]
})
</script>

<template>
  <div class="flex flex-wrap gap-1 justify-center">
    <span
      v-for="type in types"
      :key="type.type.name"
      :class="`${getTypeClass(type.type.name)} ${sizeClasses} rounded-full font-medium capitalize`"
    >
      {{ type.type.name }}
    </span>
  </div>
</template>
