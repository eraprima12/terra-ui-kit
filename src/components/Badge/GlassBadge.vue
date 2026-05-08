<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
  size?: 'sm' | 'md'
  dot?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  dot: false
})

const variantStyles = computed(() => {
  switch (props.variant) {
    case 'primary': return 'bg-primary/20 text-primary border-primary/30 shadow-[0_0_10px_rgba(65,130,255,0.2)]'
    case 'success': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(52,211,153,0.2)]'
    case 'warning': return 'bg-amber-500/20 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(251,191,36,0.2)]'
    case 'danger': return 'bg-rose-500/20 text-rose-400 border-rose-500/30 shadow-[0_0_10px_rgba(251,113,133,0.2)]'
    case 'info': return 'bg-blue-500/20 text-blue-400 border-blue-500/30 shadow-[0_0_10px_rgba(96,165,250,0.2)]'
    default: return 'bg-white/10 text-white/80 border-white/20'
  }
})

const dotColor = computed(() => {
  switch (props.variant) {
    case 'primary': return 'bg-primary shadow-[0_0_5px_#4182FF]'
    case 'success': return 'bg-emerald-400 shadow-[0_0_5px_#34D399]'
    case 'warning': return 'bg-amber-400 shadow-[0_0_5px_#FBBF24]'
    case 'danger': return 'bg-rose-400 shadow-[0_0_5px_#FB7185]'
    case 'info': return 'bg-blue-400 shadow-[0_0_5px_#60A5FA]'
    default: return 'bg-white shadow-[0_0_5px_#FFFFFF]'
  }
})
</script>

<template>
  <span 
    class="inline-flex items-center gap-1.5 font-medium border backdrop-blur-md rounded-full transition-all"
    :class="[
      variantStyles,
      size === 'sm' ? 'px-2 py-0.5 text-[10px] uppercase tracking-wider' : 'px-2.5 py-1 text-xs'
    ]"
  >
    <span v-if="dot" class="w-1.5 h-1.5 rounded-full" :class="dotColor"></span>
    <slot></slot>
  </span>
</template>
