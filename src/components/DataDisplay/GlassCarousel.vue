<script setup lang="ts">
import { ref } from 'vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

interface Slide {
  image?: string;
  title: string;
  subtitle?: string;
}

interface Props {
  slides: Slide[];
}

const props = defineProps<Props>();
const activeIdx = ref(0);

const nextSlide = () => {
  activeIdx.value = (activeIdx.value + 1) % props.slides.length;
};

const prevSlide = () => {
  activeIdx.value = (activeIdx.value - 1 + props.slides.length) % props.slides.length;
};

const goToSlide = (idx: number) => {
  activeIdx.value = idx;
};
</script>

<template>
  <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md h-64 flex flex-col group/carousel">
    <!-- Slides Carousel Container -->
    <div class="relative flex-1 overflow-hidden flex items-center justify-center">
      <!-- Ambient Back Orb behind text -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none"></div>
      
      <!-- Slide Images / Custom Card -->
      <div 
        v-for="(slide, idx) in slides" 
        :key="idx"
        class="absolute inset-0 flex flex-col justify-end p-8 transition-all duration-500 ease-in-out"
        :class="[
          idx === activeIdx ? 'opacity-100 translate-x-0 scale-100 z-0' : 'opacity-0 translate-x-12 scale-95 pointer-events-none'
        ]"
      >
        <!-- Back-image if present -->
        <img 
          v-if="slide.image" 
          :src="slide.image" 
          class="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          alt=""
        />

        <!-- Title & Subtitle -->
        <div class="relative z-20 space-y-2">
          <h4 class="text-2xl font-extrabold text-white tracking-wide leading-tight drop-shadow">
            {{ slide.title }}
          </h4>
          <p class="text-sm text-white/60 font-light leading-relaxed max-w-md">
            {{ slide.subtitle }}
          </p>
        </div>
      </div>
    </div>

    <!-- Controls (Left & Right Buttons) -->
    <button 
      type="button"
      @click="prevSlide"
      class="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md text-white/60 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 z-30 focus:outline-none focus:ring-2 focus:ring-primary/40 hover:scale-105"
    >
      <ChevronLeft class="w-5 h-5" />
    </button>

    <button 
      type="button"
      @click="nextSlide"
      class="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md text-white/60 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 z-30 focus:outline-none focus:ring-2 focus:ring-primary/40 hover:scale-105"
    >
      <ChevronRight class="w-5 h-5" />
    </button>

    <!-- Bottom Indicator Dots -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
      <button 
        v-for="(_, idx) in slides" 
        :key="idx"
        type="button"
        @click="goToSlide(idx)"
        class="h-1.5 rounded-full transition-all focus:outline-none"
        :class="[
          idx === activeIdx ? 'w-5 bg-primary shadow-[0_0_8px_rgba(65,130,255,0.6)]' : 'w-1.5 bg-white/20 hover:bg-white/40'
        ]"
      ></button>
    </div>
  </div>
</template>
