
window.addEventListener("message", function (ev) {
  if (ev.data.text === '测试') {
    console.log(ev.data, '测试')

    const port = chrome.runtime.connect({ name: "knockknock" });

    port.postMessage({
      type: 'req:word-desc',
      data: {
        word: ev.data.word
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
      console.log(msg, 'port disconnect content scripts', Date.now())
    })
  }
})

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
