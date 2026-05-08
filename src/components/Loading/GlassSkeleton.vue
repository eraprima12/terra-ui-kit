<script setup lang="ts">
interface Props {
  width?: string
  height?: string
  rounded?: 'sm' | 'md' | 'lg' | 'full'
}

withDefaults(defineProps<Props>(), {
  width: 'w-full',
  height: 'h-4',
  rounded: 'md'
})
</script>

<template>
  <div 
    class="relative overflow-hidden bg-white/[0.02] border border-white/[0.05]"
    :class="[
      width, height,
      rounded === 'sm' ? 'rounded-sm' : rounded === 'md' ? 'rounded-md' : rounded === 'lg' ? 'rounded-xl' : 'rounded-full'
    ]"
  >
    <!-- Shimmer Effect -->
    <div class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent animate-shimmer"></div>
  </div>
</template>

<style scoped>
.animate-shimmer {
  animation: shimmer 2s infinite linear;
}
@keyframes shimmer {
  100% { transform: translateX(100%); }
}
</style>
