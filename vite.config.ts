import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'https://42alcr5e0f.execute-api.us-east-1.amazonaws.com/v1/auth',
        changeOrigin: true,
        secure: true,      
        ws: true,
        rewrite: (path) => path.replace(/^\/auth/, '')
        
      },
      '/products': {
        target: 'https://42alcr5e0f.execute-api.us-east-1.amazonaws.com/v1/products',
        changeOrigin: true,
        secure: true,      
        ws: true,
        rewrite: (path) => path.replace(/^\/products/, '')
        
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/_mantine";`,
      },
    },
  },
})
 