<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'primary'
});
</script>

<template>
  <div class="relative inline-flex items-center justify-center">
    <!-- Spinning Outer Ring -->
    <div 
      class="animate-spin rounded-full border-t-transparent border-r-transparent transition-all duration-300"
      :class="[
        size === 'sm' ? 'w-5 h-5 border-2' : size === 'lg' ? 'w-12 h-12 border-4' : 'w-8 h-8 border-3',
        color === 'primary' ? 'border-primary shadow-[0_0_15px_rgba(65,130,255,0.4)]' : '',
        color === 'success' ? 'border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.4)]' : '',
        color === 'warning' ? 'border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]' : '',
        color === 'danger' ? 'border-rose-400 shadow-[0_0_15px_rgba(251,113,133,0.4)]' : '',
      ]"
    ></div>

    <!-- Stationary Inner Glass Ring -->
    <div 
      class="absolute rounded-full border border-white/5 bg-white/[0.01]"
      :class="[
        size === 'sm' ? 'w-5 h-5 border-2' : size === 'lg' ? 'w-12 h-12 border-4' : 'w-8 h-8 border-3'
      ]"
    ></div>
  </div>
</template>
