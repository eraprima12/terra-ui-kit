<script setup lang="ts">
import { useSlots } from 'vue';

interface Props {
  sticky?: boolean;
}

withDefaults(defineProps<Props>(), {
  sticky: true
});

const slots = useSlots();
</script>

<template>
  <header 
    class="w-full h-16 bg-white/[0.02] backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
    :class="[sticky ? 'sticky top-0 z-40' : 'relative']"
  >
    <!-- Brand Logo Slot -->
    <div class="flex items-center gap-3">
      <slot name="logo">
        <span class="text-lg font-black tracking-wider text-white">TERRA<span class="text-primary font-light">UI</span></span>
      </slot>
    </div>

    <!-- Navigation Links Slot -->
    <div v-if="slots.nav" class="hidden md:flex items-center gap-1">
      <slot name="nav"></slot>
    </div>

    <!-- Right Actions Slot -->
    <div class="flex items-center gap-4">
      <slot name="actions"></slot>
    </div>
  </header>
</template>
