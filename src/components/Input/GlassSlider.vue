<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  modelValue: number
  min?: number
  max?: number
  step?: number
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const trackRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)

const percentage = computed(() => {
  return ((props.modelValue - props.min) / (props.max - props.min)) * 100
})

const updateValue = (clientX: number) => {
  if (!trackRef.value) return
  const rect = trackRef.value.getBoundingClientRect()
  const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
  const rawPercentage = x / rect.width
  const rawValue = props.min + rawPercentage * (props.max - props.min)
  
  // Snap to step
  const steppedValue = Math.round(rawValue / props.step) * props.step
  const finalValue = Math.max(props.min, Math.min(steppedValue, props.max))
  
  emit('update:modelValue', finalValue)
}

const handleMouseDown = (e: MouseEvent) => {
  isDragging.value = true
  updateValue(e.clientX)
}

const handleMouseMove = (e: MouseEvent) => {
  if (isDragging.value) updateValue(e.clientX)
}

const handleMouseUp = () => {
  isDragging.value = false
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseup', handleMouseUp)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseup', handleMouseUp)
})
</script>

<template>
  <div 
    class="relative w-full h-6 flex items-center group cursor-pointer"
    @mousedown="handleMouseDown"
  >
    <!-- Track Background -->
    <div 
      ref="trackRef"
      class="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden border border-white/5 shadow-inner"
    >
      <!-- Active Track -->
      <div 
        class="h-full bg-primary transition-all duration-75 shadow-[0_0_15px_#4182FF]"
        :style="{ width: `${percentage}%` }"
      ></div>
    </div>

    <!-- Thumb -->
    <div 
      class="absolute w-5 h-5 rounded-full bg-white border border-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.5)] flex items-center justify-center transition-all duration-75 hover:scale-110 outline-none focus:ring-4 focus:ring-primary/30"
      :class="{ 'scale-110 shadow-[0_0_15px_rgba(65,130,255,0.5)]': isDragging }"
      :style="{ left: `calc(${percentage}% - 10px)` }"
      tabindex="0"
    >
      <div class="w-2 h-2 rounded-full bg-primary/20"></div>
    </div>
  </div>
</template>
