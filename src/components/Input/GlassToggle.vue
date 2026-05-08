<script setup lang="ts">
interface Props {
  modelValue: boolean
  label?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const toggle = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <label class="inline-flex items-center gap-3 cursor-pointer group">
    <div class="relative">
      <!-- Track -->
      <div 
        class="w-12 h-6 rounded-full transition-all duration-300 shadow-inner border border-white/10"
        :class="modelValue ? 'bg-primary/50 shadow-[inset_0_0_10px_rgba(65,130,255,0.5)]' : 'bg-white/10 group-hover:bg-white/20'"
      ></div>
      
      <!-- Thumb (Glass Circle) -->
      <div 
        class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-[0_2px_5px_rgba(0,0,0,0.5)] flex items-center justify-center"
        :class="modelValue ? 'translate-x-6' : 'translate-x-0'"
      >
        <!-- Subtle inner reflection on the thumb -->
        <div class="w-full h-full rounded-full bg-gradient-to-br from-white to-transparent opacity-50"></div>
      </div>
    </div>
    
    <span v-if="label" class="text-sm font-medium text-white/90 select-none">{{ label }}</span>
  </label>
</template>
