import { 
  listenMultiMsg,
} from './sendMsg'

import type {
  ReqData,
} from './sendMsg'

chrome.runtime.onInstalled.addListener(async () => {
  // 打开新标签页
  // const url = chrome.runtime.getURL('src/entries/popup/index.html')
  // const tab = await chrome.tabs.create({ url: url })
  // console.log(`Created tab ${tab.id}`)
})

chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg: ReqData<{ word: string }>) {
    if (msg.type === 'req:word-desc') {
      listenMultiMsg(port, msg)
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
