import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // The dev server may be launched through a space-free junction
    // (D:\Work\Projects\ggis-mockup) — keep module ids on that side.
    preserveSymlinks: true,
  },
  server: {
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
    host: true,
  },
})
