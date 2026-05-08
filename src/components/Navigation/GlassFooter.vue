<script setup lang="ts">
import { useSlots } from 'vue';

const slots = useSlots();
</script>

<template>
  <footer class="w-full bg-white/[0.01] backdrop-blur-sm border-t border-white/5 py-8 px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-xs">
    <div class="flex items-center gap-2">
      <span>© 2026 Terra UI Kit. All rights reserved.</span>
    </div>

    <!-- Additional Footer links -->
    <div v-if="slots.links" class="flex flex-wrap gap-6 items-center justify-center">
      <slot name="links"></slot>
    </div>

    <!-- Social icons / other actions -->
    <div v-if="slots.actions" class="flex items-center gap-4">
      <slot name="actions"></slot>
    </div>
  </footer>
</template>
