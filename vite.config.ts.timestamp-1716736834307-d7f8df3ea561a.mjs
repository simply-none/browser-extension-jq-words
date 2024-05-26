// vite.config.ts
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "file:///C:/cod/browser-extension-jq-words/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/cod/browser-extension-jq-words/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import webExtension from "file:///C:/cod/browser-extension-jq-words/node_modules/@samrum/vite-plugin-web-extension/dist/index.mjs";
import ElementPlus from "file:///C:/cod/browser-extension-jq-words/node_modules/unplugin-element-plus/dist/vite.mjs";
import { visualizer } from "file:///C:/cod/browser-extension-jq-words/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import viteCompression from "file:///C:/cod/browser-extension-jq-words/node_modules/vite-plugin-compression/dist/index.mjs";
import AutoImport from "file:///C:/cod/browser-extension-jq-words/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/cod/browser-extension-jq-words/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///C:/cod/browser-extension-jq-words/node_modules/unplugin-vue-components/dist/resolvers.js";

// package.json
var package_default = {
  name: "vite-project",
  description: "A Vite project",
  private: true,
  version: "0.0.0",
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
      "@": resolve(__dirname, "src")
    }
  },
  plugins: [
    vue(),
    visualizer({
      // open: true
    }),
    viteCompression(),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIiwgInNyYy9tYW5pZmVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXGNvZFxcXFxicm93c2VyLWV4dGVuc2lvbi1qcS13b3Jkc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcY29kXFxcXGJyb3dzZXItZXh0ZW5zaW9uLWpxLXdvcmRzXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9jb2QvYnJvd3Nlci1leHRlbnNpb24tanEtd29yZHMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlLCBkaXJuYW1lIH0gZnJvbSAnbm9kZTpwYXRoJ1xyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB0eXBlIHsgVXNlckNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgd2ViRXh0ZW5zaW9uIGZyb20gJ0BzYW1ydW0vdml0ZS1wbHVnaW4td2ViLWV4dGVuc2lvbidcclxuaW1wb3J0IEVsZW1lbnRQbHVzIGZyb20gJ3VucGx1Z2luLWVsZW1lbnQtcGx1cy92aXRlJ1xyXG5pbXBvcnQge3Zpc3VhbGl6ZXJ9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcidcclxuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbic7XHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXHJcblxyXG5pbXBvcnQgbWFuaWZlc3QgZnJvbSAnLi9zcmMvbWFuaWZlc3QnXHJcblxyXG5jb25zdCBfX2Rpcm5hbWUgPSBkaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSlcclxuXHJcbmxldCBjb25maWc6IFVzZXJDb25maWcgPSB7XHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSgpLFxyXG4gICAgdmlzdWFsaXplcih7XHJcbiAgICAgIC8vIG9wZW46IHRydWVcclxuICAgIH0pLFxyXG4gICAgdml0ZUNvbXByZXNzaW9uKCksXHJcbiAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcclxuICAgIH0pLFxyXG4gICAgQ29tcG9uZW50cyh7XHJcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbiAgICB9KSxcclxuICAgIEVsZW1lbnRQbHVzKHt9KSxcclxuICBdLFxyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogJzAuMC4wLjAnXHJcbiAgfVxyXG59XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSwgY29tbWFuZCB9KSA9PiB7XHJcbiAgY29uc29sZS5sb2cobW9kZSwgY29tbWFuZCwgJ21vZGUsIGNvbW1hbmQnKVxyXG5cclxuICBpZiAoY29tbWFuZCA9PT0gJ2J1aWxkJyAmJiBtb2RlID09PSAncHJvZHVjdGlvbicpIHtcclxuICAgIGNvbmZpZy5wbHVnaW5zPy5wdXNoKHdlYkV4dGVuc2lvbih7XHJcbiAgICAgIG1hbmlmZXN0OiB7XHJcbiAgICAgICAgLi4ubWFuaWZlc3QsXHJcbiAgICAgIH0sXHJcbiAgICB9KSlcclxuICB9XHJcblxyXG4gIGlmIChjb21tYW5kID09PSAnYnVpbGQnICYmIG1vZGUgPT09ICdjb250ZW50Jykge1xyXG4gICAgLy8gXHU1OTgyXHU2NzlDXHU0RjdGXHU3NTI4IHVucGx1Z2luLWVsZW1lbnQtcGx1cyBcdTVFNzZcdTRFMTRcdTUzRUFcdTRGN0ZcdTc1MjhcdTdFQzRcdTRFRjYgQVBJKFx1NEUwRFx1NTcyOHRlbXBsYXRlXHU0RjdGXHU3NTI4XHVGRjA5XHVGRjBDXHU0RjYwXHU5NzAwXHU4OTgxXHU2MjRCXHU1MkE4XHU1QkZDXHU1MTY1XHU2ODM3XHU1RjBGXHUzMDAyXHJcbiAgICAvLyBFeGFtcGxlOlxyXG4gICAgLy8gaW1wb3J0ICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9tZXNzYWdlL3N0eWxlL2NzcydcclxuICAgIC8vIGltcG9ydCB7IEVsTWVzc2FnZSB9IGZyb20gJ2VsZW1lbnQtcGx1cydcclxuICB9XHJcblxyXG5cclxuXHJcbiAgaWYgKG1vZGUgPT09ICdjb250ZW50Jykge1xyXG4gICAgY29uZmlnLnJvb3QgPSByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb250ZW50JylcclxuICAgIGNvbmZpZy5zZXJ2ZXIgPSB7XHJcbiAgICAgIGhvc3Q6ICcwLjAuMC4wJyxcclxuICAgICAgcG9ydDogNTE5MFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKG1vZGUgPT09ICdwb3B1cCcpIHtcclxuICAgIGNvbmZpZy5yb290ID0gcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvcG9wdXAnKVxyXG4gICAgY29uZmlnLnNlcnZlciA9IHtcclxuICAgICAgaG9zdDogJzAuMC4wLjAnLFxyXG4gICAgICBwb3J0OiA1MjkwXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAobW9kZSA9PT0gJ29wdGlvbnMnKSB7XHJcbiAgICBjb25maWcucm9vdCA9IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL29wdGlvbnMnKVxyXG4gICAgY29uZmlnLnNlcnZlciA9IHtcclxuICAgICAgaG9zdDogJzAuMC4wLjAnLFxyXG4gICAgICBwb3J0OiA1MzkwXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBjb25maWdcclxufSlcclxuIiwgIntcclxuICBcIm5hbWVcIjogXCJ2aXRlLXByb2plY3RcIixcclxuICBcImRlc2NyaXB0aW9uXCI6IFwiQSBWaXRlIHByb2plY3RcIixcclxuICBcInByaXZhdGVcIjogdHJ1ZSxcclxuICBcInZlcnNpb25cIjogXCIwLjAuMFwiLFxyXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxyXG4gIFwic2NyaXB0c1wiOiB7XHJcbiAgICBcImRldlwiOiBcInZpdGVcIixcclxuICAgIFwiZGV2OmNvbnRlbnRcIjogXCJ2aXRlIC0taG9zdCAtLW1vZGUgY29udGVudFwiLFxyXG4gICAgXCJidWlsZDpjb250ZW50XCI6IFwidml0ZSBidWlsZCAtLW1vZGUgY29udGVudFwiLFxyXG4gICAgXCJkZXY6cG9wdXBcIjogXCJ2aXRlIC0taG9zdCAtLW1vZGUgcG9wdXBcIixcclxuICAgIFwiZGV2Om9wdGlvbnNcIjogXCJ2aXRlIC0taG9zdCAtLW1vZGUgb3B0aW9uc1wiLFxyXG4gICAgXCJidWlsZFwiOiBcIm5vZGUgLi9wcmVTY3JpcHQuY2pzICYmIHZ1ZS10c2MgJiYgdml0ZSBidWlsZCAmJiBub2RlIC4vcHJlYnVpbGQuY2pzXCJcclxuICB9LFxyXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiY2hlZXJpb1wiOiBcIl4xLjAuMC1yYy4xMlwiLFxyXG4gICAgXCJlbGVtZW50LXBsdXNcIjogXCJeMi43LjNcIixcclxuICAgIFwidnVlXCI6IFwiXjMuNC4yMVwiLFxyXG4gICAgXCJ2dWUtcm91dGVyXCI6IFwiXjQuMy4yXCJcclxuICB9LFxyXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiQHNhbXJ1bS92aXRlLXBsdWdpbi13ZWItZXh0ZW5zaW9uXCI6IFwiXjUuMS4wXCIsXHJcbiAgICBcIkB0eXBlcy9jaGVlcmlvXCI6IFwiXjAuMjIuMzVcIixcclxuICAgIFwiQHR5cGVzL2Nocm9tZVwiOiBcIl4wLjAuMjY4XCIsXHJcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjIwLjEyLjEyXCIsXHJcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiOiBcIl41LjAuNFwiLFxyXG4gICAgXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjogXCJeNS4xMi4wXCIsXHJcbiAgICBcInNhc3NcIjogXCJeMS43Ny4yXCIsXHJcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS4yLjJcIixcclxuICAgIFwidW5wbHVnaW4tYXV0by1pbXBvcnRcIjogXCJeMC4xNy42XCIsXHJcbiAgICBcInVucGx1Z2luLWVsZW1lbnQtcGx1c1wiOiBcIl4wLjguMFwiLFxyXG4gICAgXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50c1wiOiBcIl4wLjI3LjBcIixcclxuICAgIFwidml0ZVwiOiBcIl41LjIuMFwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiOiBcIl4wLjUuMVwiLFxyXG4gICAgXCJ2dWUtdHNjXCI6IFwiXjIuMC42XCJcclxuICB9XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxjb2RcXFxcYnJvd3Nlci1leHRlbnNpb24tanEtd29yZHNcXFxcc3JjXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxjb2RcXFxcYnJvd3Nlci1leHRlbnNpb24tanEtd29yZHNcXFxcc3JjXFxcXG1hbmlmZXN0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9jb2QvYnJvd3Nlci1leHRlbnNpb24tanEtd29yZHMvc3JjL21hbmlmZXN0LnRzXCI7aW1wb3J0IHBrZyBmcm9tICcuLi9wYWNrYWdlLmpzb24nXHJcblxyXG5jb25zdCBtYW5pZmVzdDogY2hyb21lLnJ1bnRpbWUuTWFuaWZlc3QgPSB7XHJcbiAgbWFuaWZlc3RfdmVyc2lvbjogMyxcclxuICBuYW1lOiBwa2cubmFtZSxcclxuICB2ZXJzaW9uOiBwa2cudmVyc2lvbixcclxuICBkZXNjcmlwdGlvbjogcGtnLmRlc2NyaXB0aW9uLFxyXG4gIGNvbnRlbnRfc2VjdXJpdHlfcG9saWN5OiB7XHJcbiAgICBcImV4dGVuc2lvbl9wYWdlc1wiOiBcInNjcmlwdC1zcmMgJ3NlbGYnICd3YXNtLXVuc2FmZS1ldmFsJzsgb2JqZWN0LXNyYyAnc2VsZic7XCJcclxuICB9LFxyXG4gIHBlcm1pc3Npb25zOiBbXHJcbiAgICBcIndlYk5hdmlnYXRpb25cIixcclxuICAgIFwid2ViUmVxdWVzdFwiLFxyXG4gICAgXCJjb250ZXh0TWVudXNcIiwgLy8gXHU1M0YzXHU5NTJFXHU4M0RDXHU1MzU1XHJcblx0XHRcInRhYnNcIiwgLy8gXHU2ODA3XHU3QjdFXHJcblx0XHRcIm5vdGlmaWNhdGlvbnNcIiwgLy8gXHU5MDFBXHU3N0U1XHJcblx0XHRcIndlYlJlcXVlc3RcIiwgLy8gd2ViXHU4QkY3XHU2QzQyXHJcblx0XHRcIndlYlJlcXVlc3RCbG9ja2luZ1wiLFxyXG5cdFx0XCJzdG9yYWdlXCIsIC8vIFx1NjNEMlx1NEVGNlx1NjcyQ1x1NTczMFx1NUI1OFx1NTBBOFxyXG4gICAgXCJ1bmxpbWl0ZWRTdG9yYWdlXCIsIC8vIFx1NUI1OFx1NTBBOFx1NjI2OVx1NUM1NVxyXG4gIF0sXHJcbiAgaG9zdF9wZXJtaXNzaW9uczogWycqOi8vKi8qJ10sXHJcbiAgYmFja2dyb3VuZDoge1xyXG4gICAgc2VydmljZV93b3JrZXI6ICdzcmMvYmFja2dyb3VuZC9tYWluLnRzJyxcclxuICB9LFxyXG4gIC8vIFx1OEJFNVx1NTE4NVx1NUJCOVx1NEYxQVx1NkNFOFx1NTE2NVx1NTIzMFx1NTMzOVx1OTE0RFx1NTIzMFx1N0Y1MVx1N0FEOVx1NUY1M1x1NEUyRFxyXG4gIGNvbnRlbnRfc2NyaXB0czogW1xyXG4gICAge1xyXG4gICAgICBtYXRjaGVzOiBbJzxhbGxfdXJscz4nXSxcclxuICAgICAganM6IFtcclxuICAgICAgICAnc3JjL2NvbnRlbnQvbWFpbi50cycsXHJcbiAgICAgICAgJ3NyYy9jb250ZW50U2NyaXB0cy9ldmVudC50cycsXHJcbiAgICAgICAgJ3NyYy9jb250ZW50U2NyaXB0cy9zY3JpcHQudHMnXHJcbiAgICAgIF0sXHJcbiAgICAgIGNzczogW1xyXG4gICAgICAgICdzcmMvY29udGVudC9zdHlsZS5jc3MnXHJcbiAgICAgIF1cclxuICAgIH1cclxuICBdLFxyXG4gIGFjdGlvbjoge1xyXG4gICAgZGVmYXVsdF9wb3B1cDogJ3NyYy9wb3B1cC9pbmRleC5odG1sJyxcclxuICB9LFxyXG4gIG9wdGlvbnNfdWk6IHtcclxuICAgIHBhZ2U6ICdzcmMvb3B0aW9ucy9pbmRleC5odG1sJyxcclxuICAgIG9wZW5faW5fdGFiOiBmYWxzZSxcclxuICB9LFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtYW5pZmVzdCJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlIsU0FBUyxTQUFTLGVBQWU7QUFDNVQsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyxvQkFBb0I7QUFFN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sa0JBQWtCO0FBQ3pCLE9BQU8saUJBQWlCO0FBQ3hCLFNBQVEsa0JBQWlCO0FBQ3pCLE9BQU8scUJBQXFCO0FBQzVCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCOzs7QUNYcEM7QUFBQSxFQUNFLE1BQVE7QUFBQSxFQUNSLGFBQWU7QUFBQSxFQUNmLFNBQVc7QUFBQSxFQUNYLFNBQVc7QUFBQSxFQUNYLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxJQUNULEtBQU87QUFBQSxJQUNQ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
