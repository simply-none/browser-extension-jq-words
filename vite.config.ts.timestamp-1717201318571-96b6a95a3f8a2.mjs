// vite.config.ts
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "file:///C:/cod/browser-extension-jq-words/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/cod/browser-extension-jq-words/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import webExtension from "file:///C:/cod/browser-extension-jq-words/node_modules/@samrum/vite-plugin-web-extension/dist/index.mjs";
import ElementPlus from "file:///C:/cod/browser-extension-jq-words/node_modules/unplugin-element-plus/dist/vite.mjs";
import { visualizer } from "file:///C:/cod/browser-extension-jq-words/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import AutoImport from "file:///C:/cod/browser-extension-jq-words/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/cod/browser-extension-jq-words/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///C:/cod/browser-extension-jq-words/node_modules/unplugin-vue-components/dist/resolvers.js";
import commonjsExternals from "file:///C:/cod/browser-extension-jq-words/node_modules/vite-plugin-commonjs-externals/dist/index.mjs";

// package.json
var package_default = {
  name: "webkit-extension-jq-words",
  description: "\u6D4F\u89C8\u5668\u67E5\u8BCD\u3001\u8BB0\u5FC6\u63D2\u4EF6",
  private: true,
  version: "0.0.1",
  type: "module",
  scripts: {
    dev: "vite",
    "dev:content": "vite --host --mode content",
    "build:content": "vite build --mode content",
    "dev:popup": "vite --host --mode popup",
    "dev:options": "vite --host --mode options",
    build: "node ./preScript.cjs && vue-tsc && vite build && node ./prebuild.cjs"
  },
  dependencies: {
    cheerio: "^1.0.0-rc.12",
    "element-plus": "^2.7.3",
    pinia: "^2.1.7",
    vue: "^3.4.21",
    "vue-router": "^4.3.2"
  },
  devDependencies: {
    "@samrum/vite-plugin-web-extension": "^5.1.0",
    "@types/cheerio": "^0.22.35",
    "@types/chrome": "^0.0.268",
    "@types/node": "^20.12.12",
    "@vitejs/plugin-vue": "^5.0.4",
    "rollup-plugin-visualizer": "^5.12.0",
    sass: "^1.77.2",
    typescript: "^5.2.2",
    "unplugin-auto-import": "^0.17.6",
    "unplugin-element-plus": "^0.8.0",
    "unplugin-vue-components": "^0.27.0",
    vite: "^5.2.0",
    "vite-plugin-commonjs-externals": "^0.1.4",
    "vite-plugin-compression": "^0.5.1",
    "vue-tsc": "^2.0.6"
  }
};

