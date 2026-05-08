<script setup lang="ts">
interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  rows?: number
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  disabled: false,
  rows: 4
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" class="text-sm font-medium text-white/90 ml-1">{{ label }}</label>
    
    <textarea
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      class="w-full bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none transition-all duration-300 focus:bg-white/[0.08] focus:border-primary/50 focus:ring-4 focus:ring-primary/20 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed shadow-inner resize-y"
      :class="{ '!border-rose-400 focus:!ring-rose-400/20': error }"
    ></textarea>

    <span v-if="error" class="text-xs text-rose-400 ml-1 mt-0.5">{{ error }}</span>
  </div>
</template>
