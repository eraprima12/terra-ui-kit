<script setup lang="ts">
import { computed } from 'vue'
import { User } from 'lucide-vue-next'

interface Props {
  src?: string
  alt?: string
  initials?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  status?: 'online' | 'offline' | 'busy' | 'away'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'w-8 h-8 text-xs'
    case 'md': return 'w-10 h-10 text-sm'
    case 'lg': return 'w-12 h-12 text-base'
    case 'xl': return 'w-16 h-16 text-lg'
    default: return 'w-10 h-10 text-sm'
  }
})

const statusClasses = computed(() => {
  switch (props.status) {
    case 'online': return 'bg-emerald-400 shadow-[0_0_8px_#34D399]'
    case 'busy': return 'bg-rose-400 shadow-[0_0_8px_#FB7185]'
    case 'away': return 'bg-amber-400 shadow-[0_0_8px_#FBBF24]'
    case 'offline': return 'bg-gray-400'
    default: return ''
  }
})

const statusSize = computed(() => {
  switch (props.size) {
    case 'sm': return 'w-2 h-2 -bottom-0.5 -right-0.5 border-2'
    case 'md': return 'w-2.5 h-2.5 -bottom-0.5 -right-0.5 border-2'
    case 'lg': return 'w-3 h-3 -bottom-1 -right-1 border-2'
    case 'xl': return 'w-4 h-4 -bottom-1 -right-1 border-[3px]'
    default: return 'w-2.5 h-2.5 border-2'
  }
})
</script>

<template>
  <div class="relative inline-block">
    <div 
      class="rounded-full bg-white/10 border border-white/20 shadow-inner flex items-center justify-center overflow-hidden backdrop-blur-sm"
      :class="sizeClasses"
    >
      <img 
        v-if="src" 
        :src="src" 
        :alt="alt || 'Avatar'" 
        class="w-full h-full object-cover"
      />
      <span v-else-if="initials" class="font-bold text-white tracking-widest">{{ initials }}</span>
      <User v-else class="w-1/2 h-1/2 text-white/50" />
    </div>

    <div 
      v-if="status"
      class="absolute rounded-full border-[#050508] transition-colors z-10"
      :class="[statusClasses, statusSize]"
    ></div>
  </div>
</template>
