import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isLib = process.env.BUILD_TARGET === 'lib'

  const baseConfig = {
    plugins: [
      vue(),
      tailwindcss(),
    ],
  }

  if (isLib) {
    return {
      ...baseConfig,
      build: {
        outDir: 'dist',
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'TerraUI',
          fileName: (format) => `terra-ui.${format}.js`
        },
        rollupOptions: {
          external: ['vue', 'lucide-vue-next'],
          output: {
            globals: {
              vue: 'Vue',
              'lucide-vue-next': 'LucideVueNext'
            }
          }
        }
      }
    }
  }

  // Default config for static web app build (Vercel compatible)
  return {
    ...baseConfig,
    build: {
      outDir: 'dist',
      // Standard app build generates index.html and assets
    }
  }
})
