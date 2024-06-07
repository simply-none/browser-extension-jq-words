import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import webExtension from '@samrum/vite-plugin-web-extension'
import ElementPlus from 'unplugin-element-plus/vite'
import {visualizer} from 'rollup-plugin-visualizer'
// import viteCompression from 'vite-plugin-compression';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import commonjsExternals from 'vite-plugin-commonjs-externals';

// 使用混淆插件，会导致样式错乱
// import { viteObfuscateFile } from 'vite-plugin-obfuscator';

import manifest from './src/manifest'
 
const __dirname = dirname(fileURLToPath(import.meta.url))

let config: UserConfig = {
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js',
      '@': resolve(__dirname, 'src'),
      'public': resolve(__dirname, 'public')
    },
  },
  plugins: [
    vue(),
    commonjsExternals({
		  externals: ['fs','canvas','zlib','http','https','url'] //这里
		}),
    visualizer({
      // open: true
    }),
    // viteCompression(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus({}),
  ],
  build: {
    terserOptions: {
      compress: {
        // drop_console: true,
        pure_funcs: ['console.log']
      }
    },
  },
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

  // 脚本注入的方式，所以需要进行content的构建
  if (command === 'build' && mode === 'content') {
    console.log('content')
    // 如果使用 unplugin-element-plus 并且只使用组件 API(不在template使用），你需要手动导入样式。
    // Example:
    // import 'element-plus/es/components/message/style/css'
    // import { ElMessage } from 'element-plus'

    config.root = resolve(__dirname, 'src/content')
    config.build && (config.build.outDir = resolve(__dirname, 'src/content/dist'))
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
