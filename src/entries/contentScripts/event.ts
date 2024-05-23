
window.addEventListener("message", function (ev) {
  if (ev.data.type === 'req:word-desc') {
    reqWordDesc(ev.data)
  }
  if (ev.data.type === 'req:storage') {
    reqStorage(ev.data)
  }
})

async function reqStorage (data: { type: string, data: { type: string, storage: any, word: string } }) {
  console.log(data, '测试')
  if (data.data.type === 'set') {
    chrome.storage.local.set({[data.data.word]: JSON.stringify(data.data.storage)}).then(() => {
      console.log("Value is set");
    });
  }

  if (data.data.type === 'get') {
    const storageCache = { count: 0 };
    await chrome.storage.local.get().then((items) => {
      console.log(items, "Value is get");
      Object.keys(items).forEach((key) => {
        items[key] = JSON.parse(items[key])
      })
      Object.assign(storageCache, items);
    });
    window.postMessage({
      type: 'info:storage-get',
      data: storageCache
    }, "*")
  }
  
}

function reqWordDesc (data: { type: string, data: { word: string } }){
    console.log(data, '测试')

    const port = chrome.runtime.connect({ name: 'req:word-desc--'+ data.data.word });

    port.postMessage({
      type: 'req:word-desc',
      data: {
        word: data.data.word
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
      if (msg.name === 'req:word-desc--'+ data.data.word) {
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
