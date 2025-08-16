<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  src: string
  alt: string
  size?: 'small' | 'medium' | 'large'
  background?: string
  radius?: 'none' | 'small' | 'medium' | 'large' | 'full'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  background: 'bg-muted backdrop-blur-sm',
  radius: 'medium'
})

const containerClasses = computed(() => {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24', 
    large: 'w-32 h-32'
  }
  
  const radiusClasses = {
    none: 'rounded-none',
    small: 'rounded-sm',
    medium: 'rounded-md',
    large: 'rounded-lg',
    full: 'rounded-full'
  }
  
  return `${sizeClasses[props.size]} ${radiusClasses[props.radius]} ${props.background} flex items-center justify-center shadow-md dark:shadow-white/20`
})

const imageClasses = computed(() => {
  const classes = {
    small: 'w-12 h-12',
    medium: 'w-20 h-20',
    large: 'w-24 h-24'
  }
  return `${classes[props.size]} object-contain`
})
</script>

<template>
  <div :class="containerClasses">
    <img
      :src="src"
      :alt="alt"
      :class="imageClasses"
      loading="lazy"
      decoding="async"
    />
  </div>
</template>