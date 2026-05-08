<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom-left',
  width: 'w-56'
})

const isOpen = ref(false)
const popupRef = ref<HTMLElement | null>(null)

const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

// Close when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (popupRef.value && !popupRef.value.contains(event.target as Node)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="relative inline-block text-left" ref="popupRef">
    <!-- Trigger -->
    <div @click="toggle" class="cursor-pointer inline-block">
      <slot name="trigger"></slot>
    </div>

    <!-- Popup Content -->
    <Transition name="popup-scale">
      <div 
        v-if="isOpen" 
        class="absolute z-50 mt-2 glass-panel-strong rounded-xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden backdrop-blur-2xl"
        :class="[
          width,
          {
            'origin-top-right right-0': position === 'bottom-right',
            'origin-top-left left-0': position === 'bottom-left',
            'origin-bottom-right right-0 bottom-full mb-2': position === 'top-right',
            'origin-bottom-left left-0 bottom-full mb-2': position === 'top-left'
          }
        ]"
      >
        <div class="py-1">
          <slot :close="close"></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.popup-scale-enter-active {
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.popup-scale-leave-active {
  transition: all 0.15s ease-in;
}
.popup-scale-enter-from,
.popup-scale-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}
</style>
