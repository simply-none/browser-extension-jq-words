function listenStorageReq(port: chrome.runtime.Port, data: ReqData<{}>) {
  // 存储
  const storageCache = {}
  const initStorageCache = chrome.storage.local.get().then(item => {
    Object.assign(storageCache, item)
  })

  chrome.action.onClicked.addListener(async function (tab) {
    try {
      await initStorageCache
    } catch (error) {
      console.log(error, tab, '存储错误')
    }
  })
  sendToEvent(port, {
    type: 'info:storage',
    data: {
      ...storageCache,
    }
  })

  chrome.storage.onChanged.addListener(function (changes, areaName) {
    console.log(changes, data, areaName)
  })
}

function sendToEvent(port: chrome.runtime.Port, data: ReqData<{}>) {
  port.postMessage(data)
}

async function getWordStorage(type: string, word: string) {
  let wordCache: WordCache = {} as WordCache;
  let cacheKey = `${type}:${word}`
  const initStorageCache = chrome.storage.local.get(cacheKey).then((items) => {
    console.log(items, '查看是否有缓存')
    
    if (items[cacheKey]) {
      wordCache = items[cacheKey] as WordCache
      return true
    }
    wordCache = {} as WordCache
  });

  try {
    await initStorageCache;
  } catch (e) {
    // Handle error that occurred during storage initialization.
    console.log(e)
    wordCache = {} as WordCache;
  }
  return wordCache
}

async function setWordStorage(wordSymbol: string, value: WordCache) {
  chrome.storage.local.set({
    [wordSymbol]: value
  }).then(value => {
    console.log(value, '设置成功否')
    let w = wordSymbol.split(':')
    console.log('获取获取')
    getWordStorage(w[0], w[1])
  }).catch(e => {
    console.log('失败否', e)
  })
}


export {
  setWordStorage,
  getWordStorage,
  listenStorageReq
}