// src/manifest.ts
var manifest = {
  manifest_version: 3,
  name: package_default.name,
  version: package_default.version,
  description: package_default.description,
  icons: {
    // 仅能使用相对于public下的资源
    16: "assets/app/icon-16.png",
    32: "assets/app/icon-32.png",
    48: "assets/app/icon-48.png",
    64: "assets/app/icon-64.png",
    128: "assets/app/icon-128.png",
    256: "assets/app/icon-256.png"
  },
  content_security_policy: {
    "extension_pages": "script-src 'self' 'wasm-unsafe-eval'; object-src 'self';"
  },
  permissions: [
    "webNavigation",
    "webRequest",
    "contextMenus",
    // 右键菜单
    "tabs",
    // 标签
    "activeTab",
    "scripting",
    "notifications",
    // 通知
    "webRequest",
    // web请求
    "webRequestBlocking",
    "storage",
    // 插件本地存储
    "unlimitedStorage"
    // 存储扩展
  ],
  host_permissions: ["*://*/*"],
  background: {
    service_worker: "src/background/main.ts"
  },
  // 该内容会注入到匹配到网站当中
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: [
        "src/content/main.ts",
        "src/contentScripts/event.ts",
        "src/contentScripts/script.ts"
      ],
      css: [
        "src/content/style.css"
      ]
    }
  ],
  web_accessible_resources: [
    {
      resources: [
        "assets/*"
      ],
      matches: ["<all_urls>"]
    }
  ],
  action: {
    default_popup: "src/popup/index.html"
  },
  options_ui: {
    page: "src/options/index.html",
    open_in_tab: false
  }
};
var manifest_default = manifest;

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///C:/cod/browser-extension-jq-words/vite.config.ts";
var __dirname = dirname(fileURLToPath(__vite_injected_original_import_meta_url));
var config = {
  resolve: {
    alias: {
      "vue": "vue/dist/vue.esm-bundler.js",
      "@": resolve(__dirname, "src"),
      "public": resolve(__dirname, "public")
    }
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 将所有带短横线的标签名都视为自定义元素
          isCustomElement: (tag) => tag.startsWith("jade-custom-")
        }
      }
    }),
    commonjsExternals({
      externals: ["fs", "canvas", "zlib", "http", "https", "url"]
      //这里
    }),
    visualizer({
      // open: true
    }),
    // viteCompression(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    ElementPlus({})
  ],
  server: {
    host: "0.0.0.0"
  }
};
var vite_config_default = defineConfig(({ mode, command }) => {
  console.log(mode, command, "mode, command");
  if (command === "build" && mode === "production") {
    config.plugins?.push(webExtension({
      manifest: {
        ...manifest_default
      }
    }));
  }
  if (command === "build" && mode === "content") {
  }
  if (mode === "content") {
    config.root = resolve(__dirname, "src/content");
    config.server = {
      host: "0.0.0.0",
      port: 5190
    };
  }
  if (mode === "popup") {
    config.root = resolve(__dirname, "src/popup");
    config.server = {
      host: "0.0.0.0",
      port: 5290
    };
  }
  if (mode === "options") {
    config.root = resolve(__dirname, "src/options");
    config.server = {
      host: "0.0.0.0",
      port: 5390
    };
  }
  return config;
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIiwgInNyYy9tYW5pZmVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXGNvZFxcXFxicm93c2VyLWV4dGVuc2lvbi1qcS13b3Jkc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcY29kXFxcXGJyb3dzZXItZXh0ZW5zaW9uLWpxLXdvcmRzXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9jb2QvYnJvd3Nlci1leHRlbnNpb24tanEtd29yZHMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlLCBkaXJuYW1lIH0gZnJvbSAnbm9kZTpwYXRoJ1xyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB0eXBlIHsgVXNlckNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgd2ViRXh0ZW5zaW9uIGZyb20gJ0BzYW1ydW0vdml0ZS1wbHVnaW4td2ViLWV4dGVuc2lvbidcclxuaW1wb3J0IEVsZW1lbnRQbHVzIGZyb20gJ3VucGx1Z2luLWVsZW1lbnQtcGx1cy92aXRlJ1xyXG5pbXBvcnQge3Zpc3VhbGl6ZXJ9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcidcclxuLy8gaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbic7XHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXHJcblxyXG5pbXBvcnQgY29tbW9uanNFeHRlcm5hbHMgZnJvbSAndml0ZS1wbHVnaW4tY29tbW9uanMtZXh0ZXJuYWxzJztcclxuXHJcblxyXG5pbXBvcnQgbWFuaWZlc3QgZnJvbSAnLi9zcmMvbWFuaWZlc3QnXHJcblxyXG5jb25zdCBfX2Rpcm5hbWUgPSBkaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSlcclxuXHJcbmxldCBjb25maWc6IFVzZXJDb25maWcgPSB7XHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ3Z1ZSc6ICd2dWUvZGlzdC92dWUuZXNtLWJ1bmRsZXIuanMnLFxyXG4gICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXHJcbiAgICAgICdwdWJsaWMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3B1YmxpYycpXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKHtcclxuICAgICAgdGVtcGxhdGU6IHtcclxuICAgICAgICBjb21waWxlck9wdGlvbnM6IHtcclxuICAgICAgICAgIC8vIFx1NUMwNlx1NjI0MFx1NjcwOVx1NUUyNlx1NzdFRFx1NkEyQVx1N0VCRlx1NzY4NFx1NjgwN1x1N0I3RVx1NTQwRFx1OTBGRFx1ODlDNlx1NEUzQVx1ODFFQVx1NUI5QVx1NEU0OVx1NTE0M1x1N0QyMFxyXG4gICAgICAgICAgaXNDdXN0b21FbGVtZW50OiAodGFnKSA9PiB0YWcuc3RhcnRzV2l0aCgnamFkZS1jdXN0b20tJylcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pLFxyXG4gICAgY29tbW9uanNFeHRlcm5hbHMoe1xyXG5cdFx0ICBleHRlcm5hbHM6IFsnZnMnLCdjYW52YXMnLCd6bGliJywnaHR0cCcsJ2h0dHBzJywndXJsJ10gLy9cdThGRDlcdTkxQ0NcclxuXHRcdH0pLFxyXG4gICAgdmlzdWFsaXplcih7XHJcbiAgICAgIC8vIG9wZW46IHRydWVcclxuICAgIH0pLFxyXG4gICAgLy8gdml0ZUNvbXByZXNzaW9uKCksXHJcbiAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcclxuICAgIH0pLFxyXG4gICAgQ29tcG9uZW50cyh7XHJcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbiAgICB9KSxcclxuICAgIEVsZW1lbnRQbHVzKHt9KSxcclxuICBdLFxyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogJzAuMC4wLjAnXHJcbiAgfVxyXG59XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSwgY29tbWFuZCB9KSA9PiB7XHJcbiAgY29uc29sZS5sb2cobW9kZSwgY29tbWFuZCwgJ21vZGUsIGNvbW1hbmQnKVxyXG5cclxuICBpZiAoY29tbWFuZCA9PT0gJ2J1aWxkJyAmJiBtb2RlID09PSAncHJvZHVjdGlvbicpIHtcclxuICAgIGNvbmZpZy5wbHVnaW5zPy5wdXNoKHdlYkV4dGVuc2lvbih7XHJcbiAgICAgIG1hbmlmZXN0OiB7XHJcbiAgICAgICAgLi4ubWFuaWZlc3QsXHJcbiAgICAgIH0sXHJcbiAgICB9KSlcclxuICB9XHJcblxyXG4gIGlmIChjb21tYW5kID09PSAnYnVpbGQnICYmIG1vZGUgPT09ICdjb250ZW50Jykge1xyXG4gICAgLy8gXHU1OTgyXHU2NzlDXHU0RjdGXHU3NTI4IHVucGx1Z2luLWVsZW1lbnQtcGx1cyBcdTVFNzZcdTRFMTRcdTUzRUFcdTRGN0ZcdTc1MjhcdTdFQzRcdTRFRjYgQVBJKFx1NEUwRFx1NTcyOHRlbXBsYXRlXHU0RjdGXHU3NTI4XHVGRjA5XHVGRjBDXHU0RjYwXHU5NzAwXHU4OTgxXHU2MjRCXHU1MkE4XHU1QkZDXHU1MTY1XHU2ODM3XHU1RjBGXHUzMDAyXHJcbiAgICAvLyBFeGFtcGxlOlxyXG4gICAgLy8gaW1wb3J0ICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9tZXNzYWdlL3N0eWxlL2NzcydcclxuICAgIC8vIGltcG9ydCB7IEVsTWVzc2FnZSB9IGZyb20gJ2VsZW1lbnQtcGx1cydcclxuICB9XHJcblxyXG5cclxuXHJcbiAgaWYgKG1vZGUgPT09ICdjb250ZW50Jykge1xyXG4gICAgY29uZmlnLnJvb3QgPSByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb250ZW50JylcclxuICAgIGNvbmZpZy5zZXJ2ZXIgPSB7XHJcbiAgICAgIGhvc3Q6ICcwLjAuMC4wJyxcclxuICAgICAgcG9ydDogNTE5MFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKG1vZGUgPT09ICdwb3B1cCcpIHtcclxuICAgIGNvbmZpZy5yb290ID0gcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvcG9wdXAnKVxyXG4gICAgY29uZmlnLnNlcnZlciA9IHtcclxuICAgICAgaG9zdDogJzAuMC4wLjAnLFxyXG4gICAgICBwb3J0OiA1MjkwXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAobW9kZSA9PT0gJ29wdGlvbnMnKSB7XHJcbiAgICBjb25maWcucm9vdCA9IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL29wdGlvbnMnKVxyXG4gICAgY29uZmlnLnNlcnZlciA9IHtcclxuICAgICAgaG9zdDogJzAuMC4wLjAnLFxyXG4gICAgICBwb3J0OiA1MzkwXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBjb25maWdcclxufSlcclxuIiwgIntcclxuICBcIm5hbWVcIjogXCJ3ZWJraXQtZXh0ZW5zaW9uLWpxLXdvcmRzXCIsXHJcbiAgXCJkZXNjcmlwdGlvblwiOiBcIlx1NkQ0Rlx1ODlDOFx1NTY2OFx1NjdFNVx1OEJDRFx1MzAwMVx1OEJCMFx1NUZDNlx1NjNEMlx1NEVGNlwiLFxyXG4gIFwicHJpdmF0ZVwiOiB0cnVlLFxyXG4gIFwidmVyc2lvblwiOiBcIjAuMC4xXCIsXHJcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXHJcbiAgXCJzY3JpcHRzXCI6IHtcclxuICAgIFwiZGV2XCI6IFwidml0ZVwiLFxyXG4gICAgXCJkZXY6Y29udGVudFwiOiBcInZpdGUgLS1ob3N0IC0tbW9kZSBjb250ZW50XCIsXHJcbiAgICBcImJ1aWxkOmNvbnRlbnRcIjogXCJ2aXRlIGJ1aWxkIC0tbW9kZSBjb250ZW50XCIsXHJcbiAgICBcImRldjpwb3B1cFwiOiBcInZpdGUgLS1ob3N0IC0tbW9kZSBwb3B1cFwiLFxyXG4gICAgXCJkZXY6b3B0aW9uc1wiOiBcInZpdGUgLS1ob3N0IC0tbW9kZSBvcHRpb25zXCIsXHJcbiAgICBcImJ1aWxkXCI6IFwibm9kZSAuL3ByZVNjcmlwdC5janMgJiYgdnVlLXRzYyAmJiB2aXRlIGJ1aWxkICYmIG5vZGUgLi9wcmVidWlsZC5janNcIlxyXG4gIH0sXHJcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJjaGVlcmlvXCI6IFwiXjEuMC4wLXJjLjEyXCIsXHJcbiAgICBcImVsZW1lbnQtcGx1c1wiOiBcIl4yLjcuM1wiLFxyXG4gICAgXCJwaW5pYVwiOiBcIl4yLjEuN1wiLFxyXG4gICAgXCJ2dWVcIjogXCJeMy40LjIxXCIsXHJcbiAgICBcInZ1ZS1yb3V0ZXJcIjogXCJeNC4zLjJcIlxyXG4gIH0sXHJcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAc2FtcnVtL3ZpdGUtcGx1Z2luLXdlYi1leHRlbnNpb25cIjogXCJeNS4xLjBcIixcclxuICAgIFwiQHR5cGVzL2NoZWVyaW9cIjogXCJeMC4yMi4zNVwiLFxyXG4gICAgXCJAdHlwZXMvY2hyb21lXCI6IFwiXjAuMC4yNjhcIixcclxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMjAuMTIuMTJcIixcclxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI6IFwiXjUuMC40XCIsXHJcbiAgICBcInJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclwiOiBcIl41LjEyLjBcIixcclxuICAgIFwic2Fzc1wiOiBcIl4xLjc3LjJcIixcclxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjIuMlwiLFxyXG4gICAgXCJ1bnBsdWdpbi1hdXRvLWltcG9ydFwiOiBcIl4wLjE3LjZcIixcclxuICAgIFwidW5wbHVnaW4tZWxlbWVudC1wbHVzXCI6IFwiXjAuOC4wXCIsXHJcbiAgICBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzXCI6IFwiXjAuMjcuMFwiLFxyXG4gICAgXCJ2aXRlXCI6IFwiXjUuMi4wXCIsXHJcbiAgICBcInZpdGUtcGx1Z2luLWNvbW1vbmpzLWV4dGVybmFsc1wiOiBcIl4wLjEuNFwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiOiBcIl4wLjUuMVwiLFxyXG4gICAgXCJ2dWUtdHNjXCI6IFwiXjIuMC42XCJcclxuICB9XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxjb2RcXFxcYnJvd3Nlci1leHRlbnNpb24tanEtd29yZHNcXFxcc3JjXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxjb2RcXFxcYnJvd3Nlci1leHRlbnNpb24tanEtd29yZHNcXFxcc3JjXFxcXG1hbmlmZXN0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9jb2QvYnJvd3Nlci1leHRlbnNpb24tanEtd29yZHMvc3JjL21hbmlmZXN0LnRzXCI7aW1wb3J0IHBrZyBmcm9tICcuLi9wYWNrYWdlLmpzb24nXHJcblxyXG5jb25zdCBtYW5pZmVzdDogY2hyb21lLnJ1bnRpbWUuTWFuaWZlc3QgPSB7XHJcbiAgbWFuaWZlc3RfdmVyc2lvbjogMyxcclxuICBuYW1lOiBwa2cubmFtZSxcclxuICB2ZXJzaW9uOiBwa2cudmVyc2lvbixcclxuICBkZXNjcmlwdGlvbjogcGtnLmRlc2NyaXB0aW9uLFxyXG4gIGljb25zOiB7XHJcbiAgICAvLyBcdTRFQzVcdTgwRkRcdTRGN0ZcdTc1MjhcdTc2RjhcdTVCRjlcdTRFOEVwdWJsaWNcdTRFMEJcdTc2ODRcdThENDRcdTZFOTBcclxuICAgIDE2OiBcImFzc2V0cy9hcHAvaWNvbi0xNi5wbmdcIixcclxuICAgIDMyOiBcImFzc2V0cy9hcHAvaWNvbi0zMi5wbmdcIixcclxuICAgIDQ4OiBcImFzc2V0cy9hcHAvaWNvbi00OC5wbmdcIixcclxuICAgIDY0OiBcImFzc2V0cy9hcHAvaWNvbi02NC5wbmdcIixcclxuICAgIDEyODogXCJhc3NldHMvYXBwL2ljb24tMTI4LnBuZ1wiLFxyXG4gICAgMjU2OiBcImFzc2V0cy9hcHAvaWNvbi0yNTYucG5nXCIsXHJcbiAgfSxcclxuICBjb250ZW50X3NlY3VyaXR5X3BvbGljeToge1xyXG4gICAgXCJleHRlbnNpb25fcGFnZXNcIjogXCJzY3JpcHQtc3JjICdzZWxmJyAnd2FzbS11bnNhZmUtZXZhbCc7IG9iamVjdC1zcmMgJ3NlbGYnO1wiXHJcbiAgfSxcclxuICBwZXJtaXNzaW9uczogW1xyXG4gICAgXCJ3ZWJOYXZpZ2F0aW9uXCIsXHJcbiAgICBcIndlYlJlcXVlc3RcIixcclxuICAgIFwiY29udGV4dE1lbnVzXCIsIC8vIFx1NTNGM1x1OTUyRVx1ODNEQ1x1NTM1NVxyXG5cdFx0XCJ0YWJzXCIsIC8vIFx1NjgwN1x1N0I3RVxyXG4gICAgXCJhY3RpdmVUYWJcIixcclxuICAgIFwic2NyaXB0aW5nXCIsXHJcblx0XHRcIm5vdGlmaWNhdGlvbnNcIiwgLy8gXHU5MDFBXHU3N0U1XHJcblx0XHRcIndlYlJlcXVlc3RcIiwgLy8gd2ViXHU4QkY3XHU2QzQyXHJcblx0XHRcIndlYlJlcXVlc3RCbG9ja2luZ1wiLFxyXG5cdFx0XCJzdG9yYWdlXCIsIC8vIFx1NjNEMlx1NEVGNlx1NjcyQ1x1NTczMFx1NUI1OFx1NTBBOFxyXG4gICAgXCJ1bmxpbWl0ZWRTdG9yYWdlXCIsIC8vIFx1NUI1OFx1NTBBOFx1NjI2OVx1NUM1NVxyXG4gIF0sXHJcbiAgaG9zdF9wZXJtaXNzaW9uczogWycqOi8vKi8qJ10sXHJcbiAgYmFja2dyb3VuZDoge1xyXG4gICAgc2VydmljZV93b3JrZXI6ICdzcmMvYmFja2dyb3VuZC9tYWluLnRzJyxcclxuICB9LFxyXG4gIC8vIFx1OEJFNVx1NTE4NVx1NUJCOVx1NEYxQVx1NkNFOFx1NTE2NVx1NTIzMFx1NTMzOVx1OTE0RFx1NTIzMFx1N0Y1MVx1N0FEOVx1NUY1M1x1NEUyRFxyXG4gIGNvbnRlbnRfc2NyaXB0czogW1xyXG4gICAge1xyXG4gICAgICBtYXRjaGVzOiBbJzxhbGxfdXJscz4nXSxcclxuICAgICAganM6IFtcclxuICAgICAgICAnc3JjL2NvbnRlbnQvbWFpbi50cycsXHJcbiAgICAgICAgJ3NyYy9jb250ZW50U2NyaXB0cy9ldmVudC50cycsXHJcbiAgICAgICAgJ3NyYy9jb250ZW50U2NyaXB0cy9zY3JpcHQudHMnXHJcbiAgICAgIF0sXHJcbiAgICAgIGNzczogW1xyXG4gICAgICAgICdzcmMvY29udGVudC9zdHlsZS5jc3MnXHJcbiAgICAgIF1cclxuICAgIH1cclxuICBdLFxyXG4gIHdlYl9hY2Nlc3NpYmxlX3Jlc291cmNlczogW1xyXG4gICAge1xyXG4gICAgICByZXNvdXJjZXM6IFtcclxuICAgICAgICAnYXNzZXRzLyonXHJcbiAgICAgIF0sXHJcbiAgICAgIG1hdGNoZXM6IFsnPGFsbF91cmxzPiddLFxyXG4gICAgfVxyXG4gIF0sXHJcbiAgYWN0aW9uOiB7XHJcbiAgICBkZWZhdWx0X3BvcHVwOiAnc3JjL3BvcHVwL2luZGV4Lmh0bWwnLFxyXG4gIH0sXHJcbiAgb3B0aW9uc191aToge1xyXG4gICAgcGFnZTogJ3NyYy9vcHRpb25zL2luZGV4Lmh0bWwnLFxyXG4gICAgb3Blbl9pbl90YWI6IGZhbHNlLFxyXG4gIH0sXHJcbn1cclxuXHJcbmV4cG9y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
