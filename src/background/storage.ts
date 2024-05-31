function listenStorageReq(port: chrome.runtime.Port, data: ReqData<{}>) {
  // 存储
  console.log(port, data, 'listenStorageReq')
  // const storageCache = {}
  // const initStorageCache = chrome.storage.local.get().then(item => {
  //   Object.assign(storageCache, item)
  // })

  // chrome.action.onClicked.addListener(async function (tab) {
  //   try {
  //     await initStorageCache
  //   } catch (error) {
  //     console.log(error, tab, '存储错误')
  //   }
  // })
  // sendToEvent(port, {
  //   type: 'info:storage',
  //   data: {
  //     ...storageCache,
  //   }
  // })

  // chrome.storage.onChanged.addListener(function (changes, areaName) {
  //   console.log(changes, data, areaName)
  // })
}

function sendToEvent(port: chrome.runtime.Port, data: ReqData<{}>) {
  port.postMessage(data)
}

export {
  listenStorageReq
}
