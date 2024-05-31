import { getLocalStorage, setLocalStorage } from "@/utils/storage"

window.addEventListener("message", async function (ev) {
  console.log(ev, '监听事件')
  if (ev.data.type === 'req:word-desc') {
    reqWordDesc(ev.data)
  }
  if (ev.data.type === 'req:storage') {
    reqStorage(ev.data)
  }
  if (ev.data.type === 'req:openTab') {
    // const url = chrome.runtime.getURL(ev.data.data.url)
    // const tab = await chrome.tabs.create({ url: url })
    // console.log(tab, 'tab')
    reqOpenTab(ev.data)
  }

  if (ev.data.type === 'req:get-select-dictTypes') {
    reqStorage(ev.data)
  }

  if (ev.data.type === 'req:history') {
    reqHistory(ev.data.data)
  }

})

interface HistoryData {
  [index: string]: any
}

async function reqHistory(data: HistoryData) {
  const type: StorageType = 'history'
  console.log(data, '开始缓存历史记录')
  let storageIndex: string[] = []
  let storageDate: HistoryData[] = []
  const items = await getLocalStorage([`${type}:index`, `${type}:${data.date}`])
  console.log(items, "获取已经存储的历史记录");
  storageIndex = items[`${type}:index`] || []
  storageDate = items[`${type}:${data.date}`] || []

  if (!storageIndex.includes(data.date)) {
    storageIndex.push(data.date)
  }
  storageDate.push(data)
  setLocalStorage({
    [`${type}:${data.date}`]: storageDate,
    [`${type}:index`]: storageIndex
  })
}


async function reqOpenTab(data: { type: string, data: { type: string, url: any } }) {
  const port = chrome.runtime.connect({ name: 'req:openTab--' + data.data.url });

  port.postMessage({
    type: 'req:openTab',
    data: {
      url: data.data.url
    }
  });

  port.onMessage.addListener(function (msg) {
    console.log(msg, '监听tab是否已经打开,从backgroundjs', Date.now())
  });
}

async function reqStorage(data: { type: string, data: { type: string, storage: any, storageKey: string, word: string } }) {
  console.log(data, '测试')
  if (data.data.type === 'set') {
    setLocalStorage(data.data.word, JSON.stringify(data.data.storage))
  }

  if (data.data.type === 'get') {
    const storageCache = { count: 0 };
    let items = await getLocalStorage()
    console.log(items, "Value is get");
    Object.keys(items).forEach((key) => {
      items[key] = JSON.parse(items[key])
    })
    Object.assign(storageCache, items);
    window.postMessage({
      type: 'info:storage-get',
      data: storageCache
    }, "*")
  }

  if (data.data.type === 'get-single') {
    let storage = null
    let items = await getLocalStorage(data.data.storageKey)
    if (items[data.data.storageKey]) {
      storage = items[data.data.storageKey]
    }
    window.postMessage({
      type: 'info:get-select-dictTypes',
      data: {
        storage
      }
    }, "*")
  }
}

function reqWordDesc(data: { type: string, data: { word: string, cacheOrigin: CacheOrigin } }) {
  console.log(data, '测试')

  const port = chrome.runtime.connect({ name: 'req:word-desc--' + data.data.word });

  port.postMessage({
    type: 'req:word-desc',
    data: {
      word: data.data.word,
      cacheOrigin: data.data.cacheOrigin
    }
  });

  port.onMessage.addListener(function (msg) {
    console.log(msg, 'port msg content scripts', Date.now())
    if (msg.type === 'info:word-desc') {
      window.postMessage({
        type: 'info:word-desc',
        data: msg.data
      }, "*")
    }
  });

  port.onDisconnect.addListener(function (msg) {
    if (msg.name === 'req:word-desc--' + data.data.word) {
      window.postMessage({
        type: 'info:word-desc',
        data: {
          status: 'close'
        }
      }, "*")
    }
    console.log(msg, 'port disconnect content scripts', Date.now())
  })
}

// 监听到消息
chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(async function (msg: ReqData<{ storage: string, word: string, url: string, cacheOrigin: CacheOrigin }>) {
    console.log('侦听 in main', msg)

    if (msg.type === 'info:get-select-dictTypes') {
      window.postMessage({
        type: 'info:get-select-dictTypes',
        data: {
          storage: msg.data.storage
        }
      }, "*")
    }
  });
});

// 发送一次性消息
// chrome.runtime.sendMessage({
//   contentScriptsText: 'content-scripts-request',
//   data: {
//     word: ev.data.word
//   }
// }, response => {
//   console.log(response, '接收从background的响应')
//   window.postMessage({
//     text: '返回结果',
//     result: response
//   }, "*")
// })
