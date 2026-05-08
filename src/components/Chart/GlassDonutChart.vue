<script setup lang="ts">
import { computed } from 'vue'

interface Segment {
  label: string
  value: number
  color: string
}

interface Props {
  data: Segment[]
  size?: number
  thickness?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 200,
  thickness: 20
})

const total = computed(() => props.data.reduce((sum, item) => sum + item.value, 0))

const segments = computed(() => {
  let cumulativeValue = 0
  return props.data.map((item) => {
    const percentage = item.value / total.value
    // stroke-dasharray format: length of arc, length of gap
    // Circumference = 2 * PI * r. Here r=50, C = 314.159
    const circumference = 2 * Math.PI * 50
    const dashArray = `${percentage * circumference} ${circumference}`
    
    // Calculate the starting offset
    const dashOffset = -((cumulativeValue / total.value) * circumference)
    cumulativeValue += item.value

    return {
      ...item,
      dashArray,
      dashOffset
    }
  })
})
</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <div class="relative" :style="{ width: `${size}px`, height: `${size}px` }">
      <svg class="w-full h-full -rotate-90 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" viewBox="0 0 120 120">
        <!-- Background Track -->
        <circle 
          cx="60" cy="60" r="50" 
          fill="none" 
          stroke="rgba(255,255,255,0.05)" 
          :stroke-width="thickness" 
        />
        
        <!-- Data Segments -->
        <circle 
          v-for="(seg, idx) in segments" 
          :key="idx"
          cx="60" cy="60" r="50" 
          fill="none" 
          :stroke="seg.color" 
          :stroke-width="thickness"
          :stroke-dasharray="seg.dashArray"
          :stroke-dashoffset="seg.dashOffset"
          stroke-linecap="round"
          class="transition-all duration-1000 ease-out hover:stroke-[24px] cursor-pointer"
        >
          <title>{{ seg.label }}: {{ seg.value }}</title>
        </circle>
      </svg>
      
      <!-- Center Content -->
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <span class="text-white/50 text-xs uppercase tracking-widest mb-1">Total</span>
        <span class="text-2xl font-bold text-white tracking-tight">{{ total }}</span>
      </div>
    </div>

    <!-- Legend -->
    <div class="flex flex-wrap justify-center gap-4">
      <div v-for="(seg, idx) in segments" :key="idx" class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full shadow-[0_0_8px_currentColor]" :style="{ backgroundColor: seg.color, color: seg.color }"></span>
        <span class="text-xs text-white/70">{{ seg.label }}</span>
      </div>
    </div>
  </div>
</template>
