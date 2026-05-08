<script setup lang="ts">
interface Props {
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

withDefaults(defineProps<Props>(), {
  position: 'top'
})
</script>

<template>
  <div class="relative inline-block group">
    <slot></slot>
    
    <div 
      class="absolute z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
      :class="{
        'bottom-full left-1/2 -translate-x-1/2 mb-2 group-hover:-translate-y-1': position === 'top',
        'top-full left-1/2 -translate-x-1/2 mt-2 group-hover:translate-y-1': position === 'bottom',
        'right-full top-1/2 -translate-y-1/2 mr-2 group-hover:-translate-x-1': position === 'left',
        'left-full top-1/2 -translate-y-1/2 ml-2 group-hover:translate-x-1': position === 'right',
      }"
    >
      <div class="glass-panel-strong px-3 py-1.5 rounded-lg text-xs font-medium text-white shadow-xl whitespace-nowrap border border-white/10 backdrop-blur-2xl">
        {{ text }}
      </div>
    </div>
  </div>
</template>
