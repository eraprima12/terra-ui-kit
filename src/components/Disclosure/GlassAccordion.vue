<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

interface Props {
  title: string
  initiallyOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  initiallyOpen: false
})

const isOpen = ref(props.initiallyOpen)

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="glass-panel-strong rounded-xl overflow-hidden transition-all duration-300 border border-white/10">
    <button 
      @click="toggle"
      class="w-full flex items-center justify-between px-5 py-4 bg-white/[0.02] hover:bg-white/[0.05] transition-colors outline-none focus:ring-2 focus:ring-primary/50"
    >
      <span class="font-medium text-white tracking-wide text-sm">{{ title }}</span>
      <ChevronDown 
        class="w-4 h-4 text-white/50 transition-transform duration-300"
        :class="{ 'rotate-180 text-primary': isOpen }"
      />
    </button>
    
    <div 
      class="grid transition-all duration-300 ease-in-out"
      :class="isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
    >
      <div class="overflow-hidden">
        <div class="px-5 pb-4 pt-1 text-sm text-white/70 leading-relaxed border-t border-white/5">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
