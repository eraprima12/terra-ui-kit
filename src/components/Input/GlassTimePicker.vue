<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Clock, ChevronUp, ChevronDown } from 'lucide-vue-next';

interface Props {
  modelValue?: string; // Expects format "HH:MM AM/PM" e.g., "10:30 AM"
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select time',
  disabled: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const isOpen = ref(false);
const timePickerRef = ref<HTMLElement | null>(null);

// Internal Time State
const hours = ref(10);
const minutes = ref(30);
const period = ref<'AM' | 'PM'>('AM');

// Parse modelValue on open or load
const parseValue = () => {
  if (props.modelValue) {
    const match = props.modelValue.match(/^(\d{1,2}):(\d{2})\s(AM|PM)$/i);
    if (match) {
      hours.value = parseInt(match[1]);
      minutes.value = parseInt(match[2]);
      period.value = match[3].toUpperCase() as 'AM' | 'PM';
    }
  }
};

const emitTime = () => {
  const hStr = String(hours.value).padStart(2, '0');
  const mStr = String(minutes.value).padStart(2, '0');
  emit('update:modelValue', `${hStr}:${mStr} ${period.value}`);
};

const handleIncrementHour = () => {
  if (hours.value === 12) {
    hours.value = 1;
  } else {
    hours.value += 1;
  }
  emitTime();
};

const handleDecrementHour = () => {
  if (hours.value === 1) {
    hours.value = 12;
  } else {
    hours.value -= 1;
  }
  emitTime();
};

const handleIncrementMinute = () => {
  if (minutes.value === 59) {
    minutes.value = 0;
  } else {
    minutes.value += 1;
  }
  emitTime();
};

const handleDecrementMinute = () => {
  if (minutes.value === 0) {
    minutes.value = 59;
  } else {
    minutes.value -= 1;
  }
  emitTime();
};

const togglePeriod = () => {
  period.value = period.value === 'AM' ? 'PM' : 'AM';
  emitTime();
};

const setNow = () => {
  const now = new Date();
  let rawHours = now.getHours();
  period.value = rawHours >= 12 ? 'PM' : 'AM';
  hours.value = rawHours % 12 || 12;
  minutes.value = now.getMinutes();
  emitTime();
};

const toggle = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    parseValue();
  }
};

const handleClickOutside = (event: MouseEvent) => {
  if (timePickerRef.value && !timePickerRef.value.contains(event.target as Node)) {
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
  <div class="flex flex-col gap-1.5 w-full relative" ref="timePickerRef">
    <label v-if="label" class="text-sm font-medium text-white/90 ml-1">{{ label }}</label>
    
    <div @click="toggle" class="relative group cursor-pointer">
      <div class="absolute top-1/2 -translate-y-1/2 left-3 flex items-center justify-center text-white/40 group-hover:text-primary transition-colors duration-300">
        <Clock class="w-4 h-4" />
      </div>

      <input
        type="text"
        readonly
        :value="modelValue || ''"
        :placeholder="placeholder"
        :disabled="disabled"
        class="w-full bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-white/30 outline-none transition-all duration-300 focus:bg-white/[0.08] focus:border-primary/50 focus:ring-4 focus:ring-primary/20 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed shadow-inner cursor-pointer"
      />
    </div>

    <!-- Time Picker Popover -->
    <Transition name="picker-scale">
      <div 
        v-if="isOpen" 
        class="absolute z-50 left-0 top-full mt-2 w-[220px] glass-panel-strong rounded-2xl border border-white/15 bg-[#0b0c14]/90 backdrop-blur-3xl p-4 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] flex flex-col items-center gap-4"
      >
        <!-- Digital Spinners -->
        <div class="flex items-center gap-3">
          <!-- Hours Column -->
          <div class="flex flex-col items-center">
            <button @click.stop="handleIncrementHour" class="p-1 rounded text-white/40 hover:text-white hover:bg-white/5 transition-all">
              <ChevronUp class="w-4 h-4" />
            </button>
            <span class="text-2xl font-bold text-white tracking-tight w-8 text-center select-none font-mono">
              {{ String(hours).padStart(2, '0') }}
            </span>
            <button @click.stop="handleDecrementHour" class="p-1 rounded text-white/40 hover:text-white hover:bg-white/5 transition-all">
              <ChevronDown class="w-4 h-4" />
            </button>
          </div>

          <!-- Divider -->
          <span class="text-xl font-bold text-white/30 select-none -mt-1 font-mono">:</span>

          <!-- Minutes Column -->
          <div class="flex flex-col items-center">
            <button @click.stop="handleIncrementMinute" class="p-1 rounded text-white/40 hover:text-white hover:bg-white/5 transition-all">
              <ChevronUp class="w-4 h-4" />
            </button>
            <span class="text-2xl font-bold text-white tracking-tight w-8 text-center select-none font-mono">
              {{ String(minutes).padStart(2, '0') }}
            </span>
            <button @click.stop="handleDecrementMinute" class="p-1 rounded text-white/40 hover:text-white hover:bg-white/5 transition-all">
              <ChevronDown class="w-4 h-4" />
            </button>
          </div>

          <!-- Period Toggle Column -->
          <button 
            @click.stop="togglePeriod"
            class="ml-2 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold text-white shadow-inner select-none tracking-wider"
          >
            {{ period }}
          </button>
        </div>

        <!-- Quick Actions -->
        <button 
          @click.stop="setNow"
          class="w-full py-1.5 rounded-lg border border-primary/20 bg-primary/10 hover:bg-primary/20 text-xs font-bold text-primary transition-all shadow-md select-none"
        >
          Use Current Time
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.picker-scale-enter-active {
  transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.picker-scale-leave-active {
  transition: all 0.15s ease-in;
}
.picker-scale-enter-from,
.picker-scale-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}
</style>
