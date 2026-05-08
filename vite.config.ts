import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TerraUI',
      fileName: (format) => `terra-ui.${format}.js`
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled into your library
      external: ['vue', 'lucide-vue-next'],
      output: {
        // Provide global variables to use in the UMD build for externalized deps
        globals: {
          vue: 'Vue',
          'lucide-vue-next': 'LucideVueNext'
        }
      }
    }
  }
})
