<script setup lang="ts">
import { ref, computed } from 'vue'
import { Loader2, Search, Filter, MoreVertical, ChevronDown, ChevronRight, Inbox } from 'lucide-vue-next'
import GlassButton from '../Button/GlassButton.vue'

export interface Column {
  key: string
  label: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  mobileVisible?: boolean // If false, hidden in mobile card view unless expanded
}

export interface Props {
  columns: Column[]
  data: any[]
  loading?: boolean
  error?: string | null
  emptyMessage?: string
  selectable?: boolean
  theme?: 'sapphire' | 'emerald' | 'crimson' | 'default'
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: null,
  emptyMessage: 'No records found',
  selectable: true,
  theme: 'default'
})

const emit = defineEmits<{
  (e: 'row-click', row: any): void
  (e: 'selection-change', selectedIds: any[]): void
  (e: 'retry'): void
}>()

const selectedRows = ref<Set<any>>(new Set())
const expandedMobileCards = ref<Set<any>>(new Set())

const toggleSelection = (rowId: any) => {
  if (selectedRows.value.has(rowId)) {
    selectedRows.value.delete(rowId)
  } else {
    selectedRows.value.add(rowId)
  }
  emit('selection-change', Array.from(selectedRows.value))
}

const toggleSelectAll = () => {
  if (selectedRows.value.size === props.data.length) {
    selectedRows.value.clear()
  } else {
    props.data.forEach((row, idx) => selectedRows.value.add(row.id || idx))
  }
  emit('selection-change', Array.from(selectedRows.value))
}

const toggleMobileExpand = (rowId: any) => {
  if (expandedMobileCards.value.has(rowId)) {
    expandedMobileCards.value.delete(rowId)
  } else {
    expandedMobileCards.value.add(rowId)
  }
}

const allSelected = computed(() => {
  return props.data.length > 0 && selectedRows.value.size === props.data.length
})

const partialSelected = computed(() => {
  return selectedRows.value.size > 0 && selectedRows.value.size < props.data.length
})
</script>

