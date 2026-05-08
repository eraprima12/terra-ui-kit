<script setup lang="ts">
interface Option {
  label: string;
  value: any;
  description?: string;
}

interface Props {
  modelValue?: any;
  options: Option[];
  label?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  disabled: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
}>();

const handleSelect = (option: Option) => {
  if (props.disabled) return;
  emit('update:modelValue', option.value);
};
</script>

<template>
  <div class="flex flex-col gap-2.5 w-full">
    <label v-if="label" class="text-sm font-medium text-white/90 ml-1">{{ label }}</label>
    
    <div class="flex flex-col gap-3">
      <div 
        v-for="opt in options" 
        :key="opt.value"
        @click="handleSelect(opt)"
        class="flex items-start gap-3 p-3.5 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md cursor-pointer transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04] select-none"
        :class="[
          opt.value === modelValue ? 'border-primary/30 bg-primary/5 shadow-inner' : '',
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        ]"
      >
        <!-- Custom Radio Circle -->
        <div 
          class="w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center transition-all duration-300 mt-0.5"
          :class="[
            opt.value === modelValue 
              ? 'border-primary bg-primary/15 shadow-[0_0_10px_rgba(65,130,255,0.3)]' 
              : 'border-white/15 bg-white/5'
          ]"
        >
          <!-- Active Inner Dot -->
          <div 
            v-if="opt.value === modelValue"
            class="w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_8px_rgba(65,130,255,0.6)] animate-scale"
          ></div>
        </div>

        <!-- Label + Description -->
        <div class="flex flex-col gap-0.5 leading-tight">
          <span class="text-sm font-semibold text-white">{{ opt.label }}</span>
          <span v-if="opt.description" class="text-xs text-white/40 font-light leading-normal">{{ opt.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes scale {
  from { transform: scale(0); }
  to { transform: scale(1); }
}
.animate-scale {
  animation: scale 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>
