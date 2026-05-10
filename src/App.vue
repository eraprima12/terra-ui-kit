<script setup lang="ts">
import { ref, computed } from 'vue'
import GlassButton from './components/Button/GlassButton.vue'
import ToastProvider from './components/Toast/ToastProvider.vue'
import { useToast } from './components/Toast/useToast'
import GlassTable from './components/DataTable/GlassTable.vue'
import GlassCard from './components/Card/GlassCard.vue'
import GlassInput from './components/Input/GlassInput.vue'
import GlassModal from './components/Modal/GlassModal.vue'
import GlassPopup from './components/Popup/GlassPopup.vue'
import GlassAlert from './components/Alert/GlassAlert.vue'
import GlassBadge from './components/Badge/GlassBadge.vue'
import GlassTooltip from './components/Tooltip/GlassTooltip.vue'
import GlassToggle from './components/Input/GlassToggle.vue'
import GlassSkeleton from './components/Loading/GlassSkeleton.vue'
import GlassTabs from './components/Navigation/GlassTabs.vue'
import GlassBreadcrumb from './components/Navigation/GlassBreadcrumb.vue'
import GlassAccordion from './components/Disclosure/GlassAccordion.vue'
import GlassAvatar from './components/DataDisplay/GlassAvatar.vue'
import GlassProgressBar from './components/Loading/GlassProgressBar.vue'
import GlassTextarea from './components/Input/GlassTextarea.vue'
import GlassCheckbox from './components/Input/GlassCheckbox.vue'
import GlassSlider from './components/Input/GlassSlider.vue'
import GlassDatePicker from './components/Input/GlassDatePicker.vue'
import GlassDateRangePicker from './components/Input/GlassDateRangePicker.vue'
import GlassTimePicker from './components/Input/GlassTimePicker.vue'
import GlassNumberInput from './components/Input/GlassNumberInput.vue'
import GlassMaskedInput from './components/Input/GlassMaskedInput.vue'
import GlassCurrencyInput from './components/Input/GlassCurrencyInput.vue'
import GlassOTPInput from './components/Input/GlassOTPInput.vue'
import GlassTagsInput from './components/Input/GlassTagsInput.vue'
import GlassCombobox from './components/Input/GlassCombobox.vue'
import GlassRadioGroup from './components/Input/GlassRadioGroup.vue'
import GlassStepper from './components/Navigation/GlassStepper.vue'
import GlassHeader from './components/Navigation/GlassHeader.vue'
import GlassFooter from './components/Navigation/GlassFooter.vue'
import GlassSidebar from './components/Navigation/GlassSidebar.vue'
import GlassEmptyState from './components/DataDisplay/GlassEmptyState.vue'
import GlassCarousel from './components/DataDisplay/GlassCarousel.vue'
import GlassParallax from './components/DataDisplay/GlassParallax.vue'
import GlassSpinner from './components/Loading/GlassSpinner.vue'
import GlassCodeSnippet from './components/DataDisplay/GlassCodeSnippet.vue'
import GlassBarChart from './components/Chart/GlassBarChart.vue'
import GlassLineChart from './components/Chart/GlassLineChart.vue'
import GlassDonutChart from './components/Chart/GlassDonutChart.vue'
import GlassCommandPalette, { type CommandItem } from './components/Modal/GlassCommandPalette.vue'
import { Settings, LogOut, User, Info, Search, FileText, Activity, FolderOpen, Mail, Lock, Code, X } from 'lucide-vue-next'

const { add, promise } = useToast()

const showSuccessToast = () => {
  add({ title: 'Payment Processed', message: 'Your transaction has been successfully completed.', type: 'success' })
}

const showErrorToast = () => {
  add({ 
    title: 'Sync Failed', 
    message: 'We could not synchronize your data with the cloud.', 
    type: 'error',
    action: { label: 'Retry Sync', onClick: () => console.log('Retrying...') }
  })
}

const showPromiseToast = () => {
  const fakeRequest = new Promise((resolve) => setTimeout(resolve, 3000))
  promise(fakeRequest, {
    loading: 'Generating report...',
    success: 'Report generated successfully!',
    error: 'Failed to generate report.'
  })
}

// Table Demo Data
const columns = [
  { key: 'name', label: 'Customer Name' },
  { key: 'orderId', label: 'Order ID' },
  { key: 'status', label: 'Status', align: 'center' as const },
  { key: 'amount', label: 'Amount', align: 'right' as const },
  { key: 'date', label: 'Date' }
]

const tableData = ref([
  { id: 1, name: 'Acme Corp', orderId: '#ORD-20392', status: 'Active', amount: '$1,200.00', date: '2026-05-08' },
  { id: 2, name: 'Globex Inc', orderId: '#ORD-20393', status: 'Pending', amount: '$850.00', date: '2026-05-07' },
  { id: 3, name: 'Soylent Corp', orderId: '#ORD-20394', status: 'Completed', amount: '$3,400.00', date: '2026-05-06' },
  { id: 4, name: 'Initech', orderId: '#ORD-20395', status: 'Active', amount: '$920.00', date: '2026-05-05' },
])

const isLoading = ref(false)
const toggleLoading = () => { isLoading.value = !isLoading.value }

// Modal & Form State
const isModalOpen = ref(false)
const formData = ref({ email: '', password: '', search: '', notes: '', agree: false, notifications: true, darkTheme: true, volume: 45, date: '2026-05-08', range: ['2026-05-08', '2026-05-15'] as [string, string], time: '10:30 AM', quantity: 2, npwp: '', price: 250000, otp: '', tags: ['vue3', 'vite', 'glass'], selectedPort: 'idjkt', billingPeriod: 'monthly' })
const activeTab = ref('account')
const progressValue = ref(65)
const currentStep = ref(2)
const currentCategory = ref('all')

const currentAppView = ref('landing')
const globalSearchQuery = ref('')

// Button Customizer State
const btnText = ref('Custom Action')
const btnPrefix = ref('')
const btnSuffix = ref('')

// DataTable Customizer State
const tableHeaderTheme = ref<'sapphire' | 'default' | 'emerald' | 'crimson'>('sapphire')
const enabledColumns = ref(['name', 'orderId', 'status', 'amount', 'date'])

const activeColumns = computed(() => {
  return columns.filter(col => enabledColumns.value.includes(col.key))
})

const searchFilteredComponents = computed(() => {
  const q = globalSearchQuery.value.trim().toLowerCase()
  if (!q) return []
  const list = [
    { name: 'GlassTable', category: 'Data Grid', description: 'Interactive, adaptive glass table with customizable colors and column configurations.', action: () => { currentAppView.value = 'datatable'; globalSearchQuery.value = ''; } },
    { name: 'GlassButton', category: 'Buttons', description: 'Premium tactile button with custom variants, sizes, icon prefixes, and loaded spinner states.', action: () => { currentAppView.value = 'button'; globalSearchQuery.value = ''; } },
    { name: 'GlassDatePicker', category: 'Forms', description: 'Pure JS floating calendar selector with active indicator points.', action: () => { currentCategory.value = 'forms'; globalSearchQuery.value = ''; } },
    { name: 'GlassTagsInput', category: 'Forms', description: 'Input with keyboard tag seals and backspace remove helpers.', action: () => { currentCategory.value = 'forms'; globalSearchQuery.value = ''; } },
    { name: 'GlassOTPInput', category: 'Forms', description: 'Numbered PIN blocks supporting shifting focuses and copy pastes.', action: () => { currentCategory.value = 'forms'; globalSearchQuery.value = ''; } }
  ]
  return list.filter(item => item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q) || item.description.toLowerCase().includes(q))
})

const carouselSlides = ref([
  { title: 'The Future of Maritime Tech', subtitle: 'Harness high-speed telemetry arrays and fully modern responsive glass dashboards built for fleet supply operators.', image: 'https://picsum.photos/id/10/800/400' },
  { title: 'Responsive Data Tables', subtitle: 'Fluidly morph standard paginated grid systems into mobile card collections without sacrificing remote query bandwidth.', image: 'https://picsum.photos/id/29/800/400' },
  { title: 'Premium Glassmorphism', subtitle: 'Double-border state tracking, backdrop filters, and primary neon-halo outlines standard out of the box.', image: 'https://picsum.photos/id/48/800/400' }
])

const billingOptions = [
  { label: 'Monthly Billing', value: 'monthly', description: 'Standard billing rate. Cancel anytime.' },
  { label: 'Annual Billing', value: 'annual', description: 'Save 20% on annual commitments. Billed yearly.' }
]