<template>
  <div class="glass-surface rounded-xl overflow-hidden flex flex-col w-full h-full border-white/10 shadow-2xl">
    
    <!-- Toolbar -->
    <div class="p-4 border-b border-white/10 flex items-center justify-between gap-4 bg-white/5 relative z-10">
      <div class="flex items-center gap-2">
        <div class="relative max-w-xs w-full">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
          <input 
            type="text" 
            placeholder="Search..." 
            class="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>
      <div class="flex items-center gap-2">
        <GlassButton variant="ghost" size="icon" title="Filter">
          <Filter class="w-4 h-4" />
        </GlassButton>
        <GlassButton variant="primary" size="sm" class="hidden sm:inline-flex">
          Export
        </GlassButton>
      </div>
    </div>

    <!-- State Overlays (Loading, Error, Empty) -->
    <div v-if="loading && !data.length" class="flex-1 p-8 flex flex-col gap-4">
      <div v-for="i in 5" :key="i" class="h-12 bg-white/5 rounded-lg animate-pulse"></div>
    </div>

    <div v-else-if="error" class="flex-1 flex flex-col items-center justify-center p-12 text-center">
      <div class="w-16 h-16 rounded-full bg-danger-soft flex items-center justify-center mb-4">
        <Loader2 class="w-8 h-8 text-danger" />
      </div>
      <h3 class="text-lg font-medium text-white mb-2">Failed to load data</h3>
      <p class="text-white/60 mb-6 max-w-sm">{{ error }}</p>
      <GlassButton variant="danger" @click="emit('retry')">Try Again</GlassButton>
    </div>

    <div v-else-if="!data.length" class="flex-1 flex flex-col items-center justify-center p-12 text-center">
      <div class="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
        <Inbox class="w-8 h-8 text-white/40" />
      </div>
      <h3 class="text-lg font-medium text-white mb-2">{{ emptyMessage }}</h3>
      <p class="text-white/50 mb-6 max-w-sm">There are no records to display in this view.</p>
    </div>

    <!-- Data Content -->
    <div v-else class="flex-1 overflow-auto relative">
      
      <!-- Desktop Table (Hidden on mobile) -->
      <table class="w-full text-sm text-left hidden md:table border-collapse">
        <thead 
          class="text-xs uppercase sticky top-0 z-20 backdrop-blur-xl border-b shadow-sm transition-all duration-300"
          :class="[
            theme === 'sapphire' ? 'bg-primary/20 border-primary/30 text-blue-300' :
            theme === 'emerald' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300' :
            theme === 'crimson' ? 'bg-rose-500/20 border-rose-500/30 text-rose-300' :
            'bg-white/10 border-white/10 text-white'
          ]"
        >
          <tr>
            <th v-if="selectable" class="px-4 py-4 w-12">
              <input 
                type="checkbox" 
                :checked="allSelected"
                :indeterminate="partialSelected"
                @change="toggleSelectAll"
                class="rounded border-white/20 bg-white/5 text-primary focus:ring-primary/50"
              >
            </th>
            <th 
              v-for="col in columns" 
              :key="col.key" 
              class="px-4 py-4 font-semibold tracking-wider"
              :class="[col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left']"
            >
              {{ col.label }}
            </th>
            <th class="px-4 py-4 w-16"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          <tr 
            v-for="(row, idx) in data" 
            :key="row.id || idx"
            class="group transition-all duration-300 hover:bg-white/[0.08] hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] cursor-pointer relative"
            :class="{ 'bg-primary-tint/30': selectedRows.has(row.id || idx) }"
            @click="emit('row-click', row)"
          >
            <!-- Left accent indicator for selected -->
            <td v-if="selectedRows.has(row.id || idx)" class="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md"></td>
            
            <td v-if="selectable" class="px-4 py-4 w-12" @click.stop>
              <input 
                type="checkbox" 
                :checked="selectedRows.has(row.id || idx)"
                @change="toggleSelection(row.id || idx)"
                class="rounded border-white/20 bg-white/5 text-primary focus:ring-primary/50"
              >
            </td>
            <td 
              v-for="col in columns" 
              :key="col.key" 
              class="px-4 py-4 text-white/90 whitespace-nowrap"
              :class="[col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left']"
            >
              {{ row[col.key] }}
            </td>
            <td class="px-4 py-4 text-right" @click.stop>
              <GlassButton variant="ghost" size="icon" class="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical class="w-4 h-4" />
              </GlassButton>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Mobile Card Layout (Visible only on mobile) -->
      <div class="md:hidden flex flex-col gap-3 p-4">
        <div 
          v-for="(row, idx) in data" 
          :key="row.id || idx"
          class="glass-panel-strong rounded-xl p-4 flex flex-col relative transition-all"
          :class="{ 'ring-1 ring-primary/50 bg-primary-tint/20': selectedRows.has(row.id || idx) }"
        >
          <!-- Card Header -->
          <div class="flex justify-between items-start mb-3">
            <div class="flex items-center gap-3">
              <input 
                v-if="selectable"
                type="checkbox" 
                :checked="selectedRows.has(row.id || idx)"
                @change="toggleSelection(row.id || idx)"
                class="rounded border-white/20 bg-white/5 text-primary focus:ring-primary/50 w-5 h-5"
              >
              <!-- Show first column as main title -->
              <span class="font-semibold text-white text-base">
                {{ row[columns[0].key] }}
              </span>
            </div>
            <GlassButton variant="ghost" size="icon" class="-mt-2 -mr-2">
              <MoreVertical class="w-4 h-4" />
            </GlassButton>
          </div>

          <!-- Quick Metadata (Next 2 columns) -->
          <div class="grid grid-cols-2 gap-2 mb-3">
            <div v-for="col in columns.slice(1, 3)" :key="col.key">
              <div class="text-[10px] uppercase tracking-wider text-white/40 mb-0.5">{{ col.label }}</div>
              <div class="text-sm text-white/90">{{ row[col.key] }}</div>
            </div>
          </div>

          <!-- Expandable Section -->
          <div v-show="expandedMobileCards.has(row.id || idx)" class="pt-3 border-t border-white/10 mt-1 space-y-3">
            <div v-for="col in columns.slice(3)" :key="col.key">
              <div class="text-[10px] uppercase tracking-wider text-white/40 mb-0.5">{{ col.label }}</div>
              <div class="text-sm text-white/90">{{ row[col.key] }}</div>
            </div>
          </div>

          <!-- Card Footer Action -->
          <button 
            v-if="columns.length > 3"
            @click="toggleMobileExpand(row.id || idx)"
            class="text-xs font-medium text-primary flex items-center justify-center py-2 -mx-4 -mb-4 mt-2 hover:bg-white/5 rounded-b-xl border-t border-white/5 transition-colors"
          >
            {{ expandedMobileCards.has(row.id || idx) ? 'Show Less' : 'Show Details' }}
            <ChevronDown v-if="!expandedMobileCards.has(row.id || idx)" class="w-3 h-3 ml-1" />
          </button>
        </div>
      </div>

    </div>

    <!-- Pagination Footer -->
    <div class="p-3 border-t border-white/10 bg-white/5 flex items-center justify-between text-sm text-white/60 relative z-10">
      <span>Showing 1 to {{ data.length }} of {{ data.length }} entries</span>
      <div class="flex gap-1">
        <GlassButton variant="ghost" size="sm" disabled>Previous</GlassButton>
        <GlassButton variant="ghost" size="sm" disabled>Next</GlassButton>
      </div>
    </div>

    <!-- Mobile Loading Overlay for seamless UX -->
    <div v-if="loading && data.length" class="absolute inset-0 bg-[#0a0a0f]/50 backdrop-blur-sm z-30 flex items-center justify-center pointer-events-none">
      <div class="bg-white/10 p-3 rounded-xl backdrop-blur-md shadow-xl border border-white/10">
        <Loader2 class="w-6 h-6 animate-spin text-white" />
      </div>
    </div>
  </div>
</template>
