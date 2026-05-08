<script setup lang="ts">
import { ChevronLeft } from 'lucide-vue-next';

interface SidebarItem {
  label: string;
  value: string;
  icon?: any; // Lucide icon component
}

interface Props {
  modelValue?: boolean; // false = expanded, true = collapsed
  items: SidebarItem[];
  activeValue?: string;
  brandName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  activeValue: '',
  brandName: 'TERRA'
});

const emit = defineEmits<{
  (e: 'update:modelValue', collapsed: boolean): void;
  (e: 'select', value: string): void;
}>();

const toggleCollapse = () => {
  emit('update:modelValue', !props.modelValue);
};
</script>

<template>
  <aside 
    class="h-screen bg-white/[0.01] backdrop-blur-xl border-r border-white/10 flex flex-col justify-between transition-all duration-300 ease-out z-30 shadow-2xl relative"
    :class="[modelValue ? 'w-18' : 'w-64']"
  >
    <div>
      <!-- Brand Logo Header -->
      <div class="h-16 flex items-center px-5 border-b border-white/5 gap-3 overflow-hidden">
        <div class="w-8 h-8 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(65,130,255,0.4)]">
          <span class="text-white text-sm font-black">T</span>
        </div>
        <span 
          v-if="!modelValue"
          class="text-sm font-black tracking-widest text-white leading-none select-none transition-opacity duration-300"
        >
          {{ brandName }}<span class="text-primary font-light">CORE</span>
        </span>
      </div>

      <!-- Navigation Menu Items -->
      <nav class="p-3 space-y-1.5 overflow-y-auto">
        <button
          v-for="item in items"
          :key="item.value"
          type="button"
          @click="emit('select', item.value)"
          class="flex items-center gap-3 w-full px-3.5 py-3 rounded-xl border border-transparent text-sm text-white/60 hover:text-white transition-all duration-300 hover:bg-white/[0.03] hover:border-white/5 select-none focus:outline-none"
          :class="{ 
            '!text-white !bg-primary/10 !border-primary/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_20px_-10px_rgba(0,0,0,0.3)] font-semibold': item.value === activeValue 
          }"
        >
          <!-- Left side glow strip on Active Item -->
          <div 
            v-if="item.value === activeValue"
            class="absolute left-0 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_10px_rgba(65,130,255,0.8)]"
          ></div>

          <!-- Lucide Icon -->
          <component 
            :is="item.icon" 
            v-if="item.icon" 
            class="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" 
            :class="{ 'text-primary': item.value === activeValue }"
          />

          <!-- Text Label -->
          <span 
            v-if="!modelValue"
            class="transition-opacity duration-300 overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {{ item.label }}
          </span>
        </button>
      </nav>
    </div>

    <!-- Collapse / Expand Footer Button -->
    <div class="p-3 border-t border-white/5 flex justify-end">
      <button
        type="button"
        @click="toggleCollapse"
        class="w-full py-2.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] text-white/50 hover:text-white flex items-center justify-center transition-all duration-300 focus:outline-none"
      >
        <ChevronLeft 
          class="w-4 h-4 transition-transform duration-300" 
          :class="{ 'rotate-180': modelValue }" 
        />
      </button>
    </div>
  </aside>
</template>
