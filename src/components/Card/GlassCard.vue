<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  padding: 'md',
  hover: true
})
</script>

<template>
  <div 
    class="glass-panel-strong rounded-[1.5rem] relative overflow-hidden transition-all duration-500"
    :class="[
      padding === 'none' ? 'p-0' : padding === 'sm' ? 'p-4' : padding === 'md' ? 'p-6' : 'p-8',
      { 'hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(65,130,255,0.15)]': hover }
    ]"
  >
    <!-- Optional Glossy Shine Effect -->
    <div class="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-100"></div>

    <div v-if="title || subtitle || $slots.header" class="mb-4">
      <slot name="header">
        <h3 v-if="title" class="text-lg font-bold text-white tracking-tight">{{ title }}</h3>
        <p v-if="subtitle" class="text-sm text-white/60 mt-1">{{ subtitle }}</p>
      </slot>
    </div>

    <div class="relative z-10">
      <slot></slot>
    </div>

    <div v-if="$slots.footer" class="mt-6 pt-4 border-t border-white/10">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
