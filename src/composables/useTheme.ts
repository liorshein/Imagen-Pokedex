import { useColorMode } from '@vueuse/core'
import { computed } from 'vue'

export function useTheme() {
  const mode = useColorMode({
    attribute: 'class',
    modes: {
      light: 'light',
      dark: 'dark',
    },
  })

  const isDark = computed(() => mode.value === 'dark')

  const setTheme = (theme: 'light' | 'dark' | 'auto') => {
    mode.value = theme
  }

  const toggleTheme = () => {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
  }

  return {
    mode,
    isDark,
    setTheme,
    toggleTheme,
  }
}