const comboboxOptions = [
  { label: 'Jakarta Port (IDJKT)', value: 'idjkt' },
  { label: 'Singapore Changi (SGSIN)', value: 'sgsin' },
  { label: 'Rotterdam Terminal (NLRTM)', value: 'nlrtm' },
  { label: 'Los Angeles Port (USLAX)', value: 'uslax' }
]

const repopulateTable = () => {
  tableData.value = [
    { id: 1, name: 'Acme Corp', orderId: '#ORD-20392', status: 'Active', amount: '$1,200.00', date: '2026-05-08' },
    { id: 2, name: 'Globex Inc', orderId: '#ORD-20393', status: 'Pending', amount: '$850.00', date: '2026-05-07' },
    { id: 3, name: 'Soylent Corp', orderId: '#ORD-20394', status: 'Completed', amount: '$3,400.00', date: '2026-05-06' },
    { id: 4, name: 'Initech', orderId: '#ORD-20395', status: 'Active', amount: '$920.00', date: '2026-05-05' }
  ]
}

// Interactive Playground States
const playButton = ref({ variant: 'primary', size: 'md', loading: false })

const buttonSnippet = computed(() => {
  const prefixIcon = btnPrefix.value ? `\n  <template #icon><${btnPrefix.value} class="w-4 h-4" /></template>` : '';
  const suffixIcon = btnSuffix.value ? `\n  <template #suffix><${btnSuffix.value} class="w-4 h-4" /></template>` : '';
  return `<!-- Customized Button Component -->
<GlassButton 
  variant="${playButton.value.variant}" 
  size="${playButton.value.size}" 
  :loading="${playButton.value.loading}"
>${prefixIcon}
  ${btnText.value}${suffixIcon}
</GlassButton>`
})

const inputsSnippet = computed(() => {
  return `<!-- 1. Script Setup Declarations -->
import { ref } from 'vue';

const selectedPort = ref('idjkt');
const comboboxOptions = [
  { label: 'Jakarta Port (IDJKT)', value: 'idjkt' },
  { label: 'Singapore Changi (SGSIN)', value: 'sgsin' }
];

const npwp = ref('');
const price = ref(250000);
const otp = ref('');
const tags = ref(['vue3', 'vite', 'glass']);

<!-- 2. Template Markup -->
<GlassCombobox 
  v-model="selectedPort" 
  :options="comboboxOptions" 
  label="Destination Port" 
/>

<GlassMaskedInput 
  v-model="npwp" 
  mask="##.###.###.#-###.###" 
  label="Indonesian NPWP"
/>

<GlassCurrencyInput 
  v-model="price" 
  prefix="Rp" 
  label="Unit Price"
/>

<GlassOTPInput 
  v-model="otp" 
  :length="4" 
  label="Security PIN"
/>

<GlassTagsInput 
  v-model="tags" 
  label="Technologies"
/>`
})

const utilitiesSnippet = computed(() => {
  return `<!-- 1. Script Setup Declarations -->
const volume = ref(${formData.value.volume});
const notifications = ref(${formData.value.notifications});

<!-- 2. Template Markup -->
<GlassSlider v-model="volume" />

<GlassToggle v-model="notifications" label="Push Notifications" />`
})

const inputsStandardSnippet = computed(() => {
  return `<!-- 1. Script Setup Declarations -->
import { ref } from 'vue';

const email = ref('');
const notes = ref('');
const agree = ref(false);
const billingPeriod = ref('monthly');
const billingOptions = [
  { label: 'Monthly Billing', value: 'monthly', description: 'Standard billing rate.' },
  { label: 'Annual Billing', value: 'annual', description: 'Save 20% on annual commitments.' }
];

<!-- 2. Template Markup -->
<GlassInput v-model="email" label="Email Address" type="email" />

<GlassTextarea v-model="notes" label="Additional Notes" :rows="3" />

<GlassRadioGroup 
  v-model="billingPeriod" 
  :options="billingOptions" 
  label="Subscription Billing" 
/>

<GlassCheckbox v-model="agree" label="I agree to terms" />`
})

const toastsSnippet = computed(() => {
  return `<!-- 1. Script Setup / Composable Usage -->
import { useToast } from './components/Toast/useToast';
const { add, promise } = useToast();

// Success Toast
add({ title: 'Success', message: 'Action complete!', type: 'success' });

// Async Promise-Based Toast (with auto icon morph transitions)
promise(myPromise, {
  loading: 'Processing...',
  success: 'Completed successfully!',
  error: 'Failed to process.'
});`
})

const overlaysSnippet = computed(() => {
  return `<!-- 1. Script Setup Declarations -->
const isOpen = ref(false);

<!-- 2. Template Markup -->
<GlassModal v-model="isOpen" title="Account Settings">
  <p>Content goes here...</p>
</GlassModal>

<GlassPopup position="bottom-right">
  <template #trigger><GlassButton>Actions ▾</GlassButton></template>
  <template #default="{ close }">
    <button @click="close">Profile</button>
  </template>
</GlassPopup>`
})

const displaySnippet = computed(() => {
  return `<!-- 1. Template Markup -->
<!-- User Avatars -->
<GlassAvatar size="lg" initials="AL" status="busy" />

<!-- Skeleton Loader -->
<GlassSkeleton rounded="full" class="w-12 h-12" />

<!-- Conic Gradient Glowing Spinners -->
<GlassSpinner size="md" color="success" />

<!-- Glass Progress Bar -->
<GlassProgressBar :progress="${progressValue.value}" color="primary" height="md" />`
})

const carouselSnippet = computed(() => {
  return `<!-- 1. Script Setup Declarations -->
const carouselSlides = [
  { title: 'Slide Title', subtitle: 'Slide Description', image: 'url' }
];

<!-- 2. Template Markup -->
<GlassCarousel :slides="carouselSlides" />`
})

const layoutSnippet = computed(() => {
  return `<!-- 1. Layout Page Shell -->
<!-- Top Nav Header -->
<GlassHeader sticky>
  <template #logo><span>TERRA BRAND</span></template>
  <template #nav><a href="#">Dashboard</a></template>
</GlassHeader>

<!-- Collapsible Left Sidebar -->
<GlassSidebar :items="sidebarItems" v-model="isCollapsed" />

<!-- Bottom Footer -->
<GlassFooter>
  <template #links><a href="#">Privacy Policy</a></template>
</GlassFooter>`
})

const parallaxSnippet = computed(() => {
  return `<!-- 1. Parallax Depth Overlay Wrapper -->
<GlassParallax image="https://picsum.photos/id/43/1200/600" height="min-h-[450px]">
  <div class="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md max-w-lg">
    <h3 class="text-white">Floating Glass Card</h3>
    <p class="text-white/70">As you scroll, this card floats smoothly.</p>
  </div>
</GlassParallax>`
})

const navigationSnippet = computed(() => {
  return `<!-- 1. Script Setup Declarations -->
const activeTab = ref('account');
const currentStep = ref(${currentStep.value});

<!-- 2. Template Markup -->
<GlassBreadcrumb :items="[{ label: 'Dashboard' }, { label: 'Settings' }]" />

<GlassStepper v-model="currentStep" :steps="['Account', 'Security', 'Finish']" />

<GlassTabs v-model="activeTab" :tabs="[{ label: 'Account', value: 'account' }]" />`
})

const disclosureSnippet = computed(() => {
  return `<!-- 1. Template Markup -->
<GlassAccordion title="Is this responsive?">
  Yes, fully responsive glass design.
</GlassAccordion>`
})

const lineChartSnippet = computed(() => {
  return `<!-- Glass Line Chart Component -->
<GlassLineChart 
  :data="barData" 
  :height="180" 
  color="#4182FF" 
/>`
})

const barChartSnippet = computed(() => {
  return `<!-- Glass Bar Chart Component -->
<GlassBarChart 
  :data="barData" 
  :height="180" 
/>`
})

const donutChartSnippet = computed(() => {
  return `<!-- Glass Donut Chart Component -->
<GlassDonutChart 
  :data="donutData" 
  :size="180" 
  :thickness="22" 
/>`
})

const tableSnippet = computed(() => {
  return `<!-- Interactive DataTable Customizer -->
<GlassTable 
  :columns="columns" 
  :data="tableData" 
  :loading="${isLoading.value}"
  theme="${tableHeaderTheme.value}"
/>`
})

