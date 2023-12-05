import { defineConfig } from 'vite'
import path from 'path'
import uni from '@dcloudio/vite-plugin-uni'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    base: process.env.NODE_ENV === 'prod' ? '/xc' : '/',
    plugins: [uni()],
    resolve: {
      // 配置别名
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    esbuild: {
      // 生产环境去除打印与debugger
      // drop: ['console', 'debugger']
    },
    build: {
      // 开发阶段启用源码映射：https://uniapp.dcloud.net.cn/tutorial/migration-to-vue3.html#需主动开启-sourcemap
      sourcemap: process.env.NODE_ENV === 'dev'
    },
    server: {
      host: '0.0.0.0',
      port: 9494,
      proxy: {
        '/api': {
          target: 'http://192.168.0.100:9000/xc_api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
