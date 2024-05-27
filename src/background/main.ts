import {
  listenMultiMsg,
} from './sendMsg'

import {
  listenStorageReq,
  setWordStorage,
} from './storage'

import type {
  ReqData,
} from './sendMsg'

chrome.runtime.onInstalled.addListener(async () => {
  // 打开新标签页
  // const url = chrome.runtime.getURL('src/popup/index.html')
  // const tab = await chrome.tabs.create({ url: url })
  // console.log(`Created tab ${tab.id}`)
})

const popupConnectToContentScript = async (data: any) => {

  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);

  const port = chrome.tabs.connect(tab.id!)
  console.log(port, 'prot')

  port.postMessage(data);

  port.onMessage.addListener(function (msg) {
    console.log(msg, '监听数据在settings insex---tabs')
  });
}

chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(async function (msg: ReqData<{ word: string, url: string, cacheOrigin: CacheOrigin, storage: any }>) {
    console.log('侦听 in main', msg)
    if (msg.type === 'req:popup2main-storage') {
      chrome.storage.local.set({
        [msg.data.word]: JSON.stringify(msg.data.storage)
      }).then(value => {
        console.log(value, '设置成功否')
        popupConnectToContentScript({
          type: 'info:get-select-dictTypes',
          data: {
            storage: JSON.stringify(msg.data.storage)
          }
        })
      }).catch(e => {
        console.log('失败否', e)
      })
    }
    if (msg.type === 'req:word-desc') {
      listenMultiMsg(port, msg)
    }
    if (msg.type === 'req:storage') {
      listenStorageReq(port, msg)
    }
    if (msg.type === 'req:openTab') {
      const url = chrome.runtime.getURL(msg.data.url)
      const tab = await chrome.tabs.create({ url: url })
      console.log(tab, 'tab')
    }
  });
});

// chrome.runtime.onMessage.addListener(
//   function (request, sender, sendResponse) {
//     console.log(sender)
//     if (request.type === 'req:word-desc') {
//       listenOnceMsg(sendResponse, request)
//     }
//     // 不加这个要报错
//     return true
//   }
// )
