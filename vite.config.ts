﻿import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/snake-game/',  // 添加这一行
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})
