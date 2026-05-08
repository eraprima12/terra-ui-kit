<script setup lang="ts">
import { ref, computed } from 'vue'
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-vue-next'

interface Props {
  type?: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  dismissible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  dismissible: false
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const isVisible = ref(true)

const close = () => {
  isVisible.value = false
  emit('close')
}

const typeStyles = computed(() => {
  switch (props.type) {
    case 'success':
      return { 
        icon: CheckCircle, 
        iconColor: 'text-emerald-400', 
        bgGlow: 'bg-emerald-500/10',
        borderColor: 'border-emerald-500/30'
      }
    case 'error':
      return { 
        icon: AlertCircle, 
        iconColor: 'text-rose-400', 
        bgGlow: 'bg-rose-500/10',
        borderColor: 'border-rose-500/30'
      }
    case 'warning':
      return { 
        icon: AlertTriangle, 
        iconColor: 'text-amber-400', 
        bgGlow: 'bg-amber-500/10',
        borderColor: 'border-amber-500/30'
      }
    case 'info':
    default:
      return { 
        icon: Info, 
        iconColor: 'text-blue-400', 
        bgGlow: 'bg-blue-500/10',
        borderColor: 'border-blue-500/30'
      }
  }
})
</script>

<template>
  <Transition name="alert-fade">
    <div 
      v-if="isVisible"
      class="glass-panel-strong rounded-2xl p-4 flex items-start gap-4 relative overflow-hidden transition-all duration-300 w-full"
      :class="typeStyles.borderColor"
      role="alert"
    >
      <!-- Subtle Background Glow -->
      <div class="absolute inset-0 pointer-events-none transition-colors duration-300" :class="typeStyles.bgGlow"></div>
      
      <!-- Icon -->
      <div class="flex-shrink-0 mt-0.5 z-10 relative">
        <component :is="typeStyles.icon" class="w-5 h-5 drop-shadow-md" :class="typeStyles.iconColor" />
      </div>
      
      <!-- Content -->
      <div class="flex-1 min-w-0 z-10 relative pt-0.5">
        <h4 class="text-sm font-bold text-white tracking-wide">{{ title }}</h4>
        <p v-if="message" class="text-sm text-white/70 mt-1 leading-relaxed">
          {{ message }}
        </p>
        
        <!-- Action Slot (e.g. Buttons) -->
        <div v-if="$slots.action" class="mt-3">
          <slot name="action"></slot>
        </div>
      </div>

      <!-- Dismiss Button -->
      <button 
        v-if="dismissible"
        @click="close"
        class="flex-shrink-0 text-white/40 hover:text-white transition-all rounded-full hover:bg-white/10 p-1.5 -mr-2 -mt-1 z-10 relative focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label="Close"
      >
        <X class="w-4 h-4" />
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.alert-fade-enter-active,
.alert-fade-leave-active {
  transition: all 0.3s ease;
}
.alert-fade-enter-from,
.alert-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}
</style>
