<script setup lang="ts">
import { useToast } from './useToast'
import Toast from './Toast.vue'

const { toasts } = useToast()
</script>

<template>
  <div class="fixed z-50 flex flex-col gap-3 pointer-events-none p-4 top-4 right-4">
    <TransitionGroup 
      name="toast" 
      tag="div"
      class="flex flex-col gap-3 items-end"
    >
      <div 
        v-for="toast in toasts" 
        :key="toast.id"
        class="pointer-events-auto w-full max-w-sm"
      >
        <Toast :toast="toast" />
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}
.toast-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
