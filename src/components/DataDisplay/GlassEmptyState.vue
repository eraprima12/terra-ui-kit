<script setup lang="ts">
import { useSlots } from 'vue';

interface Props {
  title?: string;
  description?: string;
  icon?: any; // Lucide icon component e.g. Inbox, FolderOpen, Search
}

defineProps<Props>();
const slots = useSlots();
</script>

<template>
  <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-8 md:p-12 flex flex-col items-center justify-center text-center shadow-xl">
    <!-- Inner Ambient Glow Orb -->
    <div class="absolute -top-12 w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none"></div>

    <!-- Glowing Icon Container -->
    <div class="relative flex items-center justify-center w-16 h-16 rounded-2xl border border-white/10 bg-white/[0.04] text-white/40 mb-6 shadow-inner transition-colors duration-300 group-hover:text-primary group-hover:border-primary/20">
      <component :is="icon" v-if="icon" class="w-8 h-8 opacity-60" />
      <div class="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 blur-md group-hover:opacity-100 transition-opacity"></div>
    </div>

    <!-- Content -->
    <h3 class="text-xl font-bold text-white tracking-wide mb-2">{{ title || 'No data available' }}</h3>
    <p class="max-w-sm text-sm text-white/50 leading-relaxed mb-6">{{ description || 'We couldn\'t find any records matching your request. Try adjusting your parameters.' }}</p>

    <!-- Slot for CTA buttons -->
    <div v-if="slots.default" class="flex items-center gap-3 relative z-10">
      <slot></slot>
    </div>
  </div>
</template>
