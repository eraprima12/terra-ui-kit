<script setup lang="ts">
import { ref } from 'vue';
import { X } from 'lucide-vue-next';

interface Props {
  modelValue?: string[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  placeholder: 'Type tag and press Enter',
  disabled: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
}>();

const newTag = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

const addTag = () => {
  const clean = newTag.value.trim().toLowerCase();
  if (clean && !props.modelValue.includes(clean)) {
    const updated = [...props.modelValue, clean];
    emit('update:modelValue', updated);
    newTag.value = '';
  }
};

const removeTag = (tagToRemove: string) => {
  const updated = props.modelValue.filter(tag => tag !== tagToRemove);
  emit('update:modelValue', updated);
};

const handleBackspace = () => {
  if (!newTag.value && props.modelValue.length > 0) {
    // Remove last tag
    const updated = [...props.modelValue];
    updated.pop();
    emit('update:modelValue', updated);
  }
};

const focusInput = () => {
  if (!props.disabled) {
    inputRef.value?.focus();
  }
};
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" class="text-sm font-medium text-white/90 ml-1">{{ label }}</label>
    
    <!-- Unified Wrapping Border simulating an Input Box -->
    <div 
      @click="focusInput"
      class="flex flex-wrap items-center gap-2 w-full bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-xl px-3 py-2.5 outline-none transition-all duration-300 focus-within:bg-white/[0.08] focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/20 hover:border-white/20 disabled:opacity-50 cursor-text min-h-[46px] shadow-inner"
      :class="{ 'opacity-50 cursor-not-allowed': disabled }"
    >
      <!-- Glass Tags -->
      <TransitionGroup name="tag-pop">
        <div 
          v-for="tag in modelValue" 
          :key="tag"
          class="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-primary/20 border border-primary/20 text-xs font-semibold text-white select-none transition-all hover:bg-primary/35"
        >
          <span>{{ tag }}</span>
          <button 
            v-if="!disabled"
            type="button"
            @click.stop="removeTag(tag)"
            class="text-white/40 hover:text-white transition-colors focus:outline-none"
          >
            <X class="w-3 h-3" />
          </button>
        </div>
      </TransitionGroup>

      <!-- Nested Text Input -->
      <input
        ref="inputRef"
        v-model="newTag"
        type="text"
        :disabled="disabled"
        :placeholder="modelValue.length === 0 ? placeholder : ''"
        @keydown.enter.prevent="addTag"
        @keydown.backspace="handleBackspace"
        class="flex-1 min-w-[120px] bg-transparent border-none outline-none text-white text-sm placeholder-white/30 focus:ring-0 p-0"
      />
    </div>
  </div>
</template>

<style scoped>
.tag-pop-enter-active,
.tag-pop-leave-active {
  transition: all 0.2s ease;
}
.tag-pop-enter-from {
  opacity: 0;
  transform: scale(0.85) translateY(2px);
}
.tag-pop-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-2px);
}
</style>
