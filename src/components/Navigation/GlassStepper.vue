<script setup lang="ts">
import { Check } from 'lucide-vue-next';

interface Props {
  modelValue?: number; // 1-indexed current active step
  steps: string[]; // e.g. ['Account', 'Details', 'Payment', 'Review']
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 1,
  disabled: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const handleStepClick = (stepIndex: number) => {
  if (props.disabled) return;
  emit('update:modelValue', stepIndex + 1);
};
</script>

<template>
  <div class="w-full flex flex-col gap-6">
    <!-- Stepper Nodes Container -->
    <div class="relative flex items-center justify-between w-full">
      <!-- Background Connecting Line -->
      <div class="absolute left-0 right-0 h-[2px] bg-white/10 -translate-y-4"></div>
      
      <!-- Glowing Active Progress Line -->
      <div 
        class="absolute left-0 h-[2px] bg-primary shadow-[0_0_10px_rgba(65,130,255,0.6)] -translate-y-4 transition-all duration-500 ease-out"
        :style="{ width: `${((modelValue - 1) / (steps.length - 1)) * 100}%` }"
      ></div>

      <!-- Step Nodes -->
      <div 
        v-for="(step, idx) in steps" 
        :key="idx"
        class="relative flex flex-col items-center flex-1 group"
      >
        <!-- Node Circle -->
        <button
          type="button"
          :disabled="disabled"
          @click="handleStepClick(idx)"
          class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 relative z-10 focus:outline-none"
          :class="[
            idx + 1 < modelValue 
              ? 'bg-primary border border-white/20 text-white shadow-[0_0_15px_rgba(65,130,255,0.4)]' 
              : idx + 1 === modelValue
                ? 'bg-[#0b0c14] border-2 border-primary text-primary shadow-[0_0_15px_rgba(65,130,255,0.2)] scale-110'
                : 'bg-[#0b0c14] border border-white/15 text-white/40 hover:border-white/30 hover:text-white/70'
          ]"
        >
          <!-- Neon Pulse Ring for Active Node -->
          <div 
            v-if="idx + 1 === modelValue" 
            class="absolute -inset-1 rounded-full border border-primary/40 animate-ping pointer-events-none"
          ></div>

          <!-- Number or Check Icon -->
          <Transition name="icon-fade" mode="out-in">
            <Check v-if="idx + 1 < modelValue" class="w-4 h-4 text-white" />
            <span v-else>{{ idx + 1 }}</span>
          </Transition>
        </button>

        <!-- Step Label -->
        <span 
          class="mt-3 text-xs font-semibold tracking-wide transition-colors duration-300 select-none text-center"
          :class="[
            idx + 1 <= modelValue ? 'text-white' : 'text-white/40'
          ]"
        >
          {{ step }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon-fade-enter-active,
.icon-fade-leave-active {
  transition: all 0.15s ease;
}
.icon-fade-enter-from,
.icon-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
