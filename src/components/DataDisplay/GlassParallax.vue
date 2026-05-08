<script setup lang="ts">
interface Props {
  image: string; // Background image URL
  height?: string; // Tailwind height class e.g. 'h-[400px]' or 'min-h-[500px]'
}

withDefaults(defineProps<Props>(), {
  height: 'min-h-[450px]'
});
</script>

<template>
  <div 
    class="relative w-full overflow-hidden rounded-3xl border border-white/10 flex flex-col justify-center items-center px-6 py-12 shadow-2xl transition-all"
    :class="[height]"
  >
    <!-- Parallax Fixed Locked Background -->
    <div 
      class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform"
      :style="{ 
        backgroundImage: `url(${image})`,
        backgroundAttachment: 'fixed'
      }"
    ></div>

    <!-- Dark Layer Vignette & Contrast Overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 mix-blend-multiply z-10"></div>
    <div class="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-[#4182ff]/10 mix-blend-color-dodge z-10"></div>

    <!-- Inner Floating Slot Content -->
    <div class="relative z-20 w-full max-w-4xl flex flex-col items-center justify-center text-center">
      <slot></slot>
    </div>
  </div>
</template>
