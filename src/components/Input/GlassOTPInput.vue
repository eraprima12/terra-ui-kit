<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

interface Props {
  modelValue?: string;
  length?: number;
  label?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  length: 4,
  disabled: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const inputRefs = ref<HTMLInputElement[]>([]);
const pins = ref<string[]>(Array(props.length).fill(''));

// Keep internal array synced with external modelValue
watch(() => props.modelValue, (newVal) => {
  const cleanVal = newVal.replace(/[^0-9]/g, '').slice(0, props.length);
  for (let i = 0; i < props.length; i++) {
    pins.value[i] = cleanVal[i] || '';
  }
}, { immediate: true });

const emitValue = () => {
  emit('update:modelValue', pins.value.join(''));
};

const handleInput = (e: Event, idx: number) => {
  const target = e.target as HTMLInputElement;
  const val = target.value.replace(/[^0-9]/g, '');
  
  pins.value[idx] = val.slice(-1); // Only allow one digit
  emitValue();

  if (pins.value[idx] && idx < props.length - 1) {
    // Focus next box
    inputRefs.value[idx + 1]?.focus();
  }
};

const handleKeyDown = (e: KeyboardEvent, idx: number) => {
  if (e.key === 'Backspace') {
    if (!pins.value[idx] && idx > 0) {
      // Focus previous box and clear it
      pins.value[idx - 1] = '';
      emitValue();
      inputRefs.value[idx - 1]?.focus();
    } else {
      pins.value[idx] = '';
      emitValue();
    }
  }
};

const handlePaste = (e: ClipboardEvent) => {
  e.preventDefault();
  const pastedData = e.clipboardData?.getData('text') || '';
  const digits = pastedData.replace(/[^0-9]/g, '').slice(0, props.length);

  for (let i = 0; i < props.length; i++) {
    pins.value[i] = digits[i] || '';
  }
  emitValue();

  // Focus last filled box or last box overall
  const focusIdx = Math.min(digits.length, props.length - 1);
  inputRefs.value[focusIdx]?.focus();
};
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" class="text-sm font-medium text-white/90 ml-1">{{ label }}</label>
    
    <div class="flex items-center gap-3" @paste="handlePaste">
      <input
        v-for="(digit, idx) in length"
        :key="idx"
        ref="inputRefs"
        v-model="pins[idx]"
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        maxlength="1"
        :disabled="disabled"
        @input="handleInput($event, idx)"
        @keydown="handleKeyDown($event, idx)"
        class="w-12 h-14 bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-xl text-center text-xl font-bold font-mono text-white outline-none transition-all duration-300 focus:bg-white/[0.08] focus:border-primary/50 focus:ring-4 focus:ring-primary/20 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_20px_-10px_rgba(0,0,0,0.3)]"
      />
    </div>
  </div>
</template>
