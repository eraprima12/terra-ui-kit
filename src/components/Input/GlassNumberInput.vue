<script setup lang="ts">
import { ChevronUp, ChevronDown } from 'lucide-vue-next';

interface Props {
  modelValue?: number;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  placeholder: '',
  disabled: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const handleIncrement = () => {
  if (props.disabled) return;
  const val = Math.min(props.modelValue + props.step, props.max);
  emit('update:modelValue', val);
};

const handleDecrement = () => {
  if (props.disabled) return;
  const val = Math.max(props.modelValue - props.step, props.min);
  emit('update:modelValue', val);
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let val = parseInt(target.value) || 0;
  val = Math.max(props.min, Math.min(val, props.max));
  emit('update:modelValue', val);
};
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" class="text-sm font-medium text-white/90 ml-1">{{ label }}</label>
    
    <div class="relative flex items-center group w-full">
      <input
        type="text"
        :value="modelValue"
        @input="handleInput"
        :placeholder="placeholder"
        :disabled="disabled"
        class="w-full bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-xl pl-4 pr-12 py-2.5 text-white placeholder-white/30 outline-none transition-all duration-300 focus:bg-white/[0.08] focus:border-primary/50 focus:ring-4 focus:ring-primary/20 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed shadow-inner"
      />

      <!-- Action Buttons -->
      <div class="absolute right-2 flex flex-col border border-white/10 bg-white/5 rounded-lg overflow-hidden h-9 w-8 select-none">
        <button 
          @click="handleIncrement"
          :disabled="disabled || modelValue >= max"
          class="flex-1 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronUp class="w-3.5 h-3.5" />
        </button>
        <div class="border-t border-white/10"></div>
        <button 
          @click="handleDecrement"
          :disabled="disabled || modelValue <= min"
          class="flex-1 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronDown class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </div>
</template>
