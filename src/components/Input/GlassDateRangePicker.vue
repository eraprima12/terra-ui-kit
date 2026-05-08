<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-vue-next';

interface Props {
  modelValue?: [string, string]; // Expects ['YYYY-MM-DD', 'YYYY-MM-DD']
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select date range',
  disabled: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: [string, string]): void;
}>();

const isOpen = ref(false);
const dateRangePickerRef = ref<HTMLElement | null>(null);

// Calendar State
const today = new Date();
const currentYear = ref(today.getFullYear());
const currentMonth = ref(today.getMonth());

const startDate = computed(() => {
  if (!props.modelValue || !props.modelValue[0]) return null;
  const parts = props.modelValue[0].split('-');
  return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
});

const endDate = computed(() => {
  if (!props.modelValue || !props.modelValue[1]) return null;
  const parts = props.modelValue[1].split('-');
  return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
});

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// Formatted input display
const formattedValue = computed(() => {
  if (!startDate.value) return '';
  const startStr = startDate.value.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  if (!endDate.value) return `${startStr} - ...`;
  const endStr = endDate.value.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return `${startStr} - ${endStr}`;
});

// Grid Generation
const daysInMonth = computed(() => {
  const totalDays = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
  const daysArray = [];

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

  for (let i = 1; i <= totalDays; i++) {
    daysArray.push({
      day: i,
      month: currentMonth.value,
      year: currentYear.value,
      isCurrentMonth: true
    });
  }

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
  const clickedDate = new Date(item.year, item.month, item.day);
  const monthStr = String(item.month + 1).padStart(2, '0');
  const dayStr = String(item.day).padStart(2, '0');
  const dateStr = `${item.year}-${monthStr}-${dayStr}`;

  if (!startDate.value || (startDate.value && endDate.value)) {
    // Select Start Date and Reset End Date
    emit('update:modelValue', [dateStr, '']);
  } else if (startDate.value && !endDate.value) {
    if (clickedDate < startDate.value) {
      // If clicked date is before start date, treat it as new start date
      emit('update:modelValue', [dateStr, '']);
    } else {
      // Set End Date
      const startParts = props.modelValue![0].split('-');
      const startStr = `${startParts[0]}-${startParts[1]}-${startParts[2]}`;
      emit('update:modelValue', [startStr, dateStr]);
      isOpen.value = false; // Close popover when range is complete
    }
  }
};

const isStart = (item: { day: number; month: number; year: number }) => {
  if (!startDate.value) return false;
  return startDate.value.getDate() === item.day &&
         startDate.value.getMonth() === item.month &&
         startDate.value.getFullYear() === item.year;
};

const isEnd = (item: { day: number; month: number; year: number }) => {
  if (!endDate.value) return false;
  return endDate.value.getDate() === item.day &&
         endDate.value.getMonth() === item.month &&
         endDate.value.getFullYear() === item.year;
};

const isInRange = (item: { day: number; month: number; year: number }) => {
  if (!startDate.value || !endDate.value) return false;
  const current = new Date(item.year, item.month, item.day);
  return current > startDate.value && current < endDate.value;
};

const isToday = (item: { day: number; month: number; year: number }) => {
  return today.getDate() === item.day &&
         today.getMonth() === item.month &&
         today.getFullYear() === item.year;
};

const toggle = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
  if (isOpen.value && startDate.value) {
    currentYear.value = startDate.value.getFullYear();
    currentMonth.value = startDate.value.getMonth();
  }
};

const handleClickOutside = (event: MouseEvent) => {
  if (dateRangePickerRef.value && !dateRangePickerRef.value.contains(event.target as Node)) {
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
  <div class="flex flex-col gap-1.5 w-full relative" ref="dateRangePickerRef">
    <label v-if="label" class="text-sm font-medium text-white/90 ml-1">{{ label }}</label>
    
    <div @click="toggle" class="relative group cursor-pointer">
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

    <!-- Date Range Popover -->
    <Transition name="calendar-scale">
      <div 
        v-if="isOpen" 
        class="absolute z-50 left-0 top-full mt-2 w-[310px] glass-panel-strong rounded-2xl border border-white/15 bg-[#0b0c14]/90 backdrop-blur-3xl p-4 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        <div class="flex items-center justify-between mb-4">
          <button @click.stop="handlePrevMonth" class="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors">
            <ChevronLeft class="w-4 h-4" />
          </button>
          <span class="text-sm font-bold text-white tracking-wide">
            {{ monthNames[currentMonth] }} {{ currentYear }}
          </span>
          <button @click.stop="handleNextMonth" class="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors">
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>

        <div class="grid grid-cols-7 gap-1 text-center mb-2">
          <span v-for="day in daysOfWeek" :key="day" class="text-[10px] font-bold text-white/40 uppercase tracking-wider">
            {{ day }}
          </span>
        </div>

        <div class="grid grid-cols-7 gap-y-1 gap-x-0.5 text-center">
          <button
            v-for="(item, idx) in daysInMonth"
            :key="idx"
            @click.stop="handleSelectDay(item)"
            class="h-8 w-full flex items-center justify-center text-xs font-medium transition-all relative focus:outline-none"
            :class="[
              item.isCurrentMonth ? 'text-white' : 'text-white/25',
              isStart(item) ? 'bg-primary border border-white/20 text-white shadow-[0_0_15px_rgba(65,130,255,0.6)] rounded-l-lg z-10' : '',
              isEnd(item) ? 'bg-primary border border-white/20 text-white shadow-[0_0_15px_rgba(65,130,255,0.6)] rounded-r-lg z-10' : '',
              isInRange(item) ? 'bg-primary/20 text-primary-light rounded-none' : 'hover:bg-white/10 rounded-lg'
            ]"
          >
            <div v-if="isToday(item) && !isStart(item) && !isEnd(item)" class="absolute bottom-1 w-1 h-1 rounded-full bg-primary shadow-[0_0_5px_#4182FF]"></div>
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
