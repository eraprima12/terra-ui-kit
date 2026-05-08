// Terra UI Kit Library Entry Point

// Global CSS styles (Tailwind layers, Glass utilities)
import './style.css'

// 1. Buttons & Triggers
export { default as GlassButton } from './components/Button/GlassButton.vue'

// 2. Forms & Inputs
export { default as GlassInput } from './components/Input/GlassInput.vue'
export { default as GlassCheckbox } from './components/Input/GlassCheckbox.vue'
export { default as GlassSlider } from './components/Input/GlassSlider.vue'
export { default as GlassDatePicker } from './components/Input/GlassDatePicker.vue'
export { default as GlassDateRangePicker } from './components/Input/GlassDateRangePicker.vue'
export { default as GlassTimePicker } from './components/Input/GlassTimePicker.vue'
export { default as GlassNumberInput } from './components/Input/GlassNumberInput.vue'
export { default as GlassMaskedInput } from './components/Input/GlassMaskedInput.vue'
export { default as GlassCurrencyInput } from './components/Input/GlassCurrencyInput.vue'
export { default as GlassOTPInput } from './components/Input/GlassOTPInput.vue'
export { default as GlassTagsInput } from './components/Input/GlassTagsInput.vue'
export { default as GlassCombobox } from './components/Input/GlassCombobox.vue'
export { default as GlassRadioGroup } from './components/Input/GlassRadioGroup.vue'
export { default as GlassToggle } from './components/Input/GlassToggle.vue'
export { default as GlassTextarea } from './components/Input/GlassTextarea.vue'

// 3. Data Displays & Layouts
export { default as GlassTable } from './components/DataTable/GlassTable.vue'
export { default as GlassAvatar } from './components/DataDisplay/GlassAvatar.vue'
export { default as GlassEmptyState } from './components/DataDisplay/GlassEmptyState.vue'
export { default as GlassCarousel } from './components/DataDisplay/GlassCarousel.vue'
export { default as GlassParallax } from './components/DataDisplay/GlassParallax.vue'
export { default as GlassCodeSnippet } from './components/DataDisplay/GlassCodeSnippet.vue'
export { default as GlassCard } from './components/Card/GlassCard.vue'

// 4. Alerts, Badges, & Feedbacks
export { default as GlassAlert } from './components/Alert/GlassAlert.vue'
export { default as GlassBadge } from './components/Badge/GlassBadge.vue'
export { default as GlassTooltip } from './components/Tooltip/GlassTooltip.vue'

// 5. Loading Utilities
export { default as GlassProgressBar } from './components/Loading/GlassProgressBar.vue'
export { default as GlassSpinner } from './components/Loading/GlassSpinner.vue'
export { default as GlassSkeleton } from './components/Loading/GlassSkeleton.vue'

// 6. Navigation
export { default as GlassStepper } from './components/Navigation/GlassStepper.vue'
export { default as GlassBreadcrumb } from './components/Navigation/GlassBreadcrumb.vue'
export { default as GlassTabs } from './components/Navigation/GlassTabs.vue'
export { default as GlassHeader } from './components/Navigation/GlassHeader.vue'
export { default as GlassFooter } from './components/Navigation/GlassFooter.vue'
export { default as GlassSidebar } from './components/Navigation/GlassSidebar.vue'

// 7. Modals & Overlays
export { default as GlassCommandPalette } from './components/Modal/GlassCommandPalette.vue'
export { default as GlassModal } from './components/Modal/GlassModal.vue'
export { default as GlassPopup } from './components/Popup/GlassPopup.vue'

// 8. Charts & Visualization
export { default as GlassBarChart } from './components/Chart/GlassBarChart.vue'
export { default as GlassLineChart } from './components/Chart/GlassLineChart.vue'
export { default as GlassDonutChart } from './components/Chart/GlassDonutChart.vue'

// 9. Toast Systems
export { default as ToastProvider } from './components/Toast/ToastProvider.vue'
export { useToast } from './components/Toast/useToast'
