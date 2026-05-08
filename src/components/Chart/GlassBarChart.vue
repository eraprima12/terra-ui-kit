<script setup lang="ts">
import { computed } from 'vue'

interface DataPoint {
  label: string
  value: number
}

interface Props {
  data: DataPoint[]
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  height: 200
})

const maxValue = computed(() => {
  return Math.max(...props.data.map(d => d.value), 1)
})

const normalizedData = computed(() => {
  return props.data.map(d => ({
    ...d,
    heightPct: (d.value / maxValue.value) * 100
  }))
})
</script>

<template>
  <div class="w-full flex flex-col gap-4 relative">
    <!-- Grid Lines -->
    <div class="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
      <div v-for="i in 4" :key="i" class="w-full border-t border-white/[0.05]"></div>
    </div>

    <!-- Bars -->
    <div class="w-full flex items-end justify-between gap-2 z-10" :style="{ height: `${height}px` }">
      <div 
        v-for="(point, idx) in normalizedData" 
        :key="idx"
        class="flex-1 flex flex-col items-center justify-end gap-2 group h-full"
      >
        <div 
          class="w-full rounded-t-lg bg-gradient-to-t from-primary/20 to-primary/80 transition-all duration-500 ease-out relative group-hover:from-primary/40 group-hover:to-primary shadow-[0_0_15px_rgba(65,130,255,0.2)] group-hover:shadow-[0_0_20px_rgba(65,130,255,0.5)] border-t border-x border-white/20"
          :style="{ height: `${point.heightPct}%` }"
        >
          <!-- Tooltip -->
          <div class="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1a1a24] text-white text-xs py-1 px-2 rounded border border-white/10 pointer-events-none whitespace-nowrap shadow-xl">
            {{ point.value }}
          </div>
        </div>
      </div>
    </div>

    <!-- Labels -->
    <div class="w-full flex justify-between gap-2">
      <div 
        v-for="(point, idx) in normalizedData" 
        :key="idx"
        class="flex-1 text-center text-[10px] sm:text-xs text-white/50 truncate"
      >
        {{ point.label }}
      </div>
    </div>
  </div>
</template>
