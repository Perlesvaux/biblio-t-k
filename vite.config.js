import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' 

import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/biblio-t-k/',  

plugins: [react(),

VitePWA({
  //you MUST have these three in your './public' directory:
  //favicon.png, screenshot-wide.png, screenshot-narrow.png
  //Make sure dimensions are correct. Wrong dimensions may
  //trigger bug that requires you to delete browser history
      registerType: 'autoUpdate',
      includeAssets: [], // Add static (./public) assets. i.e.: 'vite.svg'
      devOptions:{enabled:true},
      manifest: {
        name: 'Biblioteca don Pelayo',
        short_name:  'Don Pelayo',
        description: 'Perfect for book lovers who want a simple, fast, and distraction-free way to read on the go. Add it to your home screen and take your library offline today!',
        theme_color: '#FF6347',
        icons: [
            {
              'src': 'favicon.png',
              'sizes': '192x192',
              'type': 'image/png'
            }],
        start_url: '/biblio-t-k/',
        screenshots: [
        {
          src: 'screenshot-narrow.png',
          sizes: '320x320',
          type: 'image/png',
          form_factor: 'narrow',
          label: 'Narrow'
        },
        {
          src: 'screenshot-wide.png',
          sizes: '320x320',
          type: 'image/png',
          form_factor: 'wide',
          label: 'Wide'
        }
        ],
        display_override: ["window-controls-overlay"]
      },

    })],
  
})
