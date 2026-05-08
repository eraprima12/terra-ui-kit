<script setup lang="ts">
import { computed } from 'vue'
import { Loader2 } from 'lucide-vue-next'

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'glass' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'fab'
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  type: 'button'
})

const baseClasses = "relative inline-flex items-center justify-center font-medium transition-all duration-300 ease-in-out overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return "glass-surface bg-primary-tint border-primary/30 text-white hover:bg-primary/30 hover:border-primary/50 shadow-[0_0_15px_rgba(65,130,255,0.1)] hover:shadow-[0_0_20px_rgba(65,130,255,0.25)]"
    case 'secondary':
      return "glass-surface hover:bg-white/10 text-white"
    case 'ghost':
      return "bg-transparent hover:bg-white/5 text-white/80 hover:text-white border-transparent"
    case 'outline':
      return "border border-white/20 hover:border-white/40 text-white bg-transparent"
    case 'glass':
      return "bg-white/[0.06] backdrop-blur-md border-white/10 hover:bg-white/10 text-white"
    case 'danger':
      return "glass-surface bg-danger-soft border-danger/30 text-danger hover:bg-danger/20 hover:border-danger/50"
    default:
      return "glass-surface hover:bg-white/10 text-white"
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return "px-3 py-1.5 text-sm rounded-md"
    case 'md': return "px-4 py-2 text-sm rounded-lg min-h-[40px]"
    case 'lg': return "px-6 py-3 text-base rounded-xl min-h-[48px]"
    case 'icon': return "p-2 rounded-lg w-10 h-10"
    case 'fab': return "p-4 rounded-full shadow-lg min-w-[56px] min-h-[56px]"
    default: return "px-4 py-2 text-sm rounded-lg"
  }
})
</script>

<template>
  <button 
    :type="type"
    :disabled="disabled || loading"
    :class="[baseClasses, variantClasses, sizeClasses]"
  >
    <!-- Soft glow effect -->
    <div class="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/0"></div>
    
    <!-- Content container to preserve width when loading -->
    <span :class="['flex items-center gap-2', { 'opacity-0': loading }]">
      <slot></slot>
    </span>

    <!-- Loading spinner overlay -->
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center">
      <Loader2 class="w-5 h-5 animate-spin text-current" />
    </div>
  </button>
</template>
