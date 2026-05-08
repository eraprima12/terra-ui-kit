<script setup lang="ts">
import { ChevronRight, Home } from 'lucide-vue-next'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface Props {
  items: BreadcrumbItem[]
}

defineProps<Props>()
</script>

<template>
  <nav class="flex items-center gap-2 px-4 py-2 glass-panel-strong rounded-xl inline-flex w-auto border border-white/10 backdrop-blur-md shadow-lg">
    <!-- Home Icon -->
    <a href="#" class="text-white/50 hover:text-primary transition-colors">
      <Home class="w-4 h-4" />
    </a>
    
    <template v-for="(item, index) in items" :key="index">
      <ChevronRight class="w-4 h-4 text-white/30" />
      
      <a 
        v-if="item.href" 
        :href="item.href"
        class="text-sm text-white/50 hover:text-white transition-colors"
      >
        {{ item.label }}
      </a>
      <span 
        v-else 
        class="text-sm text-white font-medium drop-shadow-md"
      >
        {{ item.label }}
      </span>
    </template>
  </nav>
</template>
