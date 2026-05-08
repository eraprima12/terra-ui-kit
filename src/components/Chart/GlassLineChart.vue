<script setup lang="ts">
import { computed } from 'vue'

interface DataPoint {
  label: string
  value: number
}

interface Props {
  data: DataPoint[]
  height?: number
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  height: 200,
  color: '#34D399' // Emerald default
})

const maxValue = computed(() => Math.max(...props.data.map(d => d.value), 1))
const minValue = computed(() => Math.min(...props.data.map(d => d.value), 0))

// Generate SVG points: x goes from 0 to 100, y goes from 100 to 0 (SVG y-axis is inverted)
const points = computed(() => {
  const range = maxValue.value - minValue.value || 1
  return props.data.map((d, i) => {
    const x = (i / (props.data.length - 1)) * 100
    const y = 100 - ((d.value - minValue.value) / range) * 100
    return `${x},${y}`
  }).join(' ')
})

// Create a closed polygon for the gradient fill underneath the line
const fillPoints = computed(() => {
  return `0,100 ${points.value} 100,100`
})
</script>

<template>
  <div class="w-full flex flex-col gap-4 relative">
    <div class="w-full relative" :style="{ height: `${height}px` }">
      <svg class="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" :stop-color="color" stop-opacity="0.3"/>
            <stop offset="100%" :stop-color="color" stop-opacity="0.0"/>
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Grid Lines -->
        <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.05)" stroke-width="0.5" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.05)" stroke-width="0.5" />
        <line x1="0" y1="75" x2="100" y2="75" stroke="rgba(255,255,255,0.05)" stroke-width="0.5" />

        <!-- Fill Area -->
        <polygon 
          :points="fillPoints" 
          fill="url(#lineFill)" 
          class="transition-all duration-700 ease-in-out"
        />

        <!-- The Line -->
        <polyline 
          :points="points" 
          fill="none" 
          :stroke="color" 
          stroke-width="1.5"
          vector-effect="non-scaling-stroke"
          stroke-linecap="round"
          stroke-linejoin="round"
          filter="url(#glow)"
          class="transition-all duration-700 ease-in-out"
        />

        <!-- Data Points (Circles) -->
        <circle 
          v-for="(d, i) in props.data" 
          :key="i"
          :cx="(i / (props.data.length - 1)) * 100"
          :cy="100 - ((d.value - minValue) / (maxValue - minValue || 1)) * 100"
          r="1.5"
          :fill="color"
          stroke="#fff"
          stroke-width="0.5"
          vector-effect="non-scaling-stroke"
          class="hover:r-[2.5] transition-all cursor-pointer outline-none"
        >
          <title>{{ d.label }}: {{ d.value }}</title>
        </circle>
      </svg>
    </div>

    <!-- Labels -->
    <div class="w-full flex justify-between">
      <div 
        v-for="(point, idx) in props.data" 
        :key="idx"
        class="text-center text-[10px] sm:text-xs text-white/50 truncate"
      >
        {{ point.label }}
      </div>
    </div>
  </div>
</template>
