<script setup lang="ts">
import { X } from 'lucide-vue-next'

interface Props {
  modelValue: boolean
  title?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  persistent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: 'md',
  persistent: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const close = () => {
  if (!props.persistent) {
    emit('update:modelValue', false)
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div 
        v-if="modelValue" 
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      >
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-[#030305]/70 backdrop-blur-[10px] transition-opacity"
          @click="close"
        ></div>

        <!-- Modal Dialog -->
        <Transition name="modal-scale" appear>
          <div 
            v-if="modelValue"
            class="glass-panel-strong w-full rounded-2xl sm:rounded-[2rem] relative z-10 flex flex-col overflow-hidden max-h-full shadow-2xl border border-white/20"
            :class="{
              'max-w-sm': maxWidth === 'sm',
              'max-w-md': maxWidth === 'md',
              'max-w-lg': maxWidth === 'lg',
              'max-w-2xl': maxWidth === 'xl',
              'max-w-full m-4': maxWidth === 'full'
            }"
          >
            <!-- Header -->
            <div class="px-6 py-4 flex items-center justify-between border-b border-white/10 bg-white/[0.02]">
              <h3 class="text-lg font-bold text-white tracking-tight">
                <slot name="title">{{ title }}</slot>
              </h3>
              <button 
                @click="emit('update:modelValue', false)"
                class="text-white/50 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <X class="w-5 h-5" />
              </button>
            </div>

            <!-- Body -->
            <div class="p-6 overflow-y-auto">
              <slot></slot>
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="px-6 py-4 bg-black/20 border-t border-white/10 flex items-center justify-end gap-3">
              <slot name="footer"></slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-scale-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-scale-leave-active {
  transition: all 0.3s ease-in;
}
.modal-scale-enter-from,
.modal-scale-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}
</style>
