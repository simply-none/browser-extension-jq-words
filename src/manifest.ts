import pkg from '../package.json'

const manifest: chrome.runtime.Manifest = {
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  content_security_policy: {
    "extension_pages": "script-src 'self' 'wasm-unsafe-eval'; object-src 'self';"
  },
  permissions: [
    "webRequest",
    "webRequestBlocking",
    "contextMenus", // 右键菜单
		"tabs", // 标签
		"notifications", // 通知
		"webRequest", // web请求
		"webRequestBlocking",
		"storage", // 插件本地存储
  ],
  host_permissions: ['*://*/*'],
  background: {
    service_worker: 'src/entries/background/main.ts',
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: [
        'src/entries/content/main.ts',
        'src/entries/contentScripts/event.ts',
        'src/entries/contentScripts/script.ts'
      ],
      css: [
        'src/entries/content/style.css'
      ]
    }
  ],
  action: {
    default_popup: 'src/entries/popup/index.html',
  },
  options_ui: {
    page: 'src/entries/options/index.html',
    open_in_tab: false,
  },
}

export default manifest