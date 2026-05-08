# 🌌 Terra UI Kit

[![NPM Version](https://img.shields.io/npm/v/terra-ui-kit?color=4182FF&style=flat-square)](https://www.npmjs.com/package/terra-ui-kit)
[![License](https://img.shields.io/npm/l/terra-ui-kit?color=34D399&style=flat-square)](https://github.com/eraprima12/terra-ui-kit)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/terra-ui-kit?color=FBBF24&style=flat-square)](https://bundlephobia.com/package/terra-ui-kit)

An ultra-modern, glassmorphic UI component suite built for **Vue 3** and **Tailwind CSS**. Designed for developers looking to craft stunning, cyberpunk-inspired, and futuristic web applications with tactile depth, vibrant color orbs, and rich glassmorphism physics.

---

## ✨ Features

* 💎 **Premium Glassmorphism Aesthetics**: Fully customized backdrop-filters, subtle glowing borders, and interactive hover mechanics.
* ⚡ **Production-Ready & Lightweight**: Fully optimized bundling (~103kB ESM) with tree-shaking support.
* 🛠️ **Fully Interactive Builders**: Includes sandboxes like `DataTable` and `Button` customizer configurations.
* 📦 **Flexible Bundles**: Exposes both **ES Module (ESM)** and **Universal Module Definition (UMD)** outputs.
* 🎨 **Tailwind Powered**: Fully compatible with the latest Tailwind CSS version.

---

## 🚀 Installation

Install **Terra UI Kit** using your preferred package manager:

```bash
# Using npm
npm install terra-ui-kit

# Using yarn
yarn add terra-ui-kit

# Using pnpm
pnpm add terra-ui-kit
```

---

## 🛠️ Setup & Configuration

### 1. Import Global Styles

Import the compiled glassmorphism stylesheets directly inside your main entry point file (usually `src/main.ts` or `src/main.js`):

```typescript
import { createApp } from 'vue'
import App from './App.vue'

// Import Terra UI Styles
import 'terra-ui-kit/dist/terra-ui-kit.css'

createApp(App).mount('#app')
```

### 2. Verify Tailwind Configuration

Make sure your `tailwind.config.js` or Vite CSS configuration includes standard Tailwind directives, as Terra UI Kit leverages Tailwind utility definitions under the hood.

---

## 📖 How to Use

You can import components individually (recommended for optimal bundle size) inside any Vue component:

### 1. Simple Button Example

```vue
<script setup lang="ts">
import { GlassButton } from 'terra-ui-kit'
import { Mail } from 'lucide-vue-next'
</script>

<template>
  <div class="p-8 bg-[#050508] min-h-screen flex items-center justify-center">
    <GlassButton variant="primary" size="md">
      <template #icon>
        <Mail class="w-4 h-4" />
      </template>
      Send Message
    </GlassButton>
  </div>
</template>
```

### 2. Interactive Adaptive DataTable

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { GlassTable } from 'terra-ui-kit'

const columns = [
  { key: 'name', label: 'Company' },
  { key: 'status', label: 'Status' },
  { key: 'amount', label: 'Amount' }
]

const tableData = ref([
  { id: 1, name: 'Nova Corp', status: 'Active', amount: '$4,500' },
  { id: 2, name: 'Aether Lab', status: 'Pending', amount: '$1,200' }
])
</script>

<template>
  <div class="p-8 bg-[#050508] min-h-screen">
    <GlassTable 
      :columns="columns" 
      :data="tableData" 
      theme="sapphire" 
    />
  </div>
</template>
```

---

## 🗂️ Component Directory

Here is the list of available premium glass components you can import from `terra-ui-kit`:

| Category | Component Name | Description |
| :--- | :--- | :--- |
| **Buttons** | `GlassButton` | Tactile neon buttons with multi-variants, loading spinner, and icon slots. |
| **Forms & Inputs** | `GlassInput` | Translucent text input with neon focus state. |
| | `GlassCheckbox` | Glassmorphic checked box with active check indicator. |
| | `GlassSlider` | Floating range selector with fluid value bar. |
| | `GlassDatePicker` | Full-screen floating calendar selector. |
| | `GlassDateRangePicker`| Dual-date range selector with active period highlights. |
| | `GlassTimePicker` | Time wheel selector with frosted glass overlays. |
| | `GlassOTPInput` | Separated OTP code numbers with auto-focus shifting. |
| | `GlassCombobox` | Rich search-autocomplete glass dropdown list. |
| | `GlassRadioGroup` | Beautiful round options selection grid. |
| | `GlassToggle` | Smooth sliding switch for toggling states. |
| | `GlassTextarea` | Multiline glass text input with auto-resize. |
| **Data & Feedback** | `GlassTable` | Dynamic grid supporting loading spinners, empty fallbacks, and customizable headers. |
| | `GlassAvatar` | Circular user profile with online/offline pulsing indicator. |
| | `GlassEmptyState` | Gorgeous empty placeholder container with vector actions. |
| | `GlassCarousel` | Sliding slide content carousel with navigation bullets. |
| | `GlassParallax` | Background-locked 3D parallax scrolling container. |
| | `GlassCard` | Frosted cards with glowing borders and slotted header contents. |
| **Navigation** | `GlassStepper` | Linear step tracker with completed neon connectors. |
| | `GlassBreadcrumb` | Translucent path navigation link trail. |
| | `GlassTabs` | Segmented sliding navigation tab controls. |
| | `GlassHeader` | Sticky glass top bar with brand slot. |
| | `GlassFooter` | Translucent copyright bottom layout bar. |
| | `GlassSidebar` | Collapsible left drawer navigation with sliding indicators. |
| **Modals & Overlays**| `GlassCommandPalette`| Floating `Ctrl + K` global command finder grouped by categories. |
| | `GlassModal` | Blurred overlay modal with focus trapping. |
| | `GlassPopup` | Absolute-positioned anchor trigger action list. |
| **Charts & Analytics**| `GlassBarChart` | Gorgeous vertical 3D analytics grid chart. |
| | `GlassLineChart` | Flowing linear visual path data chart. |
| | `GlassDonutChart` | Rounded device partition chart with neon borders. |
| **Toast Notifications**| `ToastProvider` | System toast feedback hub supporting Promise-based notifications. |

---

## 🛠️ Development & Contribution

### Setup Project Locally

To run the local component suite customizer sandbox:

```bash
# Clone the repository
git clone https://github.com/eraprima12/terra-ui-kit.git

# Enter project directory
cd terra-ui-kit

# Install dependencies
npm install

# Run dev server
npm run dev
```

### Build Library

To compile the library bundles:

```bash
npm run build
```

---

## 📄 License

MIT © [eraprima12](https://github.com/eraprima12)
