<script setup lang="ts">
interface Props {
  title: string
  description: string
  suggestion?: string
  icon?: string
}

withDefaults(defineProps<Props>(), {
  suggestion: 'Try adjusting your search or filters',
})
</script>

<template>
  <div class="text-center mt-16">
    <h3 class="text-2xl font-bold text-white mb-2">{{ title }}</h3>
    <p class="text-white/80 mb-4">{{ description }}</p>
    <p v-if="suggestion" class="text-white/60 text-sm">{{ suggestion }}</p>
  </div>
</template>