// Chart Data
const barData = ref([
  { label: 'Mon', value: 45 },
  { label: 'Tue', value: 80 },
  { label: 'Wed', value: 30 },
  { label: 'Thu', value: 65 },
  { label: 'Fri', value: 95 },
  { label: 'Sat', value: 50 },
  { label: 'Sun', value: 75 }
])

const donutData = ref([
  { label: 'Desktop', value: 45, color: '#4182FF' }, // Primary
  { label: 'Mobile', value: 35, color: '#34D399' },  // Success
  { label: 'Tablet', value: 20, color: '#FBBF24' }   // Warning
])

// Command Palette Data
const cmdItems = ref<CommandItem[]>([
  { id: '1', title: 'Open Settings', icon: Settings, shortcut: 'S', category: 'Account & Settings', action: () => { isModalOpen.value = true; add({ title: 'Opened Settings', type: 'info' }) } },
  { id: '2', title: 'View Profile', icon: User, shortcut: 'P', category: 'Account & Settings', action: () => add({ title: 'Navigating to Profile', type: 'success' }) },
  { id: '3', title: 'Generate Report', icon: FileText, shortcut: 'R', category: 'Analytics & Tools', action: showPromiseToast },
  { id: '4', title: 'View Analytics', icon: Activity, category: 'Analytics & Tools', action: () => add({ title: 'Analytics Loading...', type: 'info' }) },
  { id: '5', title: 'Launch Button Builder', icon: FolderOpen, shortcut: 'B', category: 'Navigation & Builders', action: () => { currentAppView.value = 'button'; add({ title: 'Launched Button Customizer', type: 'success' }) } },
  { id: '6', title: 'Launch Table Builder', icon: FolderOpen, shortcut: 'T', category: 'Navigation & Builders', action: () => { currentAppView.value = 'datatable'; add({ title: 'Launched DataTable Customizer', type: 'success' }) } },
  { id: '7', title: 'Sign Out', icon: LogOut, shortcut: 'Q', category: 'Account & Settings', action: () => add({ title: 'Signed Out', type: 'error' }) },
])

// Tab state logic for individual component showcases
const showcaseTabs = ref<Record<string, 'preview' | 'code'>>({})
const getShowcaseTab = (key: string) => showcaseTabs.value[key] || 'preview'
const setShowcaseTab = (key: string, tab: 'preview' | 'code') => showcaseTabs.value[key] = tab

// Global Code Drawer State
const isCodeDrawerOpen = ref(false)
const activeDrawerData = ref({ title: '', code: '' })
const openCodeDrawer = (title: string, code: string) => {
  activeDrawerData.value = { title, code }
  isCodeDrawerOpen.value = true
}
const closeCodeDrawer = () => { isCodeDrawerOpen.value = false }

