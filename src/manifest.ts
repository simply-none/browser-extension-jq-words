import pkg from '../package.json'

const manifest: chrome.runtime.Manifest = {
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  host_permissions: ['*://*/*'],
  background: {
    service_worker: 'src/entries/background/main.ts',
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: [
        'src/entries/content/main.ts',
      ],
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