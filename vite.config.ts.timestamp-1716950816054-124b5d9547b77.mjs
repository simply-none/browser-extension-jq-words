// vite.config.ts
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "file:///C:/Users/admin/Documents/GitHub/xy-dict/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/admin/Documents/GitHub/xy-dict/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import webExtension from "file:///C:/Users/admin/Documents/GitHub/xy-dict/node_modules/@samrum/vite-plugin-web-extension/dist/index.mjs";
import ElementPlus from "file:///C:/Users/admin/Documents/GitHub/xy-dict/node_modules/unplugin-element-plus/dist/vite.mjs";
import { visualizer } from "file:///C:/Users/admin/Documents/GitHub/xy-dict/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import viteCompression from "file:///C:/Users/admin/Documents/GitHub/xy-dict/node_modules/vite-plugin-compression/dist/index.mjs";
import AutoImport from "file:///C:/Users/admin/Documents/GitHub/xy-dict/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Users/admin/Documents/GitHub/xy-dict/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///C:/Users/admin/Documents/GitHub/xy-dict/node_modules/unplugin-vue-components/dist/resolvers.js";

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
var __vite_injected_original_import_meta_url = "file:///C:/Users/admin/Documents/GitHub/xy-dict/vite.config.ts";
var __dirname = dirname(fileURLToPath(__vite_injected_original_import_meta_url));
var config = {
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIiwgInNyYy9tYW5pZmVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFkbWluXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxceHktZGljdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYWRtaW5cXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFx4eS1kaWN0XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hZG1pbi9Eb2N1bWVudHMvR2l0SHViL3h5LWRpY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlLCBkaXJuYW1lIH0gZnJvbSAnbm9kZTpwYXRoJ1xyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB0eXBlIHsgVXNlckNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgd2ViRXh0ZW5zaW9uIGZyb20gJ0BzYW1ydW0vdml0ZS1wbHVnaW4td2ViLWV4dGVuc2lvbidcclxuaW1wb3J0IEVsZW1lbnRQbHVzIGZyb20gJ3VucGx1Z2luLWVsZW1lbnQtcGx1cy92aXRlJ1xyXG5pbXBvcnQge3Zpc3VhbGl6ZXJ9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcidcclxuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbic7XHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXHJcblxyXG5pbXBvcnQgbWFuaWZlc3QgZnJvbSAnLi9zcmMvbWFuaWZlc3QnXHJcblxyXG5jb25zdCBfX2Rpcm5hbWUgPSBkaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSlcclxuXHJcbmxldCBjb25maWc6IFVzZXJDb25maWcgPSB7XHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSh7XHJcbiAgICAgIHRlbXBsYXRlOiB7XHJcbiAgICAgICAgY29tcGlsZXJPcHRpb25zOiB7XHJcbiAgICAgICAgICAvLyBcdTVDMDZcdTYyNDBcdTY3MDlcdTVFMjZcdTc3RURcdTZBMkFcdTdFQkZcdTc2ODRcdTY4MDdcdTdCN0VcdTU0MERcdTkwRkRcdTg5QzZcdTRFM0FcdTgxRUFcdTVCOUFcdTRFNDlcdTUxNDNcdTdEMjBcclxuICAgICAgICAgIGlzQ3VzdG9tRWxlbWVudDogKHRhZykgPT4gdGFnLnN0YXJ0c1dpdGgoJ2phZGUtY3VzdG9tLScpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KSxcclxuICAgIHZpc3VhbGl6ZXIoe1xyXG4gICAgICAvLyBvcGVuOiB0cnVlXHJcbiAgICB9KSxcclxuICAgIHZpdGVDb21wcmVzc2lvbigpLFxyXG4gICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbiAgICB9KSxcclxuICAgIENvbXBvbmVudHMoe1xyXG4gICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG4gICAgfSksXHJcbiAgICBFbGVtZW50UGx1cyh7fSksXHJcbiAgXSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIGhvc3Q6ICcwLjAuMC4wJ1xyXG4gIH1cclxufVxyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUsIGNvbW1hbmQgfSkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKG1vZGUsIGNvbW1hbmQsICdtb2RlLCBjb21tYW5kJylcclxuXHJcbiAgaWYgKGNvbW1hbmQgPT09ICdidWlsZCcgJiYgbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgICBjb25maWcucGx1Z2lucz8ucHVzaCh3ZWJFeHRlbnNpb24oe1xyXG4gICAgICBtYW5pZmVzdDoge1xyXG4gICAgICAgIC4uLm1hbmlmZXN0LFxyXG4gICAgICB9LFxyXG4gICAgfSkpXHJcbiAgfVxyXG5cclxuICBpZiAoY29tbWFuZCA9PT0gJ2J1aWxkJyAmJiBtb2RlID09PSAnY29udGVudCcpIHtcclxuICAgIC8vIFx1NTk4Mlx1Njc5Q1x1NEY3Rlx1NzUyOCB1bnBsdWdpbi1lbGVtZW50LXBsdXMgXHU1RTc2XHU0RTE0XHU1M0VBXHU0RjdGXHU3NTI4XHU3RUM0XHU0RUY2IEFQSShcdTRFMERcdTU3Mjh0ZW1wbGF0ZVx1NEY3Rlx1NzUyOFx1RkYwOVx1RkYwQ1x1NEY2MFx1OTcwMFx1ODk4MVx1NjI0Qlx1NTJBOFx1NUJGQ1x1NTE2NVx1NjgzN1x1NUYwRlx1MzAwMlxyXG4gICAgLy8gRXhhbXBsZTpcclxuICAgIC8vIGltcG9ydCAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvbWVzc2FnZS9zdHlsZS9jc3MnXHJcbiAgICAvLyBpbXBvcnQgeyBFbE1lc3NhZ2UgfSBmcm9tICdlbGVtZW50LXBsdXMnXHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIGlmIChtb2RlID09PSAnY29udGVudCcpIHtcclxuICAgIGNvbmZpZy5yb290ID0gcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29udGVudCcpXHJcbiAgICBjb25maWcuc2VydmVyID0ge1xyXG4gICAgICBob3N0OiAnMC4wLjAuMCcsXHJcbiAgICAgIHBvcnQ6IDUxOTBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChtb2RlID09PSAncG9wdXAnKSB7XHJcbiAgICBjb25maWcucm9vdCA9IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3BvcHVwJylcclxuICAgIGNvbmZpZy5zZXJ2ZXIgPSB7XHJcbiAgICAgIGhvc3Q6ICcwLjAuMC4wJyxcclxuICAgICAgcG9ydDogNTI5MFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKG1vZGUgPT09ICdvcHRpb25zJykge1xyXG4gICAgY29uZmlnLnJvb3QgPSByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9vcHRpb25zJylcclxuICAgIGNvbmZpZy5zZXJ2ZXIgPSB7XHJcbiAgICAgIGhvc3Q6ICcwLjAuMC4wJyxcclxuICAgICAgcG9ydDogNTM5MFxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gY29uZmlnXHJcbn0pXHJcbiIsICJ7XHJcbiAgXCJuYW1lXCI6IFwid2Via2l0LWV4dGVuc2lvbi1qcS13b3Jkc1wiLFxyXG4gIFwiZGVzY3JpcHRpb25cIjogXCJcdTZENEZcdTg5QzhcdTU2NjhcdTY3RTVcdThCQ0RcdTMwMDFcdThCQjBcdTVGQzZcdTYzRDJcdTRFRjZcIixcclxuICBcInByaXZhdGVcIjogdHJ1ZSxcclxuICBcInZlcnNpb25cIjogXCIwLjAuMVwiLFxyXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxyXG4gIFwic2NyaXB0c1wiOiB7XHJcbiAgICBcImRldlwiOiBcInZpdGVcIixcclxuICAgIFwiZGV2OmNvbnRlbnRcIjogXCJ2aXRlIC0taG9zdCAtLW1vZGUgY29udGVudFwiLFxyXG4gICAgXCJidWlsZDpjb250ZW50XCI6IFwidml0ZSBidWlsZCAtLW1vZGUgY29udGVudFwiLFxyXG4gICAgXCJkZXY6cG9wdXBcIjogXCJ2aXRlIC0taG9zdCAtLW1vZGUgcG9wdXBcIixcclxuICAgIFwiZGV2Om9wdGlvbnNcIjogXCJ2aXRlIC0taG9zdCAtLW1vZGUgb3B0aW9uc1wiLFxyXG4gICAgXCJidWlsZFwiOiBcIm5vZGUgLi9wcmVTY3JpcHQuY2pzICYmIHZ1ZS10c2MgJiYgdml0ZSBidWlsZCAmJiBub2RlIC4vcHJlYnVpbGQuY2pzXCJcclxuICB9LFxyXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiY2hlZXJpb1wiOiBcIl4xLjAuMC1yYy4xMlwiLFxyXG4gICAgXCJlbGVtZW50LXBsdXNcIjogXCJeMi43LjNcIixcclxuICAgIFwicGluaWFcIjogXCJeMi4xLjdcIixcclxuICAgIFwidnVlXCI6IFwiXjMuNC4yMVwiLFxyXG4gICAgXCJ2dWUtcm91dGVyXCI6IFwiXjQuMy4yXCJcclxuICB9LFxyXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiQHNhbXJ1bS92aXRlLXBsdWdpbi13ZWItZXh0ZW5zaW9uXCI6IFwiXjUuMS4wXCIsXHJcbiAgICBcIkB0eXBlcy9jaGVlcmlvXCI6IFwiXjAuMjIuMzVcIixcclxuICAgIFwiQHR5cGVzL2Nocm9tZVwiOiBcIl4wLjAuMjY4XCIsXHJcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjIwLjEyLjEyXCIsXHJcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiOiBcIl41LjAuNFwiLFxyXG4gICAgXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjogXCJeNS4xMi4wXCIsXHJcbiAgICBcInNhc3NcIjogXCJeMS43Ny4yXCIsXHJcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS4yLjJcIixcclxuICAgIFwidW5wbHVnaW4tYXV0by1pbXBvcnRcIjogXCJeMC4xNy42XCIsXHJcbiAgICBcInVucGx1Z2luLWVsZW1lbnQtcGx1c1wiOiBcIl4wLjguMFwiLFxyXG4gICAgXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50c1wiOiBcIl4wLjI3LjBcIixcclxuICAgIFwidml0ZVwiOiBcIl41LjIuMFwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiOiBcIl4wLjUuMVwiLFxyXG4gICAgXCJ2dWUtdHNjXCI6IFwiXjIuMC42XCJcclxuICB9XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhZG1pblxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXHh5LWRpY3RcXFxcc3JjXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhZG1pblxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXHh5LWRpY3RcXFxcc3JjXFxcXG1hbmlmZXN0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hZG1pbi9Eb2N1bWVudHMvR2l0SHViL3h5LWRpY3Qvc3JjL21hbmlmZXN0LnRzXCI7aW1wb3J0IHBrZyBmcm9tICcuLi9wYWNrYWdlLmpzb24nXHJcblxyXG5jb25zdCBtYW5pZmVzdDogY2hyb21lLnJ1bnRpbWUuTWFuaWZlc3QgPSB7XHJcbiAgbWFuaWZlc3RfdmVyc2lvbjogMyxcclxuICBuYW1lOiBwa2cubmFtZSxcclxuICB2ZXJzaW9uOiBwa2cudmVyc2lvbixcclxuICBkZXNjcmlwdGlvbjogcGtnLmRlc2NyaXB0aW9uLFxyXG4gIGljb25zOiB7XHJcbiAgICAvLyBcdTRFQzVcdTgwRkRcdTRGN0ZcdTc1MjhcdTc2RjhcdTVCRjlcdTRFOEVwdWJsaWNcdTRFMEJcdTc2ODRcdThENDRcdTZFOTBcclxuICAgIDE2OiBcImFzc2V0cy9hcHAvaWNvbi0xNi5wbmdcIixcclxuICAgIDMyOiBcImFzc2V0cy9hcHAvaWNvbi0zMi5wbmdcIixcclxuICAgIDQ4OiBcImFzc2V0cy9hcHAvaWNvbi00OC5wbmdcIixcclxuICAgIDY0OiBcImFzc2V0cy9hcHAvaWNvbi02NC5wbmdcIixcclxuICAgIDEyODogXCJhc3NldHMvYXBwL2ljb24tMTI4LnBuZ1wiLFxyXG4gICAgMjU2OiBcImFzc2V0cy9hcHAvaWNvbi0yNTYucG5nXCIsXHJcbiAgfSxcclxuICBjb250ZW50X3NlY3VyaXR5X3BvbGljeToge1xyXG4gICAgXCJleHRlbnNpb25fcGFnZXNcIjogXCJzY3JpcHQtc3JjICdzZWxmJyAnd2FzbS11bnNhZmUtZXZhbCc7IG9iamVjdC1zcmMgJ3NlbGYnO1wiXHJcbiAgfSxcclxuICBwZXJtaXNzaW9uczogW1xyXG4gICAgXCJ3ZWJOYXZpZ2F0aW9uXCIsXHJcbiAgICBcIndlYlJlcXVlc3RcIixcclxuICAgIFwiY29udGV4dE1lbnVzXCIsIC8vIFx1NTNGM1x1OTUyRVx1ODNEQ1x1NTM1NVxyXG5cdFx0XCJ0YWJzXCIsIC8vIFx1NjgwN1x1N0I3RVxyXG4gICAgXCJhY3RpdmVUYWJcIixcclxuICAgIFwic2NyaXB0aW5nXCIsXHJcblx0XHRcIm5vdGlmaWNhdGlvbnNcIiwgLy8gXHU5MDFBXHU3N0U1XHJcblx0XHRcIndlYlJlcXVlc3RcIiwgLy8gd2ViXHU4QkY3XHU2QzQyXHJcblx0XHRcIndlYlJlcXVlc3RCbG9ja2luZ1wiLFxyXG5cdFx0XCJzdG9yYWdlXCIsIC8vIFx1NjNEMlx1NEVGNlx1NjcyQ1x1NTczMFx1NUI1OFx1NTBBOFxyXG4gICAgXCJ1bmxpbWl0ZWRTdG9yYWdlXCIsIC8vIFx1NUI1OFx1NTBBOFx1NjI2OVx1NUM1NVxyXG4gIF0sXHJcbiAgaG9zdF9wZXJtaXNzaW9uczogWycqOi8vKi8qJ10sXHJcbiAgYmFja2dyb3VuZDoge1xyXG4gICAgc2VydmljZV93b3JrZXI6ICdzcmMvYmFja2dyb3VuZC9tYWluLnRzJyxcclxuICB9LFxyXG4gIC8vIFx1OEJFNVx1NTE4NVx1NUJCOVx1NEYxQVx1NkNFOFx1NTE2NVx1NTIzMFx1NTMzOVx1OTE0RFx1NTIzMFx1N0Y1MVx1N0FEOVx1NUY1M1x1NEUyRFxyXG4gIGNvbnRlbnRfc2NyaXB0czogW1xyXG4gICAge1xyXG4gICAgICBtYXRjaGVzOiBbJzxhbGxfdXJscz4nXSxcclxuICAgICAganM6IFtcclxuICAgICAgICAnc3JjL2NvbnRlbnQvbWFpbi50cycsXHJcbiAgICAgICAgJ3NyYy9jb250ZW50U2NyaXB0cy9ldmVudC50cycsXHJcbiAgICAgICAgJ3NyYy9jb250ZW50U2NyaXB0cy9zY3JpcHQudHMnXHJcbiAgICAgIF0sXHJcbiAgICAgIGNzczogW1xyXG4gICAgICAgICdzcmMvY29udGVudC9zdHlsZS5jc3MnXHJcbiAgICAgIF1cclxuICAgIH1cclxuICBdLFxyXG4gIGFjdGlvbjoge1xyXG4gICAgZGVmYXVsdF9wb3B1cDogJ3NyYy9wb3B1cC9pbmRleC5odG1sJyxcclxuICB9LFxyXG4gIG9wdGlvbnNfdWk6IHtcclxuICAgIHBhZ2U6ICdzcmMvb3B0aW9ucy9pbmRleC5odG1sJyxcclxuICAgIG9wZW5faW5fdGFiOiBmYWxzZSxcclxuICB9LFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtYW5pZmVzdCJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVQsU0FBUyxTQUFTLGVBQWU7QUFDcFYsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyxvQkFBb0I7QUFFN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sa0JBQWtCO0FBQ3pCLE9BQU8saUJBQWlCO0FBQ3hCLFNBQVEsa0JBQWlCO0FBQ3pCLE9BQU8scUJBQXFCO0FBQzVCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCOzs7QUNYcEM7QUFBQSxFQUNFLE1BQVE7QUFBQSxFQUNSLGFBQWU7QUFBQSxFQUNmLFNBQVc7QUFBQSxFQUNYLFNBQVc7QUFBQSxFQUNYLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxJQUNULEtBQU87QUFBQSxJQUNQLGVBQWU7QUFBQSxJQUNmLGlCQUFpQjtBQUFBLElBQ2pCLGFBQWE7QUFBQSxJQUNiLGVBQWU7QUFBQSxJQUNmLE9B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