</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-[#050508] pb-20">
    <!-- Global Top Navigation (Shadcn Style) -->
    <nav class="sticky top-0 z-50 w-full border-b border-[#27272a] bg-[#050508]/80 backdrop-blur-md supports-[backdrop-filter]:bg-[#050508]/60">
      <div class="container flex h-14 max-w-7xl mx-auto items-center px-4 md:px-8">
        <div class="mr-6 flex cursor-pointer items-center gap-2 h-full py-2" @click="currentAppView = 'landing'">
          <img src="/logo.svg" alt="Terra UI" class="h-8 w-auto brightness-0 invert" />
        </div>
        <div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div class="w-full flex-1 md:w-auto md:flex-none">
            <nav class="flex items-center gap-6 text-sm text-[#a1a1aa]">
              <button @click="currentAppView = 'landing'" class="transition-colors hover:text-white cursor-pointer font-medium" :class="currentAppView === 'landing' ? 'text-white' : ''">Home</button>
              <button @click="currentAppView = 'aio'" class="transition-colors hover:text-white cursor-pointer font-medium" :class="currentAppView === 'aio' ? 'text-white' : ''">Components</button>
              <button @click="currentAppView = 'datatable'" class="transition-colors hover:text-white cursor-pointer font-medium" :class="currentAppView === 'datatable' ? 'text-white' : ''">Live Data</button>
              <button @click="currentAppView = 'button'" class="transition-colors hover:text-white cursor-pointer font-medium" :class="currentAppView === 'button' ? 'text-white' : ''">Trigger Builder</button>
            </nav>
          </div>
          <nav class="flex items-center gap-2">
            <a href="#" class="inline-flex items-center justify-center rounded-md w-9 h-9 hover:bg-[#27272a] transition-colors text-white">
              <svg viewBox="0 0 24 24" class="w-5 h-5 fill-current"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
          </nav>
        </div>
      </div>
    </nav>

    <!-- Ambient Background Orbs -->
    <template v-if="currentAppView !== 'landing'">
      <div class="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/20 blur-[120px] pointer-events-none mix-blend-screen animate-pulse-slow"></div>
      <div class="fixed bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none mix-blend-screen"></div>
      <div class="fixed top-[40%] left-[60%] w-[35vw] h-[35vw] rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none mix-blend-screen animate-float"></div>
    </template>

    <div class="relative z-10 p-4 md:p-8 flex flex-col gap-10 max-w-7xl mx-auto">
      <ToastProvider />
      <GlassCommandPalette :commands="cmdItems" />

      <!-- 0. Shadcn Style Landing Selection View -->
      <div v-if="currentAppView === 'landing'" class="flex flex-col items-center justify-center min-h-[80vh] text-center max-w-7xl mx-auto px-4 py-20 w-full">
        <div class="inline-flex items-center rounded-full border border-[#27272a] bg-[#18181b] px-3 py-1 text-xs font-medium text-[#a1a1aa] mb-8 transition-colors hover:bg-[#27272a] cursor-pointer">
          Ready for Enterprise Applications <span class="ml-1">→</span>
        </div>
        
        <h1 class="text-4xl md:text-7xl font-bold tracking-tighter text-white mb-6 font-sans max-w-4xl">
          Build elegant glassmorphic interfaces efficiently.
        </h1>
        
        <p class="max-w-[750px] text-lg text-[#a1a1aa] sm:text-xl mb-10 font-light leading-relaxed tracking-wide">
          A powerful visual component ecosystem. Clean aesthetics meet tactile glass-surface technology out of the box.
        </p>

        <div class="flex gap-4 mb-12">
          <button @click="currentAppView = 'aio'" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-white text-black shadow hover:bg-white/90 h-11 px-8 cursor-pointer">
            Explore Suite
          </button>
          <button @click="currentAppView = 'datatable'" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-[#27272a] bg-transparent shadow-sm hover:bg-[#27272a] hover:text-white h-11 px-8 text-white cursor-pointer">
            View Documentation
          </button>
        </div>

        <!-- Advanced Component Mosaic Grid (Shadcn Copy Inspired) -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 w-full text-left mt-8 items-stretch">
          
          <!-- Column 1: Utility & Toggles (Span 4) -->
          <div class="md:col-span-4 flex flex-col gap-6">
            <!-- Mockup Widget: Auth / Toggle Panel -->
            <div class="p-6 rounded-xl border border-[#27272a] bg-[#09090b] transition-all duration-300 hover:border-[#3f3f46] group h-fit flex flex-col">
              <h4 class="text-sm font-semibold text-white mb-1 flex items-center gap-2"><Lock class="w-3 h-3"/> Secure Access</h4>
              <p class="text-xs text-[#71717a] mb-5">Enable multi-factor verification flows.</p>
              <div class="space-y-5">
                <div class="flex items-center justify-between bg-[#18181b]/40 border border-[#27272a] rounded-lg p-3">
                   <div class="flex flex-col">
                      <span class="text-xs text-white font-medium">Two-Factor Auth</span>
                      <span class="text-[10px] text-[#71717a]">Highly recommended</span>
                   </div>
                   <GlassToggle v-model="formData.notifications" />
                </div>
                <div class="flex flex-col gap-2 px-1">
                   <div class="flex justify-between text-[10px] text-[#71717a]"><span>Volume Balance</span><span>{{formData.volume}}%</span></div>
                   <GlassSlider v-model="formData.volume" />
                </div>
              </div>
            </div>

            <!-- Quick Inputs Mock -->
            <div class="p-6 rounded-xl border border-[#27272a] bg-[#09090b] transition-all duration-300 hover:border-[#3f3f46]">
              <h4 class="text-xs font-bold text-[#71717a] uppercase tracking-widest mb-4">Network Setup</h4>
              <div class="flex flex-col gap-3">
                <GlassInput placeholder="IP Destination" size="sm" v-model="formData.search" />
                <GlassButton variant="primary" size="sm" class="w-full">Init Protocol</GlassButton>
              </div>
            </div>
          </div>

          <!-- Column 2: Center Dashboard Preview (Span 5) -->
          <div class="md:col-span-5">
            <div class="p-6 rounded-xl border border-[#27272a] bg-[#09090b] h-full flex flex-col transition-all duration-300 hover:border-[#3f3f46] hover:bg-[#09090b]/80 overflow-hidden">
              <div class="flex items-center justify-between mb-8">
                <div>
                  <h4 class="text-lg font-bold text-white tracking-tight">Global Activity</h4>
                  <p class="text-xs text-[#71717a]">Aggregate telemetry throughput.</p>
                </div>
                <GlassBadge variant="success" class="animate-pulse">Live</GlassBadge>
              </div>
              
              <!-- Mini Chart -->
              <div class="flex-1 flex items-end w-full mb-6 min-h-[160px]">
                 <GlassBarChart :data="barData.slice(0, 6)" :height="160" class="w-full opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>

              <!-- Activity Footer -->
              <div class="flex items-center justify-between pt-5 border-t border-[#27272a]">
                 <div class="flex -space-x-2">
                    <GlassAvatar size="sm" initials="AD" class="border-2 border-[#09090b]" />
                    <GlassAvatar size="sm" initials="BK" class="border-2 border-[#09090b]" />
                    <div class="w-8 h-8 rounded-full bg-[#18181b] border border-[#27272a] flex items-center justify-center text-[10px] text-white">+3</div>
                 </div>
                 <GlassButton variant="glass" size="sm">Generate PDF</GlassButton>
              </div>
            </div>
          </div>

          <!-- Column 3: Right Logs / Action (Span 3) -->
          <div class="md:col-span-3 flex flex-col gap-6">
             <!-- Activity Logs List -->
             <div class="p-6 rounded-xl border border-[#27272a] bg-[#09090b] flex-1 flex flex-col transition-all duration-300 hover:border-[#3f3f46]">
                <h4 class="text-sm font-semibold text-white mb-4">Recent Events</h4>
                <div class="space-y-4 flex-1">
                   <div v-for="(log, idx) in ['System breach scan', 'Deployment #802', 'Cache refreshed']" :key="idx" class="flex items-start gap-3">
                      <div class="w-1.5 h-1.5 rounded-full bg-[#a1a1aa] mt-1.5"></div>
                      <div class="flex flex-col">
                         <span class="text-xs text-white font-medium">{{log}}</span>
                         <span class="text-[10px] text-[#71717a]">{{idx + 1}}h ago</span>
                      </div>
                   </div>
                </div>
                <div class="mt-4 pt-4 border-t border-[#27272a]">
                   <GlassProgressBar :progress="65" height="sm" color="primary" />
                   <div class="text-[9px] text-[#71717a] mt-2 text-right">Sync Status</div>
                </div>
             </div>

             <!-- Big Enter CTA -->
             <div @click="currentAppView = 'aio'" class="p-6 rounded-xl border border-[#27272a] bg-white text-black cursor-pointer group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <h3 class="text-base font-bold z-10 relative flex items-center gap-2">Browse All <FolderOpen class="w-4 h-4" /></h3>
                <p class="text-xs opacity-70 z-10 relative mt-1">Access full source codes.</p>
             </div>
          </div>

        </div>
      </div>

      <!-- 1. All-In-One (AIO) Landing Hub -->
      <div v-if="currentAppView === 'aio'" class="flex flex-col gap-10">
        <div class="flex items-center">
          <button @click="currentAppView = 'landing'" class="text-xs text-white/40 hover:text-white flex items-center gap-1 transition-colors cursor-pointer">
            ← Back to Selection
          </button>
        </div>
        <header class="mb-4 text-center md:text-left">
          <h1 class="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/30 mb-3 tracking-tight">Terra-UI-Kit</h1>
          <p class="text-white/60 text-lg font-light tracking-wide mb-6">Interactive Glassmorphism Component Customizer & Suite</p>
        </header>

        <!-- Enhanced Unified Search Bar -->
        <div class="max-w-2xl mx-auto w-full relative mb-4 group">
          <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-primary transition-colors">
            <Search class="w-5 h-5" />
          </div>
          <input 
            v-model="globalSearchQuery"
            type="text"
            placeholder="Search components (e.g. datatable, button, datepicker, otp)..."
            class="w-full pl-12 pr-24 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 text-base outline-none transition-all focus:bg-white/[0.06] focus:border-primary/50 focus:ring-4 focus:ring-primary/20 shadow-2xl hover:border-white/20"
          />
          <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none gap-1">
            <kbd class="px-1.5 py-0.5 rounded bg-white/10 border border-white/5 text-white/60 font-mono text-xs shadow-sm">Ctrl</kbd>
            <span class="text-white/30 text-xs font-medium">+</span>
            <kbd class="px-1.5 py-0.5 rounded bg-white/10 border border-white/5 text-white/60 font-mono text-xs shadow-sm">K</kbd>
          </div>
        </div>

        <!-- Search Results Filter Index -->
        <div v-if="globalSearchQuery" class="max-w-3xl mx-auto w-full mb-10 space-y-4">
          <h4 class="text-xs uppercase tracking-wider text-white/30 font-bold px-2">Filtered Components</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              v-for="res in searchFilteredComponents" 
              :key="res.name"
              class="p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md flex flex-col justify-between shadow-xl"
            >
              <div>
                <span class="text-[10px] uppercase font-bold tracking-wider text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">{{ res.category }}</span>
                <h3 class="text-lg font-bold text-white mt-2 mb-1">{{ res.name }}</h3>
                <p class="text-white/40 text-xs leading-normal mb-4">{{ res.description }}</p>
              </div>
              <GlassButton variant="primary" size="sm" @click="res.action">Launch Customizer</GlassButton>
            </div>
            <div v-if="searchFilteredComponents.length === 0" class="col-span-full py-12 text-center text-white/40 text-sm">
              No matching components found for "{{ globalSearchQuery }}"
            </div>
          </div>
        </div>

        <!-- Shadcn-Style Category Selector Split Layout -->
        <div class="flex flex-col lg:flex-row gap-10 items-start w-full">
          <!-- Left Column: Sticky Sidebar Category Selector -->
          <div class="w-full lg:w-64 flex-shrink-0 flex flex-col gap-1.5 sticky top-24 z-20 bg-black/40 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none p-4 lg:p-0 rounded-2xl border border-white/5 lg:border-none shadow-xl lg:shadow-none">
            <span class="text-xs font-bold uppercase tracking-widest text-white/30 px-3 mb-2 block">Categories</span>
            
            <button 
              @click="currentCategory = 'all'"
              class="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left border-l-2 cursor-pointer"
              :class="[
                currentCategory === 'all' 
                  ? 'bg-white/10 text-white shadow-sm font-bold border-primary pl-3' 
                  : 'border-transparent text-white/50 hover:text-white hover:bg-white/5'
              ]"
            >
              <span class="flex items-center gap-2.5">
                <div class="w-1.5 h-1.5 rounded-full transition-all" :class="currentCategory === 'all' ? 'bg-primary animate-pulse' : 'bg-transparent'"></div>
                All Components
              </span>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-white/40">35</span>
            </button>

            <button 
              @click="currentCategory = 'forms'"
              class="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left border-l-2 cursor-pointer"
              :class="[
                currentCategory === 'forms' 
                  ? 'bg-white/10 text-white shadow-sm font-bold border-primary pl-3' 
                  : 'border-transparent text-white/50 hover:text-white hover:bg-white/5'
              ]"
            >
              <span class="flex items-center gap-2.5">
                <div class="w-1.5 h-1.5 rounded-full transition-all" :class="currentCategory === 'forms' ? 'bg-primary animate-pulse' : 'bg-transparent'"></div>
                Forms & Inputs
              </span>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-white/40">15</span>
            </button>

            <button 
              @click="currentCategory = 'data'"
              class="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left border-l-2 cursor-pointer"
              :class="[
                currentCategory === 'data' 
                  ? 'bg-white/10 text-white shadow-sm font-bold border-primary pl-3' 
                  : 'border-transparent text-white/50 hover:text-white hover:bg-white/5'
              ]"
            >
              <span class="flex items-center gap-2.5">
                <div class="w-1.5 h-1.5 rounded-full transition-all" :class="currentCategory === 'data' ? 'bg-primary animate-pulse' : 'bg-transparent'"></div>
                Data & Feedback
              </span>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-white/40">11</span>
            </button>

            <button 
              @click="currentCategory = 'nav'"
              class="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left border-l-2 cursor-pointer"
              :class="[
                currentCategory === 'nav' 
                  ? 'bg-white/10 text-white shadow-sm font-bold border-primary pl-3' 
                  : 'border-transparent text-white/50 hover:text-white hover:bg-white/5'
              ]"
            >
              <span class="flex items-center gap-2.5">
                <div class="w-1.5 h-1.5 rounded-full transition-all" :class="currentCategory === 'nav' ? 'bg-primary animate-pulse' : 'bg-transparent'"></div>
                Navigation & Overlays
              </span>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-white/40">9</span>
            </button>
          </div>

          <!-- Right Column: Main Content Area -->
          <div class="flex-1 w-full flex flex-col gap-10">

        <!-- Master Symmetrical Layout Grid (Masonry-style for zero vertical gap waste) -->
        <div class="columns-1 md:columns-2 xl:columns-3 gap-8 w-full block">
          
          <!-- Quick Launch Builders Cards -->
          <div 
            v-if="currentCategory === 'all' && !globalSearchQuery"
            @click="currentAppView = 'datatable'"
            class="group/card cursor-pointer relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-md p-8 flex flex-col justify-between h-64 transition-all duration-300 hover:border-primary/30 hover:bg-primary/[0.02] hover:-translate-y-1 shadow-2xl mb-8 break-inside-avoid"
          >
            <div class="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-primary/10 blur-3xl group-hover/card:bg-primary/20 transition-all"></div>
            <div>
              <div class="w-12 h-12 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/50 group-hover/card:text-primary group-hover/card:border-primary/20 mb-6 transition-colors shadow-inner">
                <FolderOpen class="w-5 h-5" />
              </div>
              <h3 class="text-xl font-bold text-white tracking-wide mb-2 group-hover/card:text-primary transition-colors">Adaptive DataTable</h3>
              <p class="text-white/40 text-xs font-light leading-relaxed">
                Dynamically show/hide columns, toggle header color themes (Sapphire, Emerald, Crimson), trigger load states, and copy functional code templates.
              </p>
            </div>
            <span class="text-xs text-primary font-semibold flex items-center gap-1 mt-4 group-hover/card:translate-x-1 transition-transform">
              Launch Builder →
            </span>
          </div>

          <div 
            v-if="currentCategory === 'all' && !globalSearchQuery"
            @click="currentAppView = 'button'"
            class="group/card cursor-pointer relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-md p-8 flex flex-col justify-between h-64 transition-all duration-300 hover:border-primary/30 hover:bg-primary/[0.02] hover:-translate-y-1 shadow-2xl mb-8 break-inside-avoid"
          >
            <div class="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-indigo-500/10 blur-3xl group-hover/card:bg-indigo-500/20 transition-all"></div>
            <div>
              <div class="w-12 h-12 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/50 group-hover/card:text-indigo-400 group-hover/card:border-indigo-400/20 mb-6 transition-colors shadow-inner">
                <Activity class="w-5 h-5" />
              </div>
              <h3 class="text-xl font-bold text-white tracking-wide mb-2 group-hover/card:text-indigo-400 transition-colors">Tactile Button System</h3>
              <p class="text-white/40 text-xs font-light leading-relaxed">
                Design tactile triggers, choose variants and size guidelines, apply prefix/suffix lucide-icons, toggle loading spin states, and copy reactive templates.
              </p>
            </div>
            <span class="text-xs text-indigo-400 font-semibold flex items-center gap-1 mt-4 group-hover/card:translate-x-1 transition-transform">
              Launch Builder →
            </span>
          </div>

          <!-- Button System Card -->
          <GlassCard v-if="currentCategory === 'all' || currentCategory === 'forms'" title="Button System" subtitle="Interactive elements with multiple states" class="mb-8 break-inside-avoid">
            <div class="flex justify-center p-6 border border-dashed border-white/10 rounded-xl mb-4 bg-white/[0.01]">
              <GlassButton variant="primary">Standard Action</GlassButton>
            </div>
            <p class="text-xs text-white/40 leading-relaxed mb-4">Click "Launch Builder" above or search "button" to enter the advanced full-screen Button system playground.</p>
            <GlassButton variant="glass" size="sm" class="w-full" @click="currentAppView = 'button'">Launch Button Builder</GlassButton>
          </GlassCard>

          <!-- Carousel Card -->
          <GlassCard v-if="currentCategory === 'all' || currentCategory === 'forms'" title="Immersive Carousel" subtitle="Touch-enabled cinematic scroll wrapper" class="mb-8 break-inside-avoid">
            <template #actions>
              <GlassButton variant="ghost" size="icon" class="w-8 h-8 text-white/30 hover:text-primary hover:bg-primary/10 rounded-full transition-all" @click="openCodeDrawer('Immersive Carousel', carouselSnippet)">
                <Code class="w-4 h-4" />
              </GlassButton>
            </template>
            <GlassCarousel :slides="carouselSlides" />
          </GlassCard>

          <!-- Form Inputs Card -->
          <GlassCard v-if="currentCategory === 'all' || currentCategory === 'forms'" title="Form Inputs" subtitle="Text fields with icons and validation" class="mb-8 break-inside-avoid">
            <template #actions>
              <GlassButton variant="ghost" size="icon" class="w-8 h-8 text-white/30 hover:text-primary hover:bg-primary/10 rounded-full transition-all" @click="openCodeDrawer('Form Inputs', inputsStandardSnippet)">
                <Code class="w-4 h-4" />
              </GlassButton>
            </template>
            <div class="flex flex-col gap-4">
              <GlassInput v-model="formData.search" placeholder="Search anything..."><template #icon><Search class="w-4 h-4" /></template></GlassInput>
              <GlassInput v-model="formData.email" label="Email Address" placeholder="john@example.com" type="email"><template #icon><Mail class="w-4 h-4" /></template></GlassInput>
              <GlassInput v-model="formData.password" label="Password" placeholder="••••••••" type="password"><template #icon><Lock class="w-4 h-4" /></template></GlassInput>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <GlassDatePicker v-model="formData.date" label="Scheduled Date" />
                <GlassTimePicker v-model="formData.time" label="Scheduled Time" />
              </div>
              <GlassDateRangePicker v-model="formData.range" label="Booking Range" />
              <GlassTextarea v-model="formData.notes" label="Additional Notes" placeholder="Enter notes..." :rows="3" />
              <GlassCheckbox v-model="formData.agree" label="I agree to terms" />
              <div class="border-t border-white/5 pt-4"><GlassRadioGroup v-model="formData.billingPeriod" :options="billingOptions" label="Subscription Billing" /></div>
            </div>
          </GlassCard>

          <!-- Specialized Form Inputs Card -->
          <GlassCard v-if="currentCategory === 'all' || currentCategory === 'forms'" title="Specialized Form Inputs" subtitle="Formatted, numeric, and currency fields" class="mb-8 break-inside-avoid">
            <template #actions>
              <GlassButton variant="ghost" size="icon" class="w-8 h-8 text-white/30 hover:text-primary hover:bg-primary/10 rounded-full transition-all" @click="openCodeDrawer('Specialized Form Inputs', inputsSnippet)">
                <Code class="w-4 h-4" />
              </GlassButton>
            </template>
            <div class="flex flex-col gap-4">
              <GlassNumberInput v-model="formData.quantity" label="Product Quantity" :min="1" :max="10" />
              <GlassMaskedInput v-model="formData.npwp" label="Indonesian NPWP" mask="##.###.###.#-###.###" placeholder="00.000.000.0-000.000" />
              <GlassCurrencyInput v-model="formData.price" label="Unit Price" prefix="Rp" />
              <GlassCombobox v-model="formData.selectedPort" :options="comboboxOptions" label="Destination Port" />
              <div class="border-t border-white/5 my-2"></div>
              <GlassOTPInput v-model="formData.otp" :length="4" label="Security Pin" />
              <GlassTagsInput v-model="formData.tags" label="Technologies" />
            </div>
          </GlassCard>

          <!-- Toast Notifications Card -->
          <GlassCard v-if="currentCategory === 'all' || currentCategory === 'nav'" title="Toast Notifications" subtitle="Dynamic, asynchronous feedback" class="mb-8 break-inside-avoid">
            <template #actions>
              <GlassButton variant="ghost" size="icon" class="w-8 h-8 text-white/30 hover:text-primary hover:bg-primary/10 rounded-full transition-all" @click="openCodeDrawer('Toast Notifications', toastsSnippet)">
                <Code class="w-4 h-4" />
              </GlassButton>
            </template>
            <div class="flex flex-col sm:flex-row gap-4 mt-2">
              <GlassButton variant="glass" @click="showSuccessToast" class="flex-1">Success</GlassButton>
              <GlassButton variant="danger" @click="showErrorToast" class="flex-1">Error</GlassButton>
              <GlassButton variant="primary" @click="showPromiseToast" class="flex-1">Async Promise</GlassButton>
            </div>
          </GlassCard>

          <!-- Modal & Overlays Card -->
          <GlassCard v-if="currentCategory === 'all' || currentCategory === 'nav'" title="Modal & Overlays" subtitle="Focus-trapping popup dialogs" class="mb-8 break-inside-avoid">
            <template #actions>
              <GlassButton variant="ghost" size="icon" class="w-8 h-8 text-white/30 hover:text-primary hover:bg-primary/10 rounded-full transition-all" @click="openCodeDrawer('Modal & Overlays', overlaysSnippet)">
                <Code class="w-4 h-4" />
              </GlassButton>
            </template>
            <div>
              <p class="text-white/60 text-sm mb-6">Launch blurred modals that stack above ambient background or anchor popup action lists.</p>
              <div class="flex gap-4">
                <GlassButton variant="primary" @click="isModalOpen = true" class="flex-1">Open Modal</GlassButton>
                <GlassPopup position="bottom-right">
                  <template #trigger><GlassButton variant="glass">Actions ▾</GlassButton></template>
                  <template #default="{ close }">
                    <div class="flex flex-col p-1 gap-1">
                      <button @click="close" class="flex items-center gap-3 w-full px-3 py-2 text-sm text-white/90 hover:bg-white/10 rounded-lg transition-colors text-left"><User class="w-4 h-4 text-white/50" /> Profile</button>
                      <button @click="close" class="flex items-center gap-3 w-full px-3 py-2 text-sm text-white/90 hover:bg-white/10 rounded-lg transition-colors text-left"><Settings class="w-4 h-4 text-white/50" /> Settings</button>
                    </div>
                  </template>
                </GlassPopup>
              </div>
            </div>
          </GlassCard>

          <!-- Data Display Card -->
          <GlassCard v-if="currentCategory === 'all' || currentCategory === 'data'" title="Data Display" subtitle="Avatars and Loading States" class="mb-8 break-inside-avoid">
            <template #actions>
              <GlassButton variant="ghost" size="icon" class="w-8 h-8 text-white/30 hover:text-primary hover:bg-primary/10 rounded-full transition-all" @click="openCodeDrawer('Data Display', displaySnippet)">
                <Code class="w-4 h-4" />
              </GlassButton>
            </template>
            <div>
              <div>
                <h4 class="text-sm text-white/50 mb-3">User Avatars</h4>
                <div class="flex items-center gap-4">
                  <GlassAvatar size="md" initials="JD" status="online" />
                  <GlassAvatar size="lg" initials="AL" status="busy" />
                  <GlassAvatar size="xl" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" status="away" />
                </div>
              </div>
              <div class="mt-6">
                <h4 class="text-sm text-white/50 mb-4">Interactive Utilities</h4>
                <div class="flex flex-col gap-6">
                  <div class="flex items-center gap-8">
                    <GlassTooltip text="Blurred tooltip overlay." position="top"><button class="text-white hover:text-primary transition-colors flex items-center gap-1 text-sm"><Info class="w-4 h-4" /> Hover me</button></GlassTooltip>
                    <GlassToggle v-model="formData.notifications" label="Push Notifications" />
                  </div>
                  <div class="space-y-2">
                    <div class="flex justify-between text-sm text-white/70"><span>Volume</span><span>{{ formData.volume }}%</span></div>
                    <GlassSlider v-model="formData.volume" />
                  </div>
                </div>
              </div>
              <div class="mt-8">
                <h4 class="text-sm text-white/50 mb-3">Loading States</h4>
                <div class="flex items-center gap-4 mb-4">
                  <GlassSkeleton rounded="full" class="w-12 h-12 flex-shrink-0" />
                  <div class="w-full space-y-2"><GlassSkeleton width="w-3/4" height="h-3" rounded="full" /><GlassSkeleton width="w-1/2" height="h-2" rounded="full" /></div>
                </div>
                <div class="flex items-center gap-6 mb-4"><GlassSpinner size="sm" color="primary" /><GlassSpinner size="md" color="success" /><GlassSpinner size="lg" color="danger" /></div>
                <GlassProgressBar :progress="progressValue" color="primary" height="md" />
              </div>
            </div>
          </GlassCard>

          <!-- Navigation Card -->
          <GlassCard v-if="currentCategory === 'all' || currentCategory === 'nav'" title="Navigation" subtitle="Breadcrumbs and Tabbed interfaces" class="mb-8 break-inside-avoid">
            <template #actions>
              <GlassButton variant="ghost" size="icon" class="w-8 h-8 text-white/30 hover:text-primary hover:bg-primary/10 rounded-full transition-all" @click="openCodeDrawer('Navigation Systems', navigationSnippet)">
                <Code class="w-4 h-4" />
              </GlassButton>
            </template>
            <div>
              <div class="mb-6 border-b border-white/5 pb-6"><GlassBreadcrumb :items="[{ label: 'Dashboard', href: '#' }, { label: 'Settings' }]" /></div>
              <div class="mb-6 border-b border-white/5 pb-6"><GlassStepper v-model="currentStep" :steps="['Account', 'Security', 'Finish']" /></div>
              <GlassTabs v-model="activeTab" :tabs="[{ label: 'Account', value: 'account' }, { label: 'Security', value: 'security' }]"><div class="pt-6"><p class="text-sm text-white/70">Update account settings.</p></div></GlassTabs>
            </div>
          </GlassCard>

          <!-- Page Skeletons Card -->
          <GlassCard v-if="currentCategory === 'all' || currentCategory === 'nav'" title="Page Skeletons" subtitle="Header, Footer, and Collapsible Sidebar previews" class="mb-8 break-inside-avoid">
            <template #actions>
              <GlassButton variant="ghost" size="icon" class="w-8 h-8 text-white/30 hover:text-primary hover:bg-primary/10 rounded-full transition-all" @click="openCodeDrawer('Page Skeletons', layoutSnippet)">
                <Code class="w-4 h-4" />
              </GlassButton>
            </template>
            <div>
              <div class="rounded-xl border border-white/10 overflow-hidden bg-white/[0.01] h-64 flex flex-col">
                <div class="h-10 bg-white/5 border-b border-white/10 px-3 flex items-center justify-between text-[10px] font-bold text-white/80"><span>TERRA SHIELD</span></div>
                <div class="flex-1 flex min-h-0">
                  <div class="w-12 bg-white/[0.02] border-r border-white/5 p-1.5 space-y-1"><div class="h-2 w-full rounded bg-white/10"></div><div class="h-2 w-full rounded bg-primary/20"></div></div>
                  <div class="flex-1 p-3"><div class="h-3 w-1/3 rounded bg-white/20 mb-2"></div><div class="h-12 rounded bg-white/5 border border-white/10"></div></div>
                </div>
              </div>
            </div>
          </GlassCard>

          <!-- Revenue Flow Chart -->
          <GlassCard v-if="currentCategory === 'all' || currentCategory === 'data'" title="Revenue Flow" subtitle="GlassLineChart Component" class="mb-8 break-inside-avoid">
            <template #actions>
              <GlassButton variant="ghost" size="icon" class="w-8 h-8 text-white/30 hover:text-primary hover:bg-primary/10 rounded-full transition-all" @click="openCodeDrawer('Revenue Line Chart', lineChartSnippet)">
                <Code class="w-4 h-4" />
              </GlassButton>
            </template>
            <div class="pt-6"><GlassLineChart :data="barData" :height="180" color="#4182FF" /></div>
          </GlassCard>

          <!-- Weekly Activity Chart -->
          <GlassCard v-if="currentCategory === 'all' || currentCategory === 'data'" title="Weekly Activity" subtitle="GlassBarChart Component" class="mb-8 break-inside-avoid">
            <template #actions>
              <GlassButton variant="ghost" size="icon" class="w-8 h-8 text-white/30 hover:text-primary hover:bg-primary/10 rounded-full transition-all" @click="openCodeDrawer('Activity Bar Chart', barChartSnippet)">
                <Code class="w-4 h-4" />
              </GlassButton>
            </template>
            <div class="pt-6"><GlassBarChart :data="barData" :height="180" /></div>
          </GlassCard>

          <!-- Device Usage Chart -->
          <GlassCard v-if="currentCategory === 'all' || currentCategory === 'data'" title="Device Usage" subtitle="GlassDonutChart Component" class="mb-8 break-inside-avoid">
            <template #actions>
              <GlassButton variant="ghost" size="icon" class="w-8 h-8 text-white/30 hover:text-primary hover:bg-primary/10 rounded-full transition-all" @click="openCodeDrawer('Device Donut Chart', donutChartSnippet)">
                <Code class="w-4 h-4" />
              </GlassButton>
            </template>
            <div class="pt-6 flex justify-center"><GlassDonutChart :data="donutData" :size="180" :thickness="22" /></div>
          </GlassCard>
        </div>

        <!-- Wide Breakouts Section (Below Masonry Grid) -->
        <div class="flex flex-col gap-8 w-full">
          <!-- Parallax Section (Wide spanning) -->
          <GlassCard v-if="currentCategory === 'all' || currentCategory === 'data'" title="Immersive Depth Engine" subtitle="Rich layered parallax motion effects" class="w-full">
            <template #actions>
              <GlassButton variant="ghost" size="icon" class="w-8 h-8 text-white/30 hover:text-primary hover:bg-primary/10 rounded-full transition-all" @click="openCodeDrawer('Immersive Depth Engine', parallaxSnippet)">
                <Code class="w-4 h-4" />
              </GlassButton>
            </template>
            <div class="rounded-xl overflow-hidden w-full">
              <GlassParallax image="https://picsum.photos/id/43/1200/600">
                <div class="space-y-4 max-w-lg p-6 rounded-2xl border border-white/10 bg-black/45 backdrop-blur-md shadow-2xl">
                  <h3 class="text-3xl font-black text-white tracking-tight">Parallax Perspective</h3>
                  <p class="text-sm text-white/70 font-light leading-relaxed">Notice background shifts slower, creating incredible scroll depth.</p>
                </div>
              </GlassParallax>
            </div>
          </GlassCard>
        </div>

        <!-- Standard Table Showcase (AIO fallback view) -->
        <section v-if="currentCategory === 'all' || currentCategory === 'data'" class="flex flex-col gap-6 h-[450px] mt-4">
          <div class="flex justify-between items-center px-2">
            <h2 class="text-xl font-bold text-white flex items-center gap-3"><div class="w-2 h-8 bg-indigo-400 rounded-full"></div>Adaptive DataTable</h2>
            <div class="flex items-center gap-3">
              <GlassButton variant="ghost" size="sm" class="text-white/60 hover:text-white" @click="openCodeDrawer('Adaptive DataTable', tableSnippet)">
                <Code class="w-4 h-4 mr-2" /> View Code
              </GlassButton>
              <GlassButton variant="glass" size="sm" @click="currentAppView = 'datatable'">Open Full Customizer</GlassButton>
            </div>
          </div>
          <div class="flex-1 min-h-0">
            <GlassTable :columns="columns" :data="tableData" />
          </div>
        </section>
          </div>
        </div>
      </div>
      <!-- 2. DataTable Customizer View -->
      <div v-else-if="currentAppView === 'datatable'" class="flex flex-col gap-6">
        <div class="flex items-center justify-between">
          <GlassButton variant="ghost" size="sm" @click="currentAppView = 'aio'">
            ← Back to Studio Hub
          </GlassButton>
          <span class="text-xs uppercase tracking-wider text-white/30 font-bold">Component Customizer</span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Control Panel -->
          <div class="lg:col-span-1 flex flex-col gap-6">
            <GlassCard title="DataTable Options" subtitle="Configure columns, themes and state">
              <div class="space-y-6">
                <!-- Theme Select -->
                <div class="flex flex-col gap-1.5">
                  <span class="text-xs font-bold text-white/50">Header Color Theme</span>
                  <select v-model="tableHeaderTheme" class="bg-white/10 text-white rounded-xl px-3 py-2 text-sm border border-white/10 focus:outline-none">
                    <option value="sapphire" class="bg-[#0b0c14]">Neon Sapphire (Blue)</option>
                    <option value="emerald" class="bg-[#0b0c14]">Emerald Aurora (Green)</option>
                    <option value="crimson" class="bg-[#0b0c14]">Crimson Cyberpunk (Red)</option>
                  </select>
                </div>

                <!-- Column Checkboxes -->
                <div class="flex flex-col gap-2">
                  <span class="text-xs font-bold text-white/50">Visible Columns</span>
                  <div class="space-y-2">
                    <label class="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
                      <input type="checkbox" v-model="enabledColumns" value="name" class="rounded border-white/10" disabled />
                      <span>Company Name (Required)</span>
                    </label>
                    <label class="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
                      <input type="checkbox" v-model="enabledColumns" value="orderId" class="rounded border-white/10" />
                      <span>Order ID</span>
                    </label>
                    <label class="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
                      <input type="checkbox" v-model="enabledColumns" value="status" class="rounded border-white/10" />
                      <span>Status Badge</span>
                    </label>
                    <label class="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
                      <input type="checkbox" v-model="enabledColumns" value="amount" class="rounded border-white/10" />
                      <span>Financial Amount</span>
                    </label>
                    <label class="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
                      <input type="checkbox" v-model="enabledColumns" value="date" class="rounded border-white/10" />
                      <span>Submission Date</span>
                    </label>
                  </div>
                </div>

                <!-- State Controls -->
                <div class="border-t border-white/5 pt-4 flex flex-col gap-3">
                  <span class="text-xs font-bold text-white/50">Simulate States</span>
                  <div class="flex gap-2">
                    <GlassButton variant="glass" size="sm" class="flex-1" @click="toggleLoading">Toggle Loading</GlassButton>
                    <GlassButton variant="ghost" size="sm" class="flex-1" @click="tableData = []">Clear Data</GlassButton>
                  </div>
                  <GlassButton v-if="tableData.length === 0" variant="primary" size="sm" class="w-full" @click="repopulateTable">Repopulate Data</GlassButton>
                </div>
              </div>
            </GlassCard>
          </div>

          <!-- Right Preview Panel -->
          <div class="lg:col-span-2 flex flex-col gap-6">
            <GlassCard title="Live Interactive Environment" subtitle="Configure controls to live-render data grid state">
              <div class="flex items-center gap-2 p-1 bg-white/5 border border-white/10 rounded-lg w-fit mb-6">
                <button @click="setShowcaseTab('builderTable', 'preview')" class="text-xs px-3 py-1 rounded-md transition-all" :class="getShowcaseTab('builderTable') === 'preview' ? 'bg-white text-black font-medium shadow' : 'text-[#a1a1aa] hover:text-white cursor-pointer'">Live Environment</button>
                <button @click="setShowcaseTab('builderTable', 'code')" class="text-xs px-3 py-1 rounded-md transition-all" :class="getShowcaseTab('builderTable') === 'code' ? 'bg-white text-black font-medium shadow' : 'text-[#a1a1aa] hover:text-white cursor-pointer'">View Template</button>
              </div>

              <div v-if="getShowcaseTab('builderTable') === 'preview'" class="min-h-72 p-1 relative flex flex-col justify-between">
                <GlassTable 
                  v-if="tableData.length > 0"
                  :columns="activeColumns" 
                  :data="tableData" 
                  :loading="isLoading"
                  :theme="tableHeaderTheme"
                />
                <GlassEmptyState
                  v-else
                  title="DataTable is Empty"
                  description="Customize this empty state or click Repopulate to see rows."
                  :icon="FolderOpen"
                >
                  <GlassButton variant="primary" size="sm" @click="repopulateTable">Repopulate Database</GlassButton>
                </GlassEmptyState>
              </div>
              <div v-else>
                <GlassCodeSnippet :code="tableSnippet" />
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      <!-- 3. Button Builder View -->
      <div v-else-if="currentAppView === 'button'" class="flex flex-col gap-6">
        <div class="flex items-center justify-between">
          <GlassButton variant="ghost" size="sm" @click="currentAppView = 'aio'">
            ← Back to Studio Hub
          </GlassButton>
          <span class="text-xs uppercase tracking-wider text-white/30 font-bold">Component Builder</span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Control Panel -->
          <div class="lg:col-span-1 flex flex-col gap-6">
            <GlassCard title="Button Customization" subtitle="Toggle sizes, types and indicators">
              <div class="space-y-6">
                <!-- Text Input -->
                <div class="flex flex-col gap-1.5">
                  <span class="text-xs font-bold text-white/50">Label Text</span>
                  <GlassInput v-model="btnText" placeholder="Custom Action" />
                </div>

                <!-- Variant Select -->
                <div class="flex flex-col gap-1.5">
                  <span class="text-xs font-bold text-white/50">Tactile Variant</span>
                  <select v-model="playButton.variant" class="bg-white/10 text-white rounded-xl px-3 py-2 text-sm border border-white/10 focus:outline-none">
                    <option value="primary" class="bg-[#0b0c14]">primary</option>
                    <option value="secondary" class="bg-[#0b0c14]">secondary</option>
                    <option value="ghost" class="bg-[#0b0c14]">ghost</option>
                    <option value="outline" class="bg-[#0b0c14]">outline</option>
                    <option value="glass" class="bg-[#0b0c14]">glass</option>
                    <option value="danger" class="bg-[#0b0c14]">danger</option>
                  </select>
                </div>

                <!-- Size Select -->
                <div class="flex flex-col gap-1.5">
                  <span class="text-xs font-bold text-white/50">Trigger Sizing</span>
                  <select v-model="playButton.size" class="bg-white/10 text-white rounded-xl px-3 py-2 text-sm border border-white/10 focus:outline-none">
                    <option value="sm" class="bg-[#0b0c14]">small</option>
                    <option value="md" class="bg-[#0b0c14]">medium</option>
                    <option value="lg" class="bg-[#0b0c14]">large</option>
                  </select>
                </div>

                <!-- Icons Prefix/Suffix -->
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex flex-col gap-1.5">
                    <span class="text-xs font-bold text-white/50">Prefix Icon</span>
                    <select v-model="btnPrefix" class="bg-white/10 text-white rounded-xl px-3 py-2 text-sm border border-white/10 focus:outline-none">
                      <option value="" class="bg-[#0b0c14]">None</option>
                      <option value="Search" class="bg-[#0b0c14]">Search</option>
                      <option value="Mail" class="bg-[#0b0c14]">Mail</option>
                      <option value="Lock" class="bg-[#0b0c14]">Lock</option>
                      <option value="Settings" class="bg-[#0b0c14]">Settings</option>
                    </select>
                  </div>
                  <div class="flex flex-col gap-1.5">
                    <span class="text-xs font-bold text-white/50">Suffix Icon</span>
                    <select v-model="btnSuffix" class="bg-white/10 text-white rounded-xl px-3 py-2 text-sm border border-white/10 focus:outline-none">
                      <option value="" class="bg-[#0b0c14]">None</option>
                      <option value="Search" class="bg-[#0b0c14]">Search</option>
                      <option value="Mail" class="bg-[#0b0c14]">Mail</option>
                      <option value="Lock" class="bg-[#0b0c14]">Lock</option>
                      <option value="Settings" class="bg-[#0b0c14]">Settings</option>
                    </select>
                  </div>
                </div>

                <!-- Loading State Checkbox -->
                <div class="flex items-center gap-2 pt-2">
                  <input type="checkbox" id="btn-customizer-load" v-model="playButton.loading" class="rounded border-white/10 bg-white/5" />
                  <label for="btn-customizer-load" class="text-sm text-white/60 select-none cursor-pointer">Simulate loading state</label>
                </div>
              </div>
            </GlassCard>
          </div>

          <!-- Right Preview Panel -->
          <div class="lg:col-span-2 flex flex-col gap-6">
            <GlassCard title="Live Interactive Sandbox" subtitle="Tactile click trigger with bounce feedback">
              <div class="flex items-center gap-2 p-1 bg-white/5 border border-white/10 rounded-lg w-fit mb-6">
                <button @click="setShowcaseTab('builderBtn', 'preview')" class="text-xs px-3 py-1 rounded-md transition-all" :class="getShowcaseTab('builderBtn') === 'preview' ? 'bg-white text-black font-medium shadow' : 'text-[#a1a1aa] hover:text-white cursor-pointer'">Live Sandbox</button>
                <button @click="setShowcaseTab('builderBtn', 'code')" class="text-xs px-3 py-1 rounded-md transition-all" :class="getShowcaseTab('builderBtn') === 'code' ? 'bg-white text-black font-medium shadow' : 'text-[#a1a1aa] hover:text-white cursor-pointer'">Copy Snippet</button>
              </div>

              <div v-if="getShowcaseTab('builderBtn') === 'preview'" class="h-64 border border-dashed border-white/10 rounded-2xl flex items-center justify-center bg-white/[0.01]">
                <GlassButton 
                  :variant="playButton.variant as any" 
                  :size="playButton.size as any" 
                  :loading="playButton.loading"
                >
                  <template #icon v-if="btnPrefix"><component :is="btnPrefix === 'Search' ? Search : btnPrefix === 'Mail' ? Mail : btnPrefix === 'Lock' ? Lock : Settings" class="w-4 h-4" /></template>
                  {{ btnText }}
                  <template #suffix v-if="btnSuffix"><component :is="btnSuffix === 'Search' ? Search : btnSuffix === 'Mail' ? Mail : btnSuffix === 'Lock' ? Lock : Settings" class="w-4 h-4" /></template>
                </GlassButton>
              </div>
              <div v-else>
                <GlassCodeSnippet :code="buttonSnippet" />
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

    </div>

    <!-- The Modal -->
    <GlassModal v-model="isModalOpen" title="Account Settings" maxWidth="md">
      <div class="space-y-4">
        <p class="text-white/70 text-sm leading-relaxed mb-6">
          Update your profile information and manage your account security settings here. All changes are auto-saved to the cloud.
        </p>
        <GlassInput 
          v-model="formData.email" 
          label="Email Address" 
          placeholder="john@example.com"
        >
          <template #icon><Mail class="w-4 h-4" /></template>
        </GlassInput>
        <GlassInput 
          label="Bio" 
          placeholder="Tell us about yourself..." 
        />
      </div>
      
      <template #footer>
        <GlassButton variant="ghost" @click="isModalOpen = false">Cancel</GlassButton>
        <GlassButton variant="primary" @click="isModalOpen = false">Save Changes</GlassButton>
      </template>
    </GlassModal>

    <!-- Modern Sliding Code Drawer Overlay -->
    <Transition 
      enter-active-class="transition duration-300 ease-out" 
      enter-from-class="translate-x-full opacity-0" 
      enter-to-class="translate-x-0 opacity-100" 
      leave-active-class="transition duration-200 ease-in" 
      leave-from-class="translate-x-0 opacity-100" 
      leave-to-class="translate-x-full opacity-0"
    >
      <div v-if="isCodeDrawerOpen" class="fixed inset-y-0 right-0 z-[100] w-full max-w-xl glass-surface border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl flex flex-col h-full">
        <!-- Drawer Header -->
        <div class="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-black/20">
          <div class="flex flex-col">
            <div class="flex items-center gap-2 text-xs text-primary font-bold uppercase tracking-wider mb-1">
              <Code class="w-3 h-3" /> Component Source
            </div>
            <h3 class="text-xl font-bold text-white">{{ activeDrawerData.title }}</h3>
          </div>
          <GlassButton variant="ghost" size="icon" class="rounded-full hover:bg-white/10" @click="closeCodeDrawer">
            <X class="w-5 h-5" />
          </GlassButton>
        </div>

        <!-- Drawer Body (Scrollable Code Space) -->
        <div class="flex-1 overflow-y-auto p-6 bg-[#0c0c0e]/80">
          <GlassCodeSnippet :code="activeDrawerData.code" />
        </div>
      </div>
    </Transition>

    <!-- Backdrop to close drawer -->
    <Transition 
      enter-active-class="transition duration-300 ease-out" 
      enter-from-class="opacity-0" 
      enter-to-class="opacity-100" 
      leave-active-class="transition duration-200 ease-in" 
      leave-from-class="opacity-100" 
      leave-to-class="opacity-0"
    >
      <div v-if="isCodeDrawerOpen" @click="closeCodeDrawer" class="fixed inset-0 z-[99] bg-black/40 backdrop-blur-sm"></div>
    </Transition>

  </div>
</template>
