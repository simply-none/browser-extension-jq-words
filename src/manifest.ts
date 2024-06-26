import pkg from '../package.json'

const manifest: chrome.runtime.Manifest = {
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  icons: {
    // 仅能使用相对于public下的资源
    16: "assets/app/icon-16.png",
    32: "assets/app/icon-32.png",
    48: "assets/app/icon-48.png",
    64: "assets/app/icon-64.png",
    128: "assets/app/icon-128.png",
    256: "assets/app/icon-256.png",
  },
  content_security_policy: {
    "extension_pages": "script-src 'self' 'wasm-unsafe-eval'; object-src 'self';"
  },
  permissions: [
    "sidePanel",
    "webNavigation",
    "webRequest",
    "contextMenus", // 右键菜单
		"tabs", // 标签
    "activeTab",
    "scripting",
		"notifications", // 通知
		"webRequest", // web请求
		"webRequestBlocking",
		"storage", // 插件本地存储
    "unlimitedStorage", // 存储扩展
  ],
  host_permissions: ['*://*/*'],
  background: {
    service_worker: 'src/background/main.ts',
  },
  // 该内容会注入到匹配到网站当中
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: [
        'src/content/main.ts',
        'src/contentScripts/event.ts',
        'src/contentScripts/script.ts'
      ],
      css: [
        'src/content/style.css'
      ]
    }
  ],
  web_accessible_resources: [
    {
      resources: [
        'assets/*'
      ],
      matches: ['<all_urls>'],
    }
  ],
  action: {
    default_popup: 'src/popup/index.html',
    "default_title": "点击打开侧面板",
  },
  options_ui: {
    page: 'src/options/index.html',
    open_in_tab: false,
  },
  side_panel: {
    default_path: 'src/popup/index.html',
  },
  chrome_url_overrides: {
    "newtab": "src/newTab/index.html",
  },
}

export default manifest