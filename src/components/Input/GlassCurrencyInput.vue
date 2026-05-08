<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue?: number;
  label?: string;
  prefix?: string; // e.g., "Rp" or "$"
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  prefix: 'Rp',
  placeholder: '0',
  disabled: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

// Formatted display representation
const formattedValue = computed(() => {
  if (props.modelValue === undefined || props.modelValue === null) return '';
  return props.modelValue.toLocaleString('id-ID'); // Format with dot separators (Indonesian standard)
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const rawInput = target.value;
  
  // Extract digits only
  const cleanDigits = rawInput.replace(/\D/g, '');
  const numericValue = parseInt(cleanDigits) || 0;
  
  // Update internal representation
  target.value = numericValue.toLocaleString('id-ID');
  emit('update:modelValue', numericValue);
};
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" class="text-sm font-medium text-white/90 ml-1">{{ label }}</label>
    
    <div class="relative flex items-center group w-full">
      <!-- Currency Prefix Badge -->
      <span class="absolute left-3.5 text-sm font-bold text-white/40 group-focus-within:text-primary transition-colors select-none">
        {{ prefix }}
      </span>

      <input
        type="text"
        :value="formattedValue"
        @input="handleInput"
        :placeholder="placeholder"
        :disabled="disabled"
        class="w-full bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-xl pl-12 pr-4 py-2.5 text-white placeholder-white/30 outline-none transition-all duration-300 focus:bg-white/[0.08] focus:border-primary/50 focus:ring-4 focus:ring-primary/20 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed shadow-inner font-semibold"
      />
    </div>
  </div>
</template>
