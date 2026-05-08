<script setup lang="ts">
interface Props {
  progress: number // 0 to 100
  color?: 'primary' | 'success' | 'warning' | 'danger'
  height?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  progress: 0,
  color: 'primary',
  height: 'sm'
})

const colorClass = computed(() => {
  switch (props.color) {
    case 'success': return 'bg-emerald-400 shadow-[0_0_15px_#34D399]'
    case 'warning': return 'bg-amber-400 shadow-[0_0_15px_#FBBF24]'
    case 'danger': return 'bg-rose-400 shadow-[0_0_15px_#FB7185]'
    case 'primary':
    default: return 'bg-primary shadow-[0_0_15px_#4182FF]'
  }
})

const heightClass = computed(() => {
  switch (props.height) {
    case 'sm': return 'h-1.5'
    case 'md': return 'h-2.5'
    case 'lg': return 'h-4'
    default: return 'h-1.5'
  }
})

import { computed } from 'vue'
</script>

<template>
  <div 
    class="w-full bg-white/[0.05] rounded-full overflow-hidden border border-white/5 shadow-inner"
    :class="heightClass"
  >
    <div 
      class="h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden"
      :class="colorClass"
      :style="{ width: `${Math.min(Math.max(progress, 0), 100)}%` }"
    >
      <!-- Optional Shine reflection on the progress bar -->
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full h-full transform -skew-x-12 animate-[shimmer_2s_infinite]"></div>
    </div>
  </div>
</template>
