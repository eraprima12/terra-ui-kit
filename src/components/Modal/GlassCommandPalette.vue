<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch, computed } from 'vue';
import { Search, X } from 'lucide-vue-next';

export interface CommandItem {
  id: string;
  title: string;
  icon?: any;
  shortcut?: string;
  category?: string;
  action: () => void;
}

const props = defineProps<{
  commands?: CommandItem[];
}>();

const isOpen = ref(false);
const searchQuery = ref('');
const inputRef = ref<HTMLInputElement | null>(null);
const activeIndex = ref(0);

const getFilteredCommands = computed(() => {
  if (!props.commands) return [];
  if (!searchQuery.value) return props.commands;
  const lower = searchQuery.value.toLowerCase();
  return props.commands.filter(c => 
    c.title.toLowerCase().includes(lower) || 
    (c.category && c.category.toLowerCase().includes(lower))
  );
});

// Group commands by category
const groupedCommands = computed(() => {
  const groups: Record<string, CommandItem[]> = {};
  getFilteredCommands.value.forEach(item => {
    const cat = item.category || 'Suggestions';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(item);
  });
  return groups;
});

// Reset active index when search query changes or palette opens
watch(searchQuery, () => {
  activeIndex.value = 0;
});

const handleKeyDown = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
      searchQuery.value = '';
      activeIndex.value = 0;
      nextTick(() => {
        inputRef.value?.focus();
      });
    }
    return;
  }

  if (!isOpen.value) return;

  if (e.key === 'Escape') {
    isOpen.value = false;
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    const len = getFilteredCommands.value.length;
    if (len > 0) {
      activeIndex.value = (activeIndex.value + 1) % len;
    }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    const len = getFilteredCommands.value.length;
    if (len > 0) {
      activeIndex.value = (activeIndex.value - 1 + len) % len;
    }
  } else if (e.key === 'Enter') {
    e.preventDefault();
    const commandsList = getFilteredCommands.value;
    if (commandsList.length > 0 && commandsList[activeIndex.value]) {
      commandsList[activeIndex.value].action();
      close();
    }
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});

const close = () => {
  isOpen.value = false;
};

const getGlobalIndex = (cmd: CommandItem) => {
  return getFilteredCommands.value.indexOf(cmd);
};
</script>

<template>
  <Teleport to="body">
    <Transition name="fade-palette">
      <div v-if="isOpen" class="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4">
        <!-- Blurred Backdrop -->
        <div class="absolute inset-0 bg-black/45 backdrop-blur-md transition-opacity" @click="close"></div>
        
        <!-- Command Palette Container -->
        <div class="relative w-full max-w-xl overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#0b0c14]/80 backdrop-blur-3xl shadow-2xl transition-all">
          <!-- Search Header -->
          <div class="flex items-center border-b border-white/10 px-5">
            <Search class="h-5 w-5 text-white/50" />
            <input
              ref="inputRef"
              v-model="searchQuery"
              type="text"
              class="flex h-16 w-full bg-transparent px-4 text-sm md:text-base text-white placeholder:text-white/40 focus:outline-none"
              placeholder="Type a command or search..."
            />
            <kbd class="hidden sm:inline-block rounded border border-white/20 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/50 select-none">
              ESC
            </kbd>
          </div>
          
          <!-- Content / Results Area -->
          <div class="max-h-[50vh] overflow-y-auto p-3 scrollbar-thin space-y-4">
            <slot name="default" :query="searchQuery" :filtered="getFilteredCommands" :active="activeIndex" :grouped="groupedCommands">
              <div v-if="getFilteredCommands.length > 0" class="flex flex-col gap-4">
                <!-- Group Loop (Shadcn style) -->
                <div 
                  v-for="[category, items] in Object.entries(groupedCommands)" 
                  :key="category"
                  class="space-y-1"
                >
                  <!-- Group Header -->
                  <div class="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/30">
                    {{ category }}
                  </div>

                  <!-- Group Items -->
                  <button
                    v-for="cmd in items"
                    :key="cmd.id"
                    @click="cmd.action(); close();"
                    @mouseenter="activeIndex = getGlobalIndex(cmd)"
                    class="flex items-center justify-between w-full rounded-xl px-4 py-3 text-left text-sm transition-all duration-200 group border-l-2"
                    :class="[
                      activeIndex === getGlobalIndex(cmd)
                        ? 'bg-white/10 border-primary text-white shadow-[0_0_20px_rgba(65,130,255,0.15)] translate-x-1' 
                        : 'border-transparent text-white/70 hover:text-white'
                    ]"
                  >
                    <div class="flex items-center gap-3">
                      <component 
                        :is="cmd.icon" 
                        v-if="cmd.icon" 
                        class="h-4 w-4 transition-opacity" 
                        :class="activeIndex === getGlobalIndex(cmd) ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'" 
                      />
                      <span class="font-medium">{{ cmd.title }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <kbd v-if="cmd.shortcut" class="rounded border px-2 py-0.5 text-[9px] font-semibold transition-colors"
                        :class="[
                          activeIndex === getGlobalIndex(cmd)
                            ? 'border-white/30 bg-white/10 text-white' 
                            : 'border-white/10 bg-white/5 text-white/40'
                        ]"
                      >
                        {{ cmd.shortcut }}
                      </kbd>
                    </div>
                  </button>
                </div>
              </div>
              <div v-else class="py-14 text-center text-sm text-white/40">
                No results found for "<span class="text-white/80">{{ searchQuery }}</span>"
              </div>
            </slot>
          </div>
          
          <!-- Command Palette Footer -->
          <div class="flex items-center justify-between border-t border-white/5 bg-white/[0.02] px-5 py-3 text-[11px] text-white/40">
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1">
                <kbd class="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[9px]">↓↑</kbd> Navigate
              </span>
              <span class="flex items-center gap-1">
                <kbd class="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[9px]">Enter</kbd> Select
              </span>
            </div>
            <span>{{ getFilteredCommands.length }} items available</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-palette-enter-active,
.fade-palette-leave-active {
  transition: opacity 0.25s ease;
}
.fade-palette-enter-active .relative,
.fade-palette-leave-active .relative {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
}
.fade-palette-enter-from,
.fade-palette-leave-to {
  opacity: 0;
}
.fade-palette-enter-from .relative,
.fade-palette-leave-to .relative {
  transform: scale(0.96) translateY(-15px);
  opacity: 0;
}
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}
</style>
