<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-vue-next';

interface Props {
  modelValue?: string; // Expects format YYYY-MM-DD
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select a date',
  disabled: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const isOpen = ref(false);
const datePickerRef = ref<HTMLElement | null>(null);

// Calendar State
const today = new Date();
const currentYear = ref(today.getFullYear());
const currentMonth = ref(today.getMonth()); // 0-indexed

const selectedDate = computed(() => {
  if (!props.modelValue) return null;
  const parts = props.modelValue.split('-');
  return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
});

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// Formatted input display
const formattedValue = computed(() => {
  if (!selectedDate.value) return '';
  return selectedDate.value.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Grid Generation
const daysInMonth = computed(() => {
  // Days in current month
  const totalDays = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
  const daysArray = [];

  // Trailing days from previous month
  const firstDayIndex = new Date(currentYear.value, currentMonth.value, 1).getDay();
  const prevMonthTotalDays = new Date(currentYear.value, currentMonth.value, 0).getDate();

  for (let i = firstDayIndex - 1; i >= 0; i--) {
    daysArray.push({
      day: prevMonthTotalDays - i,
      month: currentMonth.value === 0 ? 11 : currentMonth.value - 1,
      year: currentMonth.value === 0 ? currentYear.value - 1 : currentYear.value,
      isCurrentMonth: false
    });
  }

  // Current month days
  for (let i = 1; i <= totalDays; i++) {
    daysArray.push({
      day: i,
      month: currentMonth.value,
      year: currentYear.value,
      isCurrentMonth: true
    });
  }

  // Leading days from next month to fill grid (6 rows of 7 days = 42 slots)
  const remainingSlots = 42 - daysArray.length;
  for (let i = 1; i <= remainingSlots; i++) {
    daysArray.push({
      day: i,
      month: currentMonth.value === 11 ? 0 : currentMonth.value + 1,
      year: currentMonth.value === 11 ? currentYear.value + 1 : currentYear.value,
      isCurrentMonth: false
    });
  }

  return daysArray;
});

const handlePrevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value -= 1;
  } else {
    currentMonth.value -= 1;
  }
};

const handleNextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value += 1;
  } else {
    currentMonth.value += 1;
  }
};

const handleSelectDay = (item: { day: number; month: number; year: number }) => {
  const monthStr = String(item.month + 1).padStart(2, '0');
  const dayStr = String(item.day).padStart(2, '0');
  const dateStr = `${item.year}-${monthStr}-${dayStr}`;
  
  emit('update:modelValue', dateStr);
  isOpen.value = false;
};

const isSelected = (item: { day: number; month: number; year: number }) => {
  if (!selectedDate.value) return false;
  return selectedDate.value.getDate() === item.day &&
         selectedDate.value.getMonth() === item.month &&
         selectedDate.value.getFullYear() === item.year;
};

const isToday = (item: { day: number; month: number; year: number }) => {
  return today.getDate() === item.day &&
         today.getMonth() === item.month &&
         today.getFullYear() === item.year;
};

// Toggle popover
const toggle = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
  if (isOpen.value && selectedDate.value) {
    currentYear.value = selectedDate.value.getFullYear();
    currentMonth.value = selectedDate.value.getMonth();
  }
};

// Click outside logic
const handleClickOutside = (event: MouseEvent) => {
  if (datePickerRef.value && !datePickerRef.value.contains(event.target as Node)) {
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
  <div class="flex flex-col gap-1.5 w-full relative" ref="datePickerRef">
    <label v-if="label" class="text-sm font-medium text-white/90 ml-1">{{ label }}</label>
    
    <!-- Input Trigger -->
    <div 
      @click="toggle"
      class="relative group cursor-pointer"
    >
      <div class="absolute top-1/2 -translate-y-1/2 left-3 flex items-center justify-center text-white/40 group-hover:text-primary transition-colors duration-300">
        <Calendar class="w-4 h-4" />
      </div>

      <input
        type="text"
        readonly
        :value="formattedValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="w-full bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-white/30 outline-none transition-all duration-300 focus:bg-white/[0.08] focus:border-primary/50 focus:ring-4 focus:ring-primary/20 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed shadow-inner cursor-pointer"
      />
    </div>

    <!-- Calendar Popover -->
    <Transition name="calendar-scale">
      <div 
        v-if="isOpen" 
        class="absolute z-50 left-0 top-full mt-2 w-[310px] glass-panel-strong rounded-2xl border border-white/15 bg-[#0b0c14]/90 backdrop-blur-3xl p-4 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        <!-- Calendar Header -->
        <div class="flex items-center justify-between mb-4">
          <button 
            @click.stop="handlePrevMonth" 
            class="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ChevronLeft class="w-4 h-4" />
          </button>
          
          <span class="text-sm font-bold text-white tracking-wide">
            {{ monthNames[currentMonth] }} {{ currentYear }}
          </span>
          
          <button 
            @click.stop="handleNextMonth" 
            class="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>

        <!-- Weekdays Header -->
        <div class="grid grid-cols-7 gap-1 text-center mb-2">
          <span 
            v-for="day in daysOfWeek" 
            :key="day" 
            class="text-[10px] font-bold text-white/40 uppercase tracking-wider"
          >
            {{ day }}
          </span>
        </div>

        <!-- Days Grid -->
        <div class="grid grid-cols-7 gap-1 text-center">
          <button
            v-for="(item, idx) in daysInMonth"
            :key="idx"
            @click.stop="handleSelectDay(item)"
            class="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-all relative group/day focus:outline-none"
            :class="[
              item.isCurrentMonth ? 'text-white' : 'text-white/25',
              isSelected(item) 
                ? 'bg-primary border border-white/20 text-white shadow-[0_0_15px_rgba(65,130,255,0.6)] z-10' 
                : 'hover:bg-white/10'
            ]"
          >
            <!-- Highlight Today -->
            <div 
              v-if="isToday(item) && !isSelected(item)" 
              class="absolute bottom-1 w-1 h-1 rounded-full bg-primary shadow-[0_0_5px_#4182FF]"
            ></div>
            
            <span class="relative z-10">{{ item.day }}</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.calendar-scale-enter-active {
  transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.calendar-scale-leave-active {
  transition: all 0.15s ease-in;
}
.calendar-scale-enter-from,
.calendar-scale-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}
</style>
