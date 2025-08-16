<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'small' | 'medium' | 'large'
  text?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  text: '',
  class: ''
})

const spinnerClasses = computed(() => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8', 
    large: 'h-32 w-32'
  }
  
  const borderClasses = {
    small: 'border-b-1',
    medium: 'border-b-2', 
    large: 'border-b-2'
  }
  
  return `animate-spin rounded-full ${sizeClasses[props.size]} ${borderClasses[props.size]} border-white ${props.class}`
})

const containerClasses = computed(() => {
  const heightClasses = {
    small: '',
    medium: '',
    large: 'h-64'
  }
  
  return `flex justify-center items-center ${heightClasses[props.size]}`
})
</script>

<template>
  <div :class="containerClasses">
    <div :class="spinnerClasses"></div>
    <span v-if="text" class="ml-2 text-foreground">{{ text }}</span>
  </div>
</template>