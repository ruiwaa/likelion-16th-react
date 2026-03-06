import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css:{
    devSourcemap:true,
  },
  server:{
    port: 3000,
    open: false,
  },
  resolve:{
  alias:[{find: '@/', replacement:path.resolve(__dirname,'./src')}]
  },
})
