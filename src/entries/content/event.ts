
window.addEventListener("message",function(ev){
  if (ev.data.text === '测试') {
    console.log(ev.data)
    chrome.runtime.sendMessage({
      contentScriptsText: 'content-scripts-request',
      data: {
        word: ev.data.word
      }
    }, response => {
      console.log(response, '接收从background的响应')
      window.postMessage({
        text: '返回结果',
        result: response
      }, "*")
    })
  }
  
})



