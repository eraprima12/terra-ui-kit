<script setup lang="ts">
import { useSlots } from 'vue';

interface Props {
  modelValue?: string;
  label?: string;
  mask: string; // e.g., "##.###.###.#-###.###" for NPWP or "####-####-####-####" for Credit Cards
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  disabled: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const slots = useSlots();

const formatValue = (raw: string, maskPattern: string) => {
  // Extract only digits/alphanumeric depending on mask
  const clean = raw.replace(/[^a-zA-Z0-9]/g, '');
  let formatted = '';
  let cleanIdx = 0;

  for (let i = 0; i < maskPattern.length; i++) {
    if (cleanIdx >= clean.length) break;

    const maskChar = maskPattern[i];
    if (maskChar === '#') {
      formatted += clean[cleanIdx];
      cleanIdx++;
    } else {
      formatted += maskChar;
    }
  }

  return formatted;
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const rawInput = target.value;
  
  // Apply mask on-the-fly
  const formatted = formatValue(rawInput, props.mask);
  
  // Sync input value back to DOM directly to prevent cursor skipping
  target.value = formatted;
  emit('update:modelValue', formatted);
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
        :placeholder="placeholder || mask"
        :disabled="disabled"
        class="w-full bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 outline-none transition-all duration-300 focus:bg-white/[0.08] focus:border-primary/50 focus:ring-4 focus:ring-primary/20 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed shadow-inner font-mono tracking-wider"
      />
    </div>
  </div>
</template>
