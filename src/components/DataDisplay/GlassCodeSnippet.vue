<script setup lang="ts">
import { ref } from 'vue';
import { Copy, Check } from 'lucide-vue-next';

interface Props {
  code: string;
}

const props = defineProps<Props>();
const copied = ref(false);

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};
</script>

<template>
  <div class="relative group/snippet mt-4 rounded-xl border border-white/5 bg-black/40 overflow-hidden font-mono text-xs">
    <!-- Header/Bar -->
    <div class="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
      <span class="text-[10px] uppercase font-bold tracking-wider text-white/30">Usage Code</span>
      
      <!-- Copy Button -->
      <button 
        @click="handleCopy"
        class="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-[10px] font-bold text-white/60 hover:text-white focus:outline-none"
      >
        <Transition name="icon-fade" mode="out-in">
          <Check v-if="copied" class="w-3 h-3 text-emerald-400" />
          <Copy v-else class="w-3 h-3" />
        </Transition>
        <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
      </button>
    </div>

    <!-- Code Block -->
    <pre class="p-4 text-emerald-400/90 overflow-x-auto leading-relaxed select-all"><code>{{ code }}</code></pre>
  </div>
</template>

<style scoped>
.icon-fade-enter-active,
.icon-fade-leave-active {
  transition: all 0.15s ease;
}
.icon-fade-enter-from,
.icon-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
