import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import webExtension from '@samrum/vite-plugin-web-extension'
import ElementPlus from 'unplugin-element-plus/vite'
import {visualizer} from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import manifest from './src/manifest'

const __dirname = dirname(fileURLToPath(import.meta.url))

let config: UserConfig = {
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js',
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 将所有带短横线的标签名都视为自定义元素
          isCustomElement: (tag) => tag.startsWith('jade-custom-')
        }
      }
    }),
    visualizer({
      // open: true
    }),
    viteCompression(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus({}),
  ],
  server: {
    host: '0.0.0.0'
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  console.log(mode, command, 'mode, command')

  if (command === 'build' && mode === 'production') {
    config.plugins?.push(webExtension({
      manifest: {
        ...manifest,
      },
    }))
  }

  if (command === 'build' && mode === 'content') {
    // 如果使用 unplugin-element-plus 并且只使用组件 API(不在template使用），你需要手动导入样式。
    // Example:
    // import 'element-plus/es/components/message/style/css'
    // import { ElMessage } from 'element-plus'
  }



  if (mode === 'content') {
    config.root = resolve(__dirname, 'src/content')
    config.server = {
      host: '0.0.0.0',
      port: 5190
    }
  }

  if (mode === 'popup') {
    config.root = resolve(__dirname, 'src/popup')
    config.server = {
      host: '0.0.0.0',
      port: 5290
    }
  }

  if (mode === 'options') {
    config.root = resolve(__dirname, 'src/options')
    config.server = {
      host: '0.0.0.0',
      port: 5390
    }
  }
  return config
})
