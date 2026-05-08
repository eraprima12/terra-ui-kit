<script setup lang="ts">
import { useSlots } from 'vue'

interface Props {
  modelValue?: string | number
  type?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  iconPosition?: 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  iconPosition: 'left'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const slots = useSlots()
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" class="text-sm font-medium text-white/90 ml-1">{{ label }}</label>
    
    <div class="relative flex items-center group w-full">
      <!-- Prefix Slot -->
      <div 
        v-if="slots.prefix" 
        class="absolute left-3.5 text-white/40 group-focus-within:text-primary transition-colors text-sm select-none flex items-center justify-center pointer-events-none"
      >
        <slot name="prefix"></slot>
      </div>

      <!-- Icon Slot (Legacy compatibility) -->
      <div 
        v-else-if="slots.icon && iconPosition === 'left'" 
        class="absolute left-3.5 flex items-center justify-center text-white/40 group-focus-within:text-primary transition-colors duration-300 pointer-events-none"
      >
        <slot name="icon"></slot>
      </div>

      <input
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        class="w-full bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-xl py-2.5 text-white placeholder-white/30 outline-none transition-all duration-300 focus:bg-white/[0.08] focus:border-primary/50 focus:ring-4 focus:ring-primary/20 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed shadow-inner"
        :class="[
          { '!border-rose-400 focus:!ring-rose-400/20': error },
          slots.prefix ? 'pl-10' : (slots.icon && iconPosition === 'left' ? 'pl-10' : 'px-4'),
          slots.suffix ? 'pr-10' : (slots.icon && iconPosition === 'right' ? 'pr-10' : 'px-4')
        ]"
      />

      <!-- Suffix Slot -->
      <div 
        v-if="slots.suffix" 
        class="absolute right-3.5 text-white/40 group-focus-within:text-primary transition-colors text-sm select-none flex items-center justify-center pointer-events-none"
      >
        <slot name="suffix"></slot>
      </div>

      <!-- Icon Slot Right (Legacy compatibility) -->
      <div 
        v-else-if="slots.icon && iconPosition === 'right'" 
        class="absolute right-3.5 flex items-center justify-center text-white/40 group-focus-within:text-primary transition-colors duration-300 pointer-events-none"
      >
        <slot name="icon"></slot>
      </div>
    </div>

    <!-- Error Message -->
    <span v-if="error" class="text-xs text-rose-400 ml-1 mt-0.5">{{ error }}</span>
  </div>
</template>
