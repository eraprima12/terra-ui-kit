<script setup lang="ts">
import { ref } from 'vue'

interface Tab {
  label: string
  value: string
}

interface Props {
  tabs: Tab[]
  modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Tab Headers -->
    <div class="flex items-center gap-2 p-1.5 bg-white/[0.02] border border-white/10 rounded-xl backdrop-blur-md self-start">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        @click="emit('update:modelValue', tab.value)"
        class="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 relative outline-none focus:ring-2 focus:ring-primary/50"
        :class="modelValue === tab.value ? 'text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)]' : 'text-white/50 hover:text-white/80 hover:bg-white/5'"
      >
        <!-- Active Background Indicator -->
        <div 
          v-if="modelValue === tab.value"
          class="absolute inset-0 bg-white/10 border border-white/20 rounded-lg pointer-events-none"
        ></div>
        
        <span class="relative z-10">{{ tab.label }}</span>
      </button>
    </div>

    <!-- Tab Content -->
    <div class="relative min-h-[100px]">
      <slot></slot>
    </div>
  </div>
</template>
