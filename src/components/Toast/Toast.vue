<script setup lang="ts">
import { computed } from 'vue'
import { CheckCircle, AlertCircle, AlertTriangle, Info, Loader2, X } from 'lucide-vue-next'
import type { ToastOptions } from './useToast'
import { useToast } from './useToast'
import GlassButton from '../Button/GlassButton.vue'

const props = defineProps<{
  toast: ToastOptions
}>()

const { remove } = useToast()

const handleClose = () => {
  remove(props.toast.id!)
}

const handleAction = () => {
  if (props.toast.action) {
    props.toast.action.onClick()
    handleClose()
  }
}

// Added rich gradient backgrounds for each toast type
const typeStyles = computed(() => {
  switch (props.toast.type) {
    case 'success':
      return { 
        icon: CheckCircle, class: 'text-emerald-400', barClass: 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]',
        bgGlow: 'from-emerald-500/20 via-emerald-500/5 to-transparent'
      }
    case 'error':
      return { 
        icon: AlertCircle, class: 'text-rose-400', barClass: 'bg-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.8)]',
        bgGlow: 'from-rose-500/20 via-rose-500/5 to-transparent'
      }
    case 'warning':
      return { 
        icon: AlertTriangle, class: 'text-amber-400', barClass: 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]',
        bgGlow: 'from-amber-500/20 via-amber-500/5 to-transparent'
      }
    case 'info':
      return { 
        icon: Info, class: 'text-blue-400', barClass: 'bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]',
        bgGlow: 'from-blue-500/20 via-blue-500/5 to-transparent'
      }
    case 'loading':
      return { 
        icon: Loader2, class: 'text-primary', barClass: 'bg-transparent',
        bgGlow: 'from-primary/20 via-primary/5 to-transparent'
      }
    default:
      return { 
        icon: Info, class: 'text-white', barClass: 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]',
        bgGlow: 'from-white/10 via-transparent to-transparent'
      }
  }
})
</script>

<template>
  <div 
    class="glass-panel-strong rounded-2xl p-4 flex items-start gap-4 w-[380px] relative overflow-hidden group transition-all duration-500 hover:scale-[1.02]"
    role="alert"
  >
    <!-- Soft ambient glow behind the icon (Animated via transition-opacity and Vue transitions on absolute divs) -->
    <div class="absolute inset-0 bg-gradient-to-r pointer-events-none transition-all duration-700 ease-in-out" :class="typeStyles.bgGlow"></div>

    <!-- Progress Bar Timer -->
    <div 
      v-if="toast.duration && toast.duration > 0"
      class="absolute bottom-0 left-0 h-[3px] opacity-90 animate-progress rounded-r-full z-20"
      :class="typeStyles.barClass"
      :style="{ animationDuration: `${toast.duration}ms` }"
    ></div>
    
    <div class="flex-shrink-0 mt-0.5 z-10 relative">
      <div class="p-2 rounded-xl bg-white/5 border border-white/10 shadow-inner flex items-center justify-center w-9 h-9">
        <Transition name="icon-pop" mode="out-in">
          <component 
            :is="typeStyles.icon" 
            :key="toast.type"
            class="w-5 h-5 drop-shadow-md" 
            :class="[typeStyles.class, { 'animate-spin': toast.type === 'loading' }]" 
          />
        </Transition>
      </div>
    </div>
    
    <div class="flex-1 min-w-0 z-10 relative pt-1">
      <h4 class="text-sm font-bold text-white tracking-wide drop-shadow-sm transition-colors duration-500">{{ toast.title }}</h4>
      
      <Transition name="fade-slide">
        <p v-if="toast.message" class="text-[13px] leading-relaxed text-white/70 mt-1.5 line-clamp-2">
          {{ toast.message }}
        </p>
      </Transition>
      
      <div v-if="toast.action" class="mt-3">
        <GlassButton variant="primary" size="sm" @click="handleAction" class="!px-3 !py-1.5 !text-xs">
          {{ toast.action.label }}
        </GlassButton>
      </div>
    </div>

    <button 
      @click="handleClose"
      class="flex-shrink-0 text-white/40 hover:text-white transition-all rounded-full hover:bg-white/10 p-1.5 -mr-2 -mt-1 z-10 relative focus:outline-none focus:ring-2 focus:ring-primary/50"
    >
      <X class="w-4 h-4" />
    </button>
  </div>
</template>

<style scoped>
@keyframes progress {
  from { width: 100%; }
  to { width: 0%; }
}
.animate-progress {
  animation: progress linear forwards;
}

/* Icon Pop Animation */
.icon-pop-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.icon-pop-leave-active {
  transition: all 0.2s ease-in;
}
.icon-pop-enter-from {
  opacity: 0;
  transform: scale(0.3) rotate(-90deg);
}
.icon-pop-leave-to {
  opacity: 0;
  transform: scale(0.3) rotate(90deg);
}

/* Message Fade Slide Animation */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
</style>
