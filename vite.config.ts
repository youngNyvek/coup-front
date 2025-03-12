// vite.config.ts
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true, routeFilePrefix: "~" }),
    viteReact(),
    tailwindcss()
    // ...,
  ],
  server: {
    allowedHosts: ["orange-banks-sip.loca.lt"]
  }
})