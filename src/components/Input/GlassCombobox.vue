<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { ChevronDown, Search } from 'lucide-vue-next';

interface Option {
  label: string;
  value: any;
}

interface Props {
  modelValue?: any;
  options: Option[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  placeholder: 'Select an option...',
  disabled: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
}>();

const isOpen = ref(false);
const searchQuery = ref('');
const comboboxRef = ref<HTMLDivElement | null>(null);

const selectedOption = computed(() => {
  return props.options.find(opt => opt.value === props.modelValue) || null;
});

const filteredOptions = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return props.options;
  return props.options.filter(opt => opt.label.toLowerCase().includes(query));
});

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value);
  searchQuery.value = '';
  isOpen.value = false;
};

const toggleDropdown = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
};

// Handle Clicking Outside to Close
const handleClickOutside = (event: MouseEvent) => {
  if (comboboxRef.value && !comboboxRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div ref="comboboxRef" class="flex flex-col gap-1.5 w-full relative">
    <label v-if="label" class="text-sm font-medium text-white/90 ml-1">{{ label }}</label>
    
    <!-- Input Trigger -->
    <div 
      @click="toggleDropdown"
      class="flex items-center justify-between w-full bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5 cursor-pointer outline-none transition-all duration-300 hover:border-white/20 shadow-inner"
      :class="[
        isOpen ? 'bg-white/[0.08] border-primary/50 ring-4 ring-primary/20' : '',
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      ]"
    >
      <span class="text-sm text-white" :class="{ 'text-white/30': !selectedOption }">
        {{ selectedOption ? selectedOption.label : placeholder }}
      </span>
      <ChevronDown class="w-4 h-4 text-white/40 transition-transform duration-300" :class="{ 'rotate-180 text-primary': isOpen }" />
    </div>

    <!-- Dropdown Panel -->
    <Transition name="fade-down">
      <div 
        v-if="isOpen" 
        class="absolute left-0 right-0 top-full mt-2 bg-[#0b0c14]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 flex flex-col max-h-60"
      >
        <!-- Search Input Header -->
        <div class="flex items-center gap-2 px-3 py-2 border-b border-white/5 bg-white/[0.01]">
          <Search class="w-3.5 h-3.5 text-white/30" />
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="w-full bg-transparent border-none outline-none text-xs text-white placeholder-white/20 p-0 focus:ring-0"
          />
        </div>

        <!-- Options List -->
        <div class="overflow-y-auto py-1 flex-1">
          <button
            v-for="opt in filteredOptions"
            :key="opt.value"
            type="button"
            @click="selectOption(opt)"
            class="flex items-center justify-between w-full px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-primary/20 transition-all text-left"
            :class="{ '!bg-primary/10 !text-primary font-semibold': opt.value === modelValue }"
          >
            <span>{{ opt.label }}</span>
            <span v-if="opt.value === modelValue" class="text-primary text-xs">✓</span>
          </button>
          
          <div v-if="filteredOptions.length === 0" class="px-4 py-3 text-xs text-center text-white/40">
            No options found
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-down-enter-active,
.fade-down-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-down-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}
.fade-down-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.99);
}
</style>
