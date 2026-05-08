<script setup lang="ts">
import { Check } from 'lucide-vue-next'

interface Props {
  modelValue: boolean
  label?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const toggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}
</script>

<template>
  <label 
    class="inline-flex items-center gap-3 group"
    :class="disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'"
  >
    <div class="relative flex items-center justify-center">
      <!-- Hidden Input -->
      <input 
        type="checkbox" 
        class="peer sr-only"
        :checked="modelValue"
        :disabled="disabled"
        @change="toggle"
      />
      <!-- Glass Box -->
      <div 
        class="w-5 h-5 rounded-md border transition-all duration-300 shadow-inner flex items-center justify-center peer-focus-visible:ring-2 peer-focus-visible:ring-primary/50"
        :class="modelValue ? 'bg-primary border-primary shadow-[0_0_10px_rgba(65,130,255,0.4)]' : 'bg-white/[0.05] border-white/20 group-hover:bg-white/[0.1]'"
      >
        <Check 
          class="w-3.5 h-3.5 text-white transition-transform duration-300"
          :class="modelValue ? 'scale-100 opacity-100' : 'scale-50 opacity-0'"
        />
      </div>
    </div>
    <span v-if="label" class="text-sm text-white/90 select-none">{{ label }}</span>
  </label>
</template>
