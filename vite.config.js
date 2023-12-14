import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: true,
  //   https: {
  //     key: fs.readFileSync('./ssl/key.pem'),
  //     cert: fs.readFileSync('./ssl/cert.pem'),
  //   }
  // }
})
